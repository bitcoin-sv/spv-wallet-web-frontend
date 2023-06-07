import { Input } from '@/components/Input'
import { FormCard } from '@/components/FormCard/FormCard'
import { CustomCheckbox } from '@/components/CustomCheckbox'
import { Button } from '@/components/Button'
import { ViewContent } from '@/components/_layout/ViewContent'
import { Row } from '@/styles/grid'

export const SignupPage = () => {
  return (
    <ViewContent>
      <Row>
        <FormCard
          formType="signup"
          headline="Sign up here"
          subheadline="and join up to our community!"
          formLegend="Sign Up form"
        >
          <Input id="email" type="email" labelText="Email" required />
          <Input id="password" type="password" labelText="Password" required withIcon togglePasswordVisibility />
          <Input
            id="confirm-password"
            type="password"
            labelText="Confirm password"
            required
            withIcon
            togglePasswordVisibility
          />
          <CustomCheckbox
            required
            labelContent={
              <>
                I agree to the{' '}
                <Button to="/terms-and-conditions" isLink underline isTextLink>
                  terms and conditions
                </Button>{' '}
                *
              </>
            }
            id="terms-and-conditions"
          />
          <CustomCheckbox
            labelContent={
              <>
                I accept the{' '}
                <Button to="/privacy-policy" isLink underline isTextLink>
                  privacy policy
                </Button>{' '}
                *
              </>
            }
            id="privacy-policy"
          />
        </FormCard>
      </Row>
    </ViewContent>
  )
}
