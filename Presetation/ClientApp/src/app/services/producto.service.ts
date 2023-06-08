import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
export class ProductoService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
    {
      this.baseUrl = baseUrl;
    } 
    
    get(): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.baseUrl + 'api/Producto')
      .pipe(
          catchError(this.handleErrorService.handleError<Producto[]>('Consulta Producto', null)) 
      );
    }

    /** GET profesor by identificacion. Will 404 if id not found */
    getId(id: string): Observable<Producto> {
      const url = `${this.baseUrl + 'api/producto'}/${id}`;
        return this.http.get<Producto>(url, httpOptions)
        .pipe(
          catchError(this.handleErrorService.handleError<Producto>('Buscar Producto', null))
        );
    }

    post(Producto: Producto): Observable<Producto> {
      return this.http.post<Producto>(this.baseUrl + 'api/Producto', Producto)
        .pipe(
          catchError(this.handleErrorService.handleError<Producto>('Registrar Producto', null))
        );
    }

     /** PUT: update the profesor on the server */
    put(producto: Producto): Observable<any> {
      const url = `${this.baseUrl}api/Producto/${producto.idProducto}`;
      return this.http.put(url, producto, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<any>('Editar Persona'))
      );
    }

    
  /** DELETE: delete the hero from the server */
  delete (producto: Producto | string): Observable<string> {
    const id = typeof producto === 'string' ? producto : producto.idProducto;
    return this.http.delete<string>(this.baseUrl + 'api/producto/'+ id)
    .pipe(
      catchError(this.handleErrorService.handleError<string>('Elimiar Persona', null))
    );
  }
}

