import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as EquipamentActions from './equipament.actions';
import { Equipament, Status } from  '../../models/equipament.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';
import * as utils from 'src/utils';

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
        console.log("Carregamendo equipamentos...", equipaments);
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
 * Retorna um equipamento especificado pelo o identificador.
 */
export const selectEquipamentByKey= createSelector(
    selectAllEquipaments,
    (equipaments: Map<string, Equipament>, props: any) => equipaments.get(props.key),
);

/**
 * Retorna um array com todos os computadores
 */
export const selectComputers = createSelector(
    selectEquipaments,
    (equipaments: Equipament[], props) => {
        if(props.local){
            if(props.local === utils.PRM_ID){
                return equipaments.filter(e => e.isComputer && e.isPRM);
            }else if (props.local === utils.PRPI_ID){
                return equipaments.filter(e => e.isComputer && (!e.isPRM));
            }
        }
        return equipaments.filter(e => e.isComputer);
    },
);

/**
 * Retorna o array de computadores no WSUS
 */
export const selectWSUS = createSelector(
    selectComputers,
    (computers: Equipament[]) => computers.filter(c => c.status_wsus == true),
);
/**
 * Retorna o array de computadores no Zenworks
 */
export const selectZENWORKS = createSelector(
    selectComputers,
    (computers: Equipament[]) => computers.filter(c => c.status_zenworks == true),
);
/**
 * Retorna o array de computadores no Trend
 */
export const selectTREND = createSelector(
    selectComputers,
    (computers: Equipament[]) => computers.filter(c => c.status_trend == true),
);

/**
 * Retorna a quantidade de computadores no WSUS
 */
export const getCountWSUS = createSelector(
    selectWSUS,
    (computers: Equipament[]) => computers.length,
);
/**
 * Retorna a quantidade de computadores no Zenworks
 */
export const getCountZENWORKS = createSelector(
    selectZENWORKS,
    (computers: Equipament[]) => computers.length,
);
/**
 * Retorna a quantidade de computadores no Trend
 */
export const getCountTREND = createSelector(
    selectTREND,
    (computers: Equipament[]) => computers.length,
);

/**
 * Retorna todos os equipamentos dentro da política
 */
export const selectInPolicy = createSelector(
    selectComputers,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.policy === true),
);

/**
 * Retorna todos os equipamentos fora da política.
 */
export const selectOutPolicy = createSelector(
    selectComputers,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.policy === false),
);
/**
 * Retorna todos os equipamentos em uso
 */
export const selectUse = createSelector(
    selectComputers,
    (eqts: Equipament[]) => eqts.filter(eqt => {
        return eqt.status === Status.Usado;
    }),
);
/**
 * Retorna todos os equipamentos para doação (com defeito)
 */
export const selectDonation = createSelector(
    selectComputers,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status === Status.Doação),
);
/**
 * Retorna todos os equipamentos novos na caixa
 */
export const selectNew = createSelector(
    selectComputers,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status === Status.Almoxarifado),
);
/**
 * Retorna todos os equipamentos no estaleiro
 */
export const selectShipyard = createSelector(
    selectComputers,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status === Status.Estaleiro),
);
/**
 * Retorna todos os equipamentos Sucata/Doação
 */ 
export const selectTrash = createSelector(
    selectComputers,
    (eqts: Equipament[]) => eqts.filter(eqt => eqt.status === Status.Sucata),
);
/**
 * Retorna todos os equipamentos fora ou dentro da política e com defeito.
 */
export const selectPolicyDonation= createSelector(
    selectTrash,
    (eqts: Equipament[], props) => eqts.filter(eqt => eqt.policy === props.policy),
);
 /**
 * Retorna todos os equipamentos fora ou dentro da política disponíveis para uso.
 */
export const selectPolicyShipyard = createSelector(
    selectShipyard,
    (eqts: Equipament[], props) => eqts.filter(eqt => eqt.policy === props.policy),
);
 /**
 * Retorna todos os equipamentos fora ou dentro da política sendo usado pela PR/PI.
 */
export const selectPolicyUse = createSelector(
    selectUse,
    (eqts: Equipament[], props) => eqts.filter(eqt => eqt.policy == props.policy),
);
/**
 * Retorna todos os equipamentos fora  ou dentro da política e sem uso (Sucata).
 */
export const selectPolicyTrash = createSelector(
    selectTrash,
    (eqts: Equipament[], props) => eqts.filter(eqt => eqt.policy == props.policy),
);

 /**
 * Retorna todos os equipamentos dentro ou fora da política e sem uso, novos na caixa.
 */
export const selectPolicyNew = createSelector(
    selectNew,
    (eqts: Equipament[], props) => eqts.filter(eqt => eqt.policy == props.policy),
);

/**
 * Retorna a quantidade de equipamentos em uso.
 */
export const getCountUse = createSelector(
    selectUse,
    (eqts: Equipament[]) => eqts.length,

);
/**
 * Retorna a quantidade de equipamentos em uso baseado 
 * na policy
 */
export const getCountPolicyUse = createSelector(
    selectPolicyUse,
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
 * Retorna a qauntidade de equipamentos para doação baseado 
 * na propriedade policy
 */
export const getCountPolicyDonation = createSelector(
    selectPolicyDonation,
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
 * Retorna a quantidade de equipamentos novos na caixa
 * na propriedade policy.
 */
export const getCountPolicyNew = createSelector(
    selectPolicyNew,
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
 * Retorna a quantidade de equipamentos no estaleiro baseado
 * na propriedade policy.
 */
export const getCountPolicyShipyard = createSelector(
    selectPolicyShipyard,
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
 * Retorna a quantidade de equipamentos na sucata/doação.
 */
export const getCountPolicyTrash = createSelector(
    selectPolicyTrash,
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