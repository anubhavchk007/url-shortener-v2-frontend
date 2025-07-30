import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyRoutes from './config/MyRoutes.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <MyRoutes />
    </BrowserRouter>
  </StrictMode>,
)
