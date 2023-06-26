import { ViewContent } from '@/components/_layout/ViewContent'
import { Column, Row } from '@/styles/grid'
import { TermsAndConditionsContent } from '@/components/LegalContent'
import { BackToRootButton } from '@/components/BackToRootButton/BackToRootButton'

export const TermsAndConditions = () => {
  return (
    <ViewContent>
      <Row>
        <Column>
          <BackToRootButton />
        </Column>
      </Row>
      <Row>
        <Column>
          <TermsAndConditionsContent />
        </Column>
      </Row>
    </ViewContent>
  )
}
