import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule y ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';  //  Asegúrate de tener esto si usas HttpClient
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule

import { LocationComponent } from './location-component.component';
import { CreateMarkerDialogComponent } from '../create-marker-dialog/create-marker-dialog.component';
import { MarkerDetailsDialogComponent } from '../marker-details-dialog/marker-details-dialog.component';
import { UpdateMarkerDialogComponent } from '../update-marker-dialog/update-marker-dialog.component';

import { AppComponent } from '../../app.component'; // Asegúrate de tener esto

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    CreateMarkerDialogComponent,
    MarkerDetailsDialogComponent,
    UpdateMarkerDialogComponent,
    //  ...  otros componentes
  ],
  imports: [
    BrowserModule,
    FormsModule,  //  Añade FormsModule
    ReactiveFormsModule,  //  Añade ReactiveFormsModule
    HttpClientModule,  //  Asegúrate de tener esto si usas HttpClient
    BrowserAnimationsModule,  //  Añade BrowserAnimationsModule
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,  //  Añade MatCardModule
    MatToolbarModule // Añade MatToolbarModule
    //  ...  otros módulos
  ],
  providers: [
    //  ...  servicios
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }