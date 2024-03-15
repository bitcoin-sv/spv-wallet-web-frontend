/* eslint-disable @typescript-eslint/no-unused-vars */
import { PaginationParams } from '../types'
import { Contact } from '../types/contact'

export const searchContacts = async (_pagination?: PaginationParams) => {
  await asyncSetTimeout(1000)
  return contacts
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

const asyncSetTimeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
