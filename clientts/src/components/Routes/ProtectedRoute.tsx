import { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate } from 'react-router-dom'
import Logger from '../../Logger'

interface IProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: IProtectedRouteProps) {
  const { loggedInState } = useContext(AuthContext)

  if (!loggedInState.isLoggedIn) {
    Logger.debug('Not logged in. Redirecting to /login now.')
    return <Navigate to="/login" replace />
  }

  return children
}
