import { HeaderStyled } from './Header.styles'
import { Row } from '@/styles/grid'

export const Header = () => {
  return (
    <HeaderStyled>
      <Row>
        <img src="/logo.png" alt="" />
      </Row>
    </HeaderStyled>
  )
}
