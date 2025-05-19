import { Component,Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-no-registros-mantenimiento-dialog',
  imports: [MatDialogModule],
  templateUrl: './no-registros-mantenimiento-dialog.component.html',
  styleUrl: './no-registros-mantenimiento-dialog.component.css'
})
export class NoRegistrosMantenimientoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NoRegistrosMantenimientoDialogComponent >,
    @Inject(MAT_DIALOG_DATA) public data: { fecha: string }
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }
}
