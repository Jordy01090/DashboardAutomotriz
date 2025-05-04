import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-vehiculo-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './editar-vehiculo-dialog.component.html',
  styleUrls: ['./editar-vehiculo-dialog.component.css']
})
export class EditarVehiculoDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarVehiculoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      placa: [data.placa, Validators.required],
      modelo: [data.modelo, Validators.required],
      anio: [data.anio, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      tipoCarga: [data.tipoCarga],
      estado: [data.estado]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardar(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}