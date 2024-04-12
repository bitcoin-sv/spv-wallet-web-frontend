import { css } from '@emotion/react';
import { media } from '@/styles/media';

export const typography = {
  primaryFontFamily: "'Lato', 'Arial', sans-serif",
};

export const fontWeight = {
  light: 300,
  regular: 400,
  bold: 600,
};

export const getHeadlineSizes = () => {
  return css`
    h2 {
      font-size: 24px;

      ${media.md} {
        font-size: 28px;
      }
    }

    h3 {
      font-size: 20px;

      ${media.md} {
        font-size: 24px;
      }
    }
  `;
};
