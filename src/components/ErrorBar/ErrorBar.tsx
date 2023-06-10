import ErrorIcon from '@mui/icons-material/Error'
import { FC } from 'react'
import { BarWrapper, ErrorText } from '@/components/ErrorBar/ErrorProps.styles'

type ErrorProps = {
  errorMsg: string
}

export const ErrorBar: FC<ErrorProps> = ({ errorMsg }) => {
  return (
    <BarWrapper>
      <ErrorIcon />
      <ErrorText>{errorMsg}</ErrorText>
    </BarWrapper>
  )
}
