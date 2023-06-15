import { keyframes } from '@emotion/react'

export const PulseKeyframe = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

export const UserMenuFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(115%);
  } 
  
  to {
    opacity: 1;
    transform: translateY(100%);
  }
`
