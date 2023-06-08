import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { Recepcionista } from '../models/recepcionista';
import { catchError, tap } from 'rxjs/operators';

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
export class RecepcionistaService {
  
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
    {
      this.baseUrl = baseUrl;
    }
    
    get(): Observable<Recepcionista[]> {
      return this.http.get<Recepcionista[]>(this.baseUrl + 'api/Recepcionista')
      .pipe(
          catchError(this.handleErrorService.handleError<Recepcionista[]>('Consulta Recepcionista', null))
      );
    }

    /** GET profesor by identificacion. Will 404 if id not found */
    getId(id: string): Observable<Recepcionista> {
      const url = `${this.baseUrl + 'api/Recepcionista'}/${id}`;
        return this.http.get<Recepcionista>(url, httpOptions)
        .pipe(
  
          catchError(this.handleErrorService.handleError<Recepcionista>('Buscar Recepcionista', null))
        );
    }

    post(Recepcionista: Recepcionista): Observable<Recepcionista> {
      return this.http.post<Recepcionista>(this.baseUrl + 'api/Recepcionista', Recepcionista)
        .pipe(
  
          catchError(this.handleErrorService.handleError<Recepcionista>('Registrar Recepcionista', null))
        );
    }

     /** PUT: update the profesor on the server */
    put(recepcionista: Recepcionista): Observable<any> {
      const url = `${this.baseUrl}api/Recepcionista/${recepcionista.identificacion}`;
      return this.http.put(url, recepcionista, httpOptions)
      .pipe(

        catchError(this.handleErrorService.handleError<any>('Editar Recepcionista'))
      );
    }

    
  /** DELETE: delete the hero from the server */
  delete (recepcionista: Recepcionista | string): Observable<string> {
    const id = typeof recepcionista === 'string' ? recepcionista : recepcionista.identificacion;
    return this.http.delete<string>(this.baseUrl + 'api/recepcionista/'+ id)
    .pipe(
      catchError(this.handleErrorService.handleError<string>('Elimiar Recepcionista', null))
    );
  }
}
