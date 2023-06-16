import { Column, Row } from '@/styles/grid'
import { ComponentTile } from '@/components/ComponentTile'
import { useMediaMatch } from '@/hooks/useMediaMatch'

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
          <ComponentTile>Table</ComponentTile>
        </Column>
        <Column percentageWidth={lgMatch ? 30 : 100}>
          <ComponentTile>User Balance</ComponentTile>

          <ComponentTile>New Transaction</ComponentTile>
        </Column>
      </Row>
    </>
  )
}
