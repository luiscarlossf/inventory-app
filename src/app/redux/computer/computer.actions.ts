import { createAction, props } from '@ngrx/store';
import { Status } from '../../models/equipament.model';
import { Computer} from '../../models/computer.model';

/**
 * Ação que cria um novo computador.
 * Recebe como payload o nome do computador. 
 */
export const createComputer = createAction(
    '[Computers Page] Create Computer',
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
        policy?: boolean,
        status_zenworks?: boolean,
        status_trend?: boolean,
        status_wsus?: boolean
    }>(),
);

/**
 * Ação conclui com sucesso a criação de um computador.
 * Recebe como payload o computador criado. 
 */
export const createComputerSuccess = createAction(
    '[Backend API] Create Computer Success',
    props<{computer: Computer}>(),
);

/**
 * Ação conclui com falha a criação de um novo computador.
 * Recebe como payload o erro ocorrido. 
 */
export const createComputerFailure = createAction(
    '[Backend API] Create Computer Failure',
    props<{error: Error}>(),
);


/**
 * Ação que carrega todas os computadores armazenados no
 * backend.
 */
export const loadComputers = createAction(
    '[Backend API] Load Computers'
);


/**
 * Ação conclui com sucesso o carregamento dos computadores.
 * Recebe como payload os computadores carregadas. 
 */
export const loadComputersSuccess = createAction(
    '[Backend API] Load Computers Success',
    props<{computers: Map<string, Computer>}>(),
);

/**
 * Ação conlcui com falha o carregamento dos computadores.
 * Recebe como payload o erro ocorrido. 
 */
export const loadComputersFailure = createAction(
    '[Backend API] Load Computers Failure',
    props<{error: Error}>(),
);

/**
 * Ação deleta um computador. 
 * Recebe como payload a url do computador.
 */
export const deleteComputer = createAction(
    '[Computers Page] Delete Computer',
    props<{url: string}>(),
);

/**
 * Ação conclui com sucesso a deleção de um computador.
 * Recebe como payload a url do computador.
 */
export const deleteComputerSucess = createAction(
    '[Backend API] Delete Computer Success',
    props<{url: string}>(),
);

/**
 * Ação conclui com falha a deleção de um computador.
 * Recebe como payload o erro ocorrido.
 */
export const deleteComputerFailure = createAction(
    '[Backend API] Delete Computer Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza um computador.
 * Recebe como payload o computador atualizado.
 */
export const updateComputer = createAction(
    '[Computers Page] Update Computer',
    props<{computer: Computer}>(),
);

/**
 * Ação conclui com sucesso a atualização de um computador.
 * Recebe como payload o computador atualizado.
 */
export const updateComputerSuccess = createAction(
    '[Backend API] Update Computer Success',
    props<{computer: Computer}>(),
);

/**
 * Ação conclui com falha a atualização de um computador.
 * Recebe como payload o erro ocorrido.
 */
export const updateComputerFailure = createAction(
    '[Backend API] Update Computer Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza parcialmente um computador.
 * Recebe como payload o computador atualizado.
 */
export const updatePartialComputer = createAction(
    '[Computers Page] Update Partial Computer',
    props<{url: string, computer: any}>(),
);

/**
 * Ação conclui com sucesso a atualização parcial de um computador.
 * Recebe como payload o computador atualizado.
 */
export const updatePartialComputerSuccess = createAction(
    '[Backend API] Update Partial Computer Success',
    props<{computer: Computer}>(),
);

/**
 * Ação conclui com falha a atualização parcial de um computador.
 * Recebe como payload o erro ocorrido.
 */
export const updatePartialComputerFailure = createAction(
    '[Backend API] Update Partial Computer Failure',
    props<{error: Error}>(),
);