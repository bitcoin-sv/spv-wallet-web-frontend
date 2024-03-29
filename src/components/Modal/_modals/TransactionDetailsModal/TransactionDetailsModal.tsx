import { Modal } from '@/components/Modal'
import { FC, useEffect, useState } from 'react'
import {
  DataName,
  DetailsLink,
  DetailsList,
  ListElement,
  Highlighted,
} from '@/components/Modal/_modals/TransactionDetailsModal/TransactionDetailsModal.styles'
import { getTransactionsDetails } from '@/api/requests'
import { TransactionDetails } from '@/api/types'
import { format } from 'date-fns'
import { Loader } from '@/components/Loader'
import { ErrorBar } from '@/components/ErrorBar'
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv'
import { SetPaymailButton } from '@/components/TransferForm/SetPaymailButton'

type TransactionDetailsProps = {
  open: boolean
  onClose?: () => void
  id: string | ''
}

export const TransactionDetailsModal: FC<TransactionDetailsProps> = ({ open, onClose, id }) => {
  const [transactionData, setTransactionData] = useState<TransactionDetails | null>(null)
  const [errors, setErrors] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setErrors('')
    getTransactionsDetails(id)
      .then((response) => {
        setTransactionData(response)
      })
      .catch((error) => {
        const errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please try again later'
        errorMsg && setErrors(errorMsg)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const isIncoming = transactionData?.direction === 'incoming'
  const isOutgoing = transactionData?.direction === 'outgoing'

  return (
    <Modal
      open={open}
      modalTitle="Transaction details"
      primaryButton={{ text: 'Close', variant: 'reject', onClick: onClose }}
      onCloseByEsc={onClose}
    >
      <>
        {loading && <Loader />}
        {errors ? (
          <ErrorBar errorMsg={errors} withReloadButton />
        ) : transactionData == null ? (
          <ErrorBar errorMsg="Could not load transaction data" withReloadButton />
        ) : (
          <DetailsList>
            <ListElement>
              <DataName>Sender:</DataName>
              <Highlighted enabled={isIncoming}>
                {transactionData.sender}
                {isIncoming && <SetPaymailButton paymail={transactionData.sender} onClick={onClose} />}
              </Highlighted>
            </ListElement>
            <ListElement>
              <DataName>Receiver:</DataName>
              <Highlighted enabled={isOutgoing}>
                {transactionData.receiver}
                {isOutgoing && <SetPaymailButton paymail={transactionData.receiver} onClick={onClose} />}
              </Highlighted>
            </ListElement>
            <ListElement>
              <DataName>Transaction ID:</DataName> <span>{id}</span>
            </ListElement>
            <ListElement>
              <DataName>Status:</DataName> <span>{transactionData.status}</span>
            </ListElement>
            <ListElement>
              <DataName>Direction:</DataName> <span>{transactionData.direction}</span>
            </ListElement>
            <ListElement>
              <DataName>Total Value:</DataName> <span>{convertSatToBsv(transactionData.totalValue)} BSV</span>
            </ListElement>
            <ListElement>
              <DataName>Fee:</DataName> <span>{convertSatToBsv(transactionData.fee) || '0.00000000'} BSV</span>
            </ListElement>
            <ListElement>
              <DataName>Block hash:</DataName> <span>{transactionData.blockHash}</span>
            </ListElement>
            <ListElement>
              <DataName>Block height:</DataName> <span>{transactionData.blockHeight}</span>
            </ListElement>
            <ListElement>
              <DataName>Number of inputs:</DataName> <span>{transactionData.numberOfInputs}</span>
            </ListElement>
            <ListElement>
              <DataName>Number of outputs:</DataName> <span>{transactionData.numberOfOutputs}</span>
            </ListElement>
            <ListElement>
              <DataName>Created at:</DataName>{' '}
              <span>
                {transactionData.createdAt && format(new Date(transactionData.createdAt), 'd.MM.yyyy, HH:mm:ss')}
              </span>
            </ListElement>
            <ListElement>
              <DataName>Check details on whatsonchain.com:</DataName>{' '}
              <span>
                <DetailsLink
                  variant="transparent"
                  isLink
                  isTextLink
                  to={`https://www.whatsonchain.com/tx/${transactionData.id}`}
                >
                  go to details
                </DetailsLink>
              </span>
            </ListElement>
          </DetailsList>
        )}
      </>
    </Modal>
  )
}
