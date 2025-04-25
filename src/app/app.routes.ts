import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      //path: '', component: PrincipalComponent, 
    {
        path: 'login',
        component: LoginComponent
      },
  ];
