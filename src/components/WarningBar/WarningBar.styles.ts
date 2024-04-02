import styled from '@emotion/styled';
import { colors, sizes } from '@/styles';
import { variables } from '@/styles/variables';
import { Button } from '@/components/Button';

export const Wrapper = styled.div`
  position: relative;
  padding: ${sizes(2)};
  border-radius: ${variables.borderRadius};
  text-align: left;
  font-size: 12px;
  background: ${colors.warningBackground};
`;

export const WarningText = styled.p`
  margin: 0;
`;

export const HighlightedText = styled.strong`
  display: block;
  line-height: 1.5;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: ${sizes(1)};
`;
