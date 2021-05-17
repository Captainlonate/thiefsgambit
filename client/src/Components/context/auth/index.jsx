import React, { createContext } from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [loggedIn, updateLoggedIn] = React.useState({
    loading: false,
    initialLoad: false,
    isLoggedIn: false,
  })

  return (
    <AuthContext.Provider value={{ loggedIn, updateLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
