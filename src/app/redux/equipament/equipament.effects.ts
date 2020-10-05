import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../services/backend/backend.service';
import * as EquipamentActions from './equipament.actions';
import { Equipament } from '../../models/equipament.model';
import { mergeMap, catchError, map, switchMap, takeLast} from 'rxjs/operators';
import { of, concat} from 'rxjs';
import * as utils from 'src/utils';
import { Computer } from 'src/app/models/computer.model';
import { GeneralService } from 'src/app/services/general/general.service';

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
                patrimony: action.eq.patrimony? action.eq.patrimony: null,
                isComputer: action.eq.isComputer,
                isPRM: action.eq.isPRM,
                category: action.eq.category? action.eq.category: null,
                status: action.eq.status? action.eq.status: null,
                brand: action.eq.brand? action.eq.brand: null,
                model: action.eq.model? action.eq.model: null,
                ua: action.eq.ua? action.eq.ua: null,
                floor: action.eq.floor? action.eq.floor: null,
                warranty_start: action.eq.warranty_start ?  utils.convertDateToString(action.eq.warranty_start as Date) : null,
                warranty_end: action.eq.warranty_end? utils.convertDateToString(action.eq.warranty_end as Date) : null,
                acquisition_date: action.eq.acquisition_date? utils.convertDateToString(action.eq.acquisition_date as Date): null,
                acquisition_value: action.eq.acquisition_value? action.eq.acquisition_value : null,
            };

            if(action.eq.isComputer){
                equipament['policy']= action.eq.policy;
                equipament['status_zenworks'] = action.eq.status_zenworks;
                equipament['status_wsus'] = action.eq.status_wsus;
                equipament['status_trend'] = action.eq.status_trend;
            }
            if(equipament.isComputer){
                return this.api.create<Equipament>('computers', equipament)
                .pipe(
                    map(response => {
                        let newEquipament = <Equipament>response.body;
                        newEquipament.isComputer = equipament.isComputer;
                        newEquipament.isPRM = equipament.isPRM;
                        newEquipament.warranty_start = utils.convertStringToDate(newEquipament.warranty_start as string);
                        newEquipament.warranty_end = utils.convertStringToDate(newEquipament.warranty_end as string);
                        newEquipament.acquisition_date = utils.convertStringToDate(newEquipament.acquisition_date as string);
                        return EquipamentActions.createEquipamentSuccess({equipament:newEquipament});
                    })
                );
           }else{
                return this.api.create<Equipament>('equipaments', equipament)
                .pipe(
                    map(response => {
                        let newEquipament = <Equipament>response.body;
                        newEquipament.isComputer = equipament.isComputer;
                        newEquipament.isPRM = equipament.isPRM;
                        newEquipament.warranty_start = utils.convertStringToDate(newEquipament.warranty_start as string);
                        newEquipament.warranty_end = utils.convertStringToDate(newEquipament.warranty_end as string);
                        newEquipament.acquisition_date = utils.convertStringToDate(newEquipament.acquisition_date as string);
                        return EquipamentActions.createEquipamentSuccess({equipament:newEquipament});
                    })
                );
           }

        }),
        catchError( error =>{
            console.log(error);
            return of(EquipamentActions.loadEquipamentsFailure({error}));
        })

    ));

    loadEquipaments$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.loadEquipaments),
        switchMap( action => { 
            let equipaments = new Map();
            return concat( 
                this.api.listAll<Equipament>('equipaments')
                .pipe( map(response => {
                    let results = response.body["results"] ? response.body["results"]: response.body;
                    results.forEach(element => {
                        element.isComputer = false;
                        element.isPRM = false;
                        if(element.ua)
                            element.isPRM = this.general.getUa(element.ua).name.includes(utils.PRM_ID);
                            
                        equipaments.set(element.url, element);
                    });
            })),
            this.api.listAll<Computer>('computers')
            .pipe( map(response => {
                let results = response.body["results"] ? response.body["results"]: response.body;
                results.forEach(element => {
                    element.isComputer = true;
                    element.isPRM = false;
                    if(element.ua)
                        element.isPRM = this.general.getUa(element.ua).name.includes(utils.PRM_ID);
                        
                    equipaments.set(element.url, element);
                });
            }))).pipe(
                takeLast(1),
                map(response => {
                    return EquipamentActions.loadEquipamentsSuccess({equipaments});
                })
            );
            
        }),
        catchError( error => {
            console.log("Falha no carregamento dos equipamentos...", error);
            return of(EquipamentActions.loadEquipamentsFailure({error}));
        })
    ));

    deleteEquipament$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.deleteEquipament),
        switchMap( action => { 
            if(!action.equipament.isComputer){
                return this.api.destroyById<Equipament>(action.equipament.url)
                    .pipe( map(response => {
                        return EquipamentActions.deleteEquipamentSucess({url: action.equipament.url});
                    })
                );
            }else if(action.equipament.isComputer){
                return this.api.destroyById<Computer>(action.equipament.url)
                    .pipe( map(response => {
                        return EquipamentActions.deleteEquipamentSucess({url: action.equipament.url});
                    })
                );
            }
        }),
        catchError( error => of(EquipamentActions.deleteEquipamentFailure({error}))),
    ));

    updateEquipament$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.updateEquipament),
        switchMap(action => {
            let equipament = action.equipament;
            if(!equipament.isComputer){
                return this.api.updateById(equipament.url, equipament)
                .pipe(map(response =>{
                    let newEquipament = <Equipament>response.body;
                    return EquipamentActions.updateEquipamentSuccess({equipament: newEquipament});
                }));
            }else if(equipament.isComputer){
                return this.api.updateById(equipament.url, equipament)
                .pipe(map(response =>{
                    let newEquipament = <Equipament>response.body;
                    return EquipamentActions.updateEquipamentSuccess({equipament: newEquipament});
                }));
           }
        }),
        catchError( error => of(EquipamentActions.updateEquipamentFailure({error}))),
    ));

    updatePartialEquipament$ = createEffect(() => this.actions$.pipe(
        ofType(EquipamentActions.updatePartialEquipament),
        switchMap(action => {
            let url = action.url;
            let equipament = action.equipament;
            if(!equipament.isComputer){
                return this.api.partialUpdateById(url, equipament)
                .pipe(map(response =>{
                    let newEquipament = <Equipament>response.body;
                    return EquipamentActions.updatePartialEquipamentSuccess({equipament: newEquipament});
                }));
            }else if(equipament.isComputer){
                return this.api.partialUpdateById(url, equipament)
                .pipe(map(response =>{
                    let newEquipament = <Equipament>response.body;
                    return EquipamentActions.updatePartialEquipamentSuccess({equipament: newEquipament});
                }));
            }
        }),
        catchError( error => of(EquipamentActions.updatePartialEquipamentFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private general: GeneralService,
        private actions$: Actions,
    ){}
}