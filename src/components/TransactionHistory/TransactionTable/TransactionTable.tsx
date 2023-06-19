import {
  CurrentPage,
  IdLink,
  PageNumber,
  Table,
  TableWrapper,
} from '@/components/TransactionHistory/TransactionTable/TransactionTable.styles'
import { Pagination } from '@/components/Pagination'
import { useState } from 'react'
import { DetailsTypes, TransactionDetailsModal } from '@/components/Modal/_modals/TransactionDetailsModal'

const MOCKED_TRANSACTIONS = [
  [
    {
      id: 'c4f38d9a-46e1-4e95-96fb-6ae123d7fb59',
      timestamp: '17.06.2023 09:11 AM',
      status: 'not confirmed',
      direction: 'outgoing',
      value: '0.62019870',
    },
    {
      id: '2e6796b3-8f45-4176-a4c8-9f2d1a8bfc4c',
      timestamp: '17.06.2023 09:11 AM',
      status: 'not confirmed',
      direction: 'incoming',
      value: '0.15328936',
    },
    {
      id: '9b0f47c6-0b15-4ee6-855d-3b8a09fe2d94',
      timestamp: '17.06.2023 09:11 AM',
      status: 'not confirmed',
      direction: 'outgoing',
      value: '0.50317680',
    },
    {
      id: '7df3a51a-43fd-45a3-ae14-15c4d8e703a8',
      timestamp: '11.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.19843715',
    },
    {
      id: 'f12bc5d6-8a75-4de9-936e-6a0899b87e3c',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'incoming',
      value: '0.83796520',
    },
    {
      id: '5e20fd97-623d-4844-92e9-6bf9a9dfc4e7',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'incoming',
      value: '0.10580474',
    },
    {
      id: 'b84d9e6c-fa84-4c8f-9d97-172c93883a42',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.22105793',
    },
    {
      id: '3a6e7a9c-d619-4234-94d8-ff8beba7a0d6',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'incoming',
      value: '0.67432500',
    },
    {
      id: 'e594ba84-cac4-4c6b-9b5e-eeb5a95f4a29',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.91245810',
    },
    {
      id: '8d9a36e5-12c4-43f8-af7b-6950c2de8ebd',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.35487620',
    },
  ],
  [
    {
      id: 'c4f38d9a-46e1-4e95-96fb',
      timestamp: '17.06.2023 09:11 AM',
      status: 'not confirmed',
      direction: 'outgoing',
      value: '0.62019870',
    },
    {
      id: '2e6796b3-8f45-4176-a4c8',
      timestamp: '17.06.2023 09:11 AM',
      status: 'not confirmed',
      direction: 'incoming',
      value: '0.15328936',
    },
    {
      id: '9b0f47c6-0b15-4ee6-855d',
      timestamp: '17.06.2023 09:11 AM',
      status: 'not confirmed',
      direction: 'outgoing',
      value: '0.50317680',
    },
    {
      id: '7df3a51a-43fd-45a3-ae14',
      timestamp: '11.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.19843715',
    },
    {
      id: 'f12bc5d6-8a75-4de9-936e',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'incoming',
      value: '0.83796520',
    },
    {
      id: '5e20fd97-623d-4844-92e9',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'incoming',
      value: '0.10580474',
    },
    {
      id: 'b84d9e6c-fa84-4c8f-9d97',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.22105793',
    },
    {
      id: '3a6e7a9c-d619-4234-94d8',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'incoming',
      value: '0.67432500',
    },
    {
      id: 'e594ba84-cac4-4c6b-9b5e',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.91245810',
    },
    {
      id: '8d9a36e5-12c4-43f8-af7b',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.35487620',
    },
  ],
  [
    {
      id: '3a6e7a9c-d619-4234-94d8',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'incoming',
      value: '0.67432500',
    },
    {
      id: 'e594ba84-cac4-4c6b-9b5e',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.91245810',
    },
    {
      id: '8d9a36e5-12c4-43f8-af7b',
      timestamp: '17.06.2023 09:11 AM',
      status: 'confirmed',
      direction: 'outgoing',
      value: '0.35487620',
    },
  ],
]

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [transactionDetails, setTransactionDetails] = useState<DetailsTypes | null>(null)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = MOCKED_TRANSACTIONS.length
  const totalItems = totalPages * 10

  return (
    <>
      {totalPages > 1 && (
        <CurrentPage>
          Page: <PageNumber>{currentPage}</PageNumber>
        </CurrentPage>
      )}
      <TableWrapper withPagination={totalPages <= 1}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>outgoing / incoming</th>
              <th>amount</th>
            </tr>
          </thead>
          <tbody>
            {MOCKED_TRANSACTIONS[currentPage - 1].map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>
                    <IdLink
                      variant="transparent"
                      isLink
                      isTextLink
                      onClick={() =>
                        setTransactionDetails({
                          id: transaction.id,
                          timestamp: transaction.timestamp,
                          status: transaction.status,
                          direction: transaction.direction,
                          amount: transaction.value,
                        })
                      }
                    >
                      {transaction.id}
                    </IdLink>
                  </td>
                  <td>{transaction.timestamp}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.direction}</td>
                  <td>{transaction.value} BSV</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </TableWrapper>
      {totalPages > 1 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={10}
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
