import { IAuthProviderState } from './index'

export const LOGGED_IN_SUCCESSFULLY: Readonly<IAuthProviderState> = {
  isLoggedIn: true,
  loading: false,
  initialLoad: true,
  errorMessage: '',
}

/**
 * What to use if `isLoggedIn` returns that the user is not already
 * logged in, but no actual error. (They just need to go log in)
 */
export const NOT_ALREADY_LOGGED_IN: Readonly<IAuthProviderState> = {
  isLoggedIn: false,
  loading: false,
  initialLoad: true,
  errorMessage: '',
}

export const LOGIN_FAILED_NETWORK_ERROR: Readonly<IAuthProviderState> = {
  initialLoad: true,
  isLoggedIn: false,
  loading: false,
  errorMessage: 'Could not reach the server.',
}
