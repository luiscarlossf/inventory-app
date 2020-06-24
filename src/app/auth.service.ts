import { Injectable, OnInit } from '@angular/core';
import { User } from './user/user.model';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import * as fromUser from './user/user.reducer';

/**
 * Serviço responsável pela autenticação dos usuários do sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  /**@type {object} Stream do ramo da árvore de estado da aplicação. */
  private user$: Observable<fromUser.UserState>;
  /**@type  {User} Usuário logado no sistema.*/
  private user: User;
  /**@type {boolean} Indica o progresso do processo de login. */
  private loading: boolean;
  /**@type {string} Token de autorização do usuário corrente. */
  private token: string;
  /**@type {string} Url da Backend API */
  private apiUrl:  string = environment.apiUrl;
  /**@type {string} Url da página a ser redirecionada caso o login tenha sucesso.*/
  redirectUrl: string;

  constructor(private http: HttpClient, private readonly store: Store<{user: fromUser.UserState}>) { 
    this.user$ = store.pipe(select('user')) ;
  }

  ngOnInit(){
    this.user$.subscribe(
      user => {
        this.setUser(user.currentUser);
        this.setToken(user.currentUser.token);
    });
  }

  /**
   * Adiciona um novo usuário corrente.
   * @param {User} newUser Usuário que será adicionado. 
   */
  setUser(newUser: User): void{
    this.user = newUser;
  }

  /**
   * Adiciona um novo token 
   * @param {string} token Token de autorização.
   */
  setToken(token: string){
    this.token = token;
  }

  /**
   * Retorna o usuário logado atualmente.
   * @returns {User} Usuário corrente.
   */
  getUser(): User{
    return this.user;
  }

  /**
   * Retorna o token de autorização.
   * @returns {string} Token de autorização;
   */
  getAuthorizationToken(): string{
    return this.token;
  }

  /**
   * Verifica se o existe algum usuário logado.
   */
  isLoggedIn(): boolean{
    if(this.user){
      return true;
    }else{
      return false;
    }
  }

  /**
   * Realiza o login do usuário representado por `data`.
   * @param {any} data Objeto com o email e senha do usuário a ser cadastrado.
   */
  login(data: any): Observable<User>{
    console.log("Realizando login");
    this.loading = true;
    let options = {
      headers : {'Content-Type':  'application/json'},
      observe: 'body' as const,
      params: null,
      reportProgress: true,
      responseType: 'json' as const,
      withCredentials: false,
    };
    let credentials = JSON.stringify(data);
    //////////////////////////////
    console.log(credentials);
    /////////////////////////////
    return this.http.post<User>(this.apiUrl, credentials, options);
  }
}
