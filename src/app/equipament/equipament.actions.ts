import { createAction, props } from '@ngrx/store';
import { Equipament, Status } from './equipament.model';

/**
 * Ação que cria um novo equipamento.
 * Recebe como payload o nome do equipamento. 
 */
export const createEquipament = createAction(
    '[Equipaments Page] Create Equipament',
    props<{
        patrimony: string,
        category: string,
        status: Status,
        brand?: string,
        model?: string,
        ua?: string,
        floor?: string,
        warranty_start?: Date,
        warranty_end?: Date,
        acquisition_date?: Date,
        acquisition_value?: number
    }>(),
);

/**
 * Ação conclui com sucesso a criação de um equipamento.
 * Recebe como payload o equipamento criado. 
 */
export const createEquipamentSuccess = createAction(
    '[Backend API] Create Equipament Success',
    props<{equipament: Equipament}>(),
);

/**
 * Ação conclui com falha a criação de um novo equipamento.
 * Recebe como payload o erro ocorrido. 
 */
export const createEquipamentFailure = createAction(
    '[Backend API] Create Equipament Failure',
    props<{error: Error}>(),
);


/**
 * Ação que carrega todas os equipamentos armazenados no
 * backend.
 */
export const loadEquipaments = createAction(
    '[Backend API] Load Equipaments'
);


/**
 * Ação conclui com sucesso o carregamento dos equipamentos.
 * Recebe como payload os equipamentos carregadas. 
 */
export const loadEquipamentsSuccess = createAction(
    '[Backend API] Load Equipaments Success',
    props<{equipaments: Map<string, Equipament>}>(),
);

/**
 * Ação conlcui com falha o carregamento dos equipamentos.
 * Recebe como payload o erro ocorrido. 
 */
export const loadEquipamentsFailure = createAction(
    '[Backend API] Load Equipaments Failure',
    props<{error: Error}>(),
);

/**
 * Ação deleta um equipamento. 
 * Recebe como payload a url do equipamento.
 */
export const deleteEquipament = createAction(
    '[Equipaments Page] Delete Equipament',
    props<{url: string}>(),
);

/**
 * Ação conclui com sucesso a deleção de um equipamento.
 * Recebe como payload a url do equipamento.
 */
export const deleteEquipamentSucess = createAction(
    '[Backend API] Delete Equipament Success',
    props<{url: string}>(),
);

/**
 * Ação conclui com falha a deleção de um equipamento.
 * Recebe como payload o erro ocorrido.
 */
export const deleteEquipamentFailure = createAction(
    '[Backend API] Delete Equipament Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza um equipamento.
 * Recebe como payload o equipamento atualizado.
 */
export const updateEquipament = createAction(
    '[Equipaments Page] Update Equipament',
    props<{equipament: Equipament}>(),
);

/**
 * Ação conclui com sucesso a atualização de um equipamento.
 * Recebe como payload o equipamento atualizado.
 */
export const updateEquipamentSuccess = createAction(
    '[Backend API] Update Equipament Success',
    props<{equipament: Equipament}>(),
);

/**
 * Ação conclui com falha a atualização de um equipamento.
 * Recebe como payload o erro ocorrido.
 */
export const updateEquipamentFailure = createAction(
    '[Backend API] Update Equipament Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza parcialmente um equipamento.
 * Recebe como payload o equipamento atualizado.
 */
export const updatePartialEquipament = createAction(
    '[Equipaments Page] Update Partial Equipament',
    props<{url: string, equipament: any}>(),
);

/**
 * Ação conclui com sucesso a atualização parcial de um equipamento.
 * Recebe como payload o equipamento atualizado.
 */
export const updatePartialEquipamentSuccess = createAction(
    '[Backend API] Update Partial Equipament Success',
    props<{equipament: Equipament}>(),
);

/**
 * Ação conclui com falha a atualização parcial de um equipamento.
 * Recebe como payload o erro ocorrido.
 */
export const updatePartialEquipamentFailure = createAction(
    '[Backend API] Update Partial Equipament Failure',
    props<{error: Error}>(),
);