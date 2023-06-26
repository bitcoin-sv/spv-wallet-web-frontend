import {
  ButtonsWrapper,
  ContentWrapper,
  ModalButton,
  ModalContent,
  ModalHeadline,
  ModalMainContent,
  ModalSubheadline,
  ModalWrapper,
} from '@/components/Modal/Modal.styles'
import { FC, ReactNode, useEffect } from 'react'
import { ButtonProps } from '@/components/Button'
import { disablePageScroll, enablePageScroll } from 'scroll-lock'

type ModalButtonProps = {
  text: string
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
  useEffect(() => {
    open ? disablePageScroll() : enablePageScroll()

    return () => {
      enablePageScroll()
    }
  }, [open])

  return (
    <>
      {open && (
        <ModalWrapper role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <ModalContent>
            <ContentWrapper>
              <header>
                {modalTitle && <ModalHeadline id="modal-title">{modalTitle}</ModalHeadline>}
                {modalSubtitle && <ModalSubheadline>{modalSubtitle}</ModalSubheadline>}
              </header>

              {children && <ModalMainContent>{children}</ModalMainContent>}

              {(primaryButton || secondaryButton) && (
                <ButtonsWrapper>
                  {primaryButton && <ModalButton {...primaryButton}>{primaryButton.text}</ModalButton>}
                  {secondaryButton && <ModalButton {...secondaryButton}>{secondaryButton.text}</ModalButton>}
                </ButtonsWrapper>
              )}
            </ContentWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  )
}
