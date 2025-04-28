// autorizacion.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutorizacionService {
  constructor(){
    this.chequearLocalStorage();
  }
  public usuarioValido = { correo: 'pepito@correo.com', contrasena: '12345',nombre:'Pedrito' };

  private _isLoggedIn$  = new BehaviorSubject<boolean>(false);
  public  isLoggedIn$   = this._isLoggedIn$.asObservable();

  private _currentUser$ = new BehaviorSubject<string|null>(null);
  public  currentUser$ = this._currentUser$.asObservable();

  // Intentar iniciar sesión
  public login(correo: string, contrasena: string): boolean {
    const ok = correo === this.usuarioValido.correo && contrasena === this.usuarioValido.contrasena;
    if (ok) {
      localStorage.setItem('logeado', 'true');
      localStorage.setItem('usuario', this.usuarioValido.nombre);
      this._isLoggedIn$.next(true);
      this._currentUser$.next(this.usuarioValido.nombre);
    }
    return ok;
  }

  // Cerrar sesión
  public logout(): void {
    this._isLoggedIn$.next(false);
    this._currentUser$.next(null);
  }
  private chequearLocalStorage():void{
    const esLogeado = localStorage.getItem('logeado') === 'true';
    if(esLogeado){
      const userData = localStorage.getItem('usuario');
      if(userData){
        this._currentUser$.next(userData);
        this._isLoggedIn$.next(true);
      }
    }
  }
}
