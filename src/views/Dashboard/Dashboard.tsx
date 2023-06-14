import { Column, Row } from '@/styles/grid'
import { ComponentTile } from '@/components/ComponentTile'

export const Dashboard = () => {
  return (
    <>
      <Row>
        <Column>
          <h2>Dashboard</h2>
        </Column>
      </Row>
      <Row>
        <Column percentageWidth={70}>
          <ComponentTile>Table</ComponentTile>
        </Column>
        <Column percentageWidth={30}>
          <ComponentTile>User Balance</ComponentTile>

          <ComponentTile>New Transaction</ComponentTile>
        </Column>
      </Row>
    </>
  )
}
