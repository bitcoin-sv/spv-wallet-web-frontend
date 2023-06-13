import styled from '@emotion/styled'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'
import { media } from '@/styles/media'
import { Button } from '@/components/Button'

export const BarWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 0 ${sizes(4)};
  padding: ${sizes(2)};
  font-size: 14px;
  border-radius: ${variables.borderRadius};
  background-color: ${colors.errorBackground};

  ${media.md} {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`

export const ErrorText = styled.p`
  padding-top: ${sizes(1)};
  margin-left: ${sizes(2)};
  margin-bottom: 0;
  text-align: left;
  flex-grow: 1;
`

export const ReloadButton = styled(Button)`
  display: block;
  width: 200px;
  margin: ${sizes(12)} auto;
`
