import Routes from '../Routes'
import { AuthProvider } from '../context/auth'

const AppComponent = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default AppComponent
