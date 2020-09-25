import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../services/backend/backend.service';
import * as EquipamentActions from './equipament.actions';
import { Equipament } from '../../models/equipament.model';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as utils from 'src/utils';

@Injectable()
export class EquipamentEffects{
    
    /**
     * Realiza a comunicação o serviço backend para 
     * a criação do equipamento no servidor do backend.
     */
    createEquipament$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.createEquipament),
        mergeMap( action => {
            let equipament = {
                patrimony: action.patrimony? action.patrimony: null,
                category: action.category? action.category: null,
                status: action.status? action.status: null,
                brand: action.brand? action.brand: null,
                model: action.model? action.model: null,
                ua: action.ua? action.ua: null,
                floor: action.floor? action.floor: null,
                warranty_start: action.warranty_start ?  utils.convertDateToString(action.warranty_start as Date) : null,
                warranty_end: action.warranty_end? utils.convertDateToString(action.warranty_end as Date) : null,
                acquisition_date: action.acquisition_date? utils.convertDateToString(action.acquisition_date as Date): null,
                acquisition_value: action.acquisition_value? action.acquisition_value : null,
            };
            return this.api.create<Equipament>('equipaments', equipament)
            .pipe(
                map(response => {
                    let newEquipament = <Equipament>response.body;
                    newEquipament.warranty_start = utils.convertStringToDate(newEquipament.warranty_start as string);
                    newEquipament.warranty_end = utils.convertStringToDate(newEquipament.warranty_end as string);
                    newEquipament.acquisition_date = utils.convertStringToDate(newEquipament.acquisition_date as string);
                    return EquipamentActions.createEquipamentSuccess({equipament:newEquipament});
                })
            )}
        ),
        catchError( error =>{
            console.log(error);
            return of(EquipamentActions.loadEquipamentsFailure({error}));
        })

    ));

    loadEquipaments$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.loadEquipaments),
        switchMap( action => this.api.listAll<Equipament>('equipaments')
            .pipe( map(response => {
                let results = response.body["results"] ? response.body["results"]: response.body;
                let equipaments = new Map();
                results.forEach(element => {
                    equipaments.set(element.url, element);
                });
                console.log("Carregando equipamentos...");
                return EquipamentActions.loadEquipamentsSuccess({equipaments});
            }))
        ),
        catchError( error => {
            console.log("Falha no carregamento dos equipamentos...");
            return of(EquipamentActions.loadEquipamentsFailure({error}));
        })
    ));

    deleteEquipament$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.deleteEquipament),
        switchMap( action => this.api.destroyById<Equipament>(action.url)
            .pipe( map(response => {
                return EquipamentActions.deleteEquipamentSucess({url: action.url});
            })
        )),
        catchError( error => of(EquipamentActions.deleteEquipamentFailure({error}))),
    ));

    updateEquipament$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.updateEquipament),
        switchMap(action => {
            let equipament = action.equipament;
            return this.api.updateById(equipament.url, equipament)
            .pipe(map(response =>{
                let newEquipament = <Equipament>response.body;
                return EquipamentActions.updateEquipamentSuccess({equipament: newEquipament});
            }))
        }),
        catchError( error => of(EquipamentActions.updateEquipamentFailure({error}))),
    ));

    updatePartialEquipament$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.updatePartialEquipament),
        switchMap(action => {
            let url = action.url;
            let equipament = action.equipament;
            return this.api.partialUpdateById(url, equipament)
            .pipe(map(response =>{
                let newEquipament = <Equipament>response.body;
                return EquipamentActions.updatePartialEquipamentSuccess({equipament: newEquipament});
            }))
        }),
        catchError( error => of(EquipamentActions.updatePartialEquipamentFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private actions$: Actions,
    ){}
}