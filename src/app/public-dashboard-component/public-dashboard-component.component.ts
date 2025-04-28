import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { PieDePaginaComponent } from '../pie-de-pagina/pie-de-pagina.component';

@Component({
  selector: 'app-public-layout-component',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, PieDePaginaComponent],
  template: `
    <app-cabecera></app-cabecera>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
    <app-pie-de-pagina></app-pie-de-pagina>
  `,
  styles: [
    `
      .layout-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .content {
        flex: 1;
      }
    `,
  ],
})
export class PublicLayoutComponentComponent {}
