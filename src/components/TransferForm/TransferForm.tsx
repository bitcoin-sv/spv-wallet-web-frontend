import { DashboardTile } from '@/components/DashboardTile'
import SendIcon from '@mui/icons-material/Send'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import { Button } from '@/components/Button'
import { SrOnlySpan } from '@/styles'
import { Input } from '@/components/Input'
import { Column, Row } from '@/styles/grid'
import { FormEvent, useState } from 'react'
import { Loader } from '@/components/Loader'
import { TransactionConfirmModal, TransactionData } from '@/components/Modal/_modals/TransactionConfirmModal'
import { EMAIL_REGEX } from '@/utils/constants'
import { ErrorBar } from '@/components/ErrorBar'
import { useConfig } from '@/providers'

export const TransferForm = () => {
  const [paymail, setPaymail] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [sendData, setSendData] = useState<boolean>(false)
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null)
  const [errors, setErrors] = useState<string>('')

  const { config } = useConfig()

  const sendButtonDisabled = sendData ? !data : !paymail || !amount
  const cancelButtonDisabled = sendData ? !data : !paymail && !amount

  const cancelTransactionHandler = () => {
    setPaymail('')
    setAmount('')
    setData('')
    setErrors('')
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)
    if (sendData) {
      setTransactionData({ data: data })
    } else {
      if (!paymail.match(EMAIL_REGEX)) {
        setErrors('Invalid paymail address!')
        return
      }
      setTransactionData({ paymail: paymail, amount: amount })
    }
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
    // setData('')
    setLoading(false)
    setErrors('')
  }

  const payInputs = () => {
    return (
      <>
        <Input
          labelText={`Paymail (example@${config.paymailDomain || 'bux-domain.com'})`}
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
      </>
    )
  }

  const dataInputs = () => {
    return (
      <>
        <Input
          labelText="Data"
          type="text"
          onChange={(event) => setData(event.target.value)}
          value={data}
          required
          minLength={1}
        />
      </>
    )
  }

  return (
    <DashboardTile
      tileTitle="Send money"
      titleIcon={
        sendData ? (
          <DriveFolderUploadIcon
            onClick={() => {
              cancelTransactionHandler()
              setSendData(false)
            }}
          />
        ) : (
          <SendIcon
            onClick={() => {
              cancelTransactionHandler()
              setSendData(true)
            }}
          />
        )
      }
    >
      {loading && <Loader />}
      <form onSubmit={(event) => onSubmitHandler(event)}>
        <fieldset>
          <Row>
            <Column>
              <legend>
                <SrOnlySpan>Money transfer form</SrOnlySpan>
              </legend>
              {sendData ? dataInputs() : payInputs()}
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
