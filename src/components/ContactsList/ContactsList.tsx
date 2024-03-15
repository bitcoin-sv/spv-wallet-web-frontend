import { DashboardTile } from '@/components/DashboardTile'
import Contacts from '@mui/icons-material/Contacts'

import { Column, Row } from '@/styles/grid'

export const ContactsList = () => {
  return (
    <DashboardTile fullHeight tileTitle="Contacts" titleIcon={<Contacts />}>
      <Row>
        <Column>
          <div>COMMING SOON</div>
        </Column>
      </Row>
    </DashboardTile>
  )
}
