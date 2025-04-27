// cabecera.component.ts
import { Component, OnInit }     from '@angular/core';
import { CommonModule }          from '@angular/common';
import { MatToolbarModule }      from '@angular/material/toolbar';
import { MatButtonModule }       from '@angular/material/button';
import { MatIconModule }         from '@angular/material/icon';
import { AutorizacionService }   from '../services/autorizacion.service';
import { Router }                from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  isLoggedIn = false;
  usuario: string|null = null;

  constructor(private auth: AutorizacionService,
              private router: Router) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(val => this.isLoggedIn = val);
    this.auth.currentUser$.subscribe(u => this.usuario = u);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  cerrarSesion() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
