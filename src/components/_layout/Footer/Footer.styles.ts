import styled from '@emotion/styled'
import { sizes } from '@/styles'

export const FooterStyled = styled.footer`
  padding: ${sizes(6)} 0;
`

export const FooterContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
`

export const FooterNav = styled.ul`
  display: flex;
`

export const FooterNavElement = styled.li`
  margin: 0 ${sizes(1)};
`
