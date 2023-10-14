import { AuthProvider } from '../context/auth'
import { useEffect } from 'react'
import Logger from '../../Logger'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CheckAlreadyLoggedInBeforeRouting } from '../Routes/CheckAlreadyLoggedInBeforeRouting'
import { AppRoutes } from '../Routes/AppRoutes'

function RootComponent() {
  useEffect(() => {
    Logger.logEnvironment()
  }, [])

  return (
    <AuthProvider>
      <CheckAlreadyLoggedInBeforeRouting>
        <AppRoutes />
      </CheckAlreadyLoggedInBeforeRouting>
    </AuthProvider>
  )
}

const rootRouter = createBrowserRouter([
  { path: '*', Component: RootComponent },
])

export default function AppComponent() {
  return <RouterProvider router={rootRouter} />
}
