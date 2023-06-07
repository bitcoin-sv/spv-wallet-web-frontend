import styled from '@emotion/styled'
import { sizes } from '@/styles'
import { Button } from '@/components/Button'
import { media } from '@/styles/media'

export const HeaderStyled = styled.header`
  padding: ${sizes(2)} 0;
  margin: ${sizes(4)} 0;

  ${media.sm} {
    padding: ${sizes(4)} 0;
  }
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
  width: 115px;
  height: auto;

  ${media.sm} {
    width: 250px;
  }
`
