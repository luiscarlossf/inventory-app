import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

/**Atribui o token de autorização do usuário logado em cada requisicação.*/
export class AuthInterceptor implements HttpInterceptor{

    constructor(private auth: AuthService){  }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = this.auth.getAuthorizationToken();

        const authReq = req.clone({
            headers: req.headers.set('Authorization', token),
        });

        return next.handle(authReq);
    }
}