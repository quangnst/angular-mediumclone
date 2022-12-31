import { createReducer, on, Action } from '@ngrx/store';

import { AuthStateInterface } from '../types/authState.interface';
import { getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction } from './actions/getCurrentUser.actions';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.actions';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
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
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isSubmitting: false,
      currentUser: null
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}