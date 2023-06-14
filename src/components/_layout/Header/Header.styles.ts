import styled from '@emotion/styled'
import { sizes } from '@/styles'
import { Button } from '@/components/Button'
import { media } from '@/styles/media'

interface AuthorizationProps {
  authorizationState?: boolean
}

export const HeaderStyled = styled.header<AuthorizationProps>`
  padding: ${sizes(2)} 0;
  margin: ${({ authorizationState }) => (authorizationState ? `${sizes(4)} 0` : '0')};

  ${media.sm} {
    padding: ${sizes(4)} 0;
  }
`

export const HeaderContent = styled.div<AuthorizationProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ authorizationState }) => (authorizationState ? 'initial' : 'space-between')};
  width: 100%;

  nav {
    flex-grow: ${({ authorizationState }) => (authorizationState ? '1' : 'initial')};
  }
`

export const LogoLink = styled(Button)<AuthorizationProps>`
  padding: 0;
  margin-right: ${({ authorizationState }) => (authorizationState ? sizes(12) : 'initial')};

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
