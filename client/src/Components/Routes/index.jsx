import { useContext, useEffect} from 'react'
import { AuthContext } from '../context/auth'
import LoadingPage from '../LoadingPage'
import { CheckIsLoggedIn } from '../../Network/checkIsLoggedIn'
import AuthenticatedRoutes from './AuthenticatedRoutes'
import UnAuthenticatedRoutes from './UnAuthenticatedRoutes'

const Routes = () => {
  const { loggedInState, updateLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    getInitialLogInState(updateLoggedIn)
    // eslint-disable-next-line
  }, [])

  if (!loggedInState.initialLoad) {
    return <LoadingPage text='Loading...' />
  } else if (loggedInState.errorMessage) {
    return <LoadingPage text={loggedInState.errorMessage} />
  }

  return loggedInState.isLoggedIn
    ? <AuthenticatedRoutes />
    : <UnAuthenticatedRoutes />
}

// Does a network call to check if a user is logged in based on their cookies
// Then calls the (useState) callback function to update the state.
const getInitialLogInState = async (updateLoggedIn) => {
  try {
    const isLoggedIn = await CheckIsLoggedIn()
    updateLoggedIn({
      initialLoad: true,
      isLoggedIn,
      loading: false,
      errorMessage: ''
    })
  } catch (ex) {
    console.log('Error when checking if logged in to server.', ex)
    updateLoggedIn({
      initialLoad: true,
      isLoggedIn: false,
      loading: false,
      errorMessage: 'Could not reach the server.'
    })
  }
}

export default Routes
