import { createReducer, on } from '@ngrx/store';
import {
  editUserByIdSuccess, filterUsers, filterUsersSuccess,
  viewAllUserFail,
  viewAllUserSuccess, viewUserByIdFail,
  viewUserByIdSuccess
} from '../actions/user.actions';
import { UserFilters, Users } from "../Model/Users";
import { UserState } from "../user.state";

export interface UserState {
  list: Users[];
  filteredUsers: Users[];
  filter: UserFilters;
}

export const initialState: UserState = {
  list: [{
    id: 0,
    name: '',
    email: '',
    role: '',
    status: '',
    joining_date: '',
    address: ''
  }
  ],
  filteredUsers: [],
  filter: {
    name: '',
    role: '',
    status: ''
  },
}
export const UsersReducer = createReducer(
  initialState,
  on(viewAllUserSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errormessage: ''
    }
  }),
  on(viewAllUserFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage
    }
  }),
  on(viewUserByIdSuccess, (state, action) => {
    return {
      ...state,
      userObj: action.obj,
      errormessage: ''
    }
  }),
  on(viewUserByIdFail, (state, action) => {
    return {
      ...state,
      errormessage: action.errormessage
    }
  }),
  on(editUserByIdSuccess, (state, action) => {
    const _newData = state.list.map(o => {
      return o.id === action.obj.id ? action.obj : o
    })
    return {
      ...state,
      list: _newData,
      errormessage: ''
    }
  }),
  on(filterUsersSuccess, (state, action) => {
    return {
      ...state,
      filteredUsers: action.filteredUsers,
      errormessage: ''
    }
  }),

);

export function UserReducer (state: any, action: any) {
  return UsersReducer(state, action);
}
