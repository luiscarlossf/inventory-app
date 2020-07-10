import * as fromUser from './user/user.reducer';
import * as fromGroup from './group/group.reducer';
import * as fromBrand from './brand/brand.reducer';
import * as fromModel from './model/model.reducer';
import * as fromFloor from './floor/floor.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromUa from './ua/ua.reducer';
import * as fromEquipament from './equipament/equipament.reducer';
import * as fromComputer from './computer/computer.reducer';

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