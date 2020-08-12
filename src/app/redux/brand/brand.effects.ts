import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BackendService } from '../../backend/backend.service';
import * as BrandActions from './brand.actions';
import { Brand } from '../../models/brand.model';
import { mergeMap, catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BrandEffects{
    
    /**
     * Realiza a comunicação o serviço backend para 
     * a criação da marca no servidor do backend.
     */
    createBrand$ = createEffect(() => this.actions$.pipe(
        ofType(BrandActions.createBrand),
        mergeMap( action => {
            let brand = {name: action.name};
            return this.api.create<Brand>('brands', brand)
            .pipe(
                map(response => {
                    let newBrand = <Brand>response.body;
                    return BrandActions.createBrandSuccess({brand:newBrand});
                })
            )}
        ),
        catchError( error =>{
            return of(BrandActions.loadBrandsFailure({error}));
        })

    ));

    loadBrands$ = createEffect(() => this.actions$.pipe(
        ofType(BrandActions.loadBrands),
        switchMap( action => this.api.listAll<Brand>('brands')
            .pipe( map(response => {
                let results = response.body["results"];
                let brands = new Map();
                results.forEach(element => {
                    brands.set(element.url, element);
                });
                return BrandActions.loadBrandsSuccess({brands});
            }))
        ),
        catchError( error => {
            return of(BrandActions.loadBrandsFailure({error}));
        })
    ));

    deleteBrand$ = createEffect(() => this.actions$.pipe(
        ofType(BrandActions.deleteBrand),
        switchMap( action => this.api.destroyById<Brand>(action.url)
            .pipe( map(response => {
                return BrandActions.deleteBrandSucess({url: action.url});
            })
        )),
        catchError( error => of(BrandActions.deleteBrandFailure({error}))),
    ));

    updateBrand$ = createEffect(() => this.actions$.pipe(
        ofType(BrandActions.updateBrand),
        switchMap(action => {
            let brand = action.brand;
            return this.api.updateById(brand.url, brand)
            .pipe(map(response =>{
                let newbrand = <Brand>response.body;
                return BrandActions.updateBrandSuccess({brand: newbrand});
            }))
        }),
        catchError( error => of(BrandActions.updateBrandFailure({error}))),
    ));

    updatePartialBrand$ = createEffect(() => this.actions$.pipe(
        ofType(BrandActions.updatePartialBrand),
        switchMap(action => {
            let url = action.url;
            let brand = action.brand;
            return this.api.partialUpdateById(url, brand)
            .pipe(map(response =>{
                let newbrand = <Brand>response.body;
                return BrandActions.updatePartialBrandSuccess({brand: newbrand});
            }))
        }),
        catchError( error => of(BrandActions.updatePartialBrandFailure({error}))),
    ));

    constructor(
        private api: BackendService,
        private actions$: Actions,
    ){}
}