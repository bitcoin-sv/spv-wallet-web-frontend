import { Modal } from '@/components/Modal'
import { FC } from 'react'
import {
  TextWithValues,
  Value,
} from '@/components/Modal/_modals/TransactionConfirmModal/TransactionConfirmModal.styles'

export interface TransactionData {
  paymail: string
  amount: string
}

interface TransactionConfirmModalProps {
  open: boolean
  secondaryButtonOnClickHandler?: () => void
  primaryButtonOnClickHandler?: () => void
  transactionData: TransactionData | null
}

export const TransactionConfirmModal: FC<TransactionConfirmModalProps> = ({
  open,
  primaryButtonOnClickHandler,
  secondaryButtonOnClickHandler,
  transactionData,
}) => {
  return (
    <Modal
      open={open}
      modalTitle="New transaction"
      modalSubtitle="Please check your transactions data once and again confirm if everything is correct"
      primaryButton={{ text: 'Cancel', variant: 'reject', onClick: primaryButtonOnClickHandler }}
      secondaryButton={{ text: 'Confirm', variant: 'accept', onClick: secondaryButtonOnClickHandler }}
    >
      <TextWithValues>
        You try to send <Value>{transactionData?.amount} BSV</Value> to <Value>{transactionData?.paymail}</Value>
      </TextWithValues>
    </Modal>
  )
}
