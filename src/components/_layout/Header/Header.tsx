import { HeaderContent, HeaderStyled, Logo, LogoBackButton, LogoLink } from './Header.styles';
import { Column, Row } from '@/styles/grid';
import { Navigation } from '@/components/Navigation';
import { NavElement } from '@/components/Navigation/Navigation.styes';
import { Button } from '@/components/Button';
import { SrOnlySpan } from '@/styles';
import { useAuthorization } from '@/providers';

import { UserMenu } from '@/components/UserMenu';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { authorization } = useAuthorization();
  const isAuthorized = !!authorization;

  const location = useLocation();
  const backButtonEnabled = location.pathname !== '/' && location.pathname !== '/dashboard';

  return (
    <HeaderStyled>
      <Row>
        <Column>
          <HeaderContent isAuthorized={isAuthorized}>
            <LogoLink to={isAuthorized ? '/dashboard' : '/'} isAuthorized={isAuthorized} variant="transparent" isLink>
              {backButtonEnabled && (
                <>
                  <SrOnlySpan>Go back to the main page</SrOnlySpan>
                  <LogoBackButton>
                    <ArrowCircleLeftIcon fontSize="large" />
                  </LogoBackButton>
                </>
              )}
              <Logo src="/logo-text.png" alt="spv wallet logo" width="250" height="53" />
            </LogoLink>
            {!isAuthorized && (
              <Navigation>
                <NavElement>
                  <Button to="/" variant="transparent" isLink>
                    Log In
                  </Button>
                </NavElement>
                <NavElement>
                  <Button to="/signup" variant="transparent" isLink>
                    Sign Up
                  </Button>
                </NavElement>
              </Navigation>
            )}

            {isAuthorized && <UserMenu userEmail={authorization.email} />}
          </HeaderContent>
        </Column>
      </Row>
    </HeaderStyled>
  );
};
