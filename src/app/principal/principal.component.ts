import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { APP_NAME } from '../constants/constants';
import { CabeceraComponent } from '../cabecera/cabecera.component';

@Component({
  selector: 'app-principal',
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    MatDividerModule,
    MatToolbarModule,
  ],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
})
export class PrincipalComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  sidebarOpened = true;
  username: any = '';
  appName = APP_NAME;

  constructor(private authService: AutorizacionService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.username = user|| 'Usuario';
    });
  }

  toggleSidebar(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
