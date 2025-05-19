import { Injectable } from "@angular/core";
import { Driver } from "../modules/drivers-component/interfaces/driver";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class DriversService {
  private conductoresFiltradosSubject = new BehaviorSubject<Driver[]>([]);
  conductoresFiltrados$ = this.conductoresFiltradosSubject.asObservable();
  getConductoresFiltrados() {
    return this.conductoresFiltradosSubject.getValue();
  }
  setConductoresFiltrados(conductores: Driver[]) {
    this.conductoresFiltradosSubject.next(conductores);
  }  private conductoresMock: Driver[] = [
    { id: 101, name: 'Juan Pérez', license: { type: 'B', expDate: new Date('2025-12-31') }, email: 'juan.perez@example.com', status: 'activo', rating: 4 },
    { id: 102, name: 'Ana Gómez', license: { type: 'C', expDate: new Date('2026-06-15') }, email: 'ana.gomez@example.com', status: 'activo', rating: 5 },
    { id: 103, name: 'Luis Quito', license: { type: 'B', expDate: new Date('2024-10-20') }, email: 'luis.quito@example.com', status: 'inactivo', rating: 3 },
    { id: 104, name: 'Maria Delgado', license: { type: 'A', expDate: new Date('2025-03-01') }, email: 'maria.delgado@example.com', status: 'activo', rating: 4 },
    { id: 1, name: 'Pedro Gonzales', license: { type: 'B', expDate: new Date('2024-05-20') }, email: 'pedro.gonzales@example.com', status: 'activo', rating: 4 },
    { id: 2, name: 'Maria López', license: { type: 'A', expDate: new Date('2025-01-15') }, email: 'maria.lopez@example.com', status: 'activo', rating: 5 },
    { id: 3, name: 'Carlos Rodríguez', license: { type: 'C', expDate: new Date('2023-08-10') }, email: 'carlos.rodriguez@example.com', status: 'inactivo', rating: 3 },
    { id: 5, name: 'Juan Suarez', license: { type: 'B', expDate: new Date('2023-08-10') }, email: 'juanrex@example.com', status: 'activo', rating: 5 },
  ];

  constructor() {
     const storedDrivers = localStorage.getItem('driversServiceConductoresMock');
     if (storedDrivers) {
         try {
             this.conductoresMock = JSON.parse(storedDrivers).map((driver: any) => ({
                 ...driver,
                 license: { ...driver.license, expDate: new Date(driver.license.expDate) }
             }));
         } catch (e) {
             this.saveConductoresToLocalStorage();
         }
     } else {
         this.saveConductoresToLocalStorage();
     }
  }

  private saveConductoresToLocalStorage(): void {
     localStorage.setItem('driversServiceConductoresMock', JSON.stringify(this.conductoresMock));
  }

  public getConductoresList(): Driver[] {
    return [...this.conductoresMock];
  }

  public bucarConductoresPorNombre(conductores:Driver[],nombre:string):Driver[]{
    return conductores.filter((c)=>{
      return c.name.toLowerCase().includes(nombre.toLowerCase())
    })
  }

  public  filtrarConductoresPorEstado(conductores:Driver[],estado:string):Driver[]{
    return conductores.filter((c)=>{
      return c.status.toLowerCase() === estado.toLowerCase()
    })
  }
  public añadirConductor(conductores:Driver[],conductor:Driver):Driver[]{
    return [...conductores,conductor]
  }

  public eliminarConductor(conductores:Driver[],id:number):Driver[]{
    return conductores.filter((c)=>{
      return c.id !== id
    })
  }
  public editarConductor(conductores:Driver[],conductor:Driver):Driver[]{
    return conductores.map((c)=>{
      if(c.id === conductor.id){
        return conductor
      }
      return c
    })
  }
  public buscarConductorPorId(conductores:Driver[],id:number):Driver|undefined{
    return conductores.find((c)=>{
      return c.id === id
    })
  }
  public filtrarPorLicencia(conductores:Driver[],licencia:string):Driver[]{
    return conductores.filter((c)=>{
      return c.license.type.toLowerCase() === licencia.toLowerCase()
    })
  }
}
