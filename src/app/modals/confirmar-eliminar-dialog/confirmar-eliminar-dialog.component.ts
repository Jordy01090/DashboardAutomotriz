import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmar-eliminar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmar-eliminar-dialog.component.html',
  styleUrls: ['./confirmar-eliminar-dialog.component.css']
})
export class ConfirmarEliminarDialogComponent {
  mensaje: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmarEliminarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) {
    this.mensaje = data.mensaje;
  }

  onConfirmar(): void {
    this.dialogRef.close(true)
  }

  onCancelar(): void {
    this.dialogRef.close(false);
  }
}