import { Equipament} from '../equipament/equipament.model';

export interface Computer extends Equipament{
    policy?: boolean;
    status_zenworks?: boolean;
    status_trend?: boolean;
    status_wsus?: boolean;
}