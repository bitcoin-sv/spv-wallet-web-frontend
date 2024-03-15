import { SmallButton } from '@/components/Button'
import { ConfirmationModal } from '@/components/Modal'
import { FC, useState } from 'react'

type AcceptRejectProps = {
  onAccept: () => void
  onReject: () => void
}

export const AcceptReject: FC<AcceptRejectProps> = ({ onAccept, onReject }) => {
  const [state, setState] = useState<'none' | 'accept' | 'reject'>('none')

  const handleAccept = () => {
    //TODO: accept the contact
    onAccept()
  }

  const handleReject = () => {
    //TODO: reject the contact
    onReject()
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
        onConfirm={() => {
          if (state === 'accept') {
            handleAccept()
          } else {
            handleReject()
          }
          setState('none')
        }}
        onCancel={() => setState('none')}
      />
    </>
  )
}
