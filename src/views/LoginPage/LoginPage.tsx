import { FormCard } from '@/components/FormCard/FormCard'
import { Input } from '@/components/Input'
import { ViewContent } from '@/components/_layout/ViewContent'
import { Row } from '@/styles/grid'

export const LoginPage = () => {
  return (
    <ViewContent centeredContent>
      <Row>
        <FormCard formType="login" headline="Login here" subheadline="and go to the wallet!" formLegend="Login form">
          <Input id="email" type="email" labelText="Email" required />
          <Input id="password" type="password" labelText="Password" withIcon togglePasswordVisibility required />
        </FormCard>
      </Row>
    </ViewContent>
  )
}
