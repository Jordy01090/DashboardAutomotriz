import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mantenimiento } from './interfaces/lista'; // Ajusta la ruta correcta
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; 
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CrearMantenimientoComponent } from '../../../modals/crear-mantenimiento-dialog/crear-mantenimiento.component';
import { NoRegistrosMantenimientoDialogComponent } from '@app/modals/no-registros-mantenimiento-dialog/no-registros-mantenimiento-dialog.component';

@Component({
  selector: 'app-lista-mantenimientos',
  imports: [CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, FormsModule,MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './lista-mantenimientos.component.html',
  styleUrls: ['./lista-mantenimientos.component.css']
})
export class ListaMantenimientosComponent implements OnInit {
  busqueda: string = '';
  mantenimientos: Mantenimiento[] = []; 
  mantenimientosFiltrados: Mantenimiento[] = []; 
  displayedColumns: string[] = ['id', 'tipo', 'descripcion', 'fecha', 'costo', 'kilometraje', 'vehiculoId'];

  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Cargar mantenimientos desde localStorage
    const data = localStorage.getItem('mantenimientos');
    if (data) {
      const mantenimientosGuardados = JSON.parse(data);
      // Convertir las fechas de los registros recuperados a objetos Date
      mantenimientosGuardados.forEach((m: Mantenimiento) => {
        m.fecha = new Date(m.fecha);
      });

      this.mantenimientos = mantenimientosGuardados;
    } else {
      this.mantenimientos = [];
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
        const fecha = new Date(resultado.fecha);
        fecha.setHours(0, 0, 0, 0); // Normalizar la fecha al inicio del día
        resultado.fecha = fecha;
  
        const index = this.mantenimientos.findIndex(m => m.id === resultado.id);
        if (index !== -1) {
          this.mantenimientos[index] = resultado;
          this.mantenimientosFiltrados = [...this.mantenimientos];
          localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
        }
      }
    });
  }

  // Método para buscar mantenimientos por fecha
  eliminarMantenimiento(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este mantenimiento?');
    if (confirmacion) {
      this.mantenimientos = this.mantenimientos.filter(m => m.id !== id);
      this.mantenimientosFiltrados = [...this.mantenimientos];
      localStorage.setItem('mantenimientos', JSON.stringify(this.mantenimientos));
    }
  }
  
  // Método para filtrar mantenimientos por fecha
  filtrarPorFecha() {
    console.log('Filtrando…');
  
    if (this.fechaInicio && this.fechaFin) {
      const inicio = new Date(this.fechaInicio);
      const fin = new Date(this.fechaFin);
  
      // Normaliza ambas fechas a medianoche
      inicio.setHours(0, 0, 0, 0);
      fin.setHours(23, 59, 59, 999); // Para incluir todo el día
      
      this.mantenimientosFiltrados = this.mantenimientos.filter(item => {
        const fechaItem = new Date(item.fecha);
        
        return fechaItem >= inicio && fechaItem <= fin;
      });
      if (this.mantenimientosFiltrados.length === 0) {
        this.dialog.open(NoRegistrosMantenimientoDialogComponent, {
          width: '300px',
          data: { fecha: this.busqueda }
        });
        console.log('No hay registros para la fecha seleccionada:', this.busqueda);
      }
      console.log(`Rango: ${inicio} → ${fin}`);
      console.log('Filtrados:', this.mantenimientosFiltrados);
    } else {
      this.mantenimientosFiltrados = [...this.mantenimientos];
      console.log('Fechas incompletas o vacías, mostrando todos los mantenimientos.');
    }
  }

  // Método para limpiar los filtros de fecha
  limpiarFiltros(){
    this.fechaInicio = null;
    this.fechaFin = null;
    this.filtrarPorFecha();
   } 
}

