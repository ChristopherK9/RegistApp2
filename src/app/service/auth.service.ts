import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:3001/api';

    constructor(private http: HttpClient) {}

    login(endpoint: string, data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/${endpoint}`, data, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      });
    }

    logout(): void {
      localStorage.removeItem('userData');
    }

    // Obtener datos (GET)
    getUser(endpoint: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${endpoint}`);
    }

    getUserData(): any {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    }
  
    // Enviar datos (POST)
    registerUser(endpoint: string, data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/${endpoint}`, data, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      });
    }
  
    // Actualizar datos (PUT)
    updateUser(endpoint: string, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${endpoint}`, data, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      });
    }

    // Eliminar datos (DELETE)
    deleteUser(endpoint: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${endpoint}`);
    }


}
