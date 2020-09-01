import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../services/backend/backend.service';
import * as ComputerActions from './computer.actions';
import { Computer } from '../../models/computer.model';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ComputerEffects{
    
    /**
     * Realiza a comunicação o serviço backend para 
     * a criação do computador no servidor do backend.
     */
    createComputer$ = createEffect(() => this.actions$.pipe(
        ofType(ComputerActions.createComputer),
        mergeMap( action => {
            let computer = {
                patrimony: action.patrimony,
                category: action.category,
                status: action.status,
                brand: action.brand,
                model: action.model,
                ua: action.ua,
                floor: action.floor,
                warranty_start: action.warranty_start,
                warranty_end: action.warranty_end,
                acquisition_date: action.acquisition_date,
                acquisition_value: action.acquisition_value
            };
            return this.api.create<Computer>('computers', computer)
            .pipe(
                map(response => {
                    let newComputer = <Computer>response.body;
                    return ComputerActions.createComputerSuccess({computer:newComputer});
                })
            )}
        ),
        catchError( error =>{
            return of(ComputerActions.loadComputersFailure({error}));
        })

    ));

    loadComputers$ = createEffect(() => this.actions$.pipe(
        ofType(ComputerActions.loadComputers),
        switchMap( action => this.api.listAll<Computer>('computers')
            .pipe( map(response => {
                let results = response.body["results"];
                let computers = new Map();
                results.forEach(element => {
                    computers.set(element.url, element);
                });
                return ComputerActions.loadComputersSuccess({computers});
            }))
        ),
        catchError( error => {
            return of(ComputerActions.loadComputersFailure({error}));
        })
    ));

    deleteComputer$ = createEffect(() => this.actions$.pipe(
        ofType(ComputerActions.deleteComputer),
        switchMap( action => this.api.destroyById<Computer>(action.url)
            .pipe( map(response => {
                return ComputerActions.deleteComputerSucess({url: action.url});
            })
        )),
        catchError( error => of(ComputerActions.deleteComputerFailure({error}))),
    ));

    updateComputer$ = createEffect(() => this.actions$.pipe(
        ofType(ComputerActions.updateComputer),
        switchMap(action => {
            let computer = action.computer;
            return this.api.updateById(computer.url, computer)
            .pipe(map(response =>{
                let newComputer = <Computer>response.body;
                return ComputerActions.updateComputerSuccess({computer: newComputer});
            }))
        }),
        catchError( error => of(ComputerActions.updateComputerFailure({error}))),
    ));

    updatePartialComputer$ = createEffect(() => this.actions$.pipe(
        ofType(ComputerActions.updatePartialComputer),
        switchMap(action => {
            let url = action.url;
            let computer = action.computer;
            return this.api.partialUpdateById(url, computer)
            .pipe(map(response =>{
                let newComputer = <Computer>response.body;
                return ComputerActions.updatePartialComputerSuccess({computer: newComputer});
            }))
        }),
        catchError( error => of(ComputerActions.updatePartialComputerFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private actions$: Actions,
    ){}
}