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
import { SuccessScreen } from '@/components/SuccessScreen'

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
  successScreenMsg?: string
}
export const Modal: FC<ModalProps> = ({
  open,
  modalTitle,
  modalSubtitle,
  primaryButton,
  secondaryButton,
  children,
  successScreenMsg,
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

              {children && <ModalMainContent data-scroll-lock-scrollable>{children}</ModalMainContent>}

              {(primaryButton || secondaryButton) && (
                <ButtonsWrapper>
                  {primaryButton && <ModalButton {...primaryButton}>{primaryButton.text}</ModalButton>}
                  {secondaryButton && <ModalButton {...secondaryButton}>{secondaryButton.text}</ModalButton>}
                </ButtonsWrapper>
              )}
            </ContentWrapper>
            {successScreenMsg && successScreenMsg !== '' && <SuccessScreen text={successScreenMsg} />}
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  )
}
