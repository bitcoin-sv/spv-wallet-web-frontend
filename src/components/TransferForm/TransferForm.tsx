import { DashboardTile } from '@/components/DashboardTile'
import SendIcon from '@mui/icons-material/Send'
import { Button } from '@/components/Button'
import { SrOnlySpan } from '@/styles'
import { Input } from '@/components/Input'
import { Column, Row } from '@/styles/grid'
import { FormEvent, useState } from 'react'
import { Loader } from '@/components/Loader'

export const TransferForm = () => {
  const [paymail, setPaymail] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const sendButtonDisabled = !paymail || !amount
  const cancelButtonDisabled = !paymail && !amount

  const cancelTransactionHandler = () => {
    setPaymail('')
    setAmount('')
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const transactionDetails = {
      paymail: paymail,
      amount: amount,
    }

    // Fake transaction sending
    // to remove after connection with API
    setTimeout(() => {
      alert('You sent ' + transactionDetails.amount + ' to ' + transactionDetails.paymail)
      console.log(transactionDetails)

      setPaymail('')
      setAmount('')
      setLoading(false)
    }, 1000)
    // END OF
    // Fake transaction sending
    // to remove after connection with API
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
                labelText="Paymail (example@bux.com)"
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
    </DashboardTile>
  )
}
