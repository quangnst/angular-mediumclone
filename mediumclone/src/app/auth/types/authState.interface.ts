import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export interface AuthStateInterface {
  isSubmitting: boolean,
  isLoading: boolean,
  isLoggedIn: boolean | null,
  validationErrors: BackendErrorsInterface | null,
  currentUser: CurrentUserInterface | null
}