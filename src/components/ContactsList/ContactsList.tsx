import { DashboardTile } from '@/components/DashboardTile';
import Contacts from '@mui/icons-material/Contacts';

import { Column, Row } from '@/styles/grid';
import { ContactsTable } from './ContactsTable.tsx';
import { ContactAdd } from './_modals/ContactAdd.tsx';

export const ContactsList = () => {
  return (
    <DashboardTile fullHeight tileTitle="Contacts (feature preview)" titleIcon={<Contacts />}>
      <Row>
        <Column>
          <ContactAdd />
        </Column>
      </Row>
      <Row>
        <Column>
          <ContactsTable />
        </Column>
      </Row>
    </DashboardTile>
  );
};
