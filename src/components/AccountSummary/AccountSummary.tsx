import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { DashboardTile } from '@/components/DashboardTile'
import { BalanceValue, Currency } from '@/components/AccountSummary/AccountSummary.styles'
import { Column, Row } from '@/styles/grid'
import { useAutoupdate } from '@/providers/autoupdate'
import { useEffect, useState } from 'react'
import { getUser } from '@/api'
import { Loader } from '@/components/Loader'
import { ErrorBar } from '@/components/ErrorBar'
import { useApiUrl } from '@/api/apiUrl'
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv'

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
  const { autoupdate } = useAutoupdate()
  const apiUrl = useApiUrl()
  const [details, setDetails] = useState<AccountDetails | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    setErrors('')
    apiUrl &&
      getUser(apiUrl)
        .then((response) => {
          const accountDetails = {
            balance: response.balance,
            email: response.email,
            paymail: response.paymail,
          }
          setDetails(accountDetails)
        })
        .catch((error) => {
          let errorMsg

          if (error.response.status === 404) {
            errorMsg =
              "User's account details not found. If you can't log in again, please contact our support or try again later!"
          } else {
            errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please, try again later!'
          }

          setErrors(errorMsg)
        })
        .finally(() => {
          setLoading(false)
        })
  }, [apiUrl, autoupdate])

  return (
    <DashboardTile tileTitle="Your total balance" paymail={details?.paymail} titleIcon={<AccountBalanceWalletIcon />}>
      {loading && <Loader />}
      <Row>
        <Column>
          {errors ? (
            <ErrorBar errorMsg={errors} withReloadButton />
          ) : (
            <>
              <BalanceValue mainValue>
                {convertSatToBsv(details?.balance?.satoshis)} <Currency>BSV</Currency>
              </BalanceValue>
              <BalanceValue>
                {details?.balance?.satoshis} <Currency>sat.</Currency>
              </BalanceValue>
              <BalanceValue>
                {details?.balance?.usd} <Currency>USD</Currency>
              </BalanceValue>
            </>
          )}
        </Column>
      </Row>
    </DashboardTile>
  )
}
