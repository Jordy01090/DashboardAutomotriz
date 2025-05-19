import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-marker-dialog',
  templateUrl: './create-marker-dialog.component.html',
  styleUrls: ['./create-marker-dialog.component.css'],
  standalone: true, // Importante para standalone components
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class CreateMarkerDialogComponent {
  markerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateMarkerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lat: number; lng: number },
    private fb: FormBuilder
  ) {
    this.markerForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      lat: [data.lat],
      lng: [data.lng]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}