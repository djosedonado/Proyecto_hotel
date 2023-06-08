import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { HandleHttpErrorService } from "../@base/handle-http-error.service";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { Compra } from "../models/compra";



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
export class CompraServiceService {

  baseUrl: string;
    constructor(
      private http: HttpClient,
      @Inject('BASE_URL') baseUrl: string,
      private handleErrorService: HandleHttpErrorService)
      {
        this.baseUrl = baseUrl; 
      } 
      /*
      get(): Observable<Compra[]> {
        return this.http.get<Compra[]>(this.baseUrl + 'api/Compra')
        .pipe(
            catchError(this.handleErrorService.handleError<Compra[]>('Consulta Compra', null))
        );
      }
  
      * GET Compra by identificacion. Will 404 if id not found
      getId(id: number): Observable<Compra> {
        const url = `${this.baseUrl + 'api/Compra'}/${id}`;
          return this.http.get<Compra>(url, httpOptions)
          .pipe(
            catchError(this.handleErrorService.handleError<Compra>('Buscar Compra', null))
          );
      } */
  
      post(Compra: Compra): Observable<Compra> {
        return this.http.post<Compra>(this.baseUrl + 'api/Compra', Compra)
          .pipe(
            catchError(this.handleErrorService.handleError<Compra>('Registrar Compra', null))
          );
      }
  
       /** PUT: update the profesor on the server
      put(compra: Compra): Observable<any> {
        const url = `${this.baseUrl}api/Compra/${compra.idCompra}`;
        return this.http.put(url, compra, httpOptions)
        .pipe(
          catchError(this.handleErrorService.handleError<any>('Editar compra'))
        );
      } */
  
      
    /** DELETE: delete the hero from the server 
    delete (compra: Compra | number): Observable<number> {
      const id = typeof compra === 'number' ? compra : compra.idCompra;
      return this.http.delete<number>(this.baseUrl + 'api/compra/'+ id)
      .pipe(
        catchError(this.handleErrorService.handleError<number>('Elimiar compra', null))
      );
    }*/
}
