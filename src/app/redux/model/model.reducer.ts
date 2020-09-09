import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as ModelActions from './model.actions';
import { Model } from  '../../models/model.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';

/**
 * @interface
 */
export interface ModelState{
    /**
     * @type {object} Modelos dos equipamentos logados.
     */
    allModels: Map<string, Model>;
    error: Error;
}

/**
 * Estado inicial para models
 */
const initialState: ModelState = {
    allModels: new Map<string, Model>(),
    error: null,
};

/**
 * Cria a função reducer que manipula as transações 
 * de estado do branch models de maneira imutável.
 */

 const modelReducer = createReducer(
     initialState,

     on(ModelActions.createModel, produce((draftState: ModelState, {name})=>{})),
     on(ModelActions.createModelSuccess, produce((draftState: ModelState, {model})=>{
         draftState.allModels.set(model.url, model);
         draftState.error = null;
     })),
     on(ModelActions.createModelFailure, produce((draftState: ModelState, {error})=>{
         draftState.error = error;
     })),

     on(ModelActions.loadModels, produce((draftState: ModelState)=>{})),
     on(ModelActions.loadModelsSuccess, produce((draftState: ModelState, {models})=>{
         draftState.allModels = models;
         draftState.error = null;
     })),
     on(ModelActions.loadModelsFailure, produce((draftState: ModelState, {error})=>{
        draftState.error = error;
    })),

    on(ModelActions.deleteModel, produce((draftState: ModelState, {url})=>{})),
    on(ModelActions.deleteModelSucess, produce((draftState: ModelState, {url})=>{
        if (draftState.allModels.has(url)){
            draftState.allModels.delete(url);
            draftState.error = null;
        }
    })),
    on(ModelActions.deleteModelFailure, produce((draftState: ModelState, {error})=>{
        draftState.error = error;
    })),

    on(ModelActions.updateModel, produce((draftState: ModelState, {model})=>{})),
    on(ModelActions.updateModelSuccess, produce((draftState: ModelState, {model})=>{
        if (draftState.allModels.has(model.url)){
            draftState.allModels.set(model.url, model);
            draftState.error = null;
        } 
    })),
    on(ModelActions.updateModelFailure, produce((draftState: ModelState, {error})=>{
        draftState.error = error;
    })),

    on(ModelActions.updatePartialModel, produce((draftState: ModelState, {url, model})=>{})),
    on(ModelActions.updatePartialModelSuccess, produce((draftState: ModelState, {model})=>{
        if (draftState.allModels.has(model.url)){
            draftState.allModels.set(model.url, model);
            draftState.error = null;
        } 
    })),
    on(ModelActions.updatePartialModelFailure, produce((draftState: ModelState, {error})=>{
        draftState.error = error;
    })),
 );

 /**
  * Função reducer exportada. Isso é necessário, pois 
  * a chamada de função não é suportada pelo compilador AOT.
  */
 export function reducer(state: ModelState| undefined, action: Action){
     return modelReducer(state, action);
 }

 /**
  * Retorna o estado models.
  * @param state 
  */
 export const selectModel = (state: AppState) => state.models;

/**
 * Retorna todas os modelos dos equipamentos.
 */
export const selectAllModels = createSelector(
     selectModel,
     (models: ModelState) => models.allModels,
);
 