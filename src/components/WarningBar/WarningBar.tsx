import { CloseButton, HighlightedText, WarningText, Wrapper } from '@/components/WarningBar/WarningBar.styles'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { FC, useState } from 'react'
import { SrOnlySpan } from '@/styles'

interface BarProps {
  highlightedText?: string
  warningText: string
}

export const WarningBar: FC<BarProps> = ({ highlightedText, warningText }) => {
  const [warningVisible, setWarningVisible] = useState<boolean>(true)
  return (
    <>
      {warningVisible && (
        <Wrapper>
          <CloseButton variant="transparent" isLink onClick={() => setWarningVisible(false)}>
            x<SrOnlySpan>Close warning</SrOnlySpan>
          </CloseButton>
          <WarningAmberIcon />
          <WarningText>
            {highlightedText && <HighlightedText>{highlightedText}</HighlightedText>}
            {warningText}
          </WarningText>
        </Wrapper>
      )}
    </>
  )
}
