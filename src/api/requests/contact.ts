/* eslint-disable @typescript-eslint/no-unused-vars */
import { timeoutPromise } from '@/utils/timeoutPromise'
import { PaginationParams } from '../types'
import { Contact } from '../types/contact'

export const searchContacts = async (_pagination?: PaginationParams) => {
  await timeoutPromise(500)
  return contacts
}

export const addContact = async (paymail: string, name: string) => {
  await timeoutPromise(1000)
  contacts.push({
    paymail,
    name,
    status: 'awaiting-acceptance',
  })
}

/// Mocked contacts

const contacts: Contact[] = [
  {
    paymail: 'bob@example.com',
    name: 'Bob',
    status: 'confirmed',
  },
  {
    paymail: 'tester@example.com',
    name: 'Tester',
    status: 'awaiting-acceptance',
  },
  {
    paymail: 'theguy@example.com',
    name: 'The Guy',
    status: 'not-confirmed',
  },
]
