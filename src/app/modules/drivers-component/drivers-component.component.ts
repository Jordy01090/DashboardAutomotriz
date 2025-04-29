import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Driver } from './interfaces/driver';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

  columnaOrdenacion = 'id';
  ordenDireccion = 'asc';
  constructor() {}

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
    ];
  }

  aplicaFiltro(): void {
    let filtro = this.conductores;

    if (this.searchText) {
      const text = this.searchText.toLowerCase();
      filtro = filtro.filter(
        (c) =>
          c.name.toLowerCase().includes(text) ||
          c.email.toLowerCase().includes(text) ||
          c.id.toString().includes(text)
      );
    }

    if (this.estadoFiltro) {
      filtro = filtro.filter((c) => c.status === this.estadoFiltro);
    }

    if (this.licenciaFiltro) {
      filtro = filtro.filter((c) => c.license?.type === this.licenciaFiltro);
    }

    filtro = this.ordenar(filtro);
    // this.conductoresFiltrados = this.paginador(filtro);
    // this.actualizarTotalPaginas(filtro.length);
  }

  ordenarTabla(column: string): void {
    if (this.columnaOrdenacion === column) {
      this.ordenDireccion = this.ordenDireccion === 'asc' ? 'desc' : 'asc';
    } else {
      this.columnaOrdenacion = column;
      this.ordenDireccion = 'asc';
    }
    this.aplicaFiltro();
  }

  ordenar(conductores: Driver[]): Driver[] {
    return [...conductores].sort((a, b) => {
      let aValor: any = null;
      let bValor: any = null;

      switch (this.columnaOrdenacion) {
        case 'id':
          aValor = a.id;
          bValor = b.id;
          break;
        case 'name':
          aValor = a.name.toLowerCase();
          bValor = b.name.toLowerCase();
          break;
        case 'email':
          aValor = a.email.toLowerCase();
          bValor = b.email.toLowerCase();
          break;
        case 'status':
          aValor = a.status.toLowerCase();
          bValor = b.status.toLowerCase();
          break;
        case 'rating':
          aValor = a.rating;
          bValor = b.rating;
          break;

        default:
          aValor = a.id;
          bValor = b.id;
          break;
      }

      const comparacion = aValor > bValor ? 1 : aValor < bValor ? -1 : 0;
      return this.ordenDireccion === 'asc' ? comparacion : -comparacion;
    });
  }
}
