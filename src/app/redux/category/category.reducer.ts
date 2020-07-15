import { createReducer, Action, on, createSelector } from   '@ngrx/store';
import * as CategoryActions from './category.actions';
import { Category } from  './category.model';
import { produce } from 'immer';
import { AppState } from '../app.state';

/**
 * @interface
 */
export interface CategoryState{
    /**
     * @type {object} Marcas dos equipamentos logados.
     */
    allCategories: Map<string, Category>;
    error: Error;
}

/**
 * Estado inicial para categories
 */
const initialState: CategoryState = {
    allCategories: null,
    error: null,
};

/**
 * Cria a função reducer que manipula as transações 
 * de estado do branch categories de maneira imutável.
 */

 const categoryReducer = createReducer(
     initialState,

     on(CategoryActions.createCategory, produce((draftState: CategoryState, {name})=>{})),
     on(CategoryActions.createCategorySuccess, produce((draftState: CategoryState, {category})=>{
         draftState.allCategories.set(category.url, category);
         draftState.error = null;
     })),
     on(CategoryActions.createCategoryFailure, produce((draftState: CategoryState, {error})=>{
         draftState.error = error;
     })),

     on(CategoryActions.loadCategories, produce((draftState: CategoryState)=>{})),
     on(CategoryActions.loadCategoriesSuccess, produce((draftState: CategoryState, {categories})=>{
         draftState.allCategories = categories;
         draftState.error = null;
     })),
     on(CategoryActions.loadCategoriesFailure, produce((draftState: CategoryState, {error})=>{
        draftState.error = error;
    })),

    on(CategoryActions.deleteCategory, produce((draftState: CategoryState, {url})=>{})),
    on(CategoryActions.deleteCategorySucess, produce((draftState: CategoryState, {url})=>{
        if (draftState.allCategories.has(url)){
            draftState.allCategories.delete(url);
            draftState.error = null;
        }
    })),
    on(CategoryActions.deleteCategoryFailure, produce((draftState: CategoryState, {error})=>{
        draftState.error = error;
    })),

    on(CategoryActions.updateCategory, produce((draftState: CategoryState, {category})=>{})),
    on(CategoryActions.updateCategorySuccess, produce((draftState: CategoryState, {category})=>{
        if (draftState.allCategories.has(category.url)){
            draftState.allCategories.set(category.url, category);
            draftState.error = null;
        } 
    })),
    on(CategoryActions.updateCategoryFailure, produce((draftState: CategoryState, {error})=>{
        draftState.error = error;
    })),

    on(CategoryActions.updatePartialCategory, produce((draftState: CategoryState, {url, category})=>{})),
    on(CategoryActions.updatePartialCategorySuccess, produce((draftState: CategoryState, {category})=>{
        if (draftState.allCategories.has(category.url)){
            draftState.allCategories.set(category.url, category);
            draftState.error = null;
        } 
    })),
    on(CategoryActions.updatePartialCategoryFailure, produce((draftState: CategoryState, {error})=>{
        draftState.error = error;
    })),
 );

 /**
  * Função reducer exportada. Isso é necessário, pois 
  * a chamada de função não é suportada pelo compilador AOT.
  */
 export function reducer(state: CategoryState| undefined, action: Action){
     return categoryReducer(state, action);
 }

 /**
  * Retorna o estado categories.
  * @param state 
  */
 export const selectCategory = (state: AppState) => state.categories;

/**
 * Retorna todas as categorias dos equipamentos.
 */
export const selectAllCategories = createSelector(
     selectCategory,
     (categories: CategoryState) => categories.allCategories,
);
 