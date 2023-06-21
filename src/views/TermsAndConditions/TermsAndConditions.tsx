import { ViewContent } from '@/components/_layout/ViewContent'
import { Column, Row } from '@/styles/grid'
import { TermsAndConditionsContent } from '@/components/LegalContent'
import { BackToDashboardButton } from '@/components/BackToDashboardButton/BackToDashboardButton'

export const TermsAndConditions = () => {
  return (
    <ViewContent>
      <Row>
        <Column>
          <BackToDashboardButton />
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
