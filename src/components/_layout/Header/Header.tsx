import { HeaderContent, HeaderStyled, Logo, LogoLink } from './Header.styles'
import { Column, Row } from '@/styles/grid'
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
        <Column>
          <HeaderContent authorizationState={authorizationStateAsBoolean}>
            <LogoLink
              to={authorization ? '/dashboard' : '/'}
              authorizationState={authorizationStateAsBoolean}
              variant="transparent"
              isLink
            >
              <Logo src="/logo-text.png" alt="bux wallet logo" width="250" height="53" />
              <SrOnlySpan>Go back to the main page</SrOnlySpan>
            </LogoLink>
            {!authorization && (
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

            {authorization && <UserMenu userEmail={authorization.email} />}
          </HeaderContent>
        </Column>
      </Row>
    </HeaderStyled>
  )
}
