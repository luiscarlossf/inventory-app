import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user/user.model';

/**
 * Serviço que realiz a comunicação com o back-end do sistema.
 */
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

}
