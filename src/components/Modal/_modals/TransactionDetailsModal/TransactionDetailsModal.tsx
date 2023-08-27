import { Modal } from '@/components/Modal'
import { FC, useEffect, useState } from 'react'
import {
  DataName,
  DetailsLink,
  DetailsList,
  ListElement,
} from '@/components/Modal/_modals/TransactionDetailsModal/TransactionDetailsModal.styles'
import { getTransactionsDetails } from '@/api/requests/GetTransactionDetails'
import { TransactionDetails } from '@/api/types/transaction'
import { format } from 'date-fns'
import { Loader } from '@/components/Loader'
import { ErrorBar } from '@/components/ErrorBar'
import { useApiUrl } from '@/api/apiUrl'
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv'

interface TransactionDetailsProps {
  open: boolean
  secondaryButtonOnClickHandler?: () => void
  primaryButtonOnClickHandler?: () => void
  id: string | ''
}

export const TransactionDetailsModal: FC<TransactionDetailsProps> = ({ open, primaryButtonOnClickHandler, id }) => {
  const [transactionData, setTransactionData] = useState<TransactionDetails | null>(null)
  const [errors, setErrors] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const apiUrl = useApiUrl()

  useEffect(() => {
    setErrors('')
    apiUrl &&
      getTransactionsDetails(apiUrl, id)
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
  }, [apiUrl, id])

  return (
    <Modal
      open={open}
      modalTitle="Transaction details"
      primaryButton={{ text: 'Close', variant: 'reject', onClick: primaryButtonOnClickHandler }}
      onCloseByEsc={primaryButtonOnClickHandler}
    >
      <>
        {loading && <Loader />}
        {errors ? (
          <ErrorBar errorMsg={errors} withReloadButton />
        ) : (
          <DetailsList>
            <ListElement>
              <DataName>Transaction ID:</DataName> <span>{id}</span>
            </ListElement>
            <ListElement>
              <DataName>Status:</DataName> <span>{transactionData?.status}</span>
            </ListElement>
            <ListElement>
              <DataName>Direction:</DataName> <span>{transactionData?.direction}</span>
            </ListElement>
            <ListElement>
              <DataName>Total Value:</DataName> <span>{convertSatToBsv(transactionData?.totalValue)} BSV</span>
            </ListElement>
            <ListElement>
              <DataName>Fee:</DataName> <span>{convertSatToBsv(transactionData?.fee)} BSV</span>
            </ListElement>
            <ListElement>
              <DataName>Block hash:</DataName> <span>{transactionData?.blockHash}</span>
            </ListElement>
            <ListElement>
              <DataName>Block height:</DataName> <span>{transactionData?.blockHeight}</span>
            </ListElement>
            <ListElement>
              <DataName>Number of inputs:</DataName> <span>{transactionData?.numberOfInputs}</span>
            </ListElement>
            <ListElement>
              <DataName>Number of outputs:</DataName> <span>{transactionData?.numberOfOutputs}</span>
            </ListElement>
            <ListElement>
              <DataName>Created at:</DataName>{' '}
              <span>
                {transactionData?.createdAt && format(new Date(transactionData?.createdAt), 'd.MM.yyyy, HH:mm:ss')}
              </span>
            </ListElement>
            <ListElement>
              <DataName>Check details on whatsonchain.com:</DataName>{' '}
              <span>
                <DetailsLink
                  variant="transparent"
                  isLink
                  isTextLink
                  to={`https://www.whatsonchain.com/tx/${transactionData?.id}`}
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
