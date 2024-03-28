import { FC, useState } from 'react'
import { Button } from '@/components/Button'
import { ContactAddModal } from './ContactAddModal/ContactAddModal'
import { useContacts } from '@/providers'

export const ContactAdd: FC = () => {
  const [open, setOpen] = useState(false)
  const { refresh } = useContacts()

  const onSubmitted = () => {
    setOpen(false)
    refresh()
  }

  return (
    <>
      <Button variant="primary" small onClick={() => setOpen(true)}>
        Add contact
      </Button>
      {open && <ContactAddModal open={true} onSubmitted={onSubmitted} onCancel={() => setOpen(false)} />}
    </>
  )
}
