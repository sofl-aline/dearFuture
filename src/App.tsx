import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout/AppLayout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Auth from './pages/auth'
import Home from './pages/home'
import NewCapsule from './pages/new-capsule'
import Capsules from './pages/capsules'
import CapsuleDetail from './pages/capsule-detail'
import NotFound from './pages/not-found'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="login" element={<Auth key="login" />} />
          <Route path="register" element={<Auth key="register" register />} />
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="capsules/new" element={<NewCapsule />} />
            <Route path="capsules" element={<Capsules />} />
            <Route path="capsules/:id" element={<CapsuleDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
