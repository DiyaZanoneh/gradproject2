import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Profile from './components/Profile'
import Jobs from './components/Jobs'
import JobDescription from './components/JobDescription'
import CompanyCreate from './components/admin/CompanyCreate'
import AdminJobs from "./components/admin/AdminJobs"
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import PrivacyPolicy from './components/legal/PrivacyPolicy'
import TermsOfService from './components/legal/TermsOfService'
import ContactUs from './components/legal/ContactUs'
import AdminCompaniesPage from './components/admin/AdminCompaniesPage'
import AdminProfile from './components/admin/AdminProfile'
import PdfScanner from './components/PdfScanner'




const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/pdf-scanner", element: <PdfScanner /> },

  

  // Admin Routes
  {
    path: "/admin/companies",
    element: <ProtectedRoute><AdminCompaniesPage /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },

  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  {
    path: "/AdminProfile",
    element: <ProtectedRoute><AdminProfile /></ProtectedRoute>
  },
 
  

  // Legal Pages
  { path: "/privacy", element: <PrivacyPolicy /> },
  { path: "/terms", element: <TermsOfService /> },
  { path: "/contact", element: <ContactUs /> }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
