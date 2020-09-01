import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../services/backend/backend.service';
import * as UaActions from './ua.actions';
import { Ua } from '../../models/ua.model';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UaEffects{
    
    /**
     * Realiza a comunicação o serviço backend para 
     * a criação da ua no servidor do backend.
     */
    createUa$ = createEffect(() => this.actions$.pipe(
        ofType(UaActions.createUa),
        mergeMap( action => {
            let ua = {code: action.code, name: action.name, floor: action.floor};
            return this.api.create<Ua>('uas', ua)
            .pipe(
                map(response => {
                    let newUa = <Ua>response.body;
                    return UaActions.createUaSuccess({ua:newUa});
                })
            )}
        ),
        catchError( error =>{
            return of(UaActions.loadUasFailure({error}));
        })

    ));

    loadUas$ = createEffect(() => this.actions$.pipe(
        ofType(UaActions.loadUas),
        switchMap( action => this.api.listAll<Ua>('uas')
            .pipe( map(response => {
                let results = response.body["results"];
                let uas = new Map();
                results.forEach(element => {
                    uas.set(element.url, element);
                });
                return UaActions.loadUasSuccess({uas});
            }))
        ),
        catchError( error => {
            return of(UaActions.loadUasFailure({error}));
        })
    ));

    deleteUa$ = createEffect(() => this.actions$.pipe(
        ofType(UaActions.deleteUa),
        switchMap( action => this.api.destroyById<Ua>(action.url)
            .pipe( map(response => {
                return UaActions.deleteUaSucess({url: action.url});
            })
        )),
        catchError( error => of(UaActions.deleteUaFailure({error}))),
    ));

    updateUa$ = createEffect(() => this.actions$.pipe(
        ofType(UaActions.updateUa),
        switchMap(action => {
            let ua = action.ua;
            return this.api.updateById(ua.url, ua)
            .pipe(map(response =>{
                let newUa = <Ua>response.body;
                return UaActions.updateUaSuccess({ua: newUa});
            }))
        }),
        catchError( error => of(UaActions.updateUaFailure({error}))),
    ));

    updatePartialUa$ = createEffect(() => this.actions$.pipe(
        ofType(UaActions.updatePartialUa),
        switchMap(action => {
            let url = action.url;
            let ua = action.ua;
            return this.api.partialUpdateById(url, ua)
            .pipe(map(response =>{
                let newUa = <Ua>response.body;
                return UaActions.updatePartialUaSuccess({ua: newUa});
            }))
        }),
        catchError( error => of(UaActions.updatePartialUaFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private actions$: Actions,
    ){}
}