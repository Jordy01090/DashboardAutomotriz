import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from './interfaces/driver';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DriversService } from '../../services/drivers.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarDialogComponent } from '@app/modals/confirmar-eliminar-dialog/confirmar-eliminar-dialog.component';
import { EditDriverComponent } from '@app/modals/edit-driver/edit-driver.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-drivers-component',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './drivers-component.component.html',
  styleUrl: './drivers-component.component.css',
})
export class DriversComponentComponent implements OnInit {
  conductores: Driver[] = [];
  public conductoresFiltrados: Driver[] = [];
  mostrarComponenteAsignaciones: boolean = false;
  mostrarComponenteEvaluacion: boolean = false;
  private dialog: MatDialog;

  searchText: string = '';
  estadoFiltro: string = '';
  licenciaFiltro: string = '';
  private driverService: DriversService;

  columnaOrdenacion = 'id';
  ordenDireccion = 'asc';
  constructor(
    driverService: DriversService,
    dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.dialog = dialog;
    this.driverService = driverService;
  }
  editarConductor(conductor: Driver) {
    console.log(conductor);
    const dialogRef = this.dialog.open(EditDriverComponent, {
      data: conductor,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        console.log(resultado);
        let driver: Driver = this.parseDriver(resultado);

        this.conductores = this.driverService.editarConductor(
          this.conductores,
          driver
        );
        this.conductoresFiltrados = this.driverService.editarConductor(
          this.conductoresFiltrados,
          driver
        );
        this.aplicarFiltros();
      }
    });
  }

  private parseDriver(data: any): Driver {
    return {
      id: data.id,
      name: data.name,
      license: {
        type: data.license,
        expDate: data.expDate,
      },
      email: data.email,
      status: data.status,
      rating: data.rating,
    };
  }

  eliminarConductor(conductor: Driver) {
    const dialogRef = this.dialog.open(ConfirmarEliminarDialogComponent, {
      data: {
        mensaje: `¿Está seguro de que desea eliminar al conductor ${conductor.name}?`,
      },
    });
    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        this.conductores = this.driverService.eliminarConductor(
          this.conductores,
          conductor.id
        );
        this.conductoresFiltrados = this.driverService.eliminarConductor(
          this.conductoresFiltrados,
          conductor.id
        );
        this.aplicarFiltros();
      }
    });
  }

  ngOnInit(): void {
    this.cargaConductores();
  }
  cargaConductores() {
    this.conductores = [
      {
        id: 1,
        name: 'Juan Pérez',
        license: { type: 'B', expDate: new Date('2024-12-15') },
        email: 'juan.perez@example.com',
        status: 'activo',
        rating: 4,
      },
      {
        id: 2,
        name: 'María García',
        license: { type: 'A', expDate: new Date('2025-03-22') },
        email: 'maria.garcia@example.com',
        status: 'activo',
        rating: 5,
      },
      {
        id: 3,
        name: 'Carlos Rodríguez',
        license: { type: 'C', expDate: new Date('2023-08-10') },
        email: 'carlos.rodriguez@example.com',
        status: 'inactivo',
        rating: 3,
      },
      {
        id: 4,
        name: 'Angel  Zambrano',
        license: { type: 'C', expDate: new Date('2023-08-10') },
        email: 'angeldanielz@example.com',
        status: 'inactivo',
        rating: 3,
      },
      {
        id: 5,
        name: 'Juan Suarex',
        license: { type: 'B', expDate: new Date('2023-08-10') },
        email: 'juanrex@example.com',
        status: 'activo',
        rating: 5,
      },
    ];
    this.driverService.setConductoresFiltrados(this.conductores);
    this.conductoresFiltrados = this.conductores;
  }

  aplicarFiltros() {
    let resultado = this.conductores;

    if (this.estadoFiltro !== '') {
      resultado = this.driverService.filtrarConductoresPorEstado(
        resultado,
        this.estadoFiltro
      );
    }
    if (this.searchText !== '') {
      resultado = this.driverService.bucarConductoresPorNombre(
        resultado,
        this.searchText
      );
    }
    if (this.licenciaFiltro !== '') {
      resultado = this.driverService.filtrarPorLicencia(
        resultado,
        this.licenciaFiltro
      );
    }

    this.conductoresFiltrados = resultado;
  }
  filtrarPorEstado() {
    this.aplicarFiltros();
  }

  filtrarPorNombre() {
    this.aplicarFiltros();
  }
  filtrarPorLicencia() {
    this.aplicarFiltros();
  }

  limpiarFiltros() {
    this.estadoFiltro = '';
    this.searchText = '';
    this.licenciaFiltro = '';
    this.aplicarFiltros();
  }

  cargarComponenteAsignaciones() {
    this.mostrarComponenteAsignaciones = true;
    this.router.navigate(
      [
        {
          outlets: {
            asignaciones: ['asignaciones'],
          },
        },
      ],
      { relativeTo: this.activatedRoute }
    );
  }
  onTabChange(event: any) {
    const tabIndex = event.index;
    this.router
      .navigate(
        [
          {
            outlets: {
              asignaciones: null,
              evaluacion: null,
            },
          },
        ],
        { relativeTo: this.activatedRoute }
      )
      .then(() => {
        if (tabIndex === 1) {
          this.router.navigate(
            [
              {
                outlets: {
                  asignaciones: ['asignaciones'],
                },
              },
            ],
            { relativeTo: this.activatedRoute }
          );
          this.mostrarComponenteAsignaciones = true;
          this.mostrarComponenteEvaluacion = false;
        } else if (tabIndex === 2) {
          this.router.navigate(
            [
              {
                outlets: {
                  evaluacion: ['evaluacion'],
                },
              },
            ],
            { relativeTo: this.activatedRoute }
          );
          this.mostrarComponenteAsignaciones = false;
          this.mostrarComponenteEvaluacion = true;
        } else {
          this.mostrarComponenteAsignaciones = false;
          this.mostrarComponenteEvaluacion = false;
        }
      });
  }
  cargarComponenteEvaluacion() {
    this.mostrarComponenteEvaluacion = true;
    this.router.navigate(
      [
        {
          outlets: {
            evaluacion: ['evaluacion'],
          },
        },
      ],
      { relativeTo: this.activatedRoute }
    );
  }
}


