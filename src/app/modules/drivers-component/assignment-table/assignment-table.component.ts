import { Component, OnInit } from '@angular/core';
import { DriversService } from '@app/services/drivers.service';
import { Driver } from '../interfaces/driver';
import { Assigment } from '../interfaces/assigment';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditAssignmentDialogComponent } from '@app/modals/edit-assignment-dialog/edit-assignment-dialog.component';
import { AsignacionService } from '@app/services/asignacion.service';

@Component({
  selector: 'app-assignment-table',
  imports: [CommonModule,MatIconModule],
  templateUrl: './assignment-table.component.html',
  styleUrl: './assignment-table.component.css',
})
export class AssignmentTableComponent implements OnInit {
  private dialog:MatDialog;
  public assigmentService:AsignacionService;
  constructor(private conductoresService:DriversService,dialog:MatDialog,asignacionService:AsignacionService ){
    this.dialog = dialog;
    this.assigmentService = asignacionService;
  }

  protected asignaciones:Assigment[] = [];
  public vehiculos = [
    {
      placa: 'ABC-1234',
      modelo: 'Toyota Hilux',
      anio: 2020,
      tipoCarga: 'Pesada',
      estado: 'Activo',
    },
    {
      placa: 'DEF-5678',
      modelo: 'Ford Ranger',
      anio: 2019,
      tipoCarga: 'Ligera',
      estado: 'Mantenimiento',
    },
    {
      placa: 'GHI-9012',
      modelo: 'Nissan Frontier',
      anio: 2021,
      tipoCarga: 'Mediana',
      estado: 'Activo',
    },
    {
      placa: 'JKL-3456',
      modelo: 'Chevrolet D-Max',
      anio: 2018,
      tipoCarga: 'Pesada',
      estado: 'Inactivo',
    },
    {
      placa: 'MNO-7890',
      modelo: 'Mitsubishi L200',
      anio: 2022,
      tipoCarga: 'Ligera',
      estado: 'Activo',
    },
  ];
  private conductores:Driver[] = [];
  ngOnInit(): void {
    this.conductoresService.conductoresFiltrados$.subscribe((conductores)=>{
      this.conductores = conductores
      this.asignRandomVehicleAndDriver();
      console.log(this.asignaciones);
    })
  }

  editarAsignacion(asignacion:Assigment){
    const dialogRef = this.dialog.open(EditAssignmentDialogComponent,{
      data:asignacion,
      width:'500px'
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        let asignacion:Assigment = result;
        this.asignaciones = this.assigmentService.editarAsignacion(this.asignaciones,asignacion);
      }
    })
  }
  private asignRandomVehicleAndDriver(){
    this.asignaciones = this.vehiculos.map((vehiculo,index)=>{
      const  conductor = this.conductores[index % this.conductores.length];
      const today = new Date();
      //formatear fecha
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const fechaFormateada = today.toLocaleDateString('es-ES', options);
      return {
        id: index + 1,
        conductor: conductor.name,
        vehiculo: vehiculo.placa,
        fechaInicio: fechaFormateada,
        fechaFin: undefined,
        estado: 'Asignado',
      }
    })
  }



}
