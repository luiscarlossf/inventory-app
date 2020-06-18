import { Injectable } from '@angular/core';
import { User } from './user/user.model';
import { BackendService } from './backend.service';

/**
 * Serviço responsável pela autenticação dos usuários do sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**@type {User} Usuário corrente logado. */
  private user: User;
  /**@type {boolean} Indica o progresso do processo de login. */
  private loading: boolean;
  /**@type {string} Token de autorização do usuário corrente. */
  private token: string;

  constructor(private backend: BackendService) { 

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
   * Realiza o login do usuário representado por `data`.
   * @param {any} data Objecto com o email e senha do usuário a ser cadastrado.
   */
  login(data: any): void{
    this.loading = true;
  }

  /**
   * Faz o logout do usuário corrente.
   */
  logout(): void{
    this.user = null;
    this.token = null;
  }
}
