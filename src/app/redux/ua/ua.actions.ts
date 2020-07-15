import { createAction, props } from '@ngrx/store';
import { Ua } from './ua.model';

/**
 * Ação que cria uma nova ua.
 * Recebe como payload o nome da ua. 
 */
export const createUa = createAction(
    '[Equipaments Page] Create Ua',
    props<{code: string, name: string, floor?:string}>(),
);

/**
 * Ação conclui com sucesso a criação de uma ua.
 * Recebe como payload a ua criada. 
 */
export const createUaSuccess = createAction(
    '[Backend API] Create Ua Success',
    props<{ua: Ua}>(),
);

/**
 * Ação conclui com falha a criação de uma nova ua.
 * Recebe como payload o erro ocorrido. 
 */
export const createUaFailure = createAction(
    '[Backend API] Create Ua Failure',
    props<{error: Error}>(),
);


/**
 * Ação que carrega todas as uas armazenadas no
 * backend.
 */
export const loadUas = createAction(
    '[Backend API] Load Uas'
);


/**
 * Ação conclui com sucesso o carregamento das uas.
 * Recebe como payload as uas carregadas. 
 */
export const loadUasSuccess = createAction(
    '[Backend API] Load Uas Success',
    props<{uas: Map<string, Ua>}>(),
);

/**
 * Ação conlcui com falha o carregamento das uas.
 * Recebe como payload o erro ocorrido. 
 */
export const loadUasFailure = createAction(
    '[Backend API] Load Uas Failure',
    props<{error: Error}>(),
);

/**
 * Ação deleta uma ua. 
 */
export const deleteUa = createAction(
    '[Equipaments Page] Delete Ua',
    props<{url: string}>(),
);

/**
 * Ação conclui com sucesso a deleção de uma ua.
 * Recebe como payload a url da ua.
 */
export const deleteUaSucess = createAction(
    '[Backend API] Delete Ua Success',
    props<{url: string}>(),
);

/**
 * Ação conclui com falha a deleção de uma ua.
 * Recebe como payload o erro ocorrido.
 */
export const deleteUaFailure = createAction(
    '[Backend API] Delete Ua Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza uma ua.
 * Recebe como payload a ua atualizada.
 */
export const updateUa = createAction(
    '[Equipaments Page] Update Ua',
    props<{ua: Ua}>(),
);

/**
 * Ação conclui com sucesso a atualização de uma ua.
 * Recebe como payload a ua atualizada.
 */
export const updateUaSuccess = createAction(
    '[Backend API] Update Ua Success',
    props<{ua: Ua}>(),
);

/**
 * Ação conclui com falha a atualização de uma ua.
 * Recebe como payload o erro ocorrido.
 */
export const updateUaFailure = createAction(
    '[Backend API] Update Ua Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza parcialmente uma ua.
 * Recebe como payload a ua atualizada.
 */
export const updatePartialUa = createAction(
    '[Equipaments Page] Update Partial Ua',
    props<{url: string, ua: any}>(),
);

/**
 * Ação conclui com sucesso a atualização parcial de uma ua.
 * Recebe como payload a ua atualizada.
 */
export const updatePartialUaSuccess = createAction(
    '[Backend API] Update Partial Ua Success',
    props<{ua: Ua}>(),
);

/**
 * Ação conclui com falha a atualização parcial de uma ua.
 * Recebe como payload o erro ocorrido.
 */
export const updatePartialUaFailure = createAction(
    '[Backend API] Update Partial Ua Failure',
    props<{error: Error}>(),
);