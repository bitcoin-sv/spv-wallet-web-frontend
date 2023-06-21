import { Button } from '@/components/Button'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { useAuthorization } from '@/providers'

export const BackToDashboardButton = () => {
  const { authorization } = useAuthorization()

  const customStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '20px',
    maxWidth: '210px',
  }

  return (
    <Button variant="transparent" to={authorization ? '/dashboard' : '/'} isLink style={customStyles}>
      <ArrowCircleLeftIcon /> Back to {authorization ? 'dashboard' : 'main page'}
    </Button>
  )
}
