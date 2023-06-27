import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AuthorizationProvider } from '@/providers'
import { BrowserRouter } from 'react-router-dom'
import { AutoupdateProvider } from '@/providers/autoupdate'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthorizationProvider>
      <AutoupdateProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AutoupdateProvider>
    </AuthorizationProvider>
  </React.StrictMode>
)
