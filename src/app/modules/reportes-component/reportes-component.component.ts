import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule }   from '@angular/material/select';
import { MatButtonModule }   from '@angular/material/button';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { ReportesService,ReportesDto } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reportes-component',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgxChartsModule
  ],
  providers: [ ReportesService ],
  templateUrl: './reportes-component.component.html',
  styleUrl: './reportes-component.component.css'
})
export class ReportesComponentComponent implements OnInit {

  // colores para cada chart
  colorScheme = {
    name: 'vehículos',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#42A5F5', '#EF5350', '#FFCA28', '#66BB6A']
  };

  colorMantenimientos = {
    name: 'mantenimientos',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#66BB6A', '#FF7043']
  };

  colorConductores = {
    name: 'conductores',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#42A5F5', '#EF5350', '#FFD54F']
  };


  // datos
  vehiculosPorEstado: { name: string; value: number }[] = [];
  mantenimientosPorTipo: { name: string; value: number }[] = [];
  topConductores: { name: string; value: number }[] = [];
  conductoresPorEstado: { name: string; value: number }[] = [];

  // tamaño común
  view: [number, number] = [500, 300];
  showLegend = true;

  constructor(private svc: ReportesService) {}

  ngOnInit(): void {
    this.svc.getReportes().subscribe({
      next: (r: ReportesDto) => {
        // Vehículos
        this.vehiculosPorEstado = r.vehiculosEstados.map(v => ({
          name: v.estadoVehiculo,
          value: v.cantidad
        }));

        // Mantenimientos
        this.mantenimientosPorTipo = r.tipoMantenimiento.map(m => ({
          name: m.tipoMantenimiento,
          value: m.cantidad
        }));

        // Top 3 conductores
        this.topConductores = r.topConductores.map(c => ({
          name: c.nombreConductor,
          value: c.puntaje
        }));

        // Estado de conductores 
        this.conductoresPorEstado = r.estadoConductores.map(c => ({
          name: this.capitalize(c.estadoConductor),
          value: c.cantidad
        }));
      },
      error: err => console.error('Error cargando reportes', err)
    });
  }

  private capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

  formatearNumero(v: number) {
    return Math.floor(v).toString();
  }
}
