import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersModel } from "../Model/Users";


const getAllUsersState = createFeatureSelector<UsersModel>('user');

export const getAllUsersList = createSelector(getAllUsersState, (state) => {
  return state?.list || [];
})
