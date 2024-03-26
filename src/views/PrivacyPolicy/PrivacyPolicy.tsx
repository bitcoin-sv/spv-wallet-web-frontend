import { ViewContent } from '@/components/_layout/ViewContent'
import { Column, Row } from '@/styles/grid'
import { PrivacyPolicyContent } from '@/components/LegalContent/_content/'

export const PrivacyPolicy = () => {
  return (
    <ViewContent>
      <Row>
        <Column>
          <PrivacyPolicyContent />
        </Column>
      </Row>
    </ViewContent>
  )
}
