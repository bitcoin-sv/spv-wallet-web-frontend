import ErrorIcon from '@mui/icons-material/Error'
import { FC } from 'react'
import { BarWrapper, ErrorText, ReloadButton } from '@/components/ErrorBar/ErrorProps.styles'

interface ErrorProps {
  errorMsg: string
  withReloadButton?: boolean
}

export const ErrorBar: FC<ErrorProps> = ({ errorMsg, withReloadButton }) => {
  const reloadHandler = () => {
    window.location.href = '/'
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
