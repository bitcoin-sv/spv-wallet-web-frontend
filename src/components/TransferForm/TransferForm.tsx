import { DashboardTile } from '@/components/DashboardTile'
import SendIcon from '@mui/icons-material/Send'
import { Button } from '@/components/Button'
import { SrOnlySpan } from '@/styles'
import { Input } from '@/components/Input'
import { Column, Row } from '@/styles/grid'

export const TransferForm = () => {
  return (
    <DashboardTile tileTitle="Send money" titleIcon={<SendIcon />}>
      <form>
        <fieldset>
          <Row>
            <Column>
              <legend>
                <SrOnlySpan>Money transfer form</SrOnlySpan>
              </legend>
              <Input labelText="$paymail" required type="text" />
              <Input labelText="Amount (BSV satoshis)" type="number" required min="0" step="any" />
            </Column>
          </Row>

          <Row>
            <Column percentageWidth={50}>
              <Button variant="reject" fullWidth>
                Cancel
              </Button>
            </Column>
            <Column percentageWidth={50}>
              <Button variant="accept" fullWidth>
                Send
              </Button>
            </Column>
          </Row>
        </fieldset>
      </form>
    </DashboardTile>
  )
}
