import { Column, Row } from '@/styles/grid';
import { useMediaMatch } from '@/hooks/useMediaMatch';
import { AccountSummary } from '@/components/AccountSummary';
import { TransferForm } from '@/components/TransferForm';
import { ContactsList } from '@/components/ContactsList';
import { useWebsocket } from '@/hooks';

export const Contacts = () => {
  const lgMatch = useMediaMatch('lg');
  useWebsocket();

  return (
    <>
      <Row smallReverse>
        <Column percentageWidth={lgMatch ? 70 : 100}>
          <ContactsList />
        </Column>
        <Column percentageWidth={lgMatch ? 30 : 100}>
          <AccountSummary />
          <TransferForm />
        </Column>
      </Row>
    </>
  );
};
