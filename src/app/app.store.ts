import { 
    Store,
    createStore,
    StoreEnhancer,
    compose,
 } from 'redux';
import { 
    AppState,
    default as reducer
 } from './app.reducer';
import { Injectable, InjectionToken } from '@angular/core';

//Token para provide
export const AppStore = new InjectionToken('App.store'); 

/** Permite que visualizar o estado da aplicação com o Redux Devtools.*/
const devtools: StoreEnhancer<AppState> =
    window['devToolsExtension'] ?
    window['devToolsExtension']() : f => f;

/**Store da aplicação */
export function createAppStore(): Store<AppState> {
    return createStore(
        reducer,
        compose(devtools)
    );
}

export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore }
];