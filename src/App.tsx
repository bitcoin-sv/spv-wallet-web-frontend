import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/views/LoginPage'
import { TermsAndConditions } from '@/views/TermsAndConditions'
import { PrivacyPolicy } from '@/views/PrivacyPolicy'
import { SignupPage } from '@/views/SignupPage'
import { GlobalStyles } from '@/styles'
import { Header } from '@/components/_layout/Header'
import { Main } from '@/components/_layout/Main'
import { Footer } from '@/components/_layout/Footer'

const ROUTES = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: `/privacy-policy`,
    element: <PrivacyPolicy />,
  },
]

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Routes>
          {ROUTES.map((route, index) => {
            return <Route key={`route-${index}`} path={route.path} element={route.element} />
          })}
        </Routes>
      </Main>
      <Footer />
    </BrowserRouter>
  )
}
