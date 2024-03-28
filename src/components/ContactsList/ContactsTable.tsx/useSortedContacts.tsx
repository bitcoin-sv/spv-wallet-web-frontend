import { Contact, ContactAwaitingAcceptance } from '@/api/types/contact'
import { useMemo } from 'react'

export const useSortedContacts = (contacts: Contact[] | null) => {
  return useMemo(() => {
    //show awaiting-acceptance first; the rest sorted alphabetically by paymail
    return contacts?.sort((a, b) =>
      isAwaitingAcceptance(a) ? -1 : isAwaitingAcceptance(b) ? 1 : a.paymail.localeCompare(b.paymail)
    )
  }, [contacts])
}

const isAwaitingAcceptance = (contact: Contact) => contact.status === ContactAwaitingAcceptance
