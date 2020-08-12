import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as BrandActions from './brand.actions';
import { Brand } from  '../../models/brand.model';
import { produce } from 'immer';
import { AppState } from '../../app.state';

/**
 * @interface
 */
export interface BrandState{
    /**
     * @type {object} Marcas dos equipamentos logados.
     */
    allBrands: Map<string, Brand>;
    error: Error;
}

/**
 * Estado inicial para brands
 */
const initialState: BrandState = {
    allBrands: null,
    error: null,
};

/**
 * Cria a função reducer que manipula as transações 
 * de estado do branch brands de maneira imutável.
 */

 const brandReducer = createReducer(
     initialState,

     on(BrandActions.createBrand, produce((draftState: BrandState, {name})=>{})),
     on(BrandActions.createBrandSuccess, produce((draftState: BrandState, {brand})=>{
         draftState.allBrands.set(brand.url, brand);
         draftState.error = null;
     })),
     on(BrandActions.createBrandFailure, produce((draftState: BrandState, {error})=>{
         draftState.error = error;
     })),

     on(BrandActions.loadBrands, produce((draftState: BrandState)=>{})),
     on(BrandActions.loadBrandsSuccess, produce((draftState: BrandState, {brands})=>{
         draftState.allBrands = brands;
         draftState.error = null;
     })),
     on(BrandActions.loadBrandsFailure, produce((draftState: BrandState, {error})=>{
        draftState.error = error;
    })),

    on(BrandActions.deleteBrand, produce((draftState: BrandState, {url})=>{})),
    on(BrandActions.deleteBrandSucess, produce((draftState: BrandState, {url})=>{
        if (draftState.allBrands.has(url)){
            draftState.allBrands.delete(url);
            draftState.error = null;
        }
    })),
    on(BrandActions.deleteBrandFailure, produce((draftState: BrandState, {error})=>{
        draftState.error = error;
    })),

    on(BrandActions.updateBrand, produce((draftState: BrandState, {brand})=>{})),
    on(BrandActions.updateBrandSuccess, produce((draftState: BrandState, {brand})=>{
        if (draftState.allBrands.has(brand.url)){
            draftState.allBrands.set(brand.url, brand);
            draftState.error = null;
        } 
    })),
    on(BrandActions.updateBrandFailure, produce((draftState: BrandState, {error})=>{
        draftState.error = error;
    })),

    on(BrandActions.updatePartialBrand, produce((draftState: BrandState, {url, brand})=>{})),
    on(BrandActions.updatePartialBrandSuccess, produce((draftState: BrandState, {brand})=>{
        if (draftState.allBrands.has(brand.url)){
            draftState.allBrands.set(brand.url, brand);
            draftState.error = null;
        } 
    })),
    on(BrandActions.updatePartialBrandFailure, produce((draftState: BrandState, {error})=>{
        draftState.error = error;
    })),
 );

 /**
  * Função reducer exportada. Isso é necessário, pois 
  * a chamada de função não é suportada pelo compilador AOT.
  */
 export function reducer(state: BrandState| undefined, action: Action){
     return brandReducer(state, action);
 }

 /**
  * Retorna o estado brands.
  * @param state 
  */
 export const selectBrand = (state: AppState) => state.brands;

/**
 * Retorna todas as marcas dos equipamentos.
 */
export const selectAllBrands = createSelector(
     selectBrand,
     (brands: BrandState) => brands.allBrands,
);
 