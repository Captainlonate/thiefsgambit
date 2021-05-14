import LoginPage from '../LoginPage'
import { withIsLoggedIn } from '../../Network/checkIsLoggedIn'

const AppComponent = (props) => {
  console.log(props)
  return (
    <LoginPage />
  )
}

export default withIsLoggedIn(AppComponent)
