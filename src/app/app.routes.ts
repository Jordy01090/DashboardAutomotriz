import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';
import { PublicLayoutComponentComponent } from './public-dashboard-component/public-dashboard-component.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponentComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'principal',
        component: PrincipalComponent,
        children: [
          {
            path: 'conductores',
            loadComponent: () =>
              import(
                './modules/drivers-component/drivers-component.component'
              ).then((m) => m.DriversComponentComponent),
            children: [
              {
                path: 'asignaciones',
                loadComponent: () =>
                  import(
                    './modules/drivers-component/assignment-table/assignment-table.component'
                  ).then((m) => m.AssignmentTableComponent),
                outlet: 'asignaciones',
              },
              {
                path: 'evaluacion',
                loadComponent: () =>
                  import(
                    './modules/drivers-component/rating-table/rating-table.component'
                  ).then((m) => m.RatingTableComponent),
                outlet: 'evaluacion',
              },
            ],
          },
          {
            path: 'ubicacion',
            loadComponent: () =>
              import(
                './modules/location-component/location-component.component'
              ).then((m) => m.LocationComponent),
          },
          {
            path: 'vehiculos',
            loadComponent: () =>
              import(
                './modules/vehiculos-component/vehiculos-component.component'
              ).then((m) => m.VehiculosComponentComponent),
          },
          {
            path: 'mantenimiento',
            loadComponent: () =>
              import(
                './modules/mantenimiento/lista-mantenimientos/lista-mantenimientos.component'
              ).then((m) => m.ListaMantenimientosComponent),
          },
          {
            path: 'reportes',
            loadComponent: () =>
              import(
                './modules/reportes-component/reportes-component.component'
              ).then((m) => m.ReportesComponentComponent),
          },
        ],
      },
    ],
  },

  //     { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'principal',  component: PrincipalComponent },

  //   {
  //       path: 'login',
  //       component: LoginComponent
  //     },
];

