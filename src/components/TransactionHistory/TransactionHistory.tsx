import { DashboardTile } from '@/components/DashboardTile'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import { TransactionTable } from '@/components/TransactionHistory/TransactionTable'
import { Column, Row } from '@/styles/grid'

export const TransactionHistory = () => {
  return (
    <DashboardTile fullHeight tileTitle="Transactions history" titleIcon={<DataThresholdingIcon />}>
      <Row>
        <Column>
          <TransactionTable />
        </Column>
      </Row>
    </DashboardTile>
  )
}
