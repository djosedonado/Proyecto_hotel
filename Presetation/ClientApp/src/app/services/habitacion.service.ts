import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Habitacion } from '../models/habitacion';
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
export class HabitacionService {

  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
    {
      this.baseUrl = baseUrl; 
    }

    get(): Observable<Habitacion[]> {
      return this.http.get<Habitacion[]>(this.baseUrl + 'api/Habitacion')
      .pipe(
          catchError(this.handleErrorService.handleError<Habitacion[]>('Consulta Habitacion', null))
      );
    }

    /** GET profesor by identificacion. Will 404 if id not found */
    getId(id: string): Observable<Habitacion> {
      const url = `${this.baseUrl + 'api/Habitacion'}/${id}`;
        return this.http.get<Habitacion>(url, httpOptions)
        .pipe(
          catchError(this.handleErrorService.handleError<Habitacion>('Buscar Habitacion', null))
        );
    }

    post(Habitacion: Habitacion): Observable<Habitacion> {
      return this.http.post<Habitacion>(this.baseUrl + 'api/Habitacion', Habitacion)
        .pipe(
          catchError(this.handleErrorService.handleError<Habitacion>('Registrar Habitacion', null))
        );
    }

     /** PUT: update the profesor on the server */
    put(habitacion: Habitacion): Observable<any> {
      const url = `${this.baseUrl}api/Habitacion/${habitacion.idHabitacion}`;
      return this.http.put(url, habitacion, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<any>('Editar Habitacion'))
      );
    }

    
  /** DELETE: delete the hero from the server */
  delete (habitacion: Habitacion | string): Observable<string> {
    const id = typeof habitacion === 'string' ? habitacion : habitacion.idHabitacion;
    return this.http.delete<string>(this.baseUrl + 'api/habitacion/'+ id)
    .pipe(
      catchError(this.handleErrorService.handleError<string>('Elimiar Habitacion', null))
    );
  }
}
