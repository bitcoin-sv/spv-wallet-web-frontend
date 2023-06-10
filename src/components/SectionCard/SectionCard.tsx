import {
  ActionButtons,
  CardFooter,
  CardHeadline,
  Form,
  SectionCardWrapper,
  FormLegend,
} from '@/components/SectionCard/SectionCard.styles'
import { FC, FormEvent, ReactNode } from 'react'
import { Button } from '@/components/Button'

type FormType = 'login' | 'signup' | 'signup-typ'

type CardProps = {
  headline: string
  subheadline?: string
  formLegend?: string
  children: ReactNode
  formType: FormType
  onFormSubmitHandler?: (event: FormEvent<HTMLFormElement>) => void
}
export const SectionCard: FC<CardProps> = ({
  headline,
  subheadline,
  formLegend,
  children,
  formType,
  onFormSubmitHandler,
}) => {
  return (
    <SectionCardWrapper>
      <CardHeadline>{headline}</CardHeadline>
      {subheadline && <p>{subheadline}</p>}
      {formLegend && formLegend != '' ? (
        <Form onSubmit={onFormSubmitHandler}>
          <fieldset>
            <FormLegend>{formLegend}</FormLegend>
            {children}
            <ActionButtons>
              <Button fullWidth>{(formType === 'login' && 'Log in') || (formType === 'signup' && 'Sign up')}</Button>
            </ActionButtons>
          </fieldset>
        </Form>
      ) : (
        <>{children}</>
      )}

      {formType != 'signup-typ' && (
        <CardFooter>
          <p>
            {(formType === 'login' && "Don't have an account yet?") ||
              (formType === 'signup' && 'Already have an account?')}
          </p>
          <Button to={(formType === 'login' && '/signup') || (formType === 'signup' && '/') || '/'} isLink underline>
            {(formType === 'login' && 'Sign up now!') || (formType === 'signup' && 'Log in now!')}
          </Button>
        </CardFooter>
      )}
    </SectionCardWrapper>
  )
}
