import {
  ActionButtons,
  CardFooter,
  CardHeadline,
  Form,
  FormCardWrapper,
  FormLegend,
} from '@/components/FormCard/FormCard.styles'
import { FC, ReactNode } from 'react'
import { Button } from '@/components/Button'

type FormType = 'login' | 'signup'

type CardProps = {
  headline: string
  subheadline?: string
  formLegend: string
  children: ReactNode
  formType: FormType
  actionButtonAvailability?: boolean
}
export const FormCard: FC<CardProps> = ({
  headline,
  subheadline,
  formLegend,
  children,
  formType,
  actionButtonAvailability,
}) => {
  return (
    <FormCardWrapper>
      <CardHeadline>{headline}</CardHeadline>
      {subheadline && <p>{subheadline}</p>}
      <Form>
        <fieldset>
          <FormLegend>{formLegend}</FormLegend>
          {children}
          <ActionButtons>
            <Button fullWidth disabled={actionButtonAvailability}>
              {(formType === 'login' && 'Log in') || (formType === 'signup' && 'Sign up')}
            </Button>
          </ActionButtons>
        </fieldset>
      </Form>
      <CardFooter>
        <p>
          {(formType === 'login' && "Don't have an account yet?") ||
            (formType === 'signup' && 'Already have an account?')}
        </p>
        <Button to={(formType === 'login' && '/signup') || (formType === 'signup' && '/') || '/'} isLink underline>
          {(formType === 'login' && 'Sign up now!') || (formType === 'signup' && 'Log in now!')}
        </Button>
      </CardFooter>
    </FormCardWrapper>
  )
}
