import { createAction, props} from '@ngrx/store';
import { User } from './user.model';

/** Ação que loga o usuário no sistema.
 * Recebe como payload o email e a senha do usuário a ser logado.
*/
export const login = createAction(
    '[Login Page] Login',
    props<{email: string, password: string, connected: boolean}>(),
);

/**
 * Ação executada quando um login do é realizado
 * com sucesso.
 */
export const loginSuccess = createAction(
    '[Backend API] Login Success',
    props<{user:User}>(),
);

/**
 * Ação realizada quando ocorre uma falha durante
 * o login.
 */
export const loginFailure = createAction(
    '[Backend API] Login Failure',
    props<{error: any}>(),
);

/** Ação que desloga o usuário do sistema.*/
export const logout= createAction(
    '[Header Page] Logout',
);

/**
 * Ação que mantém o usuário corrente conectado mesmo depois de 
 * fechar a janela do navegador. 
 * */
export const keepConnected = createAction(
    '[Login Page] Keep connected',
);