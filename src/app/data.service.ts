import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private nombreUsuario: string = '';

  obtenerNombre(nombre: string) {
    this.nombreUsuario = nombre;
  }

  asignarNombre(): string {
    return this.nombreUsuario;
  }
}