import { Column, Row } from '@/styles/grid'
import { DashboardTile } from '@/components/DashboardTile'
import { useMediaMatch } from '@/hooks/useMediaMatch'
import { AccountSummary } from '@/components/AccountSummary'

export const Dashboard = () => {
  const lgMatch = useMediaMatch('lg')
  return (
    <>
      <Row>
        <Column>
          <h2>Dashboard</h2>
        </Column>
      </Row>
      <Row smallReverse>
        <Column percentageWidth={lgMatch ? 70 : 100}>
          <DashboardTile tileTitle="table" />
        </Column>
        <Column percentageWidth={lgMatch ? 30 : 100}>
          <AccountSummary />
          <DashboardTile tileTitle="New Transaction" />
        </Column>
      </Row>
    </>
  )
}
