import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import HomePage from '../HomePage'
import GamePage from '../GamePage'

const AuthenticatedRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/play">
          <GamePage />
        </Route>
        {/* <Route path="/">
          <HomePage />
        </Route> */}
        <Redirect to='/play' />
      </Switch>
    </Router>
  )
}

export default AuthenticatedRoutes
