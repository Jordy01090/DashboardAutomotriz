import { Injectable } from '@angular/core';
import { Observable, of, throwError, tap } from 'rxjs';
import { IVehiculo } from '@app/interface/IVehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private mockVehiculos: IVehiculo[] = [
    { id: 1, placa: 'ABC-1234', modelo: 'Toyota Hilux', anio: 2020, tipoCarga: 'Pesada', estado: 'Activo', conductorId: 101, nombreConductor: 'Juan Pérez' },
    { id: 2, placa: 'DEF-5678', modelo: 'Ford Ranger', anio: 2019, tipoCarga: 'Ligera', estado: 'Mantenimiento', conductorId: null, nombreConductor: null },
    { id: 3, placa: 'GHI-9012', modelo: 'Nissan Frontier', anio: 2021, tipoCarga: 'Mediana', estado: 'Activo', conductorId: 102, nombreConductor: 'Ana Gómez' },
    { id: 4, placa: 'JKL-3456', modelo: 'Chevrolet D-Max', anio: 2018, tipoCarga: 'Pesada', estado: 'Inactivo', conductorId: null, nombreConductor: null },
    { id: 5, placa: 'MNO-7890', modelo: 'Mitsubishi L200', anio: 2022, tipoCarga: 'Ligera', estado: 'Activo', conductorId: 103, nombreConductor: 'Luis Quito' }
  ];
  private nextId: number = 6;

  constructor() {
    const storedVehiculos = localStorage.getItem('mockVehiculos');
    if (storedVehiculos) {
      this.mockVehiculos = JSON.parse(storedVehiculos);
      const maxId = this.mockVehiculos.reduce((max, v) => v.id && v.id > max ? v.id : max, 0);
      this.nextId = maxId + 1;
    } else {
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('mockVehiculos', JSON.stringify(this.mockVehiculos));
  }

  // GET /api/vehiculos
  getVehiculos(): Observable<IVehiculo[]> {
    console.log('[VehiculoService Mock] GET /api/vehiculos');
    return of([...this.mockVehiculos]).pipe(
      tap(() => console.log('[VehiculoService Mock] GET /api/vehiculos - Succeeded'))
    );
  }

  // GET /api/vehiculos/{id}
  getVehiculoById(id: number): Observable<IVehiculo | undefined> {
    console.log(`[VehiculoService Mock] GET /api/vehiculos/${id}`);
    const vehiculo = this.mockVehiculos.find(v => v.id === id);
    if (vehiculo) {
      return of({ ...vehiculo }).pipe(
        tap(() => console.log(`[VehiculoService Mock] GET /api/vehiculos/${id} - Succeeded`))
      );
    } else {
      return throwError(() => new Error(`Vehiculo with id=${id} not found`)).pipe(
        tap({ error: (err) => console.error(`[VehiculoService Mock] GET /api/vehiculos/${id} - Failed: ${err.message}`) })
      );
    }
  }

  // POST /api/vehiculos
  addVehiculo(vehiculoData: Omit<IVehiculo, 'id' | 'nombreConductor'>, conductorNombre?: string | null): Observable<IVehiculo> {
    console.log('[VehiculoService Mock] POST /api/vehiculos', vehiculoData);
    const nuevoVehiculo: IVehiculo = {
      ...vehiculoData,
      id: this.nextId++,
      nombreConductor: conductorNombre || null
    };
    this.mockVehiculos.push(nuevoVehiculo);
    this.saveToLocalStorage();
    return of({ ...nuevoVehiculo }).pipe(
      tap(created => console.log('[VehiculoService Mock] POST /api/vehiculos - Succeeded:', created))
    );
  }

  // PUT /api/vehiculos/{id}
  updateVehiculo(id: number, vehiculoData: Partial<IVehiculo>): Observable<IVehiculo | undefined> {
    console.log(`[VehiculoService Mock] PUT /api/vehiculos/${id}`, vehiculoData);
    const index = this.mockVehiculos.findIndex(v => v.id === id);
    if (index !== -1) {
      const updatedVehiculo = { ...this.mockVehiculos[index], ...vehiculoData, id: this.mockVehiculos[index].id };
      this.mockVehiculos[index] = updatedVehiculo;
      this.saveToLocalStorage();
      return of({ ...updatedVehiculo }).pipe(
        tap(updated => console.log(`[VehiculoService Mock] PUT /api/vehiculos/${id} - Succeeded:`, updated))
      );
    } else {
      return throwError(() => new Error(`Vehiculo with id=${id} not found for update`)).pipe(
        tap({ error: (err) => console.error(`[VehiculoService Mock] PUT /api/vehiculos/${id} - Failed: ${err.message}`) })
      );
    }
  }

  // DELETE /api/vehiculos/{id}
  deleteVehiculo(id: number): Observable<void> {
    console.log(`[VehiculoService Mock] DELETE /api/vehiculos/${id}`);
    const index = this.mockVehiculos.findIndex(v => v.id === id);
    if (index !== -1) {
      this.mockVehiculos.splice(index, 1);
      this.saveToLocalStorage();
      return of(undefined).pipe(
        tap(() => console.log(`[VehiculoService Mock] DELETE /api/vehiculos/${id} - Succeeded`))
      );
    } else {
      return throwError(() => new Error(`Vehiculo with id=${id} not found for deletion`)).pipe(
        tap({ error: (err) => console.error(`[VehiculoService Mock] DELETE /api/vehiculos/${id} - Failed: ${err.message}`) })
      );
    }
  }
}