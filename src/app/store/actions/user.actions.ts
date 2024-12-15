import { createAction, props } from '@ngrx/store';
import { Users } from "../Model/Users";

export const viewAllUsers=createAction('[Users] View Users')
export const viewAllUserSuccess=createAction('[Users] View Users Success', props<{list:Users[]}>())
export const viewAllUserFail=createAction('[Users] View Users Fail', props<{errormessage:string}>())

export const viewUserById = createAction('[User] View User',  props<{id:number}>())
export const viewUserByIdSuccess = createAction('[User] View User Success', props<{obj:Users}>())
export const viewUserByIdFail = createAction('[User] View User Fail', props<{errormessage:string}>())
