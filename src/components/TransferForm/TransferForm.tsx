import { DashboardTile } from '@/components/DashboardTile'
import SendIcon from '@mui/icons-material/Send'
import { Button } from '@/components/Button'
import { SrOnlySpan } from '@/styles'
import { Input } from '@/components/Input'
import { Column, Row } from '@/styles/grid'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Loader } from '@/components/Loader'
import { TransactionConfirmModal, TransactionData } from '@/components/Modal/_modals/TransactionConfirmModal'
import { EMAIL_REGEX } from '@/utils/constants'
import { ErrorBar } from '@/components/ErrorBar'
import { useConfig } from '@4chain-ag/react-configuration'
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv'

export const TransferForm = () => {
  const FORMATTED_INITIAL_VALUE = '0.00000000'
  const MAX_TRANSACTION_VALUE = 999999999999

  const [paymail, setPaymail] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [formattedValue, setFormattedValue] = useState<string>(FORMATTED_INITIAL_VALUE)
  const [loading, setLoading] = useState<boolean>(false)
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
  const [errors, setErrors] = useState<string>('')

  const { config } = useConfig()

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const formatted = convertSatToBsv(value)

    if (!formatted || isNaN(parseInt(formatted))) {
      setAmount('')
      setFormattedValue(FORMATTED_INITIAL_VALUE)
      return
    }
    if (parseInt(value) > MAX_TRANSACTION_VALUE) {
      setFormattedValue(formatted)
      return
    }

    setAmount(value)
    setFormattedValue(formatted)
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
                labelText={`Paymail (example@${config.paymailDomain || 'bux-domain.com'})`}
                required
                type="text"
                onChange={(event) => setPaymail(event.target.value)}
                value={paymail}
              />
              {/*(TODO: CHECK THE DOMAIN*/}
              <Input
                labelText="Amount (sat)"
                type="number"
                min="0"
                step="any"
                onChange={(event) => {
                  handleChange(event)
                }}
                value={amount}
                formattedValue={formattedValue}
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
      {transactionData && (
        <TransactionConfirmModal
          open={!!transactionData}
          transactionData={transactionData}
          primaryButtonOnClickHandler={() => onCancelTransactionHandler()}
          secondaryButtonOnClickHandler={() => onConfirmTransactionHandler()}
        />
      )}
    </DashboardTile>
  )
}
