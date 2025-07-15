// src/app/services/reportes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz que refleja tu JSON completo
export interface ReportesDto {
  vehiculosEstados: Array<{ estadoVehiculo: string; cantidad: number }>;
  tipoMantenimiento: Array<{ tipoMantenimiento: string; cantidad: number }>;
  topConductores: Array<{ conductorId: number; nombreConductor: string; puntaje: number }>;
  estadoConductores: Array<{ estadoConductor: string; cantidad: number }>;
  resultado: { respuesta: string; leyenda: string };
}

@Injectable({ providedIn: 'root' })
export class ReportesService {
  // Ajusta aquí si cambias de puerto/ruta
  private readonly url = 'https://localhost:7037/api/reportes';

  constructor(private http: HttpClient) {}

  getReportes(): Observable<ReportesDto> {
    return this.http.get<ReportesDto>(this.url);
  }
}
