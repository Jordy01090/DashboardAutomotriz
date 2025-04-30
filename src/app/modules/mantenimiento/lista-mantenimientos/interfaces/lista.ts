export interface Mantenimiento {
    id: number;
    tipo: 'preventivo' | 'correctivo';
    descripcion: string;
    fecha: Date;
    costo: number;
    kilometraje: number;
    vehiculoId: number;
  }