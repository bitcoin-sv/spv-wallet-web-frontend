import { Modal } from '@/components/Modal'
import { FC, useState } from 'react'
import { SrOnlySpan } from '@/styles'
import { Loader } from '@/components/Loader'
import { PaymailInput } from '@/components/Input/PaymailInput'
import { Input } from '@/components/Input'
import { addContact } from '@/api/requests/contact'
import { modalCloseTimeout } from '@/components/Modal/modalCloseTimeout'
import { ErrorBar } from '@/components/ErrorBar'

type ContactAddModalProps = {
  open: boolean
  onSubmitted: () => void
  onCancel: () => void
}

export const ContactAddModal: FC<ContactAddModalProps> = ({ open, onSubmitted, onCancel }) => {
  const [paymail, setPaymail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [successMessage, setSuccessMessage] = useState<string>('')

  const onSuccess = async () => {
    setSuccessMessage('Contact added successfully!')
    await modalCloseTimeout()
    onSubmitted()
  }

  const onSubmit = async () => {
    setLoading(true)
    setError(false)
    try {
      addContact(paymail, name)
      onSuccess()
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      modalTitle="Add contact"
      modalSubtitle="Please double check the paymail address on which the invitation will be sent"
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: onCancel }}
      secondaryButton={{
        text: 'Create',
        variant: 'accept',
        onClick: onSubmit,
        type: 'submit',
      }}
      successScreenMsg={successMessage}
      isLoading={loading}
      onCloseByEsc={onCancel}
    >
      {loading && <Loader />}
      {error && <ErrorBar errorMsg="Failed to add contact" />}
      <form onSubmit={() => onSubmit()}>
        <legend>
          <SrOnlySpan>Add contact form</SrOnlySpan>
        </legend>
        <fieldset>
          <PaymailInput
            inputOnLightBackground
            value={paymail}
            onChange={(event) => setPaymail(event.target.value)}
            required
          />
          <Input
            inputOnLightBackground
            labelText="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </fieldset>
      </form>
    </Modal>
  )
}
