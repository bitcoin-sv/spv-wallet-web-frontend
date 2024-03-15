import { ContactAwaitingAcceptance, ContactConfirmed } from '@/api/types/contact'
import { Loader } from '@/components/Loader'
import {
  LargeTd,
  LargeTh,
  MediumTd,
  MediumTh,
  NoDataInfo,
  Table,
  TableWrapper,
} from '@/components/TransactionHistory/TransactionTable/TransactionTable.styles'
import { SetPaymailButton } from '@/components/TransferForm/SetPaymailButton'
import { FC, useMemo, useState } from 'react'
import { StatusBadge } from './StatusBadge'
import { VerifyModal } from '../_modals'
import { SmallButton } from '@/components/Button'
import { AcceptReject } from '../AcceptReject'
import { useContacts } from '@/providers'
import { ErrorBar } from '@/components/ErrorBar'
import { useSortedContacts } from './useSortedContacts'

export const ContactsTable: FC = () => {
  const { contacts, loading, error, refresh } = useContacts()
  const [contactIdForVerification, setContactIdForVerification] = useState<string | null>(null)

  const contactForVerification = useMemo(() => {
    console.log('contacts', contacts)
    return contacts?.find((contact) => contact.paymail === contactIdForVerification)
  }, [contactIdForVerification, contacts])

  const sortedContacts = useSortedContacts(contacts)

  if (error) {
    return <ErrorBar errorMsg="Failed to load contacts" />
  }

  return (
    <>
      {loading && <Loader />}
      <TableWrapper>
        {!sortedContacts ? (
          <NoDataInfo>No contacts yet</NoDataInfo>
        ) : (
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
                <tr key={`${contact.paymail}-${index}`} style={{ height: 50 }}>
                  <LargeTd>{contact.paymail}</LargeTd>
                  <MediumTd>{contact.name}</MediumTd>
                  <MediumTd>
                    <StatusBadge status={contact.status} />
                  </MediumTd>
                  <MediumTd>
                    {contact.status !== ContactAwaitingAcceptance ? (
                      <SmallButton
                        variant="accept"
                        onClick={() => {
                          setContactIdForVerification(contact.paymail)
                        }}
                      >
                        Show code
                      </SmallButton>
                    ) : (
                      <>
                        <AcceptReject
                          onAccept={() => {
                            refresh()
                            setContactIdForVerification(contact.paymail)
                          }}
                          onReject={refresh}
                        />
                      </>
                    )}
                    <SetPaymailButton
                      paymail={contact.paymail}
                      variant={contact.status === ContactConfirmed ? 'accept' : 'primary'}
                    />
                  </MediumTd>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </TableWrapper>
      {contactForVerification != null && (
        <VerifyModal
          peer={contactForVerification}
          onRequestRefresh={() => {
            //TODO
          }}
          onClose={() => setContactIdForVerification(null)}
        />
      )}
    </>
  )
}
