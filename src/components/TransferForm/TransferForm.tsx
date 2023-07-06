import { DashboardTile } from '@/components/DashboardTile'
import SendIcon from '@mui/icons-material/Send'
import { Button } from '@/components/Button'
import { SrOnlySpan } from '@/styles'
import { Input } from '@/components/Input'
import { Column, Row } from '@/styles/grid'
import { FormEvent, useState } from 'react'
import { Loader } from '@/components/Loader'
import { TransactionConfirmModal, TransactionData } from '@/components/Modal/_modals/TransactionConfirmModal'
import { EMAIL_REGEX } from '@/utils/constants'
import { ErrorBar } from '@/components/ErrorBar'

export const TransferForm = () => {
  const [paymail, setPaymail] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
  const [errors, setErrors] = useState<string>('')

  const sendButtonDisabled = !paymail || !amount
  const cancelButtonDisabled = !paymail && !amount

  const cancelTransactionHandler = () => {
    setPaymail('')
    setAmount('')
    setErrors('')
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!paymail.match(EMAIL_REGEX)) {
      setErrors('Invalid paymail address!')
      return
    }

    setLoading(true)
    setTransactionData({ paymail: paymail, amount: amount })
  }

  const onCancelTransactionHandler = () => {
    setTransactionData(null)
    setLoading(false)
    if (paymail.match(EMAIL_REGEX)) {
      setErrors('')
    }
  }

  const onConfirmTransactionHandler = () => {
    setTransactionData(null)
    setAmount('')
    setPaymail('')
    setLoading(false)
    setErrors('')
  }

  return (
    <DashboardTile tileTitle="Send money" titleIcon={<SendIcon />}>
      {loading && <Loader />}
      <form onSubmit={(event) => onSubmitHandler(event)}>
        <fieldset>
          <Row>
            <Column>
              <legend>
                <SrOnlySpan>Money transfer form</SrOnlySpan>
              </legend>
              <Input
                labelText={`Paymail (example@${import.meta.env.VITE_BUX_PAYMAIL_DOMAIN || 'bux-domain.com'})`}
                required
                type="text"
                onChange={(event) => setPaymail(event.target.value)}
                value={paymail}
              />
              <Input
                labelText="Amount (BSV satoshis)"
                type="number"
                required
                min="0"
                step="any"
                onChange={(event) => setAmount(event.target.value)}
                value={amount}
              />
              {errors && <ErrorBar errorMsg={errors} />}
            </Column>
          </Row>

          <Row>
            <Column percentageWidth={50}>
              <Button
                variant="reject"
                fullWidth
                type="button"
                disabled={cancelButtonDisabled}
                onClick={cancelTransactionHandler}
              >
                Cancel
              </Button>
            </Column>
            <Column percentageWidth={50}>
              <Button variant="accept" fullWidth type="submit" disabled={sendButtonDisabled}>
                Send
              </Button>
            </Column>
          </Row>
        </fieldset>
      </form>
      <TransactionConfirmModal
        open={!!transactionData}
        transactionData={transactionData}
        primaryButtonOnClickHandler={() => onCancelTransactionHandler()}
        secondaryButtonOnClickHandler={() => onConfirmTransactionHandler()}
      />
    </DashboardTile>
  )
}
