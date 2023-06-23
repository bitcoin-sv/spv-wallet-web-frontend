import { Screen, ScreenText } from '@/components/SuccessScreen/SuccessScreen.styles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { FC } from 'react'

interface ScreenProps {
  text: string
}
export const SuccessScreen: FC<ScreenProps> = ({ text }) => {
  return (
    <Screen>
      <CheckCircleIcon />
      <ScreenText>{text}</ScreenText>
    </Screen>
  )
}
