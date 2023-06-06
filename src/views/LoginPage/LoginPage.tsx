import { FormCard } from '@/components/FormCard/FormCard'
import { Input } from '@/components/Input'
import { ViewContent } from '@/components/_layout/ViewContent'
import { Row } from '@/styles/grid'
import { useState } from 'react'
import { EMAIL_REGEX } from '@/utils/constants'

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const emailIsValid = email.match(EMAIL_REGEX)
  const loginButtonDisabled = !email || (email && !emailIsValid) || !password

  return (
    <ViewContent centeredContent>
      <Row>
        <FormCard
          formType="login"
          headline="Login here"
          subheadline="and go to the wallet!"
          formLegend="Login form"
          actionButtonAvailability={loginButtonDisabled}
        >
          <Input
            id="email"
            type="email"
            labelText="Email"
            required
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <Input
            id="password"
            type="password"
            labelText="Password"
            withIcon
            togglePasswordVisibility
            required
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </FormCard>
      </Row>
    </ViewContent>
  )
}
