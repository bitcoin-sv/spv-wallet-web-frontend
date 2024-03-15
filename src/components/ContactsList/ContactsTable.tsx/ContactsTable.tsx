import { Contact } from '@/api/types/contact'
import { Loader } from '@/components/Loader'
import {
  LargeTd,
  LargeTh,
  MediumTd,
  MediumTh,
  Table,
  TableWrapper,
} from '@/components/TransactionHistory/TransactionTable/TransactionTable.styles'
import { SetPaymailButton } from '@/components/TransferForm/SetPaymailButton'
import { FC, useEffect, useMemo, useState } from 'react'
import { StatusBadge } from './StatusBadge'
import { VerifyModal } from '../_modals'
import { SmallButton } from '@/components/Button'

//TODO: unify shared components with TransactionTable

const mockupContacts: Contact[] = [
  {
    paymail: 'bob@example.com',
    name: 'Bob',
    status: 'trusted',
  },
  {
    paymail: 'bobi@example.com',
    name: 'Bobi',
    status: 'untrusted',
  },
  {
    paymail: 'new@invitation.com',
    name: 'Newbie',
    status: 'pending-invitation',
  },
]

export const ContactsTable: FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [contactIdForVerification, setContactIdForVerification] = useState<string | null>(null)

  const contactForVerification = useMemo(() => {
    return contacts.find((contact) => contact.paymail === contactIdForVerification)
  }, [contactIdForVerification, contacts])

  useEffect(() => {
    //TODO: featch contacts from the server
    setContacts(mockupContacts)

    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [])

  const sortedContacts = useMemo(() => {
    //show pending-invitation first
    return contacts.sort((a, b) => {
      if (a.status === 'pending-invitation') {
        return -1
      }
      if (b.status === 'pending-invitation') {
        return 1
      }
      return 0
    })
  }, [contacts])

  return (
    <>
      {loading && <Loader />}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <LargeTh>Paymail</LargeTh>
              <MediumTh>Name</MediumTh>
              <MediumTh>Status</MediumTh>
              <MediumTh>Actions</MediumTh>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.map((contact, index) => (
              <tr key={index} style={{ height: 50 }}>
                <LargeTd>{contact.paymail}</LargeTd>
                <MediumTd>{contact.name}</MediumTd>
                <MediumTd>
                  <StatusBadge status={contact.status} />
                </MediumTd>
                <MediumTd>
                  <SmallButton
                    variant="accept"
                    onClick={() => {
                      setContactIdForVerification(contact.paymail)
                    }}
                  >
                    Show code
                  </SmallButton>
                  <SetPaymailButton
                    paymail={contact.paymail}
                    variant={contact.status === 'trusted' ? 'accept' : 'primary'}
                  />
                </MediumTd>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
      {contactForVerification != null && (
        <VerifyModal
          contact={contactForVerification}
          onRequestRefresh={() => {
            //TODO
          }}
          onClose={() => setContactIdForVerification(null)}
        />
      )}
    </>
  )
}
