import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    Route,
    CanLoad,
    UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad{

    constructor(private auth: AuthService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree{
            let url: string = state.url;
            /////////////
            console.log('Url do canActivate', url);
            ////////////
            return this.checkLogin(url);
    }

    canLoad(route: Route): boolean{
        let url = `${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.auth.isLoggedIn || localStorage.getItem('token') ){
            ///////////
            console.log("Navegando para próxima página.");
            //////////
            return true; 
        }
        /////////////
        console.log("Não pode carregar, façao login primeiro.");
        /////////////
        // Store the attempted URL for redirecting
        this.auth.redirectUrl = url;

    
        // Navigate to the login page with extras
        this.router.navigate(['login']);
        return false;
      }
}