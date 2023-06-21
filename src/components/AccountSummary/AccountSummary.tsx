import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { DashboardTile } from '@/components/DashboardTile'
import { BalanceValue, Currency } from '@/components/AccountSummary/AccountSummary.styles'
import { Column, Row } from '@/styles/grid'
import { useAuthorization } from '@/providers'

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

  const accountDetails: AccountDetails = {
    balance: authorization?.balance,
    email: authorization?.email,
    paymail: authorization?.paymail,
  }

  return (
    <DashboardTile
      tileTitle="Your total balance"
      paymail={accountDetails.paymail}
      titleIcon={<AccountBalanceWalletIcon />}
    >
      <Row>
        <Column>
          <BalanceValue mainValue>
            {accountDetails.balance?.bsv} <Currency>BSV</Currency>
          </BalanceValue>
          <BalanceValue>
            {accountDetails.balance?.satoshis} <Currency>sat.</Currency>
          </BalanceValue>
          <BalanceValue>
            {accountDetails.balance?.usd} <Currency>USD</Currency>
          </BalanceValue>
        </Column>
      </Row>
    </DashboardTile>
  )
}
