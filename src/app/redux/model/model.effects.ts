import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../services/backend/backend.service';
import * as ModelActions from './model.actions';
import { Model } from '../../models/model.model';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ModelEffects{
    
    /**
     * Realiza a comunicação o serviço backend para 
     * a criação do modelo no servidor do backend.
     */
    createModel$ = createEffect(() => this.actions$.pipe(
        ofType(ModelActions.createModel),
        mergeMap( action => {
            let model = {name: action.name};
            return this.api.create<Model>('models', model)
            .pipe(
                map(response => {
                    let newModel = <Model>response.body;
                    return ModelActions.createModelSuccess({model:newModel});
                })
            )}
        ),
        catchError( error =>{
            return of(ModelActions.loadModelsFailure({error}));
        })

    ));

    loadModels$ = createEffect(() => this.actions$.pipe(
        ofType(ModelActions.loadModels),
        switchMap( action => this.api.listAll<Model>('models')
            .pipe( map(response => {
                let results = response.body["results"];
                let models = new Map();
                results.forEach(element => {
                    models.set(element.url, element);
                });
                return ModelActions.loadModelsSuccess({models});
            }))
        ),
        catchError( error => {
            return of(ModelActions.loadModelsFailure({error}));
        })
    ));

    deleteModel$ = createEffect(() => this.actions$.pipe(
        ofType(ModelActions.deleteModel),
        switchMap( action => this.api.destroyById<Model>(action.url)
            .pipe( map(response => {
                return ModelActions.deleteModelSucess({url: action.url});
            })
        )),
        catchError( error => of(ModelActions.deleteModelFailure({error}))),
    ));

    updateModel$ = createEffect(() => this.actions$.pipe(
        ofType(ModelActions.updateModel),
        switchMap(action => {
            let model = action.model;
            return this.api.updateById(model.url, model)
            .pipe(map(response =>{
                let newModel = <Model>response.body;
                return ModelActions.updateModelSuccess({model: newModel});
            }))
        }),
        catchError( error => of(ModelActions.updateModelFailure({error}))),
    ));

    updatePartialModel$ = createEffect(() => this.actions$.pipe(
        ofType(ModelActions.updatePartialModel),
        switchMap(action => {
            let url = action.url;
            let model = action.model;
            return this.api.partialUpdateById(url, model)
            .pipe(map(response =>{
                let newModel = <Model>response.body;
                return ModelActions.updatePartialModelSuccess({model: newModel});
            }))
        }),
        catchError( error => of(ModelActions.updatePartialModelFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private actions$: Actions,
    ){}
}