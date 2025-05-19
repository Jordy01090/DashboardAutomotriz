import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IVehiculo } from '@app/interface/IVehiculo';
import { VehiculoService } from '@services/vehiculo-service/vehiculo.service';
import { CrearVehiculoDialogComponent } from '@modals/crear-vehiculo-dialog/crear-vehiculo-dialog.component';
import { EditarVehiculoDialogComponent } from '@modals/editar-vehiculo-dialog/editar-vehiculo-dialog.component';
import { ConfirmarEliminarDialogComponent } from '@modals/confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-vehiculos-component',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './vehiculos-component.component.html',
  styleUrls: ['./vehiculos-component.component.css']
})
export class VehiculosComponentComponent implements OnInit {
  vehiculos: IVehiculo[] = [];
  displayedColumns: string[] = ['placa', 'modelo', 'anio', 'tipoCarga', 'estado', 'conductor', 'acciones'];
  dataSource = new MatTableDataSource<IVehiculo>(this.vehiculos);
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private vehiculoService: VehiculoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.isLoading = true;
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data;
        this.dataSource.data = this.vehiculos;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar los vehículos.', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  registrarVehiculo(): void {
    const dialogRef = this.dialog.open(CrearVehiculoDialogComponent, {
      width: '450px',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: Partial<IVehiculo> | undefined) => {
      if (result && result.placa) {
        this.isLoading = true;
        const vehiculoPayload: Omit<IVehiculo, 'id'> = {
          placa: result.placa,
          modelo: result.modelo!,
          anio: result.anio!,
          tipoCarga: result.tipoCarga!,
          estado: result.estado!,
          conductorId: result.conductorId,
        };

        this.vehiculoService.addVehiculo(vehiculoPayload, result.nombreConductor).subscribe({
          next: (nuevoVehiculo) => {
            this.snackBar.open(`Vehículo ${nuevoVehiculo.placa} registrado con éxito.`, 'Cerrar', { duration: 3000 });
            this.cargarVehiculos();
          },
          error: (err) => {
            this.snackBar.open('Error al registrar el vehículo.', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          }
        });
      }
    });
  }

  editarVehiculo(vehiculoAEditar: IVehiculo): void {
    if (!vehiculoAEditar.id) {
      this.snackBar.open('Error: Vehículo sin ID.', 'Cerrar', {duration: 3000});
      return;
    }
    const dialogRef = this.dialog.open(EditarVehiculoDialogComponent, {
      width: '450px',
      data: { ...vehiculoAEditar }
    });

    dialogRef.afterClosed().subscribe((result: IVehiculo | undefined) => {
      if (result && result.id) {
        this.isLoading = true;
        this.vehiculoService.updateVehiculo(result.id, result).subscribe({
          next: (vehiculoActualizado) => {
            this.snackBar.open(`Vehículo ${vehiculoActualizado?.placa} actualizado.`, 'Cerrar', { duration: 3000 });
            this.cargarVehiculos();
          },
          error: (err) => {
            this.snackBar.open('Error al actualizar el vehículo.', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          }
        });
      }
    });
  }

  eliminarVehiculo(vehiculoAEliminar: IVehiculo): void {
    if (!vehiculoAEliminar.id) {
        this.snackBar.open('Error: Vehículo sin ID.', 'Cerrar', { duration: 3000 });
        return;
    }
    const dialogRef = this.dialog.open(ConfirmarEliminarDialogComponent, {
      data: { mensaje: `¿Está seguro que desea eliminar el vehículo con placa ${vehiculoAEliminar.placa}?` }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado && vehiculoAEliminar.id) {
        this.isLoading = true;
        this.vehiculoService.deleteVehiculo(vehiculoAEliminar.id).subscribe({
          next: () => {
            this.snackBar.open(`Vehículo ${vehiculoAEliminar.placa} eliminado.`, 'Cerrar', { duration: 3000 });
            this.cargarVehiculos();
          },
          error: (err) => {
            this.snackBar.open('Error al eliminar el vehículo.', 'Cerrar', { duration: 3000 });
            this.isLoading = false;
          }
        });
      }
    });
  }
}