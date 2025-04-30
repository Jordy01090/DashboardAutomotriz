import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './location-component.component.html',
  styleUrls: ['./location-component.component.css']
})
export class LocationComponent implements OnInit {
  ngOnInit(): void {
    this.configMap();
  }

  map:any;

  configMap() {
    this.map = L.map('mapa',{
      center:[-2.182804409365005, -79.89604769003998], // Coordenadas iniciales (Londres)
      zoom: 15
    }); 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([-2.182804409365005, -79.89604769003998]).addTo(this.map)
      .bindPopup('¡Hola, Esta puede ser tu ubicacion!')
      .openPopup();

      L.control.scale().addTo(this.map);
      L.circleMarker([-2.182804409365005, -79.89604769003998], {
        color: 'red',
        radius: 10,
        fillColor: '#f03',
        fillOpacity: 0.5
      }).addTo(this.map).bindPopup('Ubicacion de la empresa');
      L.control.zoom({
        position: 'topright'
      }).addTo(this.map);
      L.control.scale({ position: 'bottomright' }).addTo(this.map);

  }
}
