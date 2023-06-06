import { FormCard } from '@/components/FormCard/FormCard'
import { Input } from '@/components/Input'

export const LoginPage = () => {
  return (
    <FormCard formType="login" headline="Login here" subheadline="and go to the wallet!" formLegend="Login form">
      <Input id="email" type="email" labelText="Email" />
      <Input id="password" type="password" labelText="Password" withIcon togglePasswordVisibility />
    </FormCard>
  )
}
