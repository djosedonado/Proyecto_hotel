import { Injectable, Inject } from '@angular/core';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Inventario } from '../models/inventario';

const httpOptionsPut = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InventarioServiceService {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) 
  {
    this.baseUrl = baseUrl; 
  } 
  

  get(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.baseUrl + 'api/Inventario')
    .pipe(
        catchError(this.handleErrorService.handleError<Inventario[]>('Consulta Inventario', null))
    );
  }

  /** GET profesor by identificacion. Will 404 if id not found */
  getId(id: string): Observable<Inventario> {
    const url = `${this.baseUrl + 'api/Inventario'}/${id}`;
      return this.http.get<Inventario>(url, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<Inventario>('Buscar Inventario', null))
      );
  }

}
