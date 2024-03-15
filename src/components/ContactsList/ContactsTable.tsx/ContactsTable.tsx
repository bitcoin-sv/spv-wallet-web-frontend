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
import { colors } from '@/styles'

export const ContactsTable: FC = () => {
  const { contacts, loading, error, refresh } = useContacts()
  const [contactIdForVerification, setContactIdForVerification] = useState<string | null>(null)
  const [justAddedContact, setJustAddedContact] = useState(false)

  const contactForVerification = useMemo(() => {
    return contacts?.find((contact) => contact.paymail === contactIdForVerification)
  }, [contactIdForVerification, contacts])

  const openVerificationWindow = (peerPaymail: string, justAdded = false) => {
    setJustAddedContact(justAdded)
    setContactIdForVerification(peerPaymail)
  }

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
              {sortedContacts.map((contact) => (
                <tr key={contact.paymail} style={{ height: 50 }}>
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
                          openVerificationWindow(contact.paymail)
                        }}
                      >
                        Show code
                      </SmallButton>
                    ) : (
                      <AcceptReject
                        contact={contact}
                        onAccept={() => {
                          openVerificationWindow(contact.paymail, true)
                          refresh()
                        }}
                        onReject={refresh}
                      />
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
      {contactForVerification && (
        <VerifyModal
          peer={contactForVerification}
          onConfirmed={() => {
            refresh()
          }}
          onClose={() => {
            setContactIdForVerification(null)
            setJustAddedContact(false)
          }}
        >
          {justAddedContact && contactForVerification.status === 'not-confirmed' && (
            <div style={{ paddingBottom: 20 }}>
              <div style={{ color: colors.successScreen, fontSize: 18, paddingBottom: 10 }}>
                You've successfully accepted the contact.
              </div>
              Until confirmed, it will be displayed as <StatusBadge status="not-confirmed" />. <br />
              You can confirm it right now or return to this process later by using the "Show code" button.
            </div>
          )}
        </VerifyModal>
      )}
    </>
  )
}
