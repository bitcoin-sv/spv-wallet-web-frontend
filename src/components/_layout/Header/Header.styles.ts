import styled from '@emotion/styled'
import { sizes } from '@/styles'
import { Button } from '@/components/Button'
import { media } from '@/styles/media'

type AuthorizationProps = {
  isAuthorized?: boolean
}

export const HeaderStyled = styled.header<AuthorizationProps>`
  padding: ${sizes(2)} 0;
  margin: ${({ isAuthorized }) => (isAuthorized ? `${sizes(4)} 0` : '0')};

  ${media.sm} {
    padding: ${sizes(4)} 0;
  }
`

export const HeaderContent = styled.div<AuthorizationProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ isAuthorized }) => (isAuthorized ? 'initial' : 'space-between')};
  flex-wrap: ${({ isAuthorized }) => (isAuthorized ? 'wrap' : 'initial')};
  width: 100%;

  nav {
    flex-grow: ${({ isAuthorized }) => (isAuthorized ? '1' : 'initial')};
  }
`

export const LogoLink = styled(Button)<AuthorizationProps>`
  padding: 0;
  display: flex;

  &::after {
    content: none;
  }

  ${media.md} {
    margin-right: ${({ isAuthorized: authorizationState }) => (authorizationState ? sizes(12) : 'initial')};
  }
`

export const Logo = styled.img`
  width: 115px;
  height: auto;
  //cover
  object-fit: contain;

  ${media.sm} {
    width: 250px;
  }
`

export const LogoBackButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${sizes(2)};

  :hover {
    opacity: 0.8;
  }
`
