import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.actions';
import { of } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

@Injectable()
export class GetCurrentUserEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}

  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get("accessToken")

        if (!token) {
          return of(getCurrentUserFailureAction())
        }

        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            // this.persistanceService.set("accessToken", currentUser.token)
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  )
}
