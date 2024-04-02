import styled from '@emotion/styled';
import { colors, sizes } from '@/styles';
import { Button } from '@/components/Button';
import { media } from '@/styles/media';

export const PaginationNav = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const PaginationList = styled.ul`
  display: flex;
  justify-content: flex-start;
  max-width: 100%;
  margin: ${sizes(4)} 0 0;
  overflow-x: auto;
`;

interface PaginationButtonProps {
  isActive: boolean;
}

export const PaginationButton = styled(Button)<PaginationButtonProps>`
  padding: ${sizes(2)};
  font-size: 18px;
  box-shadow: none;
  margin-right: ${sizes(1)};
  background: ${({ isActive }) => (isActive ? colors.userMenuBackground : 'initial')};

  ${media.md} {
    font-size: 22px;
    padding: ${sizes(2)};
    margin-right: ${sizes(1)};
  }

  &:hover {
    text-decoration: underline;
  }
`;
