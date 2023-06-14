import { HeaderContent, HeaderStyled, Logo, LogoLink } from './Header.styles'
import { Row } from '@/styles/grid'
import { Navigation } from '@/components/Navigation'
import { NavElement } from '@/components/Navigation/Navigation.styes'
import { Button } from '@/components/Button'
import { SrOnlySpan } from '@/styles'
import { useAuthorization } from '@/providers'

import { UserMenu } from '@/components/UserMenu'

export const Header = () => {
  const { authorization } = useAuthorization()
  const authorizationStateAsBoolean = !!authorization

  return (
    <HeaderStyled>
      <Row>
        <HeaderContent authorizationState={authorizationStateAsBoolean}>
          <LogoLink to={authorization ? '/dashboard' : '/'} authorizationState={authorizationStateAsBoolean} isLink>
            <Logo src="/logo.png" alt="bux wallet logo" width="250" height="53" />
            <SrOnlySpan>Go back to the main page</SrOnlySpan>
          </LogoLink>
          <Navigation>
            {authorization ? (
              <>
                <NavElement>
                  <Button to="/dashboard" isLink>
                    Dashboard
                  </Button>
                </NavElement>
              </>
            ) : (
              <>
                <NavElement>
                  <Button to="/" isLink>
                    Log In
                  </Button>
                </NavElement>
                <NavElement>
                  <Button to="/signup" isLink>
                    Sign Up
                  </Button>
                </NavElement>
              </>
            )}
          </Navigation>
          {authorization && <UserMenu userEmail={authorization.email} />}
        </HeaderContent>
      </Row>
    </HeaderStyled>
  )
}
