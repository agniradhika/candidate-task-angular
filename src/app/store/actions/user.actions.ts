import { createAction, props } from '@ngrx/store';
import { UserFilters, Users } from "../Model/Users";

export const viewAllUsers=createAction('[Users] View Users')
export const viewAllUserSuccess=createAction('[Users] View Users Success', props<{list:Users[]}>())
export const viewAllUserFail=createAction('[Users] View Users Fail', props<{errormessage:string}>())

export const viewUserById = createAction('[User] View User',  props<{id:number}>())
export const viewUserByIdSuccess = createAction('[User] View User Success', props<{obj:Users}>())
export const viewUserByIdFail = createAction('[User] View User Fail', props<{errormessage:string}>())

export const editUserById = createAction('[User] Edit User',props<{obj: Users}>());
export const editUserByIdSuccess = createAction('[User] Edit User Success', props<{obj:Users}>());
export const editUserByIdFail = createAction('[User] Edit User Fail', props<{ errormessage: string }>());


export const filterUsers = createAction('[Users] Filter Users',props<{filter: Partial<UserFilters>}>());
export const filterUsersSuccess = createAction('[Users] Filter Users Success', props<{filteredUsers:Users[]}>());
export const filterUsersFail = createAction('[Users] Filter Users Fail', props<{ errormessage: string }>());
