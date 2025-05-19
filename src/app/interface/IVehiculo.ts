export interface IVehiculo {
    id?: number;
    placa: string;
    modelo: string;
    anio: number;
    tipoCarga: string;
    estado: string;
    conductorId?: number | null;
    nombreConductor?: string | null;
  }