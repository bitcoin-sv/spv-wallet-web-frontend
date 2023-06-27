import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { DashboardTile } from '@/components/DashboardTile'
import { BalanceValue, Currency } from '@/components/AccountSummary/AccountSummary.styles'
import { Column, Row } from '@/styles/grid'
import { useAuthorization } from '@/providers'
import { useAutoupdate } from '@/providers/autoupdate'
import { useEffect, useState } from 'react'

interface CurrencyRates {
  usd?: number
  bsv?: number
  satoshis?: number
}

interface AccountDetails {
  balance: CurrencyRates | undefined
  email: string | undefined
  paymail: string | undefined
}

export const AccountSummary = () => {
  const { authorization } = useAuthorization()
  const { autoupdate } = useAutoupdate()

  const [details, setDetails] = useState<AccountDetails | null>(null)

  useEffect(() => {
    const accountDetails = {
      balance: authorization?.balance,
      email: authorization?.email,
      paymail: authorization?.paymail,
    }

    setDetails(accountDetails)
  }, [authorization, autoupdate])

  return (
    <DashboardTile tileTitle="Your total balance" paymail={details?.paymail} titleIcon={<AccountBalanceWalletIcon />}>
      <Row>
        <Column>
          <BalanceValue mainValue>
            {details?.balance?.bsv} <Currency>BSV</Currency>
          </BalanceValue>
          <BalanceValue>
            {details?.balance?.satoshis} <Currency>sat.</Currency>
          </BalanceValue>
          <BalanceValue>
            {details?.balance?.usd} <Currency>USD</Currency>
          </BalanceValue>
        </Column>
      </Row>
    </DashboardTile>
  )
}
