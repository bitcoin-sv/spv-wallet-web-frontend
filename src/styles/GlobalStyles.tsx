import { Global, css } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

import { colors } from './colors'
import { getHeadlineSizes, typography } from './typography'
import { sizes } from './sizes'
import { variables } from '@/styles/variables'
import styled from '@emotion/styled'
import { HighlightAnimation } from './highlightAnimation'

const globalStyles = css`
  ${emotionNormalize}

  body,
  html,
  #root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 100%;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: ${typography.primaryFontFamily};
    background: ${colors.primaryBackground};
    background: ${variables.gradients.mainBackground};
    color: ${colors.lightPrimary};

    ${getHeadlineSizes()}
  }

  html {
    background: ${colors.secondaryBackground};
  }

  * {
    box-sizing: border-box;
  }

  p {
    padding: 0;
    margin: 0 0 ${sizes(4)};
  }

  img {
    display: block;
    max-width: 100%;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  fieldset {
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ${HighlightAnimation}
`

export const srOnlyStyles = css`
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
`

export const SrOnlySpan = styled.span`
  ${srOnlyStyles}
`

export const GlobalStyles = () => {
  return <Global styles={[globalStyles]} />
}
