import { Global, css } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

import { colors } from './colors'
import { typography } from './typography'
import { sizes } from './sizes'

const globalStyles = css`
  ${emotionNormalize}

  body {
    padding: 0;
    margin: 0;
    font-family: ${typography.primaryFontFamily};
    background-color: ${colors.primary};
    color: ${colors.textLightPrimary};
  }

  body,
  html,
  #root {
    min-height: 100%;
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
`

export const GlobalStyles = () => {
  return <Global styles={[globalStyles]} />
}
