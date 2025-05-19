import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Driver } from '../drivers-component/interfaces/driver';



@Component({
  selector: 'app-reportes-component',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule,NgxChartsModule],
  templateUrl: './reportes-component.component.html',
  styleUrl: './reportes-component.component.css'
})
export class ReportesComponentComponent {


  colorConductores: Color = {
  name: 'conductores',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#42A5F5', '#EF5350', '#FFD54F']
};


colorScheme: Color = {
name: 'custom',
selectable: true,
group: ScaleType.Ordinal,
domain: ['#42A5F5', '#EF5350', '#FFCA28']
};


  //VEHÍCULOS 


vehiculos = [
    { placa: 'ABC-1234', modelo: 'Toyota Hilux', anio: 2020, tipoCarga: 'Pesada', estado: 'Activo' },
    { placa: 'DEF-5678', modelo: 'Ford Ranger', anio: 2019, tipoCarga: 'Ligera', estado: 'Mantenimiento' },
    { placa: 'GHI-9012', modelo: 'Nissan Frontier', anio: 2021, tipoCarga: 'Mediana', estado: 'Activo' },
    { placa: 'JKL-3456', modelo: 'Chevrolet D-Max', anio: 2018, tipoCarga: 'Pesada', estado: 'Inactivo' },
    { placa: 'MNO-7890', modelo: 'Mitsubishi L200', anio: 2022, tipoCarga: 'Ligera', estado: 'Activo' }
  ];

vehiculosPorEstado: any[] = [];

  view: [number, number] = [500, 300]; // Tamaño del gráfico
  showLegend = true;
  

  ngOnInit(): void {
    this.generarGraficoVehiculos();
    this.generarGraficoVehiculos();
    this.cargarMantenimientos();
    this.generarGraficoVehiculos();
    this.cargarMantenimientos();
    this.cargarConductores();
  }

  generarGraficoVehiculos() {
    const estados = {
      'Activo': 0,
      'Inactivo': 0,
      'Mantenimiento': 0
    };

    this.vehiculos.forEach(v => {
      if (estados.hasOwnProperty(v.estado)) {
        //estados[v.estado]++;
        estados[v.estado as keyof typeof estados]++;
        
      }
    });
     this.vehiculosPorEstado = Object.keys(estados).map(estado => ({
      name: estado,
      value: estados[estado as keyof typeof estados]
    }));
  }






// MANTENIMIENTO

mantenimientos: any[] = []; // Esto se carga desde localStorage
mantenimientosPorTipo: any[] = [];

colorMantenimientos: Color = {
  name: 'mantenimiento',
  selectable: true,
  group: ScaleType.Ordinal,
  domain: ['#66BB6A', '#FF7043'] // verde para preventivo, naranja para correctivo
};

cargarMantenimientos() {
  const data = localStorage.getItem('mantenimientos');
  if (data) {
    const datos: any[] = JSON.parse(data);
    this.mantenimientos = datos.map(m => ({
      ...m,
      fecha: new Date(m.fecha)
    }));
  } else {
    this.mantenimientos = []; // por si no hay nada
  }

  const conteo: { [key: string]: number } = {
    preventivo: 0,
    correctivo: 0
  };

  this.mantenimientos.forEach(m => {
    conteo[m.tipo as keyof typeof conteo]++;
  });

  this.mantenimientosPorTipo = [
  { name: 'Preventivo', value: conteo['preventivo'] },
  { name: 'Correctivo', value: conteo['correctivo'] }
];

}



//CONDUCTORES

conductores: Driver[] = []; // Reutilizamos la interfaz Driver
topConductores: any[] = [];

cargarConductores() {
  this.conductores = [
    {
      id: 1,
      name: 'Juan Pérez',
      license: { type: 'B', expDate: new Date('2024-12-15') },
      email: 'juan.perez@example.com',
      status: 'activo',
      rating: 4,
    },
    {
      id: 2,
      name: 'María García',
      license: { type: 'A', expDate: new Date('2025-03-22') },
      email: 'maria.garcia@example.com',
      status: 'activo',
      rating: 5,
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      license: { type: 'C', expDate: new Date('2023-08-10') },
      email: 'carlos.rodriguez@example.com',
      status: 'inactivo',
      rating: 3,
    },
    {
      id: 4,
      name: 'Angel Zambrano',
      license: { type: 'C', expDate: new Date('2023-08-10') },
      email: 'angeldanielz@example.com',
      status: 'inactivo',
      rating: 3,
    },
    {
      id: 5,
      name: 'Juan Suarex',
      license: { type: 'B', expDate: new Date('2023-08-10') },
      email: 'juanrex@example.com',
      status: 'activo',
      rating: 5,
    }



  ];
  this.contarConductoresPorEstado()

  // Obtener Top 3
  this.topConductores = this.conductores
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map(c => ({ name: c.name, value: c.rating }));
}


// CONDUCTORES ACTIVOS VS INACTIVOS 

conductoresPorEstado: any[] = [];

contarConductoresPorEstado() {
  const conteo = {
    activo: 0,
    inactivo: 0
  };

  this.conductores.forEach(c => {
    conteo[c.status.toLowerCase() as keyof typeof conteo]++;
  });

  this.conductoresPorEstado = [
    { name: 'Activos', value: conteo['activo'] },
    { name: 'Inactivos', value: conteo['inactivo'] }
  ];
}



formatearNumero(valor: number): string {
  return Math.floor(valor).toString(); // elimina decimales, muestra enteros
}


}
