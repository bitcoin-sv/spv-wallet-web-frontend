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

type SectionType = 'login' | 'signup' | 'signup-typ'

type CardProps = {
  headline: string
  subheadline?: string
  formLegend?: string
  children: ReactNode
  sectionType: SectionType
  onFormSubmitHandler?: (event: FormEvent<HTMLFormElement>) => void
}
export const SectionCard: FC<CardProps> = ({
  headline,
  subheadline,
  formLegend,
  children,
  sectionType,
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
              <Button fullWidth>
                {(sectionType === 'login' && 'Log in') || (sectionType === 'signup' && 'Sign up')}
              </Button>
            </ActionButtons>
          </fieldset>
        </Form>
      ) : (
        <>{children}</>
      )}

      {sectionType != 'signup-typ' && (
        <CardFooter>
          <p>
            {(sectionType === 'login' && "Don't have an account yet?") ||
              (sectionType === 'signup' && 'Already have an account?')}
          </p>
          <Button
            to={(sectionType === 'login' && '/signup') || (sectionType === 'signup' && '/') || '/'}
            isLink
            underline
          >
            {(sectionType === 'login' && 'Sign up now!') || (sectionType === 'signup' && 'Log in now!')}
          </Button>
        </CardFooter>
      )}
    </SectionCardWrapper>
  )
}
