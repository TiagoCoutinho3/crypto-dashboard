import { DashboardLayout } from './components/DashboardLayout'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { PortfolioPage } from './pages/PortfolioPage'
import { SettingsPage } from './pages/SettingsPage'

const LayoutOutlet = () => (
  <DashboardLayout>
    <Outlet />
  </DashboardLayout>
)

function App() {
  return (
    <Routes>
      <Route element={<LayoutOutlet />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
