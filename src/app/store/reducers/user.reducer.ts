import { createReducer, on } from '@ngrx/store';
import {
  viewAllUserFail,
  viewAllUserSuccess, viewUserByIdFail,
  viewUserByIdSuccess
} from '../actions/user.actions';
import { UserState } from "../user.state";

export const UsersReducer = createReducer(
  UserState,
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
);

export function UserReducer (state: any, action: any) {
  return UsersReducer(state, action);
}
