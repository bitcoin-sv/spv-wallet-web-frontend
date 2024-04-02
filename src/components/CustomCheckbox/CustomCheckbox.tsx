import { FC, InputHTMLAttributes, ReactNode } from 'react';

import { InputStyled, InputWrapper, LabelStyled } from './CustomCheckbox.styles';

type inputProps = {
  labelContent: ReactNode;
  className?: string;
  error?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const CustomCheckbox: FC<inputProps> = ({ labelContent, className, id, error, ...rest }) => {
  return (
    <InputWrapper className={className}>
      <InputStyled type="checkbox" {...rest} id={id} error={error} />
      <LabelStyled htmlFor={id}>{labelContent}</LabelStyled>
    </InputWrapper>
  );
};
