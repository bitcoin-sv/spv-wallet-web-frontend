import styled from '@emotion/styled';
import { colors, fontWeight, sizes } from '@/styles';
import { variables } from '@/styles/variables';
import { Button } from '@/components/Button';
import { media } from '@/styles/media';

export const StepsListStyles = styled.ul`
  counter-reset: decimal-counter;
  text-align: left;
  margin: ${sizes(12)} 0;
`;

export const StepElement = styled.li`
  position: relative;
  min-height: 36px;
  padding-top: ${sizes(6)};
  margin: 0 0 ${sizes(8)};
  counter-increment: decimal-counter;

  ${media.sm} {
    padding-top: 0;
    padding-left: ${sizes(15)};
    margin: 0 0 ${sizes(4)};
  }

  &::before {
    content: counter(decimal-counter);
    display: block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 24px;
    border: 2px solid ${colors.lightPrimary};
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    color: ${colors.lightPrimary};

    ${media.sm} {
      width: 32px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
  }
`;

export const StepHeadline = styled.h3`
  margin-bottom: ${sizes(1)};
`;

export const StepDesc = styled.p`
  font-size: 14px;

  & > strong {
    line-height: 2;
  }
`;

export const DataBox = styled.div`
  position: relative;
  padding: ${sizes(3)} ${sizes(8)} ${sizes(2)} ${sizes(3)};
  margin-top: ${sizes(8)};
  background-color: ${colors.lightPrimary};
  border-radius: ${variables.borderRadius};
  word-spacing: ${sizes(1)};
  font-weight: ${fontWeight.light};
  font-size: 12px;
  color: ${colors.darkPrimary};

  ${media.sm} {
    margin-top: ${sizes(6)};
  }
`;

export const DataText = styled.p`
  margin: 0;
`;

export const BoxLabel = styled.small`
  position: absolute;
  top: -${sizes(4)};
  left: 4px;
  font-size: 12px;
  font-weight: ${fontWeight.regular};
  color: ${colors.lightPrimary};
`;

export const CopyButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: ${sizes(1)};
  transform: translateY(-50%);
`;

export const CopiedConfirmation = styled.span`
  position: absolute;
  top: -${sizes(4)};
  right: 4px;
  font-size: 12px;
  font-weight: ${fontWeight.regular};
  color: ${colors.lightPrimary};
  word-spacing: initial;
`;
