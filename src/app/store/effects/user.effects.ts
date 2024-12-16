import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from "../../services/user.service";
import {
  viewAllUsers,
  viewAllUserFail,
  viewAllUserSuccess,
  viewUserById,
  viewUserByIdSuccess,
  viewUserByIdFail,
  editUserById,
  editUserByIdSuccess,
  editUserByIdFail,
} from "../actions/user.actions";
import { exhaustMap, map, of, catchError, switchMap } from "rxjs";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,private userService: UserService) {}

  _viewAllUsers = createEffect(()=> this.actions$.pipe(
    ofType(viewAllUsers),
    exhaustMap((action) => {
      return this.userService.getAllUsers().pipe(
        map((data) => {
          return viewAllUserSuccess({ list: data })
        }),
        catchError((error) => of(viewAllUserFail({ errormessage: error.message() })))
      )
    })
  ))

  _viewUserById = createEffect(() =>
    this.actions$.pipe(
      ofType(viewUserById),
      exhaustMap((action) => {
        return this.userService.getUserById(action.id).pipe(
          map((data) => {
            return viewUserByIdSuccess({ obj: data })
          }),
          catchError((error) => of(viewUserByIdFail({ errormessage: error.message() })))
        )
      })
    )
  )

  _editUserById = createEffect(() =>
    this.actions$.pipe(
      ofType(editUserById),
      switchMap((action) => {
         return this.userService.editUserById(action.obj).pipe(
          map((data) => {
            return editUserByIdSuccess({ obj: action.obj })
          }),
          catchError((error) => of(editUserByIdFail({ errormessage: error.message() })))
        )
      })
    )
  )

}