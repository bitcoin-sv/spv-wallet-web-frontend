import { Contact, ContactAwaitingAcceptance } from '@/api/types/contact'
import { useMemo } from 'react'

export const useSortedContacts = (contacts: Contact[] | null) => {
  return useMemo(() => {
    //show awaiting-acceptance first
    return contacts?.sort((a, b) => (isAwaitingAcceptance(a) ? -1 : isAwaitingAcceptance(b) ? 1 : 0))
  }, [contacts])
}

const isAwaitingAcceptance = (contact: Contact) => contact.status === ContactAwaitingAcceptance
