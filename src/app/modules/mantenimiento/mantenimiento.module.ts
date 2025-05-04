import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ListaMantenimientosComponent } from './lista-mantenimientos/lista-mantenimientos.component'; // Ajusta ruta correcta

@NgModule({
  declarations: [ ],
  imports: [
   // BrowserModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: []
})
export class MantenimientoModule { }

