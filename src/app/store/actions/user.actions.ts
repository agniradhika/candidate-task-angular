import { createAction, props } from '@ngrx/store';
import { Users } from "../Model/Users";

export const viewAllUsers=createAction('[Users] View Users')
export const viewAllUserSuccess=createAction('[Users] View Users Success',props<{list:Users[]}>())
export const viewAllUserFail=createAction('[Users] View Users Fail',props<{errormessage:string}>())
