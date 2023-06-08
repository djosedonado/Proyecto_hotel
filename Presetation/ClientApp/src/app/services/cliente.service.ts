import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { tap, catchError }from 'rxjs/operators';

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
export class ClienteService {

  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
    this.baseUrl = baseUrl;
  }

  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl + 'api/Cliente')
      .pipe(
        catchError(this.handleErrorService.handleError<Cliente[]>('Consulta Cliente', null))
      );
  }

  /** GET profesor by identificacion. Will 404 if id not found */
  getId(id: string): Observable<Cliente> {
    const url = `${this.baseUrl + 'api/cliente'}/${id}`;
    return this.http.get<Cliente>(url, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<Cliente>('Buscar Cliente', null))
      );
  }

  post(Cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl + 'api/Cliente', Cliente)
      .pipe(
        catchError(this.handleErrorService.handleError<Cliente>('Registrar Cliente', null))
      );
  }

  /** PUT: update the profesor on the server */
  put(cliente: Cliente): Observable<any> {
    const url = `${this.baseUrl}api/Cliente/${cliente.identificacion}`;
    return this.http.put(url, cliente, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<any>('Editar Persona'))
      );
  }


  /** DELETE: delete the hero from the server */
  delete(cliente: Cliente | string): Observable<string> {
    const id = typeof cliente === 'string' ? cliente : cliente.identificacion;
    return this.http.delete<string>(this.baseUrl + 'api/cliente/' + id)
      .pipe(
        catchError(this.handleErrorService.handleError<string>('Elimiar Persona', null))
      );
  }
}
