import { Row } from '@/styles/grid'
import { FooterContent, FooterNav, FooterNavElement, FooterStyled } from '@/components/_layout/Footer/Footer.styles'
import { Button } from '@/components/Button'

export const Footer = () => {
  return (
    <FooterStyled>
      <Row>
        <FooterContent>
          &copy; {new Date().getFullYear()} Bux wallet. All rights reserved
          <nav>
            <FooterNav>
              <FooterNavElement>
                <Button to="/terms-and-conditions" isLink small>
                  terms and conditions
                </Button>
              </FooterNavElement>
              <FooterNavElement>
                <Button to="/privacy-policy" isLink small>
                  privacy policy
                </Button>
              </FooterNavElement>
            </FooterNav>
          </nav>
        </FooterContent>
      </Row>
    </FooterStyled>
  )
}
