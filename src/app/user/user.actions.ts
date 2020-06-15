import {
    Action,
    ActionCreator
} from 'redux';
import { User } from './user.model';

/** @type {string} Descrição da acão. */
export const SET_CURRENT_USER = '[User] Set Current';

/** Ação que configura o usuário corrente*/
export interface SetCurrentUserAction extends Action{
    user: User;
}

/** @type {function} Criador da ação SET_CURRENT_USER.*/
export const setCurrentUser: ActionCreator<SetCurrentUserAction> = 
(user) => ({
    type: SET_CURRENT_USER,
    user: user
});