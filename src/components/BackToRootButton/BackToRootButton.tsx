import { Button } from '@/components/Button'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'

export const BackToRootButton = () => {
  const customStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '20px',
    maxWidth: '100px',
  }

  return (
    <Button variant="transparent" to="/" isLink style={customStyles}>
      <ArrowCircleLeftIcon /> Back
    </Button>
  )
}
