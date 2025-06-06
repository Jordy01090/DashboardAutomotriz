import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Marker } from '../interfaces/marker.interface'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-update-marker-dialog',
  templateUrl: './update-marker-dialog.component.html',
  styleUrls: ['./update-marker-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class UpdateMarkerDialogComponent {
  markerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateMarkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marker,
    private fb: FormBuilder
  ) {
    this.markerForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      lat: [data.lat],
      lng: [data.lng]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}