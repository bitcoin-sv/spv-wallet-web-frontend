import { Column, Row } from '@/styles/grid';
import { useMediaMatch } from '@/hooks/useMediaMatch';
import { AccountSummary } from '@/components/AccountSummary';
import { TransferForm } from '@/components/TransferForm';
import { TransactionHistory } from '@/components/TransactionHistory';
import { useWebsocket } from '@/hooks';
import { usePikePaymentEnabled } from '@/hooks/useFeatureFlags';

export const Dashboard = () => {
  const lgMatch = useMediaMatch('lg');
  useWebsocket();

  const pikePaymentEnabled = usePikePaymentEnabled();

  return (
    <>
      <Row smallReverse>
        <Column percentageWidth={lgMatch ? 70 : 100}>
          <TransactionHistory />
        </Column>
        <Column percentageWidth={lgMatch ? 30 : 100}>
          <AccountSummary />
          <TransferForm showContactsButton={pikePaymentEnabled} />
        </Column>
      </Row>
    </>
  );
};
