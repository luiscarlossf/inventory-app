import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';

/**Atribui o token de autorização do usuário logado em cada requisicação.*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private auth: AuthService){  }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = this.auth.getAuthorizationToken();

        if(token){

            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Token ${token}`),
            });

            return next.handle(authReq);
        }else{
            return next.handle(req);
        }
    }
}