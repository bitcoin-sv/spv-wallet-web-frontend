import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { LoginPage } from '@/views/LoginPage'
import { TermsAndConditions } from '@/views/TermsAndConditions'
import { PrivacyPolicy } from '@/views/PrivacyPolicy'
import { SignupPage } from '@/views/SignupPage'
import { GlobalStyles } from '@/styles'
import { Header } from '@/components/_layout/Header'
import { Main } from '@/components/_layout/Main'
import { Footer } from '@/components/_layout/Footer'
import { useAuthorization } from '@/providers'
import { Dashboard } from '@/views/Dashboard/Dashboard'
import { getUser } from '@/api'
import { Loader } from '@/components/Loader'
import { useState } from 'react'
import { useMountEffect } from '@/hooks/useMountEffect'
import { UserDetails } from '@/api'
import { ErrorBar } from '@/components/ErrorBar'

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
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]

const ROUTES_AUTHENTICATED = [
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/terms-and-conditions',
    element: <TermsAndConditions />,
  },
  {
    path: `/privacy-policy`,
    element: <PrivacyPolicy />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" />,
  },
]

export const App = () => {
  const { authorization, setAuthorization } = useAuthorization()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [errors, setError] = useState('')

  useMountEffect(() => {
    getUser()
      .then((response) => {
        const currentUserData: UserDetails = {
          email: response.email,
          paymail: response.paymail,
          userId: response.userId,
        }

        if (currentUserData) {
          setAuthorization(currentUserData)
          setLoading(false)
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setAuthorization(null)
          navigate('/')
          setLoading(false)
          return
        }
        const errorMsg = error.response.data.error
          ? error.response.data.error
          : 'Something went wrong... Please, try again later!'

        setError(errorMsg)
        setLoading(false)
      })
  })

  const ROUTES_LIST = authorization ? ROUTES_AUTHENTICATED : ROUTES

  return (
    <>
      <GlobalStyles />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Main>
            {errors ? (
              <ErrorBar withReloadButton errorMsg={errors} />
            ) : (
              <Routes>
                {ROUTES_LIST.map((route, index) => {
                  return <Route key={`route-${index}`} path={route.path} element={route.element} />
                })}
              </Routes>
            )}
          </Main>
          <Footer />
        </>
      )}
    </>
  )
}
