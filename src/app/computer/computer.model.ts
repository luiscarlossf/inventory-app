import { Status } from '../equipament/equipament.model';
import { Brand } from '../brand/brand.model';
import { Category } from '../category/category.model';
import { Model } from '../model/model.model';
import { Ua } from '../ua/ua.model';
import { Floor } from '../floor/floor.model';

export interface Computer{
    url: string;
    patrimony: string;
    warranty_start: Date;
    warranty_end: Date;
    acquisition_date: Date;
    acquisition_value: number;
    status: Status;
    policy: boolean;
    status_zenworks: boolean;
    status_trend: boolean;
    status_wsus: boolean;
    brand: Brand;
    category: Category;
    model: Model;
    ua: Ua;
    floor: Floor;
}