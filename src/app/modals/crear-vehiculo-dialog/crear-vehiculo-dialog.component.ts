import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { IVehiculo } from '@app/interface/IVehiculo';
import { Driver } from '@app/modules/drivers-component/interfaces/driver';
import { DriversService } from '@services/drivers.service';
export const estadosVehiculo: string[] = ['Activo', 'Inactivo', 'Mantenimiento', 'De Baja'];
export const tiposDeCarga: string[] = ['Ligera', 'Mediana', 'Pesada', 'Extra Pesada', 'Especializada', 'Pasajeros'];

@Component({
  selector: 'app-crear-vehiculo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './crear-vehiculo-dialog.component.html',
  styleUrls: ['./crear-vehiculo-dialog.component.css']
})
export class CrearVehiculoDialogComponent implements OnInit {
  form: FormGroup;
  conductores: Driver[] = [];
  estadosVehiculo = estadosVehiculo;
  tiposDeCarga = tiposDeCarga;

  constructor(
    public dialogRef: MatDialogRef<CrearVehiculoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private fb: FormBuilder,
    private driversService: DriversService
  ) {
    this.form = this.fb.group({
      placa: ['', Validators.required],
      modelo: ['', Validators.required],
      anio: [2000, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      tipoCarga: [''],
      estado: ['', Validators.required],
      conductorId: [null]
    });
  }

  ngOnInit(): void {
    this.conductores = this.driversService.getConductoresList();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      let nombreConductorSeleccionado: string | null = null;

      if (formData.conductorId) {
        const conductorEncontrado = this.driversService.buscarConductorPorId(this.conductores, formData.conductorId);
        nombreConductorSeleccionado = conductorEncontrado ? conductorEncontrado.name : null;
      }

      const vehiculoResultado: Partial<IVehiculo> = {
        placa: formData.placa,
        modelo: formData.modelo,
        anio: formData.anio,
        tipoCarga: formData.tipoCarga,
        estado: formData.estado,
        conductorId: formData.conductorId,
        nombreConductor: nombreConductorSeleccionado
      };
      this.dialogRef.close(vehiculoResultado);
    }
  }
}