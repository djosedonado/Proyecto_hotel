import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { catchError } from 'rxjs/operators';

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
export class UsersService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService)
    {
      this.baseUrl = baseUrl;
    }
    
    get(): Observable<Users[]> {
      return this.http.get<Users[]>(this.baseUrl + 'api/Users')
      .pipe(
          catchError(this.handleErrorService.handleError<Users[]>('Consulta usuarios', null))
      ); 
    }

    /** GET profesor by identificacion. Will 404 if id not found */
    getId(id: string): Observable<Users> {
      const url = `${this.baseUrl + 'api/users'}/${id}`;
        return this.http.get<Users>(url, httpOptions)
        .pipe(
          catchError(this.handleErrorService.handleError<Users>('Buscar usuarios', null))
        );
    }

    post(Users: Users): Observable<Users> {
      return this.http.post<Users>(this.baseUrl + 'api/UserCliente', Users)
        .pipe(
          catchError(this.handleErrorService.handleError<Users>('Registrar Usuario', null))
        );
    }

     /** PUT: update the profesor on the server */
    put(users: Users): Observable<any> {
      const url = `${this.baseUrl}api/Users/${users.userName}`;
      return this.http.put(url, users, httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<any>('Editar Usuario'))
      );
    }

    
  /** DELETE: delete the hero from the server */
  delete (users: Users | string): Observable<string> {
    const id = typeof users === 'string' ? users : users.userName;
    return this.http.delete<string>(this.baseUrl + 'api/users/'+ id)
    .pipe(
      catchError(this.handleErrorService.handleError<string>('Elimiar Usuario', null))
    );
  }
}
