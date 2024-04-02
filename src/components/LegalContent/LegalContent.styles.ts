import styled from '@emotion/styled';
import { colors, sizes } from '@/styles';
import { Button } from '@/components/Button';

export const MainHeadline = styled.h2`
  margin-bottom: ${sizes(2)};
`;

export const TextLink = styled(Button)`
  color: ${colors.textHighlighted};
`;

export const LegalList = styled.ul`
  padding-left: ${sizes(5)};
  list-style-type: disc;
`;
