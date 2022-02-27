import Routes from '../Routes'
import { AuthProvider } from '../context/auth'
import { useEffect } from 'react'
import Logger from "../../Logger"

const AppComponent = () => {
  useEffect(() => {
    Logger.logEnvironment()
  }, [])

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default AppComponent
