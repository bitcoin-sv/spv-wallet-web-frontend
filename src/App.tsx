import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPage } from '@/views/LoginPage'
import { TermsAndConditions } from '@/views/TermsAndConditions'
import { PrivacyPolicy } from '@/views/PrivacyPolicy'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: `/privacy-policy`,
    element: <PrivacyPolicy />,
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
