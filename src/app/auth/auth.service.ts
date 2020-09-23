import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend/backend.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../redux/user/user.reducer';
import { Router } from '@angular/router';

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
  private apiUrl:  string = environment.apiUrl + 'api-token-auth/';
  /**@type {string} Url da página a ser redirecionada caso o login tenha sucesso.*/
  redirectUrl: string = 'home';
  /**@type {boolean} Indica se o existe um usuário logado. */
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private readonly store: Store<{user:fromUser.UserState}>, private router: Router) { 
    this.user$ = store.pipe(select('user'));
  }

  ngOnInit(){
    this.user$.subscribe(
      user => {
        console.log("Auth!");
        if(user.currentUser){
          console.log("Setando usuário no serviço Auth...");
          this.setUser(user.currentUser);
          this.setToken(user.currentUser.token);
          this.isLoggedIn = true;
        }else{
          this.setUser(null);
          this.setToken(null);
          this.isLoggedIn = false;
        }
        
    });
  }

  /**
   * Adiciona um novo usuário corrente.
   * @param {User} newUser Usuário que será adicionado. 
   */
  setUser(newUser: User): void{
    this.user = newUser;
    this.isLoggedIn = true;
    this.setToken(newUser.token);
    this.loading = false;
    this.router.navigate([this.redirectUrl]);
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
    ///////REMOVER DURANTE A PRODUÇÃO/////
    let t = localStorage.getItem("token");
    if(t){
      return t;
    }
    ////////////////////////////////////
    return this.token;
  }

  /**
   * Realiza o login do usuário representado por `data`.
   * @param {any} data Objeto com o email e senha do usuário a ser cadastrado.
   */
  login(data: any): Observable<User>{
    //////////////////
    console.log("Realizando login");
    ///////////////////
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
    return this.http.post<User>(this.apiUrl, credentials, options);
  }

  logout(){
    this.isLoggedIn = false;
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('first_name');
  }
}
