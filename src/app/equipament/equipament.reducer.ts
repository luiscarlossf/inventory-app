import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as EquipamentActions from './equipament.actions';
import { Equipament } from  './equipament.model';
import { produce } from 'immer';
import { AppState } from '../app.state';

/**
 * @interface
 */
export interface EquipamentState{
    /**
     * @type {object} Estado dos equipamentos sendo monitorados.
     */
    allEquipaments: Map<string, Equipament>;
    error: Error;
}

/**
 * Estado inicial para equipaments
 */
const initialState: EquipamentState = {
    allEquipaments: null,
    error: null,
};

/**
 * Cria a função reducer que manipula as transações 
 * de estado do branch equipaments de maneira imutável.
 */

 const equipamentReducer = createReducer(
     initialState,

     on(EquipamentActions.createEquipament, produce((draftState: EquipamentState, {name})=>{})),
     on(EquipamentActions.createEquipamentSuccess, produce((draftState: EquipamentState, {equipament})=>{
         draftState.allEquipaments.set(equipament.url, equipament);
         draftState.error = null;
     })),
     on(EquipamentActions.createEquipamentFailure, produce((draftState: EquipamentState, {error})=>{
         draftState.error = error;
     })),

     on(EquipamentActions.loadEquipaments, produce((draftState: EquipamentState)=>{})),
     on(EquipamentActions.loadEquipamentsSuccess, produce((draftState: EquipamentState, {equipaments})=>{
         draftState.allEquipaments = equipaments;
         draftState.error = null;
     })),
     on(EquipamentActions.loadEquipamentsFailure, produce((draftState: EquipamentState, {error})=>{
        draftState.error = error;
    })),

    on(EquipamentActions.deleteEquipament, produce((draftState: EquipamentState, {url})=>{})),
    on(EquipamentActions.deleteEquipamentSucess, produce((draftState: EquipamentState, {url})=>{
        if (draftState.allEquipaments.has(url)){
            draftState.allEquipaments.delete(url);
            draftState.error = null;
        }
    })),
    on(EquipamentActions.deleteEquipamentFailure, produce((draftState: EquipamentState, {error})=>{
        draftState.error = error;
    })),

    on(EquipamentActions.updateEquipament, produce((draftState: EquipamentState, {equipament})=>{})),
    on(EquipamentActions.updateEquipamentSuccess, produce((draftState: EquipamentState, {equipament})=>{
        if (draftState.allEquipaments.has(equipament.url)){
            draftState.allEquipaments.set(equipament.url, equipament);
            draftState.error = null;
        } 
    })),
    on(EquipamentActions.updateEquipamentFailure, produce((draftState: EquipamentState, {error})=>{
        draftState.error = error;
    })),

    on(EquipamentActions.updatePartialEquipament, produce((draftState: EquipamentState, {url, equipament})=>{})),
    on(EquipamentActions.updatePartialEquipamentSuccess, produce((draftState: EquipamentState, {equipament})=>{
        if (draftState.allEquipaments.has(equipament.url)){
            draftState.allEquipaments.set(equipament.url, equipament);
            draftState.error = null;
        } 
    })),
    on(EquipamentActions.updatePartialEquipamentFailure, produce((draftState: EquipamentState, {error})=>{
        draftState.error = error;
    })),
 );

 /**
  * Função reducer exportada. Isso é necessário, pois 
  * a chamada de função não é suportada pelo compilador AOT.
  */
 export function reducer(state: EquipamentState| undefined, action: Action){
     return equipamentReducer(state, action);
 }

 /**
  * Retorna o estado equipaments.
  * @param state 
  */
 export const selectEquipament = (state: AppState) => state.equipaments;

/**
 * Retorna todas os equipamentos.
 */
export const selectAllEquipaments = createSelector(
     selectEquipament,
     (equipaments: EquipamentState) => equipaments.allEquipaments,
);
 