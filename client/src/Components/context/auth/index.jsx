import React, { createContext } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [loggedInState, updateLoggedIn] = React.useState({
    initialLoad: false,
    isLoggedIn: false,
    loading: false,
    errorMessage: '',
  })

  return (
    <AuthContext.Provider value={{ loggedInState, updateLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
