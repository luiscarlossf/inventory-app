import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../services/backend/backend.service';
import * as CategoryActions from './category.actions';
import { Category } from '../../models/category.model';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffects{
    
    /**
     * Realiza a comunicação o serviço backend para 
     * a criação da categoria no servidor do backend.
     */
    createCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.createCategory),
        mergeMap( action => {
            let category = {name: action.name};
            return this.api.create<Category>('categories', category)
            .pipe(
                map(response => {
                    let newCategory = <Category>response.body;
                    return CategoryActions.createCategorySuccess({category:newCategory});
                })
            )}
        ),
        catchError( error =>{
            return of(CategoryActions.loadCategoriesFailure({error}));
        })

    ));

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.loadCategories),
        switchMap( action => this.api.listAll<Category>('categories')
            .pipe( map(response => {
                let results = response.body["results"];
                let categories = new Map();
                results.forEach(element => {
                    categories.set(element.url, element);
                });
                return CategoryActions.loadCategoriesSuccess({categories});
            }))
        ),
        catchError( error => {
            return of(CategoryActions.loadCategoriesFailure({error}));
        })
    ));

    deleteCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.deleteCategory),
        switchMap( action => this.api.destroyById<Category>(action.url)
            .pipe( map(response => {
                return CategoryActions.deleteCategorySucess({url: action.url});
            })
        )),
        catchError( error => of(CategoryActions.deleteCategoryFailure({error}))),
    ));

    updateCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.updateCategory),
        switchMap(action => {
            let category = action.category;
            return this.api.updateById(category.url, category)
            .pipe(map(response =>{
                let newCategory = <Category>response.body;
                return CategoryActions.updateCategorySuccess({category: newCategory});
            }))
        }),
        catchError( error => of(CategoryActions.updateCategoryFailure({error}))),
    ));

    updatePartialCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.updatePartialCategory),
        switchMap(action => {
            let url = action.url;
            let category = action.category;
            return this.api.partialUpdateById(url, category)
            .pipe(map(response =>{
                let newCategory = <Category>response.body;
                return CategoryActions.updatePartialCategorySuccess({category: newCategory});
            }))
        }),
        catchError( error => of(CategoryActions.updatePartialCategoryFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private actions$: Actions,
    ){}
}