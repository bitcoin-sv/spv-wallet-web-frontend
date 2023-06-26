import { ViewContent } from '@/components/_layout/ViewContent'
import { Column, Row } from '@/styles/grid'
import { PrivacyPolicyContent } from '@/components/LegalContent/_content/'
import { BackToRootButton } from '@/components/BackToRootButton/BackToRootButton'

export const PrivacyPolicy = () => {
  return (
    <ViewContent>
      <Row>
        <Column>
          <BackToRootButton />
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
