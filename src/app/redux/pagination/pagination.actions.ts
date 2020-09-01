import { createAction, props } from '@ngrx/store';

export const requestPage = createAction(
    '[Backend API] Request Page',
    props<{payload:{page_size:number, page:number}, meta:{endpoint:string}}>(),
);

export const receivePage = createAction(
    '[Backend API] Receive Page',
    props<{payload:{page:any, results:any[]}, meta:{endpoint:string}}>(),
);

export const receivePageFailure = createAction(
    '[Backend API] Receive Page Failure',
    props<{error:any}>(),
);