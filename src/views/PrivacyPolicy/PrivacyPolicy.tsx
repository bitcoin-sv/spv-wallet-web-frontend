import { ViewContent } from '@/components/_layout/ViewContent'
import { Column, Row } from '@/styles/grid'
import { PrivacyPolicyContent } from '@/components/LegalContent/_content/'
import { BackToDashboardButton } from '@/components/BackToDashboardButton/BackToDashboardButton'

export const PrivacyPolicy = () => {
  return (
    <ViewContent>
      <Row>
        <Column>
          <BackToDashboardButton />
        </Column>
      </Row>
      <Row>
        <Column>
          <PrivacyPolicyContent />
        </Column>
      </Row>
    </ViewContent>
  )
}
