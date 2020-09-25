
export enum Status {
    Usado="Usado", 
    Almoxarifado="Almoxarifado", 
    Sucata="Sucata", 
    Doação="Doação", 
    Estaleiro="Estaleiro"
};

export interface Equipament{
    url?: string;
    patrimony: string;
    warranty_start?: Date | string;
    warranty_end?: Date | string;
    acquisition_date?: Date | string;
    acquisition_value?: number;
    status: Status;
    /**@type {string} Url da marca do equipamento. */
    brand?: string;
    /**@type {string} Url da categoria do equipamento. */
    category: string;
    /**@type {string} Url do modelo do equipamento. */
    model?: string;
    /**@type {string} Url da Unidade Administrativa que o equipamento pertence. */
    ua?: string;
    /**@type {string} Url do andar onde o equipamento está localizado. */
    floor?: string;
}