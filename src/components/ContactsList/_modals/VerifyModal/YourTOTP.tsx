import { FC } from 'react'
import { useYourTOTP } from './useYourTOTP'
import styled from '@emotion/styled'
import { variables } from '@/styles'
import { colors, sizes } from '@/styles'

type YourTOTPProps = ReturnType<typeof useYourTOTP> & {
  contactName: string
}

export const YourTOTP: FC<YourTOTPProps> = ({ error, loading, totp, contactName }) => {
  if (loading) {
    return <></>
  }

  return (
    <Container error={!!error}>
      {error ? (
        `Error: ${error}`
      ) : (
        <span>
          Your TOTP code is: <b>{totp}</b>. Pass this code to {contactName}.
        </span>
      )}
    </Container>
  )
}

type ContainerProps = {
  error: boolean
}

const Container = styled.div<ContainerProps>`
    padding: ${sizes(4)};
    font-size: 22px;
    border-radius: ${variables.borderRadius};
    color: white;
    box-shadow: ${variables.shadow.inputEffectShadow};
    background-color: ${({ error }) => (error ? colors.primaryBackground : colors.infoBackground)};
}
`
