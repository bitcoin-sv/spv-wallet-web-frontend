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
import { DetailsTypes, TransactionDetailsModal } from '@/components/Modal/_modals/TransactionDetailsModal'
import { getTransactions } from '@/api/requests/GetTransactions'
import { Transaction } from '@/api/types/transaction'
import { SrOnlySpan } from '@/styles'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { format } from 'date-fns'

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [transactionsList, setTransactionsList] = useState<Array<Transaction>>([])
  const [transactionDetails, setTransactionDetails] = useState<DetailsTypes | null>(null)

  const ITEMS_PER_PAGE = 10
  const TOTAL_ITEMS = totalPages * ITEMS_PER_PAGE

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    getTransactions().then((response) => {
      const transactions = response
      const dividedTransactions = []

      //required for pagination
      for (let i = 0; i < transactions.length; i += ITEMS_PER_PAGE) {
        dividedTransactions.push(transactions.slice(i, i + ITEMS_PER_PAGE))
      }

      setTotalPages(dividedTransactions.length)
      setTransactionsList(dividedTransactions[currentPage - 1])
    })
  }, [currentPage])

  console.log(transactionsList)

  return (
    <>
      {totalPages > 1 && (
        <CurrentPage>
          Page: <PageNumber>{currentPage}</PageNumber>
        </CurrentPage>
      )}
      <TableWrapper withPagination={totalPages <= 1}>
        {!transactionsList.length ? (
          <NoDataInfo>No transaction yet</NoDataInfo>
        ) : (
          <Table>
            <thead>
              <tr>
                <LargeTh>ID</LargeTh>
                <MediumTh>Amount</MediumTh>
                <SmallTh>Status</SmallTh>
                <SmallTh>Direction</SmallTh>
                <MediumTh>Timestamp</MediumTh>
              </tr>
            </thead>
            <tbody>
              {transactionsList.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <LargeTd>
                      <ContentWithInfoTip data-value={transaction.id}>
                        <IdLink
                          variant="transparent"
                          isLink
                          isTextLink
                          onClick={() =>
                            setTransactionDetails({
                              id: transaction.id,
                              timestamp: transaction.createdAt,
                              status: transaction.status,
                              direction: transaction.direction,
                              amount: transaction.totalValue,
                            })
                          }
                        >
                          {transaction.id}
                        </IdLink>
                      </ContentWithInfoTip>
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
                          <KeyboardDoubleArrowDownIcon />
                          <SrOnlySpan>incoming</SrOnlySpan>
                        </ContentWithInfoTip>
                      ) : (
                        <ContentWithInfoTip uppercase data-value={transaction.direction}>
                          <KeyboardDoubleArrowUpIcon />
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
      </TableWrapper>
      {totalPages > 1 && (
        <Pagination
          totalItems={TOTAL_ITEMS}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      <TransactionDetailsModal
        open={transactionDetails !== null}
        transactionDetails={transactionDetails}
        primaryButtonOnClickHandler={() => setTransactionDetails(null)}
      />
    </>
  )
}
