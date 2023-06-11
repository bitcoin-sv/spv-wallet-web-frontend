import { Input } from '@/components/Input'
import { ViewContent } from '@/components/_layout/ViewContent'
import { Row } from '@/styles/grid'
import { SectionCard } from '@/components/SectionCard'

export const LoginPage = () => {
  return (
    <ViewContent centeredContent>
      <Row>
        <SectionCard
          sectionType="login"
          headline="Login here"
          subheadline="and go to the wallet!"
          formLegend="Login form"
        >
          <Input id="email" type="email" labelText="Email" required />
          <Input id="password" type="password" labelText="Password" withIcon togglePasswordVisibility required />
        </SectionCard>
      </Row>
    </ViewContent>
  )
}
