import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { EditarVehiculoDialogComponent } from '@modals/editar-vehiculo-dialog/editar-vehiculo-dialog.component';
import { ConfirmarEliminarDialogComponent } from '@modals/confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';

@Component({
  selector: 'app-vehiculos-component',
  standalone: true,
  imports: [
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './vehiculos-component.component.html',
  styleUrls: ['./vehiculos-component.component.css']
})
export class VehiculosComponentComponent {
  vehiculos = [
    { placa: 'ABC-1234', modelo: 'Toyota Hilux', anio: 2020, tipoCarga: 'Pesada', estado: 'Activo' },
    { placa: 'DEF-5678', modelo: 'Ford Ranger', anio: 2019, tipoCarga: 'Ligera', estado: 'Mantenimiento' },
    { placa: 'GHI-9012', modelo: 'Nissan Frontier', anio: 2021, tipoCarga: 'Mediana', estado: 'Activo' },
    { placa: 'JKL-3456', modelo: 'Chevrolet D-Max', anio: 2018, tipoCarga: 'Pesada', estado: 'Inactivo' },
    { placa: 'MNO-7890', modelo: 'Mitsubishi L200', anio: 2022, tipoCarga: 'Ligera', estado: 'Activo' }
  ];

  displayedColumns: string[] = ['placa', 'modelo', 'anio', 'tipoCarga', 'estado', 'acciones'];
  dataSource = new MatTableDataSource(this.vehiculos);

  constructor(public dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarVehiculo(vehiculo: any): void {
    const dialogRef = this.dialog.open(EditarVehiculoDialogComponent, {
      width: '400px',
      data: vehiculo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.vehiculos.findIndex(v => v === vehiculo);
        if (index !== -1) {
          this.vehiculos[index] = result;
          this.dataSource.data = [...this.vehiculos];
        }
      }
    });
  }

  eliminarVehiculo(vehiculo: any): void {
    const dialogRef = this.dialog.open(ConfirmarEliminarDialogComponent, {
      data: { mensaje: `¿Está seguro que desea eliminar el vehículo con placa ${vehiculo.placa}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vehiculos = this.vehiculos.filter(v => v !== vehiculo);
        this.dataSource.data = this.vehiculos;
      }
    });
  }
}