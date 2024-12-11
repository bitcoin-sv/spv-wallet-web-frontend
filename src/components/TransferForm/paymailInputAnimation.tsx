import { HighlightAnimationClassName } from '@/styles/highlightAnimation';
import { useCallback, useRef, RefObject } from 'react';

type PaymailAnimation = {
  startAnimation: () => void;
  ref: RefObject<HTMLInputElement | null>;
};

export const usePaymailInputAnimation = (): PaymailAnimation => {
  const ref = useRef<HTMLInputElement>(null);

  const startAnimation = useCallback(() => {
    const element = ref.current;
    if (element == null) {
      return;
    }
    element.classList.remove(HighlightAnimationClassName);
    setTimeout(() => {
      element.classList.add(HighlightAnimationClassName);
    }, 1);
  }, []);

  return { startAnimation, ref };
};
