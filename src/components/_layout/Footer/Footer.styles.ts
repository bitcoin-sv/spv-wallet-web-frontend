import styled from '@emotion/styled';
import { sizes } from '@/styles';
import { media } from '@/styles/media';

export const FooterStyled = styled.footer`
  padding: ${sizes(4)} 0;
`;

export const FooterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    padding: ${sizes(6)} 0;
  }
`;

export const CopyrightText = styled.p`
  ${media.md} {
    margin: 0;
  }
`;
