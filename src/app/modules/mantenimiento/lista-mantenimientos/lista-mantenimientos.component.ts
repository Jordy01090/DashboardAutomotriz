import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mantenimiento } from './interfaces/lista'; // Ajusta la ruta correcta
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-mantenimientos',
  imports: [CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './lista-mantenimientos.component.html',
  styleUrls: ['./lista-mantenimientos.component.css']
})
export class ListaMantenimientosComponent implements OnInit {

  mantenimientos: Mantenimiento[] = []; // Aquí cargas los datos de tu servicio o prueba
  displayedColumns: string[] = ['id', 'tipo', 'descripcion', 'fecha', 'costo', 'kilometraje', 'vehiculoId'];

  constructor() {}

  ngOnInit(): void {
    // Simulación de datos de prueba:
    this.mantenimientos = [
      { id: 1, tipo: 'preventivo', descripcion: 'Cambio de aceite', fecha: new Date(), costo: 100, kilometraje: 10000, vehiculoId: 5 },
      { id: 2, tipo: 'correctivo', descripcion: 'Reparación de frenos', fecha: new Date(), costo: 250, kilometraje: 12000, vehiculoId: 3 },
    ];
  }

}

