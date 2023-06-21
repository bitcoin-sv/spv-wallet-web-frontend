import styled from '@emotion/styled'
import { colors, sizes } from '@/styles'
import { variables } from '@/styles/variables'
import { media } from '@/styles/media'
import { Button } from '@/components/Button'

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
`

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-height: 90%;
  padding: ${sizes(4)} ${sizes(6)};
  margin: 0 ${sizes(4)};
  background: ${colors.lightPrimary};
  border-radius: ${variables.borderRadius};
  box-shadow: ${variables.shadow.tileShadow};
  color: ${colors.darkPrimary};
  text-align: center;
  overflow-y: auto;

  ${media.md} {
    width: auto;
    min-width: 480px;
  }
`

export const ModalHeadline = styled.h3`
  font-size: 22px;
  margin-bottom: ${sizes(2)};
`

export const ModalSubheadline = styled.p`
  font-size: 18px;
`

export const ButtonsWrapper = styled.div`
  margin: ${sizes(12)} 0 ${sizes(6)};
`

export const ModalButton = styled(Button)`
  width: 40%;
  margin: 0 ${sizes(4)};
  padding: ${sizes(3)};
  border: none;

  ${media.md} {
    padding: ${sizes(4)};
  }

  &:focus-visible {
    outline: 2px solid ${colors.lightPrimary};
    outline-offset: 2px;
  }
`
