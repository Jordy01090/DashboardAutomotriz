import { Injectable } from "@angular/core";
import { Driver } from "../modules/drivers-component/interfaces/driver";

@Injectable({
  providedIn:'root'
})
export class DriversService {


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
