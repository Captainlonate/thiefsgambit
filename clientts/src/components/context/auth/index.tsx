import Logger from '@logger'
import React, { createContext } from 'react'

export interface IAuthContextValue {
  loggedInState: IAuthProviderState
  updateLoggedIn: React.Dispatch<React.SetStateAction<IAuthProviderState>>
}

interface IAuthProviderProps {
  children: React.ReactNode
}

export interface IAuthProviderState {
  /**
   * When the app loads initially, this will be false while we make a
   * network call to check if the user is already logged in.
   * Regardless of the result, this will be set to true afterward.
   */
  initialLoad: boolean
  isLoggedIn: boolean
  loading: boolean
  errorMessage: string
}

const INITIAL_AUTH_STATE: Readonly<IAuthProviderState> = {
  initialLoad: false,
  isLoggedIn: false,
  loading: false,
  errorMessage: '',
}

export const AuthContext = createContext<IAuthContextValue>({
  loggedInState: INITIAL_AUTH_STATE,
  updateLoggedIn() {
    Logger.error('AuthContext updateLoggedIn() not implemented.')
  },
})

export function AuthProvider({ children }: IAuthProviderProps) {
  const [loggedInState, updateLoggedIn] =
    React.useState<IAuthProviderState>(INITIAL_AUTH_STATE)

  return (
    <AuthContext.Provider value={{ loggedInState, updateLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
