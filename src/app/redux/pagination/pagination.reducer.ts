import { Action, createReducer, on } from '@ngrx/store'
import * as paginationActions from './pagination.actions';
import { produce } from 'immer';
export interface Pagination{
    currentPage: number;
    count: number;
    sizePage: number;
    totalPages: number;
    pages: {[page:number]:{ids:Array<string>; fetching: boolean;}};
}
/**
 * @interface
 */
export interface PaginationState{
    /**
     * @type {object} Paginação dos elementos.
     */

    equipaments:  Pagination;
    computers: Pagination;
}

export const paginationInitial: Pagination ={
    currentPage: undefined,
    count: undefined,
    sizePage: 10,
    totalPages: undefined,
    pages: {},
}

export const initialState: PaginationState= {
    equipaments: paginationInitial,
    computers: paginationInitial,
}

const paginationReducer = createReducer(
    initialState,
    on(paginationActions.requestPage, produce((draftState:PaginationState, {payload, meta})=>{
        if(draftState[meta.endpoint]){
            draftState[meta.endpoint].currentPage = payload.currentPage;
            draftState[meta.endpoint].pages[payload.page] = {
                ids:[], 
                fetching:true
            };
        }
    })),
    on(paginationActions.receivePage, produce((draftState:PaginationState, {payload, meta})=>{
        if(draftState[meta.endpoint]){
            draftState[meta.endpoint].pages[payload.page] = {
                ids: payload.results.filter(item => item.id), 
                fetching:false
            };
        }
    })),
);

export function reducer(state: PaginationState| undefined, action: Action){
    return paginationReducer(state, action);
}