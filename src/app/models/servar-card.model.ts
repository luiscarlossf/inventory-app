export interface ServerCard{
    /**@type {string} Nome do ícone representando o servidor.*/
    icon: string;
    /**@type {string} Quantidade de equipamentos sendo monitorados pelo servidor.*/
    amount: number;
    /**@type {string} Descrição do servidor*/
    server_name: string;
    /**@type {string} Url com o filtro para o equipamento.*/
    url?: string;
}