import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import { mergeMap, map, exhaustMap, catchError, tap, switchMap} from 'rxjs/operators';
import * as UserActions from './user.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as EquipamentActions from '../equipament/equipament.actions';
import * as ComputerActions from '../computer/computer.actions';
import * as BrandActions from '../brand/brand.actions';
import * as CategoryActions from '../category/category.actions';
import * as FloorActions from '../floor/floor.actions';
import * as ModelActions from '../model/model.actions';
import * as UaActions from '../ua/ua.actions';

@Injectable()
export class UserEffects{

    login$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.login),
        exhaustMap( action => this.auth.login({username:action.email, password: action.password})
        .pipe(
            map(user => {
                console.log("Login Sucess!", user);
                localStorage.setItem("first_name", user.first_name);
                localStorage.setItem("token", user.token);
                return UserActions.loginSuccess({ user });;
            }),
            catchError( error => {
                console.log("Login Error!", error);
                return of(UserActions.loginFailure({ error }));
            })
        )
        //KEEP CONNECTED OR NOT
        ),
    ));

    loginSuccessfull$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        switchMap(action => {
            this.auth.setUser(action.user);
            
            this.store.dispatch(BrandActions.loadBrands());
            this.store.dispatch(CategoryActions.loadCategories());
            this.store.dispatch(FloorActions.loadFloors());
            this.store.dispatch(ModelActions.loadModels());
            this.store.dispatch(UaActions.loadUas());
            this.store.dispatch(EquipamentActions.loadEquipaments());
            this.store.dispatch(ComputerActions.loadComputers());
            
            return [];
        }),
    ));
    
    logout$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.logout),
        switchMap(action => {
            this.auth.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('first_name');
            console.log("Doing logout...");
            this.router.navigate(['']);
            return [];
        }),
    ));

    constructor(
        private actions$: Actions, 
        private auth: AuthService,
        private router: Router,
        private readonly store: Store<AppState>,
    ){}
}