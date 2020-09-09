import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as UaActions from './ua.actions';
import { Ua } from  '../../models/ua.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';

/**
 * @interface
 */
export interface UaState{
    /**
     * @type {object} Marcas dos equipamentos logados.
     */
    allUas: Map<string, Ua>;
    error: Error;
}

/**
 * Estado inicial para uas
 */
const initialState: UaState = {
    allUas: new Map<string, Ua>(),
    error: null,
};

/**
 * Cria a função reducer que manipula as transações 
 * de estado do branch uas de maneira imutável.
 */

 const uaReducer = createReducer(
     initialState,

     on(UaActions.createUa, produce((draftState: UaState, {name})=>{})),
     on(UaActions.createUaSuccess, produce((draftState: UaState, {ua})=>{
         draftState.allUas.set(ua.url, ua);
         draftState.error = null;
     })),
     on(UaActions.createUaFailure, produce((draftState: UaState, {error})=>{
         draftState.error = error;
     })),

     on(UaActions.loadUas, produce((draftState: UaState)=>{})),
     on(UaActions.loadUasSuccess, produce((draftState: UaState, {uas})=>{
         draftState.allUas = uas;
         draftState.error = null;
     })),
     on(UaActions.loadUasFailure, produce((draftState: UaState, {error})=>{
        draftState.error = error;
    })),

    on(UaActions.deleteUa, produce((draftState: UaState, {url})=>{})),
    on(UaActions.deleteUaSucess, produce((draftState: UaState, {url})=>{
        if (draftState.allUas.has(url)){
            draftState.allUas.delete(url);
            draftState.error = null;
        }
    })),
    on(UaActions.deleteUaFailure, produce((draftState: UaState, {error})=>{
        draftState.error = error;
    })),

    on(UaActions.updateUa, produce((draftState: UaState, {ua})=>{})),
    on(UaActions.updateUaSuccess, produce((draftState: UaState, {ua})=>{
        if (draftState.allUas.has(ua.url)){
            draftState.allUas.set(ua.url, ua);
            draftState.error = null;
        } 
    })),
    on(UaActions.updateUaFailure, produce((draftState: UaState, {error})=>{
        draftState.error = error;
    })),

    on(UaActions.updatePartialUa, produce((draftState: UaState, {url, ua})=>{})),
    on(UaActions.updatePartialUaSuccess, produce((draftState: UaState, {ua})=>{
        if (draftState.allUas.has(ua.url)){
            draftState.allUas.set(ua.url, ua);
            draftState.error = null;
        } 
    })),
    on(UaActions.updatePartialUaFailure, produce((draftState: UaState, {error})=>{
        draftState.error = error;
    })),
 );

 /**
  * Função reducer exportada. Isso é necessário, pois 
  * a chamada de função não é suportada pelo compilador AOT.
  */
 export function reducer(state: UaState| undefined, action: Action){
     return uaReducer(state, action);
 }

 /**
  * Retorna o estado uas.
  * @param state 
  */
 export const selectUa = (state: AppState) => state.uas;

/**
 * Retorna todas as uas dos equipamentos.
 */
export const selectAllUas = createSelector(
     selectUa,
     (uas: UaState) => uas.allUas,
);