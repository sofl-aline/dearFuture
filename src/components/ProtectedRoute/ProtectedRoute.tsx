import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useSession from '../../hooks/useSession'

export default function ProtectedRoute() {
  const token = useSession()
  const location = useLocation()

  return token
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location.pathname }} />
}
