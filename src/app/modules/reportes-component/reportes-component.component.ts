import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes-component',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './reportes-component.component.html',
  styleUrl: './reportes-component.component.css'
})
export class ReportesComponentComponent {}
