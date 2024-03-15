import { FC, useState } from 'react'
import { Button } from '@/components/Button'
import { ContactAddModal } from './ContactAddModal/ContactAddModal'

type ContactAddProps = {
  onRequestRefresh: () => void
}

export const ContactAdd: FC<ContactAddProps> = ({ onRequestRefresh }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="primary" small onClick={() => setOpen(true)}>
        Add contact
      </Button>
      {open && (
        <ContactAddModal
          open={true}
          onSubmitted={() => {
            setOpen(false)
            onRequestRefresh()
          }}
          onCancel={() => setOpen(false)}
        />
      )}
    </>
  )
}
