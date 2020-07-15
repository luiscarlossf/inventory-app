import { createAction, props } from '@ngrx/store';
import { Category } from './category.model';

/**
 * Ação que cria uma nova categoria.
 * Recebe como payload o nome da categoria. 
 */
export const createCategory = createAction(
    '[Equipaments Page] Create Category',
    props<{name: string}>(),
);

/**
 * Ação conclui com sucesso a criação de uma categoria.
 * Recebe como payload a categoria criada. 
 */
export const createCategorySuccess = createAction(
    '[Backend API] Create Category Success',
    props<{category: Category}>(),
);

/**
 * Ação conclui com falha a criação de uma nova categoria.
 * Recebe como payload o erro ocorrido. 
 */
export const createCategoryFailure = createAction(
    '[Backend API] Create Category Failure',
    props<{error: Error}>(),
);


/**
 * Ação que carrega todas as categorias armazenadas no
 * backend.
 */
export const loadCategories = createAction(
    '[Backend API] Load Categories'
);


/**
 * Ação conclui com sucesso o carregamento das categorias.
 * Recebe como payload as categorias carregadas. 
 */
export const loadCategoriesSuccess = createAction(
    '[Backend API] Load Categories Success',
    props<{categories: Map<string, Category>}>(),
);

/**
 * Ação conlcui com falha o carregamento das categorias.
 * Recebe como payload o erro ocorrido. 
 */
export const loadCategoriesFailure = createAction(
    '[Backend API] Load Categories Failure',
    props<{error: Error}>(),
);

/**
 * Ação deleta uma categoria. 
 */
export const deleteCategory = createAction(
    '[Equipaments Page] Delete Category',
    props<{url: string}>(),
);

/**
 * Ação conclui com sucesso a deleção de uma categoria.
 * Recebe como payload a url da categoria.
 */
export const deleteCategorySucess = createAction(
    '[Backend API] Delete Category Success',
    props<{url: string}>(),
);

/**
 * Ação conclui com falha a deleção de uma categoria.
 * Recebe como payload o erro ocorrido.
 */
export const deleteCategoryFailure = createAction(
    '[Backend API] Delete Category Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza uma categoria.
 * Recebe como payload a categoria atualizada.
 */
export const updateCategory = createAction(
    '[Equipaments Page] Update Category',
    props<{category: Category}>(),
);

/**
 * Ação conclui com sucesso a atualização de uma categoria.
 * Recebe como payload a categoria atualizada.
 */
export const updateCategorySuccess = createAction(
    '[Backend API] Update Category Success',
    props<{category: Category}>(),
);

/**
 * Ação conclui com falha a atualização de uma categoria.
 * Recebe como payload o erro ocorrido.
 */
export const updateCategoryFailure = createAction(
    '[Backend API] Update Category Failure',
    props<{error: Error}>(),
);

/**
 * Ação atualiza parcialmente uma categoria.
 * Recebe como payload a categoria atualizada.
 */
export const updatePartialCategory = createAction(
    '[Equipaments Page] Update Partial Category',
    props<{url: string, category: any}>(),
);

/**
 * Ação conclui com sucesso a atualização parcial de uma categoria.
 * Recebe como payload a categoria atualizada.
 */
export const updatePartialCategorySuccess = createAction(
    '[Backend API] Update Partial Category Success',
    props<{category: Category}>(),
);

/**
 * Ação conclui com falha a atualização parcial de uma categoria.
 * Recebe como payload o erro ocorrido.
 */
export const updatePartialCategoryFailure = createAction(
    '[Backend API] Update Partial Category Failure',
    props<{error: Error}>(),
);