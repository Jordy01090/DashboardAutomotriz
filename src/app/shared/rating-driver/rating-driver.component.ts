import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Evaluation } from '@app/modules/drivers-component/interfaces/evaluation';

@Component({
  selector: 'app-rating-driver',
  templateUrl: './rating-driver.component.html',
  styleUrls: ['./rating-driver.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule
  ]
})
export class RatingDriverComponent implements OnInit {
  @Input() evaluation!: Evaluation;
  totalScore: number = 0;

  ngOnInit(): void {
    if (this.evaluation) {
      this.calculateTotalScore();
    }
  }

  calculateTotalScore(): void {
    this.totalScore = (this.evaluation.puntualidad + this.evaluation.seguridad+ this.evaluation.cuidadoVehiculo) / 3;
  }

  getProgressColor(score: number): string {
    if (score < 3) return 'warn';
    if (score < 4) return 'accent';
    return 'primary';
  }
}
