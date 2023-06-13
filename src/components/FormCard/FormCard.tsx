import {
  ActionButtons,
  CardFooter,
  CardHeadline,
  Form,
  FormCardWrapper,
  FormLegend,
} from '@/components/FormCard/FormCard.styles'
import { FC, FormEvent, ReactNode } from 'react'
import { Button } from '@/components/Button'

type CardType = 'login' | 'signup' | 'signup-typ'

interface CardProps {
  headline: string
  subheadline?: string
  formLegend?: string
  children: ReactNode
  cardType: CardType
  onFormSubmitHandler?: (event: FormEvent<HTMLFormElement>) => void
}
export const FormCard: FC<CardProps> = ({
  headline,
  subheadline,
  formLegend,
  children,
  cardType,
  onFormSubmitHandler,
}) => {
  return (
    <FormCardWrapper>
      <CardHeadline>{headline}</CardHeadline>
      {subheadline && <p>{subheadline}</p>}
      {formLegend && formLegend !== '' ? (
        <Form onSubmit={onFormSubmitHandler}>
          <fieldset>
            <FormLegend>{formLegend}</FormLegend>
            {children}
            <ActionButtons>
              <Button fullWidth>{(cardType === 'login' && 'Log in') || (cardType === 'signup' && 'Sign up')}</Button>
            </ActionButtons>
          </fieldset>
        </Form>
      ) : (
        <>{children}</>
      )}

      {cardType !== 'signup-typ' && (
        <CardFooter>
          <p>
            {(cardType === 'login' && "Don't have an account yet?") ||
              (cardType === 'signup' && 'Already have an account?')}
          </p>
          <Button to={(cardType === 'login' && '/signup') || (cardType === 'signup' && '/') || '/'} isLink underline>
            {(cardType === 'login' && 'Sign up now!') || (cardType === 'signup' && 'Log in now!')}
          </Button>
        </CardFooter>
      )}
    </FormCardWrapper>
  )
}
