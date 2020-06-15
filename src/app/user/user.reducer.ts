import { User } from './user.model';
import * as UserActions from './user.actions';
import { Action } from 'redux';
import { BrowserStack } from 'protractor/built/driverProviders';

/**
 * @interface
 */
export interface UsersState{
    /**@type {object} Usuário logado no sistema.*/
    currentUser: User;
};

/** Estado inicial para users */
const initialState: UsersState= {
    currentUser: null
};

/**Reducer do ramo usuários. */
export const UsersReducer = 
function (state: UsersState = initialState, action: Action): UsersState {
    switch(action.type){
        case UserActions.SET_CURRENT_USER:
            const user: User = (<UserActions.SetCurrentUserAction> action).user;
            return {
                currentUser: user
            };
            break;

        default:
            return state;
    }
};
