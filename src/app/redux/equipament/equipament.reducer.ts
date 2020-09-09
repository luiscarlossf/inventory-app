import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as EquipamentActions from './equipament.actions';
import { Equipament, Status } from  '../../models/equipament.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';

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
 * @interface
 * Propriedades dos seletores
 */
export interface PropsSelector{
    policy?: boolean;
}

/**
 * Estado inicial para equipaments
 */
const initialState: EquipamentState = {
    allEquipaments: new Map<string, Equipament>(),
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
 * Retorna a propriedade allEquipamentos
 */
export const selectAllEquipaments = createSelector(
    selectEquipament,
    (equipaments: EquipamentState) => equipaments.allEquipaments,
);

/**
 * Retorna todos os equipamentos do ramo.
 */
export const selectEquipaments = createSelector(
    selectAllEquipaments,
    (allEquipaments: Map<string, Equipament>) => [...allEquipaments.values()],
);

/**
 * Retorna todos os equipamentos em uso
 */
export const selectUse = createSelector(
    selectEquipaments,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status == Status.Usado),
);
/**
 * Retorna todos os equipamentos para doação (com defeito)
 */
export const selectDonation = createSelector(
    selectEquipaments,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status == Status.Doação),
);
/**
 * Retorna todos os equipamentos novos na caixa
 */
export const selectNew = createSelector(
    selectEquipaments,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status == Status.Almoxarifado),
);
/**
 * Retorna todos os equipamentos no estaleiro
 */
export const selectShipyard = createSelector(
    selectEquipaments,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status == Status.Estaleiro),
);
/**
 * Retorna todos os equipamentos Sucata/Doação
 */ 
export const selectTrash = createSelector(
    selectEquipaments,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status == Status.Sucata),
);

/**
 * Retorna a quantidade de equipamentos em uso.
 */
export const getCountUse = createSelector(
    selectUse,
    (eqts: Equipament[]) => eqts.length,

);

/**
 * Retorna a qauntidade de equipamentos para doação
 */
export const getCountDonation = createSelector(
    selectDonation,
    (eqts: Equipament[]) => eqts.length,

);


/**
 * Retorna a quantidade de equipamentos novos na caixa.
 */
export const getCountNew = createSelector(
    selectNew,
    (eqts: Equipament[]) => eqts.length,

);

/**
 * Retorna a quantidade de equipamentos no estaleiro.
 */
export const getCountShipyard = createSelector(
    selectShipyard,
    (eqts: Equipament[]) => eqts.length,

);


 /**
 * Retorna a quantidade de equipamentos na sucata/doação.
 */
export const getCountTrash = createSelector(
    selectTrash,
    (eqts: Equipament[]) => eqts.length,

);


/**
 * Retorna a quantidade de equipamentos na PR/PI
 */
export const getCountTotalPRPI = createSelector(
    getCountUse,
    getCountDonation,
    getCountNew,
    getCountShipyard,
    getCountTrash,
    (c1:number, c2:number,c3:number,c4:number,c5:number) => (c1 + c2 + c3 + c4 + c5),
);

 /**
  * Retorna a quantidade de equipamentos utilizáveis
  */
 export const getCountUseful = createSelector(
    getCountUse,
    getCountShipyard,
    getCountNew,
    ( cont1: number,
      cont2: number,
      cont3: number) => cont1 + cont2 + cont3,
);


export const generalStatics = createSelector(
    getCountUseful,
    getCountTotalPRPI,
    getCountUse,
    getCountDonation,
    getCountNew,
    getCountShipyard,
    getCountTrash,
    (ul:number, tl:number,u:number,d:number, n:number, s:number, t:number) =>{
        let statics = new Map<string, number>();
        statics.set('Equipamentos utilizáveis', ul);
        statics.set('Total de equipamentos na PR/PI', tl);
        statics.set('Equipamentos em uso', u);
        statics.set('Equipamentos para doação', d);
        statics.set('Equipamentos novos na caixa', n);
        statics.set('Equipamentos no estaleiro', s);
        statics.set('Equipamentos sucata/doação', t);
        return statics;
    },
);