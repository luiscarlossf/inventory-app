export interface CardItem{
    title?: string;
    properties: {
        key: string;
        value: number | string;
    }[];
}