import {
  ButtonsWrapper,
  ButtonVariants,
  ModalButton,
  ModalContent,
  ModalHeadline,
  ModalSubheadline,
  ModalWrapper,
} from '@/components/Modal/Modal.styles'
import { FC, ReactNode } from 'react'
import { ButtonProps } from '@/components/Button'

type ModalButtonProps = {
  text: string
  variant?: ButtonVariants
  primaryButtonOnClickHandler?: () => void
} & ButtonProps

interface ModalProps {
  open: boolean
  modalTitle?: string
  modalSubtitle?: string
  children?: ReactNode
  primaryButton?: ModalButtonProps
  secondaryButton?: ModalButtonProps
}
export const Modal: FC<ModalProps> = ({
  open,
  modalTitle,
  modalSubtitle,
  primaryButton,
  secondaryButton,
  children,
}) => {
  return (
    <>
      {open && (
        <ModalWrapper role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <ModalContent>
            {modalTitle && <ModalHeadline id="modal-title">{modalTitle}</ModalHeadline>}
            {modalSubtitle && <ModalSubheadline>{modalSubtitle}</ModalSubheadline>}

            {children && <div>{children}</div>}

            {(primaryButton || secondaryButton) && (
              <ButtonsWrapper>
                {primaryButton && <ModalButton {...primaryButton}>{primaryButton.text}</ModalButton>}
                {secondaryButton && <ModalButton {...secondaryButton}>{secondaryButton.text}</ModalButton>}
              </ButtonsWrapper>
            )}
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  )
}
