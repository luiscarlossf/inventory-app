import { Reducer, combineReducers } from 'redux';
import { UsersReducer, UsersState } from './user/user.reducer';
import { GroupsReducer, GroupsState } from './group/group.reducer';

export interface AppState{
    users: UsersState;
    groups: GroupsState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    users: UsersReducer,
    groups: GroupsReducer
});

export default rootReducer;