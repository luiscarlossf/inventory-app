import * as fromUser from './redux/user/user.reducer';
import * as fromGroup from './redux/group/group.reducer';
import * as fromBrand from './redux/brand/brand.reducer';
import * as fromModel from './redux/model/model.reducer';
import * as fromFloor from './redux/floor/floor.reducer';
import * as fromCategory from './redux/category/category.reducer';
import * as fromUa from './redux/ua/ua.reducer';
import * as fromEquipament from './redux/equipament/equipament.reducer';
import * as fromComputer from './redux/computer/computer.reducer';

export interface AppState{
    user: fromUser.UserState;
    groups: fromGroup.GroupsState;
    brands: fromBrand.BrandState;
    categories: fromCategory.CategoryState;
    models: fromModel.ModelState;
    floors: fromFloor.FloorState;
    uas: fromUa.UaState;
    equipaments: fromEquipament.EquipamentState;
    computers: fromComputer.ComputerState;

}