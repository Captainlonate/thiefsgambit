import LoginPage from '../LoginPage'
import { withIsLoggedIn, withIsLoggedInProps } from '../../Network/checkIsLoggedIn'

interface AppProps extends withIsLoggedInProps {
  children?: React.ReactNode
}

const AppComponent = (props: AppProps) => {
  console.log(props)
  return (
    <LoginPage />
  )
}

export default withIsLoggedIn(AppComponent)
