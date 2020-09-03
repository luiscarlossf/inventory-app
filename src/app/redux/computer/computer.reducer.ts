import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as ComputerActions from './computer.actions';
import { Computer } from  '../../models/computer.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';
import { Equipament } from 'src/app/models/equipament.model';
import { computeDecimalDigest } from '@angular/compiler/src/i18n/digest';

/**
 * @interface
 */
export interface ComputerState{
    /**
     * @type {object} Estado dos computadores sendo monitorados.
     */
    allComputers: Map<string, Computer>;
    error: Error;
}

/**
 * Estado inicial para computers
 */
const initialState: ComputerState = {
    allComputers: new Map<string, Computer>(),
    error: null,
};

/**
 * Cria a função reducer que manipula as transações 
 * de estado do branch computers de maneira imutável.
 */

 const computerReducer = createReducer(
     initialState,

     on(ComputerActions.createComputer, produce((draftState: ComputerState, {name})=>{})),
     on(ComputerActions.createComputerSuccess, produce((draftState: ComputerState, {computer})=>{
         draftState.allComputers.set(computer.url, computer);
         draftState.error = null;
     })),
     on(ComputerActions.createComputerFailure, produce((draftState: ComputerState, {error})=>{
         draftState.error = error;
     })),

     on(ComputerActions.loadComputers, produce((draftState: ComputerState)=>{})),
     on(ComputerActions.loadComputersSuccess, produce((draftState: ComputerState, {computers})=>{
         draftState.allComputers = computers;
         draftState.error = null;
     })),
     on(ComputerActions.loadComputersFailure, produce((draftState: ComputerState, {error})=>{
        draftState.error = error;
    })),

    on(ComputerActions.deleteComputer, produce((draftState: ComputerState, {url})=>{})),
    on(ComputerActions.deleteComputerSucess, produce((draftState: ComputerState, {url})=>{
        if (draftState.allComputers.has(url)){
            draftState.allComputers.delete(url);
            draftState.error = null;
        }
    })),
    on(ComputerActions.deleteComputerFailure, produce((draftState: ComputerState, {error})=>{
        draftState.error = error;
    })),

    on(ComputerActions.updateComputer, produce((draftState: ComputerState, {computer})=>{})),
    on(ComputerActions.updateComputerSuccess, produce((draftState: ComputerState, {computer})=>{
        if (draftState.allComputers.has(computer.url)){
            draftState.allComputers.set(computer.url, computer);
            draftState.error = null;
        } 
    })),
    on(ComputerActions.updateComputerFailure, produce((draftState: ComputerState, {error})=>{
        draftState.error = error;
    })),

    on(ComputerActions.updatePartialComputer, produce((draftState: ComputerState, {url, computer})=>{})),
    on(ComputerActions.updatePartialComputerSuccess, produce((draftState: ComputerState, {computer})=>{
        if (draftState.allComputers.has(computer.url)){
            draftState.allComputers.set(computer.url, computer);
            draftState.error = null;
        } 
    })),
    on(ComputerActions.updatePartialComputerFailure, produce((draftState: ComputerState, {error})=>{
        draftState.error = error;
    })),
 );

 /**
  * Função reducer exportada. Isso é necessário, pois 
  * a chamada de função não é suportada pelo compilador AOT.
  */
 export function reducer(state: ComputerState| undefined, action: Action){
     return computerReducer(state, action);
 }

 /**
  * Retorna o estado computers.
  * @param state 
  */
 export const selectComputer = (state: AppState) => state.computers;

/**
 * Retorna o map de todos os computadores.
 */
export const selectAllComputers = createSelector(
     selectComputer,
     (computers: ComputerState) => computers.allComputers,
);
/**
 * Retorna o aray de todos os computadores
 */
export const selectComputers = createSelector(
    selectAllComputers,
    (allComputers: Map<string, Computer>) => [...allComputers.values()],
);
/**
 * Retorna o array de computadores no WSUS
 */
export const selectWSUS = createSelector(
    selectComputers,
    (computers: Computer[]) => computers.filter(c => c.status_wsus == true),
);
/**
 * Retorna o array de computadores no Zenworks
 */
export const selectZENWORKS = createSelector(
    selectComputers,
    (computers: Computer[]) => computers.filter(c => c.status_zenworks == true),
);
/**
 * Retorna o array de computadores no Trend
 */
export const selectTREND = createSelector(
    selectComputers,
    (computers: Computer[]) => computers.filter(c => c.status_trend == true),
);

/**
 * Retorna a quantidade de computadores no WSUS
 */
export const getCountWSUS = createSelector(
    selectWSUS,
    (computers: Computer[]) => computers.length,
);
/**
 * Retorna a quantidade de computadores no Zenworks
 */
export const getCountZENWORKS = createSelector(
    selectZENWORKS,
    (computers: Computer[]) => computers.length,
);
/**
 * Retorna a quantidade de computadores no Trend
 */
export const getCountTREND = createSelector(
    selectTREND,
    (computers: Computer[]) => computers.length,
);
 