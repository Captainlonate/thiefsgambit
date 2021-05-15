import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import LoginPage from '../LoginPage'

const UnAuthenticatedRoutes = () => {
  return (
    <Router>
      <Switch>
        {/* TODO: Add a route for SignUp */}
        <Route path="/login">
          <LoginPage />
        </Route>
        <Redirect to='/login' />
      </Switch>
    </Router>
  )
}

export default UnAuthenticatedRoutes
