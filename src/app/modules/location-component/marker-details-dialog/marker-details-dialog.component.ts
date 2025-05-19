import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Marker } from '../interfaces/marker.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-marker-details-dialog',
  templateUrl: './marker-details-dialog.component.html',
  styleUrls: ['./marker-details-dialog.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
  ]
})
export class MarkerDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MarkerDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marker
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}