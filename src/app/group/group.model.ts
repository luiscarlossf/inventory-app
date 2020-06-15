import { Permission } from '../permission/permission.model';

/**
 * Representação de um grupo de permissões, similar a classe Group do Django.
 * @interface
 */
export interface Group{
    /**@type {string} Nome do grupo de 150 ou menos caracteres.*/
    name:string;
    /**@type {Array<Permission>} Permissões do grupo. */
    permissions: Array<Permission>;
}