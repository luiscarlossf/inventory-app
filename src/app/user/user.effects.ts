import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth/auth.service';
import { mergeMap, map, exhaustMap, catchError} from 'rxjs/operators';
import * as UserActions from './user.actions';
import { of } from 'rxjs';

@Injectable()
export class UserEffects{

    login$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.login),
        exhaustMap( action => this.auth.login({username:action.email, password: action.password})
        .pipe(
            map(user => {
                console.log("Login Sucess!", user);
                let login = UserActions.loginSuccess({ user })
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

    constructor(
        private actions$: Actions, 
        private auth: AuthService
    ){}
}