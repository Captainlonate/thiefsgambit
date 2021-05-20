import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import GamePage from '../GamePage'

const AuthenticatedRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/play">
          <GamePage />
        </Route>
        <Redirect to='/play' />
      </Switch>
    </Router>
  )
}

export default AuthenticatedRoutes
