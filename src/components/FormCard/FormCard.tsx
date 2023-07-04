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
import { WarningBar } from '@/components/WarningBar'

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
        <>
          <WarningBar
            highlightedText="For demonstration purposes only."
            warningText="This wallet works on mainnet, please remember about this when sending transactions. The database is deleted once in a while, we take no responsibility for the loss of funds."
          />

          <Form onSubmit={onFormSubmitHandler}>
            <fieldset>
              <FormLegend>{formLegend}</FormLegend>
              {children}
              <ActionButtons>
                <Button fullWidth variant="primary">
                  {(cardType === 'login' && 'Log in') || (cardType === 'signup' && 'Sign up')}
                </Button>
              </ActionButtons>
            </fieldset>
          </Form>
        </>
      ) : (
        <>{children}</>
      )}

      {cardType !== 'signup-typ' && (
        <CardFooter>
          <p>
            {(cardType === 'login' && "Don't have an account yet?") ||
              (cardType === 'signup' && 'Already have an account?')}
          </p>
          <Button
            to={(cardType === 'login' && '/signup') || (cardType === 'signup' && '/') || '/'}
            variant="transparent"
            isLink
            underline
          >
            {(cardType === 'login' && 'Sign up now!') || (cardType === 'signup' && 'Log in now!')}
          </Button>
        </CardFooter>
      )}
    </FormCardWrapper>
  )
}
