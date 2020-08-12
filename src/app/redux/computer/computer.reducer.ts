import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as ComputerActions from './computer.actions';
import { Computer } from  '../../models/computer.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';

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
    allComputers: null,
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
 * Retorna todas os computadores.
 */
export const selectAllComputers = createSelector(
     selectComputer,
     (computers: ComputerState) => computers.allComputers,
);
 