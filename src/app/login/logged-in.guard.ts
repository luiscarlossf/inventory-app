import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate{

    constructor(private auth: AuthService, private router: Router){}

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean{
            let url: string = state.url;

            return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.auth.isLoggedIn()) { return true; }
    
        // Store the attempted URL for redirecting
        this.auth.redirectUrl = url;

    
        // Navigate to the login page with extras
        this.router.navigate(['login']);
        return false;
      }
}