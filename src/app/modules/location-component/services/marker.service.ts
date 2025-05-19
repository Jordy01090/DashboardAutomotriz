
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs'; // Importa 'of'
import { Marker } from '../interfaces/marker.interface'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  private markersSubject = new BehaviorSubject<Marker[]>([]);
  public markers$ = this.markersSubject.asObservable();
  private nextId = 1; // Para generar IDs únicos (simple para ejemplo)

  constructor() {
    // Carga los marcadores iniciales desde localStorage
    const storedMarkers = this.getMarkersFromLocalStorage();
    if (storedMarkers.length > 0) {
      this.markersSubject.next(storedMarkers);
      this.nextId = Math.max(...storedMarkers.map(m => m.id), 0) + 1; // Actualiza nextId
    }
  }

  getMarkers(): Observable<Marker[]> {
    return of(this.getMarkersFromLocalStorage());
  }

  createMarker(marker: Omit<Marker, 'id'>): Observable<Marker> {
    const newMarker: Marker = { id: this.nextId++, ...marker };
    this.saveMarkerToLocalStorage(newMarker);
    this.markersSubject.next([...this.markersSubject.value, newMarker]);
    return of(newMarker);
  }

  updateMarker(id: number, marker: Marker): Observable<Marker> {
    this.updateMarkerInLocalStorage(id, marker);
    const updatedMarkers = this.getMarkersFromLocalStorage();
    this.markersSubject.next(updatedMarkers);
    return of(marker); //  O puedes devolver el marcador actualizado desde el storage
  }

  deleteMarker(id: number): Observable<number> {
    this.deleteMarkerFromLocalStorage(id);
    const updatedMarkers = this.getMarkersFromLocalStorage();
    this.markersSubject.next(updatedMarkers);
    return of(id);
  }

  setMarkers(markers: Marker[]) {
    this.markersSubject.next(markers);
  }

  //  Funciones auxiliares para localStorage
  private saveMarkerToLocalStorage(marker: Marker): void {
    let markers = JSON.parse(localStorage.getItem('markers') || '[]');
    markers.push(marker);
    localStorage.setItem('markers', JSON.stringify(markers));
  }

  private getMarkersFromLocalStorage(): Marker[] {
    return JSON.parse(localStorage.getItem('markers') || '[]');
  }

  private updateMarkerInLocalStorage(id: number, updatedMarker: Marker): void {
    let markers = JSON.parse(localStorage.getItem('markers') || '[]');
    const index: number = markers.findIndex((m: Marker) => m.id === id);
    if (index !== -1) {
      markers[index] = updatedMarker;
      localStorage.setItem('markers', JSON.stringify(markers));
    }
  }

  private deleteMarkerFromLocalStorage(id: number): void {
    let markers = JSON.parse(localStorage.getItem('markers') || '[]');
    const updatedMarkers: Marker[] = markers.filter((m: Marker) => m.id !== id);
    localStorage.setItem('markers', JSON.stringify(updatedMarkers));
  }
}
