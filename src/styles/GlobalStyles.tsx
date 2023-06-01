import { Global, css } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

import { colors } from './colors'
import { typography } from './typography'
import { sizes } from './sizes'

const globalStyles = css`
  ${emotionNormalize}

  body,
  html,
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  body {
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: ${typography.primaryFontFamily};
    background: ${colors.primaryBackground};
    background: linear-gradient(28deg, rgba(14, 18, 78, 1) 0%, rgba(99, 36, 249, 1) 55%, rgba(246, 46, 250, 1) 100%);
    color: ${colors.textLightPrimary};
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
`

export const GlobalStyles = () => {
  return <Global styles={[globalStyles]} />
}
