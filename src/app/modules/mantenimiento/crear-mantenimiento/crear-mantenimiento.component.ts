import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mantenimiento } from '../lista-mantenimientos/interfaces/lista'; // Ajusta la ruta correcta
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crear-mantenimiento',
  imports: [CommonModule,
    FormsModule,
   // BrowserAnimationsModule, // Required for Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './crear-mantenimiento.component.html',
  styleUrl: './crear-mantenimiento.component.css'
})
export class CrearMantenimientoComponent implements OnInit {
  mantenimiento: Mantenimiento;
  constructor(
    public dialogRef: MatDialogRef<CrearMantenimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mantenimiento | null // Recibe datos si es edición
  ) {
    // Si hay datos, inicializa el mantenimiento con ellos (modo edición)
    // Si no hay datos, inicializa un objeto vacío (modo creación)
    this.mantenimiento = data
      ? { ...data } // Clonar los datos para evitar modificar el original
      : {
          id: 0,
          tipo: 'preventivo',
          descripcion: '',
          fecha: new Date(),
          costo: 0,
          kilometraje: 0,
          vehiculoId: 0
        };
  }
  ngOnInit(): void {}

  guardar(): void {
    this.mantenimiento.fecha = new Date(this.mantenimiento.fecha); 
    this.dialogRef.close(this.mantenimiento); // Devuelve los datos al componente principal
  }

  cancelar(): void {
    this.dialogRef.close(); // Cierra el modal sin guardar cambios
  }
}
