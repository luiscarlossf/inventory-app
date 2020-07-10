import { Floor } from '../floor/floor.model';
/**
 * @interface
 * Modelo que define uma Unidade Administrativa.
 */
export interface Ua{
    url?: string;
    code: string;
    name: string;
    /**@type {string} Url do andar onde a Ua está localizada.*/
    floor?: string;
}