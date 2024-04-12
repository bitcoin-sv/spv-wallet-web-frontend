import { css, keyframes } from '@emotion/react';

const animationKeyframes = keyframes`
  0% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }
  0% {
    box-shadow: 0 0 30px rgba(255, 255, 255, 1);
  }
  100% {
    box-shadow: none;
  }
`;

export const HighlightAnimationClassName = 'highlight-animation';

export const HighlightAnimation = css`
  .${HighlightAnimationClassName} {
    animation: ${animationKeyframes} 1s ease-in-out forwards;
  }
`;
