import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout/AppLayout'
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
          <Route index element={<Home />} />
          <Route path="capsules/new" element={<NewCapsule />} />
          <Route path="capsules" element={<Capsules />} />
          <Route path="capsules/:id" element={<CapsuleDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
