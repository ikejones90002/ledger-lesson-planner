import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Spark103Badge from './components/Spark103Badge'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import NewLesson from './pages/NewLesson'
import LessonDetail from './pages/LessonDetail'
import Calendar from './pages/Calendar'
import GenerateLesson from './pages/GenerateLesson'

export default function App() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  return (
    <div className="app-shell">
      {!isLanding && <Sidebar />}
      <main className="ledger">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new" element={<NewLesson />} />
          <Route path="/generate" element={<GenerateLesson />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </main>
      <Spark103Badge />
      <Footer />
    </div>
  )
}
