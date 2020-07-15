import { Group } from '../../models/group.model';
import { Action } from 'redux';

/**Definição do estado do ramo groups da árvore state*/
export interface GroupsState {
    group: Array<Group>;
};

/**Estado inicial para groups*/
const initialState = {
    group: null
};

/**Reducer do ramo groups da árvore state*/
export const GroupsReducer =
function (state: GroupsState=initialState, action: Action): GroupsState {
    switch(action.type){
        default:
            return state;
    }
};