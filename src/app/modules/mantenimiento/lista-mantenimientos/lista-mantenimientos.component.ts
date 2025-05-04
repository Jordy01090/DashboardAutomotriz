import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mantenimiento } from './interfaces/lista'; // Ajusta la ruta correcta
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { MatDialog } from '@angular/material/dialog';
import { CrearMantenimientoComponent } from '../crear-mantenimiento/crear-mantenimiento.component';

@Component({
  selector: 'app-lista-mantenimientos',
  imports: [CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, FormsModule],
  templateUrl: './lista-mantenimientos.component.html',
  styleUrls: ['./lista-mantenimientos.component.css']
})
export class ListaMantenimientosComponent implements OnInit {
  busqueda: string = '';
  mantenimientos: Mantenimiento[] = []; 
  mantenimientosFiltrados: Mantenimiento[] = []; 
  displayedColumns: string[] = ['id', 'tipo', 'descripcion', 'fecha', 'costo', 'kilometraje', 'vehiculoId'];

  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const datosQuemados: Mantenimiento[] = [
      { id: 1, tipo: 'preventivo', descripcion: 'Cambio de aceite', fecha: new Date('2023-05-01'), costo: 100, kilometraje: 10000, vehiculoId: 5 },
      { id: 2, tipo: 'correctivo', descripcion: 'Reparación de frenos', fecha: new Date('2023-05-02'), costo: 250, kilometraje: 12000, vehiculoId: 3 },
    ];

    // Cargar mantenimientos desde localStorage
    const data = localStorage.getItem('mantenimientos');
    if (data) {
      const mantenimientosGuardados = JSON.parse(data);
      // Convertir las fechas de los registros recuperados a objetos Date
      mantenimientosGuardados.forEach((m: Mantenimiento) => {
        m.fecha = new Date(m.fecha);
      });

      this.mantenimientos = [
        ...mantenimientosGuardados,
        ...datosQuemados.filter(q => !mantenimientosGuardados.some((m: Mantenimiento) => m.id === q.id))
      ];
    } else {
      this.mantenimientos = [...datosQuemados];
    }

    localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
    this.mantenimientosFiltrados = [...this.mantenimientos];
  }

  // Abrir el modal para crear un mantenimiento
  crearMantenimiento(): void {
    const dialogRef = this.dialog.open(CrearMantenimientoComponent, {
      width: '400px',
      data: null 
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        resultado.fecha = new Date(resultado.fecha);
        // Asignar un nuevo ID y agregar el mantenimiento a la lista
        resultado.id = this.mantenimientos.length + 1;
        this.mantenimientos.push(resultado);
        this.mantenimientosFiltrados = [...this.mantenimientos];
        localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
      }
    });
  }

  // Abrir el modal para editar un mantenimiento
  editarMantenimiento(mantenimiento: Mantenimiento): void {
    const dialogRef = this.dialog.open(CrearMantenimientoComponent, {
      width: '400px',
      data: { ...mantenimiento } // Pasar una copia del mantenimiento al modal
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        resultado.fecha = new Date(resultado.fecha);
        const index = this.mantenimientos.findIndex(m => m.id === resultado.id);
        if (index !== -1) {
          this.mantenimientos[index] = resultado;
          this.mantenimientosFiltrados = [...this.mantenimientos];
          localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
        }
      }
    });
  }

  // Método para filtrar los registros por fecha
  actualizarFiltro(): void {
    if (this.busqueda) {
      this.mantenimientosFiltrados = this.mantenimientos.filter(reg =>
        reg.fecha instanceof Date && !isNaN(reg.fecha.getTime()) && reg.fecha.toISOString().split('T')[0] === this.busqueda
      );
    } else {
      this.mantenimientosFiltrados = [...this.mantenimientos];
    }
  }

  eliminarMantenimiento(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este mantenimiento?');
    if (confirmacion) {
      this.mantenimientos = this.mantenimientos.filter(m => m.id !== id);
      this.mantenimientosFiltrados = [...this.mantenimientos];
      localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
    }
  }
}

