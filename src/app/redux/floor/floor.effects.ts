import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../backend/backend.service';
import * as FloorActions from './floor.actions';
import { Floor } from '../../models/floor.model';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class FloorEffects{
    
    /**
     * Realiza a comunicação o serviço backend para 
     * a criação do andar no servidor do backend.
     */
    createFloor$ = createEffect(() => this.actions$.pipe(
        ofType(FloorActions.createFloor),
        mergeMap( action => {
            let floor = {name: action.name};
            return this.api.create<Floor>('floors', floor)
            .pipe(
                map(response => {
                    let newFloor = <Floor>response.body;
                    return FloorActions.createFloorSuccess({floor:newFloor});
                })
            )}
        ),
        catchError( error =>{
            return of(FloorActions.loadFloorsFailure({error}));
        })

    ));

    loadFloors$ = createEffect(() => this.actions$.pipe(
        ofType(FloorActions.loadFloors),
        switchMap( action => this.api.listAll<Floor>('floors')
            .pipe( map(response => {
                let results = response.body["results"];
                let floors = new Map();
                results.forEach(element => {
                    floors.set(element.url, element);
                });
                return FloorActions.loadFloorsSuccess({floors});
            }))
        ),
        catchError( error => {
            return of(FloorActions.loadFloorsFailure({error}));
        })
    ));

    deleteFloor$ = createEffect(() => this.actions$.pipe(
        ofType(FloorActions.deleteFloor),
        switchMap( action => this.api.destroyById<Floor>(action.url)
            .pipe( map(response => {
                return FloorActions.deleteFloorSucess({url: action.url});
            })
        )),
        catchError( error => of(FloorActions.deleteFloorFailure({error}))),
    ));

    updateFloor$ = createEffect(() => this.actions$.pipe(
        ofType(FloorActions.updateFloor),
        switchMap(action => {
            let floor = action.floor;
            return this.api.updateById(floor.url, floor)
            .pipe(map(response =>{
                let newFloor = <Floor>response.body;
                return FloorActions.updateFloorSuccess({floor: newFloor});
            }))
        }),
        catchError( error => of(FloorActions.updateFloorFailure({error}))),
    ));

    updatePartialFloor$ = createEffect(() => this.actions$.pipe(
        ofType(FloorActions.updatePartialFloor),
        switchMap(action => {
            let url = action.url;
            let floor = action.floor;
            return this.api.partialUpdateById(url, floor)
            .pipe(map(response =>{
                let newFloor = <Floor>response.body;
                return FloorActions.updatePartialFloorSuccess({floor: newFloor});
            }))
        }),
        catchError( error => of(FloorActions.updatePartialFloorFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private actions$: Actions,
    ){}
}