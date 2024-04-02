import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from '@/views/LoginPage';
import { TermsAndConditions } from '@/views/TermsAndConditions';
import { PrivacyPolicy } from '@/views/PrivacyPolicy';
import { SignupPage } from '@/views/SignupPage';
import { Header } from '@/components/_layout/Header';
import { Main } from '@/components/_layout/Main';
import { Footer } from '@/components/_layout/Footer';
import { useAuthorization } from '@/providers';
import { Dashboard } from '@/views/Dashboard';
import { Contacts } from '@/views/Contacts';
import { getUser, LoggedInUser } from '@/api';
import { Loader } from '@/components/Loader';
import { useEffect, useState } from 'react';
import { ErrorBar } from '@/components/ErrorBar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
];

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
    path: `/contacts`,
    element: <Contacts />,
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" />,
  },
];

export const App = () => {
  const { authorization, setAuthorization } = useAuthorization();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState('');

  const location = useLocation();

  useEffect(() => {
    setError('');
    getUser()
      .then((response) => {
        const currentUserData: LoggedInUser = {
          email: response.email,
          paymail: response.paymail,
          balance: response.balance,
        };

        if (currentUserData) {
          setAuthorization(currentUserData);
          setLoading(false);
        }
      })
      .catch((error) => {
        let errorMsg;
        if (error.response.status === 401 || error.response.status === 400) {
          setAuthorization(null);
          navigate('/');
          setLoading(false);
          return;
        }

        if (error.response.status === 404) {
          errorMsg =
            error.response.data + ". If you can't log in again, please contact our support or try again later!";
        } else {
          errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please, try again later!';
        }

        setError(errorMsg);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location) {
      window.scroll(0, 0);
    }
  }, [location]);

  const ROUTES_LIST = authorization ? ROUTES_AUTHENTICATED : ROUTES;

  return (
    <>
      <ToastContainer theme="dark" />

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
                  return <Route key={`route-${index}`} path={route.path} element={route.element} />;
                })}
              </Routes>
            )}
          </Main>
          <Footer />
        </>
      )}
    </>
  );
};
