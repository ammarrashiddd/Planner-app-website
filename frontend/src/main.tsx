import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import LoginForm from './components/login/loginForm'
import RegisterForm from './components/login/registerForm'
import Dashboard from './pages/homePage'
import LandingPage from './pages/landingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>    
    </BrowserRouter>
  </StrictMode>
)
