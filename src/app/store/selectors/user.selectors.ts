import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Users, UsersModel } from "../Model/Users";
import { filterUsersSuccess } from "../actions/user.actions";
import { UserState } from "../reducers/user.reducer";


const getAllUsersState = createFeatureSelector<UsersModel>('user');

export const getAllUsersList = createSelector(getAllUsersState, (state) => {
  return state?.list || [];
})

const viewUserByIdState = createFeatureSelector<UsersModel>('user');

export const viewUserById = createSelector(viewUserByIdState, (state) => {
  return state?.userObj || {};
})



const filteredUsersState = createFeatureSelector<UsersModel>('user');

export const filteredUsers = createSelector(filteredUsersState, (state) => {
  return state?.filteredUsers || [];
})
