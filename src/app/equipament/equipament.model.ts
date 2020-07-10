
export enum Status {'Usado', 'Almoxarifado', 'Sucata', 'Doação'};

export interface Equipament{
    url?: string;
    patrimony: string;
    warranty_start?: Date;
    warranty_end?: Date;
    acquisition_date?: Date;
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