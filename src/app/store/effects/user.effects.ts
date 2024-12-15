import { Injectable, numberAttribute } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from "../../services/user.service";
import {
  viewAllUsers,
  viewAllUserFail,
  viewAllUserSuccess,
  viewUserById,
  viewUserByIdSuccess,
  viewUserByIdFail,
} from "../actions/user.actions";
import { exhaustMap, map, of, catchError } from "rxjs";

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
}
