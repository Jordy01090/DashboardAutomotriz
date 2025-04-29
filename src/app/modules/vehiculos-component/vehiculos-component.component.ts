import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehiculos-component',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './vehiculos-component.component.html',
  styleUrls: ['./vehiculos-component.component.css']
})
export class VehiculosComponentComponent {
  vehiculos = [
    { placa: 'ABC-1234', modelo: 'Toyota Hilux', anio: 2020, tipoCarga: 'Pesada', estado: 'Activo' },
    { placa: 'DEF-5678', modelo: 'Ford Ranger', anio: 2019, tipoCarga: 'Ligera', estado: 'Mantenimiento' }
  ];

  displayedColumns: string[] = ['placa', 'modelo', 'anio', 'tipoCarga', 'estado', 'acciones'];
}
