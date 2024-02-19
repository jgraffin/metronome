import { environment } from 'src/environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${url}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getOptions(url: string, options: any = {}): Observable<any> {
    const fullUrl = `${this.baseUrl}/${url}`;
    return this.http.get(fullUrl, options);
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, data).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${url}`, data).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}/${url}`).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  patch(url: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${url}`, data).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
