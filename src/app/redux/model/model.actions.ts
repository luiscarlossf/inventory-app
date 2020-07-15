import { createAction, props } from '@ngrx/store';
import { Model } from './model.model';

/**
 * Ação que cria um novo modelo.
 * Recebe como payload o nome do modelo. 
 */
export const createModel = createAction(
    '[Equipaments Page] Create Model',
    props<{name: string}>(),
);

/**
 * Ação conclui com sucesso a criação de um modelo.
 * Recebe como payload o modelo criado. 
 */
export const createModelSuccess = createAction(
    '[Backend API] Create Model Success',
    props<{model: Model}>(),
);

/**
 * Ação conclui com falha a criação de um novo modelo.
 * Recebe como payload o erro ocorrido. 
 */
export const createModelFailure = createAction(
    '[Backend API] Create Model Failure',
    props<{error: Error}>(),
);


/**
 * Ação que carrega todas os modelos armazenados no
 * backend.
 */
export const loadModels = createAction(
    '[Backend API] Load Models'
);


/**
 * Ação conclui com sucesso o carregamento dos modelos.
 * Recebe como payload os modelos carregadas. 
 */
export const loadModelsSuccess = createAction(
    '[Backend API] Load Models Success',
    props<{models: Map<string, Model>}>(),
);

/**
 * Ação conlcui com falha o carregamento dos modelos.
 * Recebe como payload o erro ocorrido. 
 */
export const loadModelsFailure = createAction(
    '[Backend API] Load Models Failure',
    props<{error: Error}>(),
);

/**
 * Ação deleta um modelo. 
 * Recebe como payload a url do modelo.
 */
export const deleteModel = createAction(
    '[Equipaments Page] Delete Model',
    props<{url: string}>(),
);

/**
 * Ação conclui com sucesso a deleção de um modelo.
 * Recebe como payload a url do modelo.
 */
export const deleteModelSucess = createAction(
    '[Backend API] Delete Model Success',
    props<{url: string}>(),
);

/**
 * Ação conclui com falha a deleção de um modelo.
 * Recebe como payload o erro ocorrido.
 */
export const deleteModelFailure = createAction(
    '[Backend API] Delete Model Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza um modelo.
 * Recebe como payload o modelo atualizado.
 */
export const updateModel = createAction(
    '[Equipaments Page] Update Model',
    props<{model: Model}>(),
);

/**
 * Ação conclui com sucesso a atualização de um modelo.
 * Recebe como payload o modelo atualizado.
 */
export const updateModelSuccess = createAction(
    '[Backend API] Update Model Success',
    props<{model: Model}>(),
);

/**
 * Ação conclui com falha a atualização de um modelo.
 * Recebe como payload o erro ocorrido.
 */
export const updateModelFailure = createAction(
    '[Backend API] Update Model Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza parcialmente um modelo.
 * Recebe como payload o modelo atualizado.
 */
export const updatePartialModel = createAction(
    '[Equipaments Page] Update Partial Model',
    props<{url: string, model: any}>(),
);

/**
 * Ação conclui com sucesso a atualização parcial de um modelo.
 * Recebe como payload o modelo atualizado.
 */
export const updatePartialModelSuccess = createAction(
    '[Backend API] Update Partial Model Success',
    props<{model: Model}>(),
);

/**
 * Ação conclui com falha a atualização parcial de um modelo.
 * Recebe como payload o erro ocorrido.
 */
export const updatePartialModelFailure = createAction(
    '[Backend API] Update Partial Model Failure',
    props<{error: Error}>(),
);