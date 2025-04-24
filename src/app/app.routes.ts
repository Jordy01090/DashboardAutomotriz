import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { CabeceraComponent } from './cabecera/cabecera.component';

export const routes: Routes = [
    {
      path: '', component: PrincipalComponent
    },
    {
        path: 'contacto',
        component: CabeceraComponent
      },
  ];
