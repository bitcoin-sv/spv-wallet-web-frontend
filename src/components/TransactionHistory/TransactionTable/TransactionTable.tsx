import {
  CurrentPage,
  PageNumber,
  Table,
  TableWrapper,
} from '@/components/TransactionHistory/TransactionTable/TransactionTable.styles'
import { Pagination } from '@/components/Pagination'
import { useState } from 'react'

export const TransactionTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      <CurrentPage>
        Page: <PageNumber>1</PageNumber>
      </CurrentPage>
      <TableWrapper>
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
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
            <tr>
              <td>fjkdlsfkjdshfkj</td>
              <td>17.06.2023 09:11 AM GTM</td>
              <td>confirmed</td>
              <td>incoming</td>
              <td>0.54433 BSV</td>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
      <Pagination totalItems={50} itemsPerPage={10} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  )
}
