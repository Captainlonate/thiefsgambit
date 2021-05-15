import { useContext, useEffect} from 'react'
import { AuthContext } from '../context/auth'
import LoadingPage from '../LoadingPage'
import { CheckIsLoggedIn } from '../../Network/checkIsLoggedIn'
import AuthenticatedRoutes from './AuthenticatedRoutes'
import UnAuthenticatedRoutes from './UnAuthenticatedRoutes'

const Routes = () => {
  const { loggedIn, updateLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    getInitialLogInState(loggedIn, updateLoggedIn)
    // eslint-disable-next-line
  }, [])

  if (!loggedIn.initialLoad) {
    return <LoadingPage />
  }

  return loggedIn.isLoggedIn
    ? <AuthenticatedRoutes />
    : <UnAuthenticatedRoutes />
}

const getInitialLogInState = async (loggedIn, updateLoggedIn) => {
  const isLoggedIn = await CheckIsLoggedIn()
  updateLoggedIn({
    ...loggedIn,
    initialLoad: true,
    isLoggedIn,
    loading: false
  })
}

export default Routes
