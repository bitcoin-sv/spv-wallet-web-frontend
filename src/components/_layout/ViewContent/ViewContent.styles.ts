import styled from '@emotion/styled'
import { css } from '@emotion/react'

interface ViewContentProps {
  centeredContent?: boolean
}

export const getCenteredContentStyles = ({ centeredContent }: ViewContentProps) => {
  if (centeredContent) {
    return css`
      display: flex;
      align-items: center;
      justify-content: center;
    `
  }
}

export const ViewContent = styled.div`
  flex-grow: 1;
  ${getCenteredContentStyles};
  flex-direction: column;
`
