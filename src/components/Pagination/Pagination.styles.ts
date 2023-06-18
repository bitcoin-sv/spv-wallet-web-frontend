import styled from '@emotion/styled'
import { sizes } from '@/styles'
import { Button } from '@/components/Button'
import { media } from '@/styles/media'

export const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  margin: ${sizes(4)} 0 0;
`

export const PaginationButton = styled(Button)`
  padding: ${sizes(2)};
  font-size: 18px;
  box-shadow: none;
  margin-right: ${sizes(1)};

  ${media.md} {
    font-size: 22px;
    padding: ${sizes(2)};
    margin-right: ${sizes(1)};
  }

  &:hover {
    text-decoration: underline;
  }

  &.active {
    background: rgba(255, 255, 255, 0.4);
  }
`
