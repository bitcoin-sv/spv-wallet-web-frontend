import { forwardRef } from 'react';

import { InputStyled, InputWrapper, LabelStyled } from './Input.styles';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, className, id, customPlaceholder, inputOnLightBackground, children, rootProps, inputProps, ...rest }, ref) => {
    return (
      <InputWrapper className={className} {...rootProps}>
        <InputStyled
          {...rest}
          ref={ref}
          {...inputProps}
          placeholder={customPlaceholder || labelText}
          inputOnLightBackground={inputOnLightBackground || undefined}
        />
        <LabelStyled htmlFor={id} inputOnLightBackground={inputOnLightBackground || undefined}>
          {labelText}
        </LabelStyled>

        {children}
      </InputWrapper>
    );
  },
);

Input.displayName = 'Input';
