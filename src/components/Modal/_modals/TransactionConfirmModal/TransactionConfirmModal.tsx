import { Modal } from '@/components/Modal'
import { FC, useEffect, useState } from 'react'
import {
  Form,
  TextWithValues,
  Value,
} from '@/components/Modal/_modals/TransactionConfirmModal/TransactionConfirmModal.styles'
import { SrOnlySpan } from '@/styles'
import { Input } from '@/components/Input'
import { sendTransaction } from '@/api/requests/SendTransaction'
import { Loader } from '@/components/Loader'
import { ErrorBar } from '@/components/ErrorBar'
import { SuccessScreen } from '@/components/SuccessScreen'
import { useAutoupdate } from '@/providers/autoupdate'

export interface TransactionData {
  paymail: string
  amount: string
}

interface TransactionConfirmModalProps {
  open: boolean
  secondaryButtonOnClickHandler?: () => void
  primaryButtonOnClickHandler?: () => void
  transactionData: TransactionData | null
}

export const TransactionConfirmModal: FC<TransactionConfirmModalProps> = ({
  open,
  primaryButtonOnClickHandler,
  secondaryButtonOnClickHandler,
  transactionData,
}) => {
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [errorWithReload, setErrorWithReload] = useState<boolean>(false)

  const { setAutoupdate } = useAutoupdate()

  const onFormSubmitHandler = () => {
    if (!password) {
      setErrors('Password is required to confirm transaction.')
      return
    }
    setErrors('')
    setLoading(true)

    const receiver = transactionData?.paymail ? transactionData?.paymail : 'undefined'
    const satoshisAmount = transactionData?.amount ? transactionData?.amount : '0'
    const userPassword = password ? password : 'undefined'

    const newTransactionData = {
      recipient: receiver,
      satoshis: parseInt(satoshisAmount),
      password: userPassword,
    }

    sendTransaction(newTransactionData)
      .then(() => {
        setSuccess(true)

        //store info about new transaction in global context
        const updateTime = new Date().toISOString()
        setAutoupdate(updateTime)

        setTimeout(() => {
          setSuccess(false)
          secondaryButtonOnClickHandler && secondaryButtonOnClickHandler()
        }, 5000)
      })
      .catch((error) => {
        if (error) {
          if (error.response.status === 401) {
            setErrors('Session expired! Please login in to your wallet')
            setErrorWithReload(true)
            return
          }

          if (error.response.status === 400) {
            setErrors('Transfer was not sent. Probably you filled the form with incorrect data. Please try once again!')
            return
          }

          setErrors(
            'Transfer was not sent. Please verify transfer data and try once again. If problem will happen again, contact with our support.'
          )
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  //back states to initial values on close modal
  useEffect(() => {
    return () => {
      setPassword('')
      setErrors('')
      setErrorWithReload(false)
      setSuccess(false)
    }
  }, [open])

  return (
    <Modal
      open={open}
      modalTitle="New transaction"
      modalSubtitle="Please check your transactions data once again and confirm if everything is correct"
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: primaryButtonOnClickHandler }}
      secondaryButton={{
        text: 'Confirm',
        variant: 'accept',
        onClick: onFormSubmitHandler,
        type: 'submit',
      }}
    >
      {loading && <Loader />}
      <TextWithValues>
        You try to send <Value>{transactionData?.amount} sat.</Value> to <Value>{transactionData?.paymail}</Value>
      </TextWithValues>
      <Form onSubmit={() => onFormSubmitHandler()}>
        <legend>
          <SrOnlySpan>Transaction confirmation form</SrOnlySpan>
        </legend>
        <fieldset>
          <Input
            labelText="Password"
            type="password"
            inputOnLightBackground
            withIcon
            togglePasswordVisibility
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </fieldset>
        <p>If data are correct, confirm the transaction by your wallet's password</p>
        {errors && <ErrorBar errorMsg={errors} withReloadButton={errorWithReload} />}
      </Form>

      {success && <SuccessScreen text="Great! Transaction sent to receiver!" />}
    </Modal>
  )
}
