import ErrorIcon from '@mui/icons-material/Error'
import { FC } from 'react'
import { BarWrapper, ErrorText, ReloadButton } from '@/components/ErrorBar/ErrorProps.styles'
import { useNavigate } from 'react-router-dom'

interface ErrorProps {
  errorMsg: string
  withReloadButton?: boolean
}

export const ErrorBar: FC<ErrorProps> = ({ errorMsg, withReloadButton }) => {
  const navigate = useNavigate()
  const reloadHandler = () => {
    navigate('/')
    window.location.reload()
  }

  return (
    <>
      <BarWrapper>
        <ErrorIcon />
        <ErrorText>{errorMsg}</ErrorText>
      </BarWrapper>
      {withReloadButton && (
        <ReloadButton variant="primary" aria-label="reload app" onClick={reloadHandler}>
          Reload app
        </ReloadButton>
      )}
    </>
  )
}
