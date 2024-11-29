import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
    private apiUrl = 'http://localhost:3001/api';

    constructor(private http: HttpClient) {}

    getClasses(endpoint: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${endpoint}`);
    }

    generateQRCode(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/classes/qr`, data);
    }

    attendClass(data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/attendance/qr`, data);
    }
}
