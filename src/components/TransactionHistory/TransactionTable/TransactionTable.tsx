import {
  ContentWithInfoTip,
  CurrentPage,
  Highlighted,
  LargeTd,
  LargeTh,
  MediumTd,
  MediumTh,
  NoDataInfo,
  PageNumber,
  SmallTd,
  SmallTh,
  Table,
  TableWrapper,
  UserPrefix,
} from '@/components/TransactionHistory/TransactionTable/TransactionTable.styles'
import { Pagination } from '@/components/Pagination'
import { useEffect, useState } from 'react'
import { TransactionDetailsModal } from '@/components/Modal/_modals/TransactionDetailsModal'
import { getTransactions } from '@/api/requests/GetTransactions'
import { Transaction } from '@/api/types/transaction'
import { colors, SrOnlySpan } from '@/styles'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { format } from 'date-fns'
import { Loader } from '@/components/Loader'
import { ErrorBar } from '@/components/ErrorBar'
import { useMediaMatch } from '@/hooks'
import { useAutoupdate } from '@/providers/autoupdate'
import { useApiUrl } from '@/api/apiUrl'

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [transactionsList, setTransactionsList] = useState<Array<Transaction>>([])
  const [transactionDetailsModal, setTransactionDetailsModal] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')

  const { autoupdate } = useAutoupdate()
  const apiUrl = useApiUrl()

  const ITEMS_PER_PAGE = 10
  const TOTAL_ITEMS = totalPages * ITEMS_PER_PAGE

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setLoading(true)
    apiUrl &&
      getTransactions(apiUrl, currentPage, ITEMS_PER_PAGE, 'created_at', 'desc')
        .then((response) => {
          const transactions = response.transactions

          setTotalPages(transactions.pages)
          setTransactionsList(transactions.transactions)
          setLoading(false)
        })
        .catch((error) => {
          const errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please try again later'
          setErrors(errorMsg)
        })
        .finally(() => setLoading(false))
  }, [apiUrl, currentPage, autoupdate])

  const smMatch = useMediaMatch('sm')

  return (
    <>
      {loading && <Loader />}
      {totalPages > 1 && (
        <CurrentPage>
          Page: <PageNumber>{currentPage}</PageNumber>
        </CurrentPage>
      )}
      <TableWrapper withPagination={totalPages <= 1}>
        <>
          {!transactionsList ? (
            <NoDataInfo>No transaction yet</NoDataInfo>
          ) : errors ? (
            <ErrorBar errorMsg={errors} withReloadButton />
          ) : (
            <Table>
              <thead>
                <tr>
                  <LargeTh>Sender/receiver</LargeTh>
                  <MediumTh>Amount</MediumTh>
                  <SmallTh>Status</SmallTh>
                  {smMatch && (
                    <>
                      <SmallTh>Direction</SmallTh>
                      <MediumTh>Date</MediumTh>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {transactionsList.map((transaction, index) => {
                  return (
                    <tr key={index} onClick={() => setTransactionDetailsModal(transaction.id)}>
                      <LargeTd>
                        {transaction.direction === 'incoming' && <UserPrefix>from:</UserPrefix>}
                        {transaction.direction === 'outgoing' && <UserPrefix>to:</UserPrefix>}
                        <Highlighted>
                          {transaction.direction === 'incoming' &&
                            (transaction.sender ? transaction.sender : '$sender')}
                          {transaction.direction === 'outgoing' &&
                            (transaction.receiver ? transaction.receiver : '$receiver')}
                        </Highlighted>
                      </LargeTd>
                      <MediumTd>
                        {transaction.direction === 'incoming' && (
                          <span style={{ color: colors.transactionIncoming }}>+ </span>
                        )}
                        {transaction.direction === 'outgoing' && (
                          <span style={{ color: colors.transactionOutgoing }}>- </span>
                        )}
                        {transaction.totalValue} sat.
                      </MediumTd>
                      <SmallTd>
                        {transaction.status === 'confirmed' ? (
                          <ContentWithInfoTip
                            uppercase
                            data-value={transaction.status}
                            isConfirmed={transaction.status === 'confirmed'}
                          >
                            <SrOnlySpan>confirmed</SrOnlySpan>
                          </ContentWithInfoTip>
                        ) : (
                          <ContentWithInfoTip
                            uppercase
                            data-value={transaction.status}
                            isConfirmed={transaction.status === 'confirmed'}
                          >
                            <SrOnlySpan>unconfirmed</SrOnlySpan>
                          </ContentWithInfoTip>
                        )}
                      </SmallTd>
                      {smMatch && (
                        <>
                          <SmallTd>
                            {transaction.direction === 'incoming' ? (
                              <ContentWithInfoTip uppercase data-value={transaction.direction}>
                                <KeyboardDoubleArrowDownIcon style={{ color: colors.transactionIncoming }} />
                                <SrOnlySpan>incoming</SrOnlySpan>
                              </ContentWithInfoTip>
                            ) : (
                              <ContentWithInfoTip uppercase data-value={transaction.direction}>
                                <KeyboardDoubleArrowUpIcon style={{ color: colors.transactionOutgoing }} />
                                <SrOnlySpan>outgoing</SrOnlySpan>
                              </ContentWithInfoTip>
                            )}
                          </SmallTd>
                          <MediumTd>{format(new Date(transaction.createdAt), 'd.MM.yyyy, HH:mm:ss')}</MediumTd>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </>
      </TableWrapper>
      {totalPages > 1 && (
        <Pagination
          totalItems={TOTAL_ITEMS}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      {transactionDetailsModal && (
        <TransactionDetailsModal
          id={transactionDetailsModal}
          open={transactionDetailsModal !== ''}
          primaryButtonOnClickHandler={() => setTransactionDetailsModal('')}
        />
      )}
    </>
  )
}
