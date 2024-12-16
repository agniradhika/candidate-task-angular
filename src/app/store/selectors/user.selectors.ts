import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersModel } from "../Model/Users";

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
