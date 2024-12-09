import { HashRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import InitialSetupPage from './pages/InitialSetupPage'
import CreateReportPage from './pages/CreateReportPage'
import ReportDetailsPage from './pages/ReportDetailsPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/setup" element={<InitialSetupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-report" element={<CreateReportPage />} />
        <Route path="/report-details" element={<ReportDetailsPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
