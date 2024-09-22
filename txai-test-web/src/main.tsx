import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/global.css'
import App from './App.tsx'
import Signup from './pages/signup/index.tsx'
import Menu from './pages/menu/index.tsx'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/userContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/menu',
    element: <Menu />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  </StrictMode>,
)
