import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as FloorActions from './floor.actions';
import { Floor } from  '../../models/floor.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';

/**
 * @interface
 */
export interface FloorState{
    /**
     * @type {object} Andares dos equipamentos logados.
     */
    allFloors: Map<string, Floor>;
    error: Error;
}

/**
 * Estado inicial para floors
 */
const initialState: FloorState = {
    allFloors: new Map<string, Floor>(),
    error: null,
};

/**
 * Cria a função reducer que manipula as transações 
 * de estado do branch floors de maneira imutável.
 */

 const floorReducer = createReducer(
     initialState,

     on(FloorActions.createFloor, produce((draftState: FloorState, {name})=>{})),
     on(FloorActions.createFloorSuccess, produce((draftState: FloorState, {floor})=>{
         draftState.allFloors.set(floor.url, floor);
         draftState.error = null;
     })),
     on(FloorActions.createFloorFailure, produce((draftState: FloorState, {error})=>{
         draftState.error = error;
     })),

     on(FloorActions.loadFloors, produce((draftState: FloorState)=>{})),
     on(FloorActions.loadFloorsSuccess, produce((draftState: FloorState, {floors})=>{
         draftState.allFloors = floors;
         draftState.error = null;
     })),
     on(FloorActions.loadFloorsFailure, produce((draftState: FloorState, {error})=>{
        draftState.error = error;
    })),

    on(FloorActions.deleteFloor, produce((draftState: FloorState, {url})=>{})),
    on(FloorActions.deleteFloorSucess, produce((draftState: FloorState, {url})=>{
        if (draftState.allFloors.has(url)){
            draftState.allFloors.delete(url);
            draftState.error = null;
        }
    })),
    on(FloorActions.deleteFloorFailure, produce((draftState: FloorState, {error})=>{
        draftState.error = error;
    })),

    on(FloorActions.updateFloor, produce((draftState: FloorState, {floor})=>{})),
    on(FloorActions.updateFloorSuccess, produce((draftState: FloorState, {floor})=>{
        if (draftState.allFloors.has(floor.url)){
            draftState.allFloors.set(floor.url, floor);
            draftState.error = null;
        } 
    })),
    on(FloorActions.updateFloorFailure, produce((draftState: FloorState, {error})=>{
        draftState.error = error;
    })),

    on(FloorActions.updatePartialFloor, produce((draftState: FloorState, {url, floor})=>{})),
    on(FloorActions.updatePartialFloorSuccess, produce((draftState: FloorState, {floor})=>{
        if (draftState.allFloors.has(floor.url)){
            draftState.allFloors.set(floor.url, floor);
            draftState.error = null;
        } 
    })),
    on(FloorActions.updatePartialFloorFailure, produce((draftState: FloorState, {error})=>{
        draftState.error = error;
    })),
 );

 /**
  * Função reducer exportada. Isso é necessário, pois 
  * a chamada de função não é suportada pelo compilador AOT.
  */
 export function reducer(state: FloorState| undefined, action: Action){
     return floorReducer(state, action);
 }

 /**
  * Retorna o estado floors.
  * @param state 
  */
 export const selectFloor = (state: AppState) => state.floors;

/**
 * Retorna todas os andares dos equipamentos.
 */
export const selectAllFloors = createSelector(
     selectFloor,
     (floors: FloorState) => floors.allFloors,
);
 