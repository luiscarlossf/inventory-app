import { createAction, props } from '@ngrx/store';
import { Floor } from './floor.model';

/**
 * Ação que cria um novo andar.
 * Recebe como payload o nome do andar. 
 */
export const createFloor = createAction(
    '[Equipaments Page] Create Floor',
    props<{name: string}>(),
);

/**
 * Ação conclui com sucesso a criação de um andar.
 * Recebe como payload o andar criado. 
 */
export const createFloorSuccess = createAction(
    '[Backend API] Create Floor Success',
    props<{floor: Floor}>(),
);

/**
 * Ação conclui com falha a criação de um novo andar.
 * Recebe como payload o erro ocorrido. 
 */
export const createFloorFailure = createAction(
    '[Backend API] Create Floor Failure',
    props<{error: Error}>(),
);


/**
 * Ação que carrega todas os andares armazenados no
 * backend.
 */
export const loadFloors = createAction(
    '[Backend API] Load Floors'
);


/**
 * Ação conclui com sucesso o carregamento dos andares.
 * Recebe como payload os andares carregadas. 
 */
export const loadFloorsSuccess = createAction(
    '[Backend API] Load Floors Success',
    props<{floors: Map<string, Floor>}>(),
);

/**
 * Ação conlcui com falha o carregamento dos andares.
 * Recebe como payload o erro ocorrido. 
 */
export const loadFloorsFailure = createAction(
    '[Backend API] Load Floors Failure',
    props<{error: Error}>(),
);

/**
 * Ação deleta um andar. 
 * Recebe como payload a url do andar.
 */
export const deleteFloor = createAction(
    '[Equipaments Page] Delete Floor',
    props<{url: string}>(),
);

/**
 * Ação conclui com sucesso a deleção de um andar.
 * Recebe como payload a url do andar.
 */
export const deleteFloorSucess = createAction(
    '[Backend API] Delete Floor Success',
    props<{url: string}>(),
);

/**
 * Ação conclui com falha a deleção de um andar.
 * Recebe como payload o erro ocorrido.
 */
export const deleteFloorFailure = createAction(
    '[Backend API] Delete Floor Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza um andar.
 * Recebe como payload o andar atualizado.
 */
export const updateFloor = createAction(
    '[Equipaments Page] Update Floor',
    props<{floor: Floor}>(),
);

/**
 * Ação conclui com sucesso a atualização de um andar.
 * Recebe como payload o andar atualizado.
 */
export const updateFloorSuccess = createAction(
    '[Backend API] Update Floor Success',
    props<{floor: Floor}>(),
);

/**
 * Ação conclui com falha a atualização de um andar.
 * Recebe como payload o erro ocorrido.
 */
export const updateFloorFailure = createAction(
    '[Backend API] Update Floor Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza parcialmente um andar.
 * Recebe como payload o andar atualizado.
 */
export const updatePartialFloor = createAction(
    '[Equipaments Page] Update Partial Floor',
    props<{url: string, floor: any}>(),
);

/**
 * Ação conclui com sucesso a atualização parcial de um andar.
 * Recebe como payload o andar atualizado.
 */
export const updatePartialFloorSuccess = createAction(
    '[Backend API] Update Partial Floor Success',
    props<{floor: Floor}>(),
);

/**
 * Ação conclui com falha a atualização parcial de um andar.
 * Recebe como payload o erro ocorrido.
 */
export const updatePartialFloorFailure = createAction(
    '[Backend API] Update Partial Floor Failure',
    props<{error: Error}>(),
);