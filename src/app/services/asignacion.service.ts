import { Injectable } from "@angular/core";
import { Assigment } from "@app/modules/drivers-component/interfaces/assigment";
import { Driver } from "@app/modules/drivers-component/interfaces/driver";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class AsignacionService{
    private asignacionesMock = new BehaviorSubject<Assigment[]>([]);
    asignaciones$ = this.asignacionesMock.asObservable();

    editarAsignacion(asignaciones:Assigment[],asignacion:Assigment):Assigment[]{
        return asignaciones.map((a)=>{
            if(a.id === asignacion.id){
                return asignacion
            }
            return a
        })

    }



}