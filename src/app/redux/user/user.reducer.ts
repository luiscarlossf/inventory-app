import { User } from '../../models/user.model';
import * as UserActions from './user.actions';
import { createReducer, Action, on, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

/**
 * @interface
 */
export interface UserState{
    /**@type {object} Usuário logado no sistema.*/
    currentUser: User;
    keepConnected: boolean;
    error: any;
};

/** Estado inicial para users */
const initialState: UserState= {
    currentUser: null,
    keepConnected: null,
    error: null
};

/**
 * Cria a função reducer que manipula as transações
 * de estado do branch users de maneira imutável.
*/
const userReducer = createReducer(
    initialState,
    on(UserActions.login, (state, { email, password, connected }) => (state)),
    on(UserActions.loginSuccess, (state, { user })=> ({...state, currentUser: user, error: null})),
    on(UserActions.loginFailure, (state, { error })=> ({...state, currentUser: null, error: error})),
    on(UserActions.logout, state => ({
        currentUser:null,
        keepConnected: null,
        error: null
    })),
    on(UserActions.keepConnected, state => ({...state, keepConnected: true}))
);

/**
 * Note: The exported reducer function is necessary as 
 * function calls are not supported by the AOT compiler 
 */
export function reducer(state: UserState | undefined, action: Action){
    return userReducer(state, action);
}
/**
 * Seleciona user do estado da aplicação.
 */
export const selectUser =  (state: AppState) => state.user;

/**
 * Seleciona o usuário corrente do ramo user.
 */
export const selectCurrentUser =  createSelector(
    selectUser,
    (state: UserState) => state.currentUser,
);

/**
 * Seleciona o erro do ramo user.
 */
export const selectError =  (state: UserState) => state.error;

/**
 * Seleciona a propriedade keepConnected do ramo user.
 */
export const selectKeepConnected =  (state: UserState) => state.keepConnected;

/**Retorna o token do usuário corrente */
export const getToken = createSelector(
    selectCurrentUser,
    (selectedUser: User) => {
        return selectedUser.token;
    }
);

