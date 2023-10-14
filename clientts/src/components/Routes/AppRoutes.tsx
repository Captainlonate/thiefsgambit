import { Navigate, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../Routes/ProtectedRoute'
import GamePage from '../GamePage'
import LoginPage from '../LoginPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/play"
        element={
          <ProtectedRoute>
            <GamePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
