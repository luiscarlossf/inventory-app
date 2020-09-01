import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { scheduled, of} from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { BackendService } from '../../services/backend/backend.service';
import * as PaginationActions from './pagination.actions';

@Injectable()
export class PaginationEffects{

    /**
     * Carrega os resultados nos seus respectivos ramo do estado
     * da aplicação.
     */
    loadResults = createEffect(()=>this.actions$.pipe(
        ofType(PaginationActions.receivePage),
        catchError(error =>{
            return of(PaginationActions.receivePageFailure({error}));
        }),
    ));

    /**
     * Faz a requisição da página para api backend.
     */
    requestPage = undefined

    constructor(
        private api: BackendService,
        private actions$: Actions){}
}