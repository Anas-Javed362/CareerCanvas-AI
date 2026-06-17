import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Suspense, lazy } from 'react'

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { RoadmapProvider } from './context/RoadmapContext'
import { InternshipProvider } from './context/InternshipContext'
import { GoalProvider } from './context/GoalContext'
import { SkillsProvider } from './context/SkillsContext'

// Layout
import AppLayout from './layouts/AppLayout'
import FullscreenLoader from './components/ui/FullscreenLoader'

// Pages (lazy loaded)
const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Onboarding = lazy(() => import('./pages/Onboarding'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Roadmap = lazy(() => import('./pages/Roadmap'))
const Planner = lazy(() => import('./pages/Planner'))
const Internships = lazy(() => import('./pages/Internships'))
const Goals = lazy(() => import('./pages/Goals'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Skills = lazy(() => import('./pages/Skills'))
const Recommendations = lazy(() => import('./pages/Recommendations'))
const Profile = lazy(() => import('./pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <FullscreenLoader />
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

// Redirect if already logged in
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <FullscreenLoader />
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return children
}

const AppContent = () => {
  const { theme } = useTheme()
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Suspense fallback={<FullscreenLoader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* Onboarding — auth required, no sidebar */}
          <Route path="/onboarding" element={
            <ProtectedRoute><Onboarding /></ProtectedRoute>
          } />

          {/* Protected app routes — with sidebar layout */}
          <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="planner" element={<Planner />} />
            <Route path="internships" element={<Internships />} />
            <Route path="goals" element={<Goals />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="skills" element={<Skills />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        limit={4}
      />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <RoadmapProvider>
            <InternshipProvider>
              <GoalProvider>
                <SkillsProvider>
                  <AppContent />
                </SkillsProvider>
              </GoalProvider>
            </InternshipProvider>
          </RoadmapProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
