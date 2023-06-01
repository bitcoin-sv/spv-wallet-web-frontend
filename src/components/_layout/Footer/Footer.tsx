import { Row } from '@/styles/grid'
import { CopyrightText, FooterContent, FooterStyled } from '@/components/_layout/Footer/Footer.styles'
import { Button } from '@/components/Button'
import { Navigation } from '@/components/Navigation'
import { NavElement } from '@/components/Navigation/Navigation.styes'

export const Footer = () => {
  return (
    <FooterStyled>
      <Row>
        <FooterContent>
          <CopyrightText>&copy; {new Date().getFullYear()} Bux wallet. All rights reserved</CopyrightText>

          <Navigation>
            <NavElement>
              <Button to="/terms-and-conditions" isLink small>
                terms and conditions
              </Button>
            </NavElement>
            <NavElement>
              <Button to="/privacy-policy" isLink small>
                privacy policy
              </Button>
            </NavElement>
          </Navigation>
        </FooterContent>
      </Row>
    </FooterStyled>
  )
}
