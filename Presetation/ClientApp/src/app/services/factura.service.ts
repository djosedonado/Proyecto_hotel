import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { HandleHttpErrorService } from "../@base/handle-http-error.service";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Factura } from "../models/factura";


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
  export class FacturaService {
    
    baseUrl: string;
    constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
      {
        this.baseUrl = baseUrl;
      }
      
      get(): Observable<Factura[]> {
        return this.http.get<Factura[]>(this.baseUrl + 'api/Factura')
        .pipe(
            catchError(this.handleErrorService.handleError<Factura[]>('Consulta Factura', null))
        );
      }
  
      /** GET Factura by identificacion. Will 404 if id not found */
      getId(id: number): Observable<Factura> {
        const url = `${this.baseUrl + 'api/Factura'}/${id}`;
          return this.http.get<Factura>(url, httpOptions)
          .pipe(
            catchError(this.handleErrorService.handleError<Factura>('Buscar Factura', null))
          );
      }
  
      post(Factura: Factura): Observable<Factura> {
        return this.http.post<Factura>(this.baseUrl + 'api/Factura', Factura)
          .pipe(
            catchError(this.handleErrorService.handleError<Factura>('Registrar Factura', null))
          );
      }
  
       /** PUT: update the profesor on the server */
      put(factura: Factura): Observable<any> {
        const url = `${this.baseUrl}api/Factura/${factura.idFactura}`;
        return this.http.put(url, factura, httpOptions)
        .pipe(
          catchError(this.handleErrorService.handleError<any>('Editar factura'))
        );
      }
  
      
    /** DELETE: delete the hero from the server */
    delete (factura: Factura | number): Observable<number> {
      const id = typeof factura === 'number' ? factura : factura.idFactura;
      return this.http.delete<number>(this.baseUrl + 'api/factura/'+ id)
      .pipe(
        catchError(this.handleErrorService.handleError<number>('Elimiar factura', null))
      );
    }
  }
  