import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from './interfaces/driver';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DriversService } from '../../services/drivers.service';

@Component({
  selector: 'app-drivers-component',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './drivers-component.component.html',
  styleUrl: './drivers-component.component.css',
})
export class DriversComponentComponent implements OnInit {
  conductores: Driver[] = [];
  conductoresFiltrados: Driver[] = [];

  searchText: string = '';
  estadoFiltro: string = '';
  licenciaFiltro: string = '';
  private driverService: DriversService;

  columnaOrdenacion = 'id';
  ordenDireccion = 'asc';
  constructor(driverService:DriversService) {
    this.driverService = driverService;
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
    this.conductoresFiltrados = this.conductores;
  }

 aplicarFiltros(){
  let resultado = this.conductores;

  if(this.estadoFiltro!==''){
    resultado = this.driverService.filtrarConductoresPorEstado(resultado,this.estadoFiltro);
  }
  if(this.searchText!==''){
    resultado = this.driverService.bucarConductoresPorNombre(resultado,this.searchText);
  }
  if(this.licenciaFiltro!==''){
    resultado = this.driverService.filtrarPorLicencia(resultado,this.licenciaFiltro);
  }

  this.conductoresFiltrados = resultado;
 }
 filtrarPorEstado(){
  this.aplicarFiltros();
 }

 filtrarPorNombre(){
  this.aplicarFiltros();
 }
 filtrarPorLicencia(){
  this.aplicarFiltros();
 }

 limpiarFiltros(){
  this.estadoFiltro = '';
  this.searchText = '';
  this.licenciaFiltro = '';
  this.aplicarFiltros();
 }
}
