import { Injectable } from '@angular/core';
import { Observable, EMPTY, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map, retry } from 'rxjs/operators';
/**
 * Serviço que realiz a comunicação com o back-end do sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  /**@type {string} Versão da API que está sendo usada.*/
  private version: string =  'v1/';

  /**@type {string} Url da API do backend */
  private apiUrl: string = environment.apiUrl + this.version;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as const,
  }

  /**@type {object} Objeto mapeando os recursos da API com suas respectivas URIs.*/
  resources = {
    "brands": this.apiUrl + 'brands',
    "categories": this.apiUrl +'categories',
    "computers": this.apiUrl + 'computers',
    "equipaments": this.apiUrl + 'equipaments',
    "floors": this.apiUrl + 'floors',
    "groups": this.apiUrl + 'groups',
    "models": this.apiUrl + 'models',
    "uas": this.apiUrl + 'uas',
    "users": this.apiUrl + 'users',
    "uploads": this.apiUrl + 'uploads'
  };

  constructor(private http: HttpClient) { }

  /**
   * Lista todas recursos armazenados no backend.
  */
  listAll<T>(endpoint: string): Observable<HttpResponse<T[]>>{
    return this.http.get<T[]>(this.resources[endpoint], this.httpOptions);
  }

  /**
   * Cria uma novo recurso no backend.
   */
  create<T>(endpoint, data: T): Observable<HttpResponse<T>>{
    return this.http.post<T>(this.resources[endpoint], data, this.httpOptions);
  }

  /**
   * Recupera o recurso representado pelo o id.
   */
  retrieveById<T>(data_url: string): Observable<HttpResponse<T>>{
    return this.http.get<T>(data_url, this.httpOptions);
  }

  /**
   * Atualiza todas informações do recurso representado pelo o id.
   */
  updateById<T>(data_url: string, data: T): Observable<HttpResponse<T>>{
    return this.http.put<T>(data_url, data, this.httpOptions);
  }

  /**
   * Atualiza parcialmente as informações do recurso representado pelo id.
   */
  partialUpdateById<T>(data_url: string, data: any): Observable<HttpResponse<T>>{
    return this.http.patch<T>(data_url, data, this.httpOptions);
  }

  /**
   * Deleta o recurso representado pelo o id.
   */
  destroyById<T>(data_url): Observable<HttpResponse<T>>{
    return this.http.delete<T>(data_url, this.httpOptions);
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  /**Retorna as uris dos recursos da API usadas pelo o BackendService*/
  getResources(){
    return this.resources;
  }
}
