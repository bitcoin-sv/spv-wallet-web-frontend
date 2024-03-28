import { FC } from 'react'
import styled from '@emotion/styled'
import { colors } from '@/styles'
import { StatusBadge } from './StatusBadge'

export const JustAddedContactMsg: FC = () => {
  return (
    <Container>
      <SuccessInfo>You've successfully accepted the contact.</SuccessInfo>
      Until confirmed, it will be displayed as <StatusBadge status="not-confirmed" />. <br />
      You can confirm it right now or return to this process later by using the "Show code" button.
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

const SuccessInfo = styled.div`
  color: ${colors.successScreen};
  font-size: 18px;
  padding-bottom: 10px;
`
