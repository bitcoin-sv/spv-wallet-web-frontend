import { Modal } from '@/components/Modal'
import { FC, useState } from 'react'
import { SrOnlySpan } from '@/styles'
import { Loader } from '@/components/Loader'
import { PaymailInput } from '@/components/Input/PaymailInput'

type ContactAddModalProps = {
  open: boolean
  onSubmitted: () => void
  onCancel: () => void
}

export const ContactAddModal: FC<ContactAddModalProps> = ({ open, onSubmitted, onCancel }) => {
  const [paymail, setPaymail] = useState<string>('')
  // const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [successMessage, setSuccessMessage] = useState<string>('')

  const onSuccess = () => {
    setSuccessMessage('Contact added successfully!')
    setTimeout(() => {
      onSubmitted()
    }, 3000)
    setSuccessMessage('Contact added successfully!')
  }

  const onSubmit = () => {
    //TODO implement it
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 1000)
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
        </fieldset>
      </form>
    </Modal>
  )
}
