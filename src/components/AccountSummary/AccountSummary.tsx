import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { DashboardTile } from '@/components/DashboardTile';
import { BalanceValue, Currency } from '@/components/AccountSummary/AccountSummary.styles';
import { Column, Row } from '@/styles/grid';
import { useAutoupdate } from '@/providers/autoupdate';
import { useEffect, useState } from 'react';
import { getUser } from '@/api';
import { Loader } from '@/components/Loader';
import { ErrorBar } from '@/components/ErrorBar';
import { convertSatToBsv } from '@/utils/helpers/convertSatToBsv';

interface CurrencyRates {
  usd?: number;
  bsv?: number;
  satoshis?: number;
}

interface AccountDetails {
  balance: CurrencyRates | undefined;
  email: string | undefined;
  paymail: string | undefined;
}

export const AccountSummary = () => {
  const { autoupdate } = useAutoupdate();
  const [details, setDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    setErrors('');
    getUser()
      .then((response) => {
        const accountDetails = {
          balance: response.balance,
          email: response.email,
          paymail: response.paymail,
        };
        setDetails(accountDetails);
      })
      .catch((error) => {
        setErrors(error.response.data?.message ?? 'Something went wrong... Please, try again later!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [autoupdate]);

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
  );
};
