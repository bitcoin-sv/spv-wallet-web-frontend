import { ViewContent } from '@/components/_layout/ViewContent';
import { Column, Row } from '@/styles/grid';
import { TermsAndConditionsContent } from '@/components/LegalContent';

export const TermsAndConditions = () => {
  return (
    <ViewContent>
      <Row>
        <Column>
          <TermsAndConditionsContent />
        </Column>
      </Row>
    </ViewContent>
  );
};
