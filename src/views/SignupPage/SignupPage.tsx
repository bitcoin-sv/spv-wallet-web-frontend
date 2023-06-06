import { Input } from '@/components/Input'
import { FormCard } from '@/components/FormCard/FormCard'

export const SignupPage = () => {
  return (
    <FormCard
      formType="signup"
      headline="Sign up here"
      subheadline="and join up to our community!"
      formLegend="Sign Up form"
    >
      <Input id="email" type="email" labelText="Email" />
      <Input id="password" type="password" labelText="Password" withIcon togglePasswordVisibility />
      <Input id="confirm-password" type="password" labelText="Confirm password" withIcon togglePasswordVisibility />
    </FormCard>
  )
}
