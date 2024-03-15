import { FC, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { variables } from '@/styles'
import { colors, sizes } from '@/styles'

export const useYourTOTP = () => {
  const [totp, setTotp] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchTotp = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      //TODO implement it
      await asyncSetTimeout(300)
      setTotp(Math.floor(Math.random() * 1000000))
    } catch {
      setError('Error during fetching your TOTP')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTotp()
  }, [fetchTotp])

  return { totp, loading, error }
}

const asyncSetTimeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

type YourTOTPProps = ReturnType<typeof useYourTOTP> & {
  peerName: string
}

export const YourTOTP: FC<YourTOTPProps> = ({ error, loading, totp, peerName }) => {
  if (loading) {
    return <></>
  }

  return (
    <Container error={!!error}>
      {error ? (
        `Error: ${error}`
      ) : (
        <span>
          Your TOTP code is: <b>{totp}</b>. Pass this code to {peerName}.
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
