import { Column, Row } from '@/styles/grid';
import { useMediaMatch } from '@/hooks/useMediaMatch';
import { AccountSummary } from '@/components/AccountSummary';
import { TransferForm } from '@/components/TransferForm';
import { ContactsList } from '@/components/ContactsList';
import { useWebsocket } from '@/hooks';
import styled from '@emotion/styled';
import { sizes } from '@/styles';

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
          <StickyColumn style={{ position: 'sticky', top: 20 }}>
            <AccountSummary />
            <TransferForm />
          </StickyColumn>
        </Column>
      </Row>
    </>
  );
};

const StickyColumn = styled('div')`
  position: sticky;
  top: ${sizes(4)};
`;
