import { acceptContact, rejectContact } from '@/api/requests'
import { Contact } from '@/api/types'
import { SmallButton } from '@/components/Button'
import { ConfirmationModal } from '@/components/Modal'
import { FC, useState } from 'react'

type AcceptRejectProps = {
  contact: Contact
  onAccept: () => void
  onReject: () => void
}

export const AcceptReject: FC<AcceptRejectProps> = ({ contact, onAccept, onReject }) => {
  const [state, setState] = useState<'none' | 'accept' | 'reject'>('none')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const submitAccept = async () => {
    await acceptContact(contact.paymail)
    onAccept()
  }

  const submitReject = async () => {
    await rejectContact(contact.paymail)
    onReject()
  }

  const onConfirm = async () => {
    const submit = state === 'accept' ? submitAccept : submitReject
    setError(false)
    setLoading(true)
    try {
      await submit()
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setState('none')
    }
  }

  return (
    <>
      <SmallButton variant="accept" onClick={() => setState('accept')}>
        Accept
      </SmallButton>
      <SmallButton variant="reject" onClick={() => setState('reject')}>
        Reject
      </SmallButton>
      <ConfirmationModal
        title={state === 'accept' ? 'Accept contact' : 'Reject contact'}
        subtitle={`Are you sure you want to ${state === 'accept' ? 'accept' : 'reject'} this contact invitation?`}
        open={state !== 'none'}
        loading={loading}
        error={error ? 'Error during performing the action' : undefined}
        onConfirm={onConfirm}
        onCancel={() => setState('none')}
      />
    </>
  )
}
