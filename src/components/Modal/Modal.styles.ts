import styled from '@emotion/styled';
import { colors, sizes } from '@/styles';
import { variables } from '@/styles/variables';
import { media } from '@/styles/media';
import { Button } from '@/components/Button';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.modalWrapperBackground};
  backdrop-filter: blur(10px);
  z-index: 9;
`;

export const ModalContent = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  max-height: calc(100% - 64px);
  padding: ${sizes(4)} ${sizes(2)};
  margin: 0 ${sizes(4)};
  background: ${colors.lightPrimary};
  border-radius: ${variables.borderRadius};
  box-shadow: ${variables.shadow.tileShadow};
  color: ${colors.darkPrimary};
  text-align: center;
  overflow-y: hidden;
  z-index: 9;

  ${media.sm} {
    padding: ${sizes(4)} ${sizes(6)};
  }

  ${media.md} {
    width: auto;
    min-width: 480px;
  }
`;

export const ContentWrapper = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  overflow-y: hidden;
`;

export const ModalMainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const ModalHeadline = styled.h3`
  font-size: 22px;
  margin-bottom: ${sizes(2)};
`;

export const ModalSubheadline = styled.p`
  font-size: 18px;
`;

export const ButtonsWrapper = styled.footer`
  position: relative;
  display: flex;
  gap: ${sizes(4)};
  align-items: center;
  justify-content: center;
  margin: ${sizes(12)} 0 ${sizes(6)};
  z-index: 1;
`;

export const ModalButton = styled(Button)`
  width: 50%;
  max-width: 208px;
  padding: ${sizes(3)};
  border: none;

  ${media.md} {
    padding: ${sizes(4)};
  }

  &:focus-visible {
    outline: 2px solid ${colors.lightPrimary};
    outline-offset: 2px;
  }
`;
