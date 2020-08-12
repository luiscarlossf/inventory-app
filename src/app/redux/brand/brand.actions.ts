import { createAction, props } from '@ngrx/store';
import { Brand } from '../../models/brand.model';

/**
 * Ação que cria uma nova marca.
 * Recebe como payload o nome da marca. 
 */
export const createBrand = createAction(
    '[Equipaments Page] Create Brand',
    props<{name: string}>(),
);

/**
 * Ação conclui com sucesso a criação de uma marca.
 * Recebe como payload a marca criada. 
 */
export const createBrandSuccess = createAction(
    '[Backend API] Create Brand Success',
    props<{brand: Brand}>(),
);

/**
 * Ação conclui com falha a criação de uma nova marca.
 * Recebe como payload o erro ocorrido. 
 */
export const createBrandFailure = createAction(
    '[Backend API] Create Brand Failure',
    props<{error: Error}>(),
);


/**
 * Ação que carrega todas as marcas armazenadas no
 * backend.
 */
export const loadBrands = createAction(
    '[Backend API] Load Brands'
);


/**
 * Ação conclui com sucesso o carregamento das marcas.
 * Recebe como payload as marcas carregadas. 
 */
export const loadBrandsSuccess = createAction(
    '[Backend API] Load Brands Success',
    props<{brands: Map<string, Brand>}>(),
);

/**
 * Ação conlcui com falha o carregamento das marcas.
 * Recebe como payload o erro ocorrido. 
 */
export const loadBrandsFailure = createAction(
    '[Backend API] Load Brands Failure',
    props<{error: Error}>(),
);

/**
 * Ação deleta uma marca. 
 */
export const deleteBrand = createAction(
    '[Equipaments Page] Delete Brand',
    props<{url: string}>(),
);

/**
 * Ação conclui com sucesso a deleção de uma marca.
 * Recebe como payload a url da marca.
 */
export const deleteBrandSucess = createAction(
    '[Backend API] Delete Brand Success',
    props<{url: string}>(),
);

/**
 * Ação conclui com falha a deleção de uma marca.
 * Recebe como payload o erro ocorrido.
 */
export const deleteBrandFailure = createAction(
    '[Backend API] Delete Brand Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza uma marca.
 * Recebe como payload a marca atualizada.
 */
export const updateBrand = createAction(
    '[Equipaments Page] Update Brand',
    props<{brand: Brand}>(),
);

/**
 * Ação conclui com sucesso a atualização de uma marca.
 * Recebe como payload a marca atualizada.
 */
export const updateBrandSuccess = createAction(
    '[Backend API] Update Brand Success',
    props<{brand: Brand}>(),
);

/**
 * Ação conclui com falha a atualização de uma marca.
 * Recebe como payload o erro ocorrido.
 */
export const updateBrandFailure = createAction(
    '[Backend API] Update Brand Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza parcialmente uma marca.
 * Recebe como payload a marca atualizada.
 */
export const updatePartialBrand = createAction(
    '[Equipaments Page] Update Partial Brand',
    props<{url: string, brand: any}>(),
);

/**
 * Ação conclui com sucesso a atualização parcial de uma marca.
 * Recebe como payload a marca atualizada.
 */
export const updatePartialBrandSuccess = createAction(
    '[Backend API] Update Partial Brand Success',
    props<{brand: Brand}>(),
);

/**
 * Ação conclui com falha a atualização parcial de uma marca.
 * Recebe como payload o erro ocorrido.
 */
export const updatePartialBrandFailure = createAction(
    '[Backend API] Update Partial Brand Failure',
    props<{error: Error}>(),
);