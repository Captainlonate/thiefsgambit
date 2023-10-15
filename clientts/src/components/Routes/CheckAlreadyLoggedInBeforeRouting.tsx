import { useContext, useEffect } from 'react'
import LoadingPage from '../LoadingPage'
import { AuthContext, IAuthContextValue } from '@context/auth'
import { IWithChildren } from '../../commonTypes'
import { API } from '@api/Api'
import React from 'react'
import {
  LOGGED_IN_SUCCESSFULLY,
  LOGIN_FAILED_NETWORK_ERROR,
  NOT_ALREADY_LOGGED_IN,
} from '@context/auth/authActions'
import { ERROR_CODES } from '@api/ApiError'

export function CheckAlreadyLoggedInBeforeRouting({ children }: IWithChildren) {
  const refHasDoneInitialCheck = React.useRef(false)
  const { loggedInState, updateLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    if (!refHasDoneInitialCheck.current) {
      refHasDoneInitialCheck.current = true
      getInitialLogInState(updateLoggedIn)
    }
  }, [updateLoggedIn])

  if (!loggedInState.initialLoad) {
    return <LoadingPage text="Loading..." />
  }

  if (loggedInState.errorMessage) {
    return <LoadingPage text={loggedInState.errorMessage} />
  }

  return children
}

/**
 * Does a network call to check if a user is logged in based on their cookies
 * Then calls the (useState) callback function to update the state.
 */
async function getInitialLogInState(
  updateLoggedIn: IAuthContextValue['updateLoggedIn']
) {
  const apiResponse = await API.CheckIsLoggedIn()

  if (apiResponse.isError) {
    switch (apiResponse.errorCode) {
      case ERROR_CODES.not_logged_in:
        updateLoggedIn(NOT_ALREADY_LOGGED_IN)
        return
      default:
        updateLoggedIn(LOGIN_FAILED_NETWORK_ERROR)
        break
    }
  } else {
    updateLoggedIn(LOGGED_IN_SUCCESSFULLY)
  }
}
