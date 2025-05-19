import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './services/marker.service';
import { Marker } from './interfaces/marker.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { CreateMarkerDialogComponent } from './create-marker-dialog/create-marker-dialog.component';
import { MarkerDetailsDialogComponent } from './marker-details-dialog/marker-details-dialog.component';
import { UpdateMarkerDialogComponent } from './update-marker-dialog/update-marker-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './location-component.component.html',
  styleUrls: ['./location-component.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {
  map: any;
  markers: Marker[] = [];
  markerSubscription: Subscription | undefined;

  constructor(
    private markerService: MarkerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar  // Inyecta
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.loadMarkers();

    this.markerSubscription = this.markerService.markers$.subscribe(updatedMarkers => {
      this.markers = updatedMarkers;
      this.renderMarkers();
    });
  }

  ngOnDestroy(): void {
    if (this.markerSubscription) {
      this.markerSubscription.unsubscribe();
    }
  }

  initMap() {
    this.map = L.map('mapa', {
      center: [-2.182804409365005, -79.89604769003998],
      zoom: 15
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.openCreateMarkerForm(event.latlng);
    });

    L.control.scale().addTo(this.map);
    L.control.zoom({ position: 'topright' }).addTo(this.map);
    L.control.scale({ position: 'bottomright' }).addTo(this.map);
  }

  loadMarkers() {
    this.markerService.getMarkers().subscribe(
      (markers) => {
        this.markerService.setMarkers(markers);
      },
      (error) => {
        console.error('Error loading markers:', error);
      }
    );
  }

  renderMarkers() {
    interface Layer {
      remove(): void;
    }

    interface TypedMap extends L.Map {
      eachLayer(fn: (layer: L.Layer) => void): this;
      removeLayer(layer: L.Layer): this;
    }

    (this.map as TypedMap).eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
      (this.map as TypedMap).removeLayer(layer);
      }
    });

    this.markers.forEach(marker => {
      L.marker([marker.lat, marker.lng])
        .addTo(this.map)
        .bindPopup(`<b>${marker.title}</b><br>${marker.description}`)
        .on('click', () => this.openMarkerDetails(marker));
    });
  }

  openCreateMarkerForm(latlng: L.LatLng): void {
    const dialogRef = this.dialog.open(CreateMarkerDialogComponent, {
      width: '400px',
      data: { lat: latlng.lat, lng: latlng.lng }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createMarker(result);
      }
    });
  }

  createMarker(markerData: Omit<Marker, 'id'>): void {
    this.markerService.createMarker(markerData).subscribe(
      (newMarker) => {
        console.log('Marker created:', newMarker);
        this.markerService.getMarkers().subscribe(updatedMarkers => {
          this.markerService.setMarkers(updatedMarkers);
        });
      },
      (error) => {
        console.error('Error creating marker:', error);
      }
    );
  }

  openMarkerDetails(marker: Marker): void {
    const dialogRef = this.dialog.open(MarkerDetailsDialogComponent, {
      width: '400px',
      data: marker
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'update') {
        this.openUpdateMarkerForm(marker);
      } else if (result === 'delete') {
        this.deleteMarker(marker.id);
      }
    });
  }

  openUpdateMarkerForm(marker: Marker): void {
    const dialogRef = this.dialog.open(UpdateMarkerDialogComponent, {
      width: '400px',
      data: marker
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMarker(marker.id, result);
      }
    });
  }

  updateMarker(id: number, markerData: Marker): void {
    this.markerService.updateMarker(id, markerData).subscribe(
      (updatedMarker) => {
        console.log('Marker updated:', updatedMarker);
        this.markerService.getMarkers().subscribe(updatedMarkers => {
          this.markerService.setMarkers(updatedMarkers);
        });
      },
      (error) => {
        console.error('Error updating marker:', error);
      }
    );
  }

  deleteMarker(id: number): void {
    this.markerService.deleteMarker(id).subscribe(
      () => {
        console.log('Marker deleted:', id);
        this.markerService.getMarkers().subscribe(updatedMarkers => {
          this.markerService.setMarkers(updatedMarkers);
        });
        this.snackBar.open('Marker deleted', 'Close', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Error deleting marker:', error);
        this.snackBar.open('Error deleting marker', 'Close', {
          duration: 2000,
        });
      }
    );
  }
}