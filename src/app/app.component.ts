import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PieDePaginaComponent } from './pie-de-pagina/pie-de-pagina.component';
import { PrincipalComponent } from './principal/principal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CabeceraComponent, PieDePaginaComponent, PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutomotrizJ';
}
