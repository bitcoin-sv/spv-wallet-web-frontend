import styled from '@emotion/styled'
import { sizes } from '@/styles'
import { Button } from '@/components/Button'

export const HeaderStyled = styled.header`
  margin: ${sizes(4)} 0;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const LogoLink = styled(Button)`
  padding: 0;

  &::after {
    content: none;
  }
`

export const Logo = styled.img`
  max-width: 250px;
`
