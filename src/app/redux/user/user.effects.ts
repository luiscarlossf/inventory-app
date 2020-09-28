import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import { mergeMap, map, exhaustMap, catchError, tap, switchMap} from 'rxjs/operators';
import * as UserActions from './user.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects{

    login$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.login),
        exhaustMap( action => this.auth.login({username:action.email, password: action.password})
        .pipe(
            map(user => {
                console.log("Login Sucess!", user);
                let login = UserActions.loginSuccess({ user });
                localStorage.setItem("token", user.token);
                this.auth.setUser(user);
                return login;
            }),
            catchError( error => {
                console.log("Login Error!", error);
                return of(UserActions.loginFailure({ error }));
            })
        )
        //KEEP CONNECTED OR NOT
        ),
    ));
    
    logout$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logout),
        switchMap(action => {
            this.auth.logout();
            console.log("Doing logout...");
            this.router.navigate(['']);
            return [];
        }),
    ));

    constructor(
        private actions$: Actions, 
        private auth: AuthService,
        private router: Router,
    ){}
}