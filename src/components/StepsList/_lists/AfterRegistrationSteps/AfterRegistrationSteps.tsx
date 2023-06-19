import { StepsList } from '@/components/StepsList'
import {
  BoxLabel,
  CopiedConfirmation,
  CopyButton,
  DataBox,
  DataText,
  StepDesc,
  StepElement,
  StepHeadline,
} from '@/components/StepsList/StepsList.styles'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { SrOnlySpan } from '@/styles'
import { Button } from '@/components/Button'
import { FC, useState } from 'react'

interface ListProps {
  mnemonic: string
  paymail: string
}

export const AfterRegistrationSteps: FC<ListProps> = ({ mnemonic, paymail }) => {
  const [mnemonicCopied, setMnemonicCopied] = useState(false)
  const [paymailCopied, setPaymailCopiedCopied] = useState(false)
  const copyToClipboardHandler = (textToCopy: string) => {
    setMnemonicCopied(false)
    setPaymailCopiedCopied(false)
    navigator.clipboard.writeText(textToCopy)

    if (textToCopy === mnemonic) {
      setMnemonicCopied(true)
    }

    if (textToCopy === paymail) {
      setPaymailCopiedCopied(true)
    }

    setTimeout(() => {
      setMnemonicCopied(false)
      setPaymailCopiedCopied(false)
    }, 5000)
  }

  return (
    <StepsList>
      <StepElement>
        <StepHeadline>Store your mnemonic</StepHeadline>
        <StepDesc>
          <strong>This step is the most important!</strong>
          <br />
          We won't display your mnemonic never again. You will need these words if you forgot wallet's password. It's
          the only way to recover access to your account. We recommend store your mnemonic in physical form. On the
          paper for example. Please, remember to store secure words in safe place.
        </StepDesc>
        <DataBox>
          <BoxLabel>Mnemonic:</BoxLabel>
          <DataText>{mnemonic}</DataText>
          <CopyButton variant="transparent" isOnlyIconButton onClick={() => copyToClipboardHandler(mnemonic)}>
            <ContentCopyIcon />
            <SrOnlySpan>Copy to clipboard</SrOnlySpan>
          </CopyButton>
          {mnemonicCopied && <CopiedConfirmation>copied to clipboard</CopiedConfirmation>}
        </DataBox>
      </StepElement>
      <StepElement>
        <StepHeadline>Remember your Paymail</StepHeadline>
        <StepDesc>
          Paymail will be useful in creating blockchain transactions. Do it faster and more safe. No worries! After
          login you will have access to your unique paymail.
        </StepDesc>
        <DataBox>
          <BoxLabel>Paymail:</BoxLabel>
          <DataText>{paymail}</DataText>
          <CopyButton variant="transparent" isOnlyIconButton onClick={() => copyToClipboardHandler(paymail)}>
            <ContentCopyIcon />
            <SrOnlySpan>Copy to clipboard</SrOnlySpan>
          </CopyButton>
          {paymailCopied && <CopiedConfirmation>copied to clipboard</CopiedConfirmation>}
        </DataBox>
      </StepElement>
      <StepElement>
        <StepHeadline>Log in to your wallet!</StepHeadline>
        <StepDesc>Great! You are ready to start using your wallet! click below and go to the log in page:</StepDesc>
        <Button to="/" variant="transparent" isLink underline isTextLink>
          Log in now!
        </Button>
      </StepElement>
    </StepsList>
  )
}
