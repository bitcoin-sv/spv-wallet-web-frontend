import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AuthorizationProvider } from '@/providers'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthorizationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthorizationProvider>
  </React.StrictMode>
)
