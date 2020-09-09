import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as ComputerActions from './computer.actions';
import { Computer } from  '../../models/computer.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';
import { Equipament, Status } from 'src/app/models/equipament.model';

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
 * @interface
 * Propriedades dos seletores
 */
export interface PropsSelector{
    policy?: boolean;
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

/**
 * Retorna todos os equipamentos dentro da política
 */
export const selectInPolicy = createSelector(
    selectComputers,
    (eqts: Computer[]) => eqts.filter(eqt => eqt.policy === true),
);

/**
 * Retorna todos os equipamentos fora da política.
 */
export const selectOutPolicy = createSelector(
    selectComputers,
    (eqts: Computer[]) => eqts.filter(eqt => eqt.policy == false),
);
/**
 * Retorna todos os equipamentos em uso
 */
export const selectUse = createSelector(
    selectComputers,
    (eqts: Computer[]) => eqts.filter(eqt => eqt.status == Status.Usado),
);
/**
 * Retorna todos os equipamentos para doação (com defeito)
 */
export const selectDonation = createSelector(
    selectComputers,
    (eqts: Computer[]) => eqts.filter(eqt => eqt.status == Status.Doação),
);
/**
 * Retorna todos os equipamentos novos na caixa
 */
export const selectNew = createSelector(
    selectComputers,
    (eqts: Computer[]) => eqts.filter(eqt => eqt.status == Status.Almoxarifado),
);
/**
 * Retorna todos os equipamentos no estaleiro
 */
export const selectShipyard = createSelector(
    selectComputers,
    (eqts: Computer[]) => eqts.filter(eqt => eqt.status == Status.Estaleiro),
);
/**
 * Retorna todos os equipamentos Sucata/Doação
 */ 
export const selectTrash = createSelector(
    selectComputers,
    (eqts: Computer[]) => eqts.filter(eqt => eqt.status == Status.Sucata),
);
/**
 * Retorna todos os equipamentos fora ou dentro da política e com defeito.
 */
export const selectPolicyDonation= createSelector(
    selectTrash,
    (eqts: Computer[], props:PropsSelector) => eqts.filter(eqt => eqt.policy == props.policy),
);
 /**
 * Retorna todos os equipamentos fora ou dentro da política disponíveis para uso.
 */
export const selectPolicyShipyard = createSelector(
    selectShipyard,
    (eqts: Computer[], props:PropsSelector) => eqts.filter(eqt => eqt.policy == props.policy),
);
 /**
 * Retorna todos os equipamentos fora ou dentro da política sendo usado pela PR/PI.
 */
export const selectPolicyUse = createSelector(
    selectUse,
    (eqts: Computer[], props: PropsSelector) => eqts.filter(eqt => eqt.policy == props.policy),
);
/**
 * Retorna todos os equipamentos fora  ou dentro da política e sem uso (Sucata).
 */
export const selectPolicyTrash = createSelector(
    selectTrash,
    (eqts: Computer[], props: PropsSelector) => eqts.filter(eqt => eqt.policy == props.policy),
);

 /**
 * Retorna todos os equipamentos dentro ou fora da política e sem uso, novos na caixa.
 */
export const selectPolicyNew = createSelector(
    selectNew,
    (eqts: Computer[], props: PropsSelector) => eqts.filter(eqt => eqt.policy == props.policy),
);

/**
 * Retorna a quantidade de equipamentos em uso.
 */
export const getCountUse = createSelector(
    selectUse,
    (eqts: Computer[]) => eqts.length,

);
/**
 * Retorna a quantidade de equipamentos em uso baseado 
 * na policy
 */
export const getCountPolicyUse = createSelector(
    selectPolicyUse,
    (eqts: Computer[]) => eqts.length,
);

/**
 * Retorna a qauntidade de equipamentos para doação
 */
export const getCountDonation = createSelector(
    selectDonation,
    (eqts: Computer[]) => eqts.length,

);

/**
 * Retorna a qauntidade de equipamentos para doação baseado 
 * na propriedade policy
 */
export const getCountPolicyDonation = createSelector(
    selectPolicyDonation,
    (eqts: Computer[]) => eqts.length,

);

/**
 * Retorna a quantidade de equipamentos novos na caixa.
 */
export const getCountNew = createSelector(
    selectNew,
    (eqts: Computer[]) => eqts.length,

);
/**
 * Retorna a quantidade de equipamentos novos na caixa
 * na propriedade policy.
 */
export const getCountPolicyNew = createSelector(
    selectPolicyNew,
    (eqts: Computer[]) => eqts.length,

);

/**
 * Retorna a quantidade de equipamentos no estaleiro.
 */
export const getCountShipyard = createSelector(
    selectShipyard,
    (eqts: Computer[]) => eqts.length,

);

/**
 * Retorna a quantidade de equipamentos no estaleiro baseado
 * na propriedade policy.
 */
export const getCountPolicyShipyard = createSelector(
    selectPolicyShipyard,
    (eqts: Computer[]) => eqts.length,

);

 /**
 * Retorna a quantidade de equipamentos na sucata/doação.
 */
export const getCountTrash = createSelector(
    selectTrash,
    (eqts: Computer[]) => eqts.length,

);
 /**
 * Retorna a quantidade de equipamentos na sucata/doação.
 */
export const getCountPolicyTrash = createSelector(
    selectPolicyTrash,
    (eqts: Computer[]) => eqts.length,

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

/**
 * Retorna os números de computadores dentro os seguintes critérios:
 * Doação
 * Estaleiro
 * Em uso
 * Novos
 * Sucata
 */
export const policyStatics= createSelector(
    getCountPolicyDonation,
    getCountPolicyShipyard,
    getCountPolicyUse,
    getCountPolicyNew,
    getCountPolicyTrash,
    (d:number, s:number,u:number,n:number, t:number) =>{
        let statics = new Map<string, number>();
        statics.set('Com defeito (Doação)', d);
        statics.set('Disponível para uso eventual', s);
        statics.set('Em uso', u);
        statics.set('Sem uso (Novos na caixa)', n);
        statics.set('Sem uso (Sucata/Doação)', t);
        return statics;
    },
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
 