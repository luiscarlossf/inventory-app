/**
 * Representação de uma permissão de acesso.
 * @interface
 */
export interface Permission{
    /**@type {string} Nome da permissão de 255 ou menos caracteres. */
    name: string;
    /**@type {any} Uma referência a tabela do banco de dados django_content_type, que 
     * contém um registro para cada modelo instalado.
    */
   content_type: any;
   /**@type {string}  Código da permissão de 100 ou menos caracteres.*/
   codename: string;
}