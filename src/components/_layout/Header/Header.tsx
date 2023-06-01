import { HeaderContent, HeaderStyled, Logo, LogoLink } from './Header.styles'
import { Row } from '@/styles/grid'
import { Navigation } from '@/components/Navigation'
import { NavElement } from '@/components/Navigation/Navigation.styes'
import { Button } from '@/components/Button'

export const Header = () => {
  return (
    <HeaderStyled>
      <Row>
        <HeaderContent>
          <LogoLink to="/" isLink>
            <Logo src="/logo.png" alt="bux wallet logo" width="250" height="53" />
          </LogoLink>
          <Navigation>
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
          </Navigation>
        </HeaderContent>
      </Row>
    </HeaderStyled>
  )
}
