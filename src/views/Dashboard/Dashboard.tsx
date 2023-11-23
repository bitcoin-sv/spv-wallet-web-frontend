import { Column, Row } from '@/styles/grid'
import { useMediaMatch } from '@/hooks/useMediaMatch'
import { AccountSummary } from '@/components/AccountSummary'
import { TransferForm } from '@/components/TransferForm'
import { TransactionHistory } from '@/components/TransactionHistory'
import { useEffect } from 'react'
import { useWebsocket } from '@/hooks'

export const Dashboard = () => {
  const lgMatch = useMediaMatch('lg')
  const { connect, disconnect } = useWebsocket()

  useEffect(() => {
    connect()
    return () => {
      disconnect()
    }
  }, [])

  return (
    <>
      <Row smallReverse>
        <Column percentageWidth={lgMatch ? 70 : 100}>
          <TransactionHistory />
        </Column>
        <Column percentageWidth={lgMatch ? 30 : 100}>
          <AccountSummary />
          <TransferForm />
        </Column>
      </Row>
    </>
  )
}
