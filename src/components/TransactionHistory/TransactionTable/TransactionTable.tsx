import {
  ContentWithInfoTip,
  CurrentPage,
  IdLink,
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

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [transactionsList, setTransactionsList] = useState<Array<Transaction>>([])
  const [transactionDetailsModal, setTransactionDetailsModal] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')

  const ITEMS_PER_PAGE = 10
  const TOTAL_ITEMS = totalPages * ITEMS_PER_PAGE

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setLoading(true)
    getTransactions(currentPage, ITEMS_PER_PAGE, 'created_at', 'desc')
      .then((response) => {
        const transactions = response.transactions

        setTotalPages(response.count.length / ITEMS_PER_PAGE)
        setTransactionsList(transactions)
        setLoading(false)
      })
      .catch((error) => {
        setErrors(error)
      })
      .finally(() => setLoading(false))
  }, [currentPage])

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
            <ErrorBar errorMsg="Something went wrong... Please try again later" withReloadButton />
          ) : (
            <Table>
              <thead>
                <tr>
                  <LargeTh>Sender/receiver</LargeTh>
                  <MediumTh>Amount</MediumTh>
                  <SmallTh>Status</SmallTh>
                  <SmallTh>Direction</SmallTh>
                  <MediumTh>Date</MediumTh>
                </tr>
              </thead>
              <tbody>
                {transactionsList.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <LargeTd>
                        <IdLink
                          variant="transparent"
                          isLink
                          isTextLink
                          onClick={() => setTransactionDetailsModal(transaction.id)}
                        >
                          {transaction.direction === 'incoming' && '$Sender'}
                          {transaction.direction === 'outgoing' && '$Receiver'}
                        </IdLink>
                      </LargeTd>
                      <MediumTd>{transaction.totalValue} sat.</MediumTd>
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
                          <ContentWithInfoTip uppercase data-value={transaction.status}>
                            <SrOnlySpan>unconfirmed</SrOnlySpan>
                          </ContentWithInfoTip>
                        )}
                      </SmallTd>
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