import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Reserva } from '../models/reserva';
import { Observable } from 'rxjs';
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
export class ReservaService {
  
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
    {
      this.baseUrl = baseUrl;
    }
    
    get(): Observable<Reserva[]> {
      return this.http.get<Reserva[]>(this.baseUrl + 'api/Reserva')
      .pipe(
          catchError(this.handleErrorService.handleError<Reserva[]>('Consulta Reserva', null))
      );
    }

    /** GET reserva by identificacion. Will 404 if id not found */
    getId(id: number): Observable<Reserva> {
      const url = `${this.baseUrl + 'api/Reserva'}/${id}`;
        return this.http.get<Reserva>(url, httpOptions)
        .pipe(
          catchError(this.handleErrorService.handleError<Reserva>('Buscar Reserva', null))
        );
    }

    post(Reserva: Reserva): Observable<Reserva> {
      return this.http.post<Reserva>(this.baseUrl + 'api/Reserva', Reserva)
        .pipe(
          catchError(this.handleErrorService.handleError<Reserva>('Registrar Reserva', null))
        );
    }

     /** PUT: update the profesor on the server */
    put(reserva: Reserva): Observable<any> {
      const url = `${this.baseUrl}api/Reserva/${reserva.idReserva}`;
      return this.http.put(url, reserva, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<any>('Editar reserva'))
      );
    }

    
  /** DELETE: delete the hero from the server */
  delete (reserva: Reserva | number): Observable<number> {
    const id = typeof reserva === 'number' ? reserva : reserva.idReserva;
    return this.http.delete<number>(this.baseUrl + 'api/reserva/'+ id)
    .pipe(
      catchError(this.handleErrorService.handleError<number>('Elimiar reserva', null))
    );
  }
}
