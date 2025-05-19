import { Component, OnInit } from '@angular/core';
import { DriversService } from '@app/services/drivers.service';
import { Driver } from '../interfaces/driver';
import { Evaluation } from '../interfaces/evaluation';
import { CommonModule } from '@angular/common';
import { RatingDriverComponent } from "../../../shared/rating-driver/rating-driver.component";

@Component({
  selector: 'app-rating-table',
  imports: [CommonModule, RatingDriverComponent],
  templateUrl: './rating-table.component.html',
  styleUrl: './rating-table.component.css',
})
export class RatingTableComponent implements OnInit {
  constructor(private conductoresService: DriversService) {}

  conductores: Driver[] = [];
  evaluaciones:Evaluation[] = [];

  ngOnInit(): void {
    this.conductoresService.conductoresFiltrados$.subscribe((conductores) => {
      this.conductores = conductores;
      this.generateRandomEvaluations();
    });
  }

  generateRandomEvaluations(){
    this.evaluaciones = this.conductores.map((conductor,id)=>{
      return {
        id:id,
        conductor:conductor.name,
        tipoLicencia:conductor.license.type,
        fechaExpiracion: conductor.license.expDate.toDateString(),
        puntualidad: Math.floor(Math.random() * 10) + 1,
        seguridad: Math.floor(Math.random() * 10) + 1,
        cuidadoVehiculo: Math.floor(Math.random() * 10) + 1,
        comentarios: 'Comentarios de ejemplo',
      }
    })
  }

}
