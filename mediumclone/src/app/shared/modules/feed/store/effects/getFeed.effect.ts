import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { FeedService } from '../../services/feed.service';
import {
  getFeedAction,
  getFeedSuccessAction,
  getFeedFailureAction,
} from '../actions/getFeed.action';
import { of } from 'rxjs';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private feedService: FeedService,
  ) {}

  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed});
          }),
          catchError(() => {
            return of(getFeedFailureAction());
          })
        );
      })
    )
  );
}
