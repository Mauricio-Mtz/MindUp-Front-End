import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1026195813411-r4k84hbrrtll08gt4rr2pclnvhhlvt8e.apps.googleusercontent.com">
      <App />
      <Toaster />
    </GoogleOAuthProvider>
  </StrictMode>,
)
