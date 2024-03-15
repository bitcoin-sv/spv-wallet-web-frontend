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
import React, { useEffect, useMemo, useState } from 'react'
import { TransactionDetailsModal } from '@/components/Modal'
import { getTransactions } from '@/api/requests'
import { Transaction } from '@/api/types'
import { colors, SrOnlySpan } from '@/styles'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import { format } from 'date-fns'
import { Loader } from '@/components/Loader'
import { ErrorBar } from '@/components/ErrorBar'
import { useMediaMatch } from '@/hooks'
import { useAutoupdate } from '@/providers/autoupdate'
import _ from 'lodash'
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv'
import { PaginationParams } from '@/api/types/pagination'

const KEY_NAME_ENTER = 'Enter'
const KEY_NAME_SPACE = 'Space'
const AUTOUPDATE_INTERVAL = 5000
const ITEMS_PER_PAGE = 10

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [transactionsList, setTransactionsList] = useState<Array<Transaction>>([])
  const [transactionDetailsModal, setTransactionDetailsModal] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')
  const { autoupdate, setAutoupdate } = useAutoupdate()

  const totalItems = totalPages * ITEMS_PER_PAGE

  const pagination: PaginationParams = useMemo(() => {
    return {
      page: currentPage,
      page_size: ITEMS_PER_PAGE,
      order: 'created_at',
      sort: 'desc',
    }
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const autoUpdateList = () => {
    getTransactions(pagination)
      .then((response) => {
        const transactions = response.transactions

        if (_.isEqual(transactions.transactions, transactionsList)) {
          return
        }

        setTransactionsList(transactions.transactions)
        const updateTime = new Date().toISOString()
        setAutoupdate(updateTime)
      })
      .catch((e) => {
        const error = e?.response?.data ? e.response.data : e
        const cause = error.cause ? error.cause : undefined
        console.error('Error during updating transactions', error, cause)
      })
  }

  useEffect(() => {
    setLoading(true)

    getTransactions(pagination)
      .then((response) => {
        const transactions = response.transactions

        setTotalPages(transactions.pages)
        setTransactionsList(transactions.transactions)
      })
      .catch((error) => {
        const errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please try again later'
        setErrors(errorMsg)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [pagination, autoupdate])

  useEffect(() => {
    const intervalId = setInterval(autoUpdateList, AUTOUPDATE_INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  })

  const openModalByKeyboard = (e: React.KeyboardEvent<HTMLTableRowElement>, modalId: string) => {
    if (![KEY_NAME_ENTER, KEY_NAME_SPACE].includes(e.code)) {
      return
    }
    setTransactionDetailsModal(modalId)
  }

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
            <Table clickable>
              <thead>
                <tr>
                  <LargeTh>Sender/receiver</LargeTh>
                  <MediumTh>Amount</MediumTh>
                  {smMatch && (
                    <>
                      <SmallTh>Status</SmallTh>
                      <SmallTh>Direction</SmallTh>
                      <MediumTh>Date</MediumTh>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {transactionsList.map((transaction, index) => {
                  const dir = transaction.direction
                  const amount = convertSatToBsv(transaction.totalValue) ?? 'unknown'
                  return (
                    <tr
                      key={index}
                      onKeyDown={(e) => openModalByKeyboard(e, transaction.id)}
                      onClick={() => setTransactionDetailsModal(transaction.id)}
                      role="button"
                      aria-label={`Open details of transaction id number: ${transaction.id}`}
                      tabIndex={0}
                    >
                      <LargeTd>
                        {dir === 'incoming' && <UserPrefix>from:</UserPrefix>}
                        {dir === 'outgoing' && <UserPrefix>to:</UserPrefix>}
                        <Highlighted>
                          {dir === 'incoming' && (transaction.sender ? transaction.sender : '$sender')}
                          {dir === 'outgoing' && (transaction.receiver ? transaction.receiver : '$receiver')}
                        </Highlighted>
                      </LargeTd>
                      <MediumTd>
                        {dir === 'incoming' && <span style={{ color: colors.transactionIncoming }}>+ </span>}
                        {dir === 'outgoing' && <span style={{ color: colors.transactionOutgoing }}>- </span>}
                        {amount} BSV
                      </MediumTd>
                      {smMatch && (
                        <>
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
                          <SmallTd>
                            {dir === 'incoming' ? (
                              <ContentWithInfoTip uppercase data-value={dir}>
                                <KeyboardDoubleArrowDownIcon style={{ color: colors.transactionIncoming }} />
                                <SrOnlySpan>incoming</SrOnlySpan>
                              </ContentWithInfoTip>
                            ) : (
                              <ContentWithInfoTip uppercase data-value={dir}>
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
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
      {transactionDetailsModal && (
        <TransactionDetailsModal
          id={transactionDetailsModal}
          open={transactionDetailsModal !== ''}
          onClose={() => setTransactionDetailsModal('')}
        />
      )}
    </>
  )
}
