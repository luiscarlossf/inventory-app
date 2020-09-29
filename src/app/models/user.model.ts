import { Group } from './group.model';
import { Permission } from './permission.model';

/**
 * Representação do usuário do sistema, similar a class User do Django.
 * @interface
 */
export interface User{
    
    /** @type {string} Username de 150 ou menos caracteres.*/
    username?: string;
    /** @type {string} Primeiro nome do usuário de 30 ou menos caracteres.*/
    first_name?: string;
    /** @type {string} Sobrenome do usuário de 150 ou menos caracteres.*/
    last_name?: string;
    /** @type {string} Email do usuário. Opcional.*/
    email?: string;
    /** @type {string} Senha da conta do usuário.*/
    password?: string;
    /**@type {string} Token de autorização do usuário */
    token: string;
    /** @type {Array<Group>} Grupos de permissões a qual o usuário pertence*/
    groups?: Array<Group>;
    /** @type {Array<Permission>} Permissões do usuário.*/
    user_permissions?: Array<Permission>;
    /** @type {boolean} Indica se o usuário pode acessar o site admin.*/
    is_staff?: boolean;
    /** @type {boolean} Indica se a conta do usuário pode ser considerada ativa.*/
    is_active?: boolean;
    /** @type {boolean} Indica se o usuário tem todas as permissões sem atibuições explícitas a elas.*/
    is_superuser?: boolean;
    /** @type {Date} Data e hora do último login do usuário.*/
    last_login?: Date;
    /** @type {Date} Data e hora de quando a conta do usuário foi criada.*/
    data_joined?: Date;
}