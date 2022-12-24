import { createReducer, on, Action } from '@ngrx/store';

import { AuthStateInterface } from '../types/authState.interface';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoggedIn: null,
  validationErrors: null,
  currentUser: null
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}