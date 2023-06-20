import { Modal } from '@/components/Modal'
import { FC } from 'react'
import {
  DataName,
  DetailsLink,
  DetailsList,
  ListElement,
} from '@/components/Modal/_modals/TransactionDetailsModal/TransactionDetailsModal.styles'

export interface DetailsTypes {
  id: string
  direction: string
  amount: string
  status: string
  timestamp: string
}

interface TransactionDetailsProps {
  open: boolean
  secondaryButtonOnClickHandler?: () => void
  primaryButtonOnClickHandler?: () => void
  transactionDetails: DetailsTypes | null
}

export const TransactionDetailsModal: FC<TransactionDetailsProps> = ({
  open,
  primaryButtonOnClickHandler,
  transactionDetails,
}) => {
  return (
    <Modal
      open={open}
      modalTitle="Transaction details"
      modalSubtitle={transactionDetails?.id}
      primaryButton={{ text: 'Close', variant: 'reject', onClick: primaryButtonOnClickHandler }}
    >
      <DetailsList>
        <ListElement>
          <DataName>Transaction ID:</DataName> <span>{transactionDetails?.id}</span>
        </ListElement>
        <ListElement>
          <DataName>Status:</DataName> <span>{transactionDetails?.status}</span>
        </ListElement>
        <ListElement>
          <DataName>direction:</DataName> <span>{transactionDetails?.direction}</span>
        </ListElement>
        <ListElement>
          <DataName>Amount in BSV:</DataName> <span>{transactionDetails?.amount}</span>
        </ListElement>
        <ListElement>
          <DataName>Amount in Satoshis:</DataName> <span>{transactionDetails?.amount}</span>
        </ListElement>
        <ListElement>
          <DataName>Amount in USD:</DataName> <span>{transactionDetails?.amount}</span>
        </ListElement>
        <ListElement>
          <DataName>Check details on whatsonchain.com:</DataName>{' '}
          <span>
            <DetailsLink variant="transparent" isLink isTextLink to="https://www.whatsonchain.com">
              go to details
            </DetailsLink>
          </span>
        </ListElement>
      </DetailsList>
    </Modal>
  )
}
