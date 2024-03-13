import { Input } from '@/components/Input'
import { FormCard } from '@/components/FormCard'
import { CustomCheckbox } from '@/components/CustomCheckbox'
import { Button } from '@/components/Button'
import { ViewContent } from '@/components/_layout/ViewContent'
import { Column, Row } from '@/styles/grid'
import { FormEvent, useState } from 'react'
import { EMAIL_REGEX, PASSWORD_MIN_LENGTH } from '@/utils/constants'
import { ErrorBar } from '@/components/ErrorBar'
import { Loader } from '@/components/Loader'
import { AfterRegistrationSteps } from '@/components/StepsList/_lists/AfterRegistrationSteps'
import { RegisterNewUserDto } from '@/api/types/user'
import { registerUser } from '@/api'

export const SignupPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const [agreementTerms, setAgreementTerms] = useState<boolean>(false)
  const [agreementPolicy, setAgreementPolicy] = useState<boolean>(false)
  const [errors, setErrors] = useState<string>('')
  const [registered, setRegistered] = useState(false)
  const [mnemonic, setMnemonic] = useState<string>('')
  const [paymail, setPaymail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email || !password || !confirmedPassword || !agreementTerms || !agreementPolicy) {
      return
    }

    if (!email.match(EMAIL_REGEX)) {
      setErrors('Invalid email address!')
      return
    }

    if (password !== confirmedPassword) {
      setErrors("Passwords don't match")
      return
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      setErrors('Password is too short. Minimum length is 8 characters.')
      return
    }

    setLoading(true)

    const newUser: RegisterNewUserDto = {
      email,
      password,
      passwordConfirmation: confirmedPassword,
    }

    registerUser(newUser)
      .then((response) => {
        setRegistered(true)
        setErrors('')
        setMnemonic(response.mnemonic)
        setPaymail(response.paymail)
        setLoading(false)
      })
      .catch((error) => {
        const errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please, try again later!'
        setErrors(errorMsg)
        setRegistered(false)
        setLoading(false)
      })
  }

  return (
    <ViewContent centeredContent>
      <Row>
        <Column>
          {!registered ? (
            <FormCard
              cardType="signup"
              headline="Sign up here"
              subheadline="and join up to our community!"
              formLegend="Sign Up form"
              onFormSubmitHandler={(event) => handleSubmit(event)}
            >
              {loading && <Loader />}
              <Input
                id="email"
                type="email"
                labelText="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Input
                id="password"
                type="password"
                labelText="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                withIcon
                togglePasswordVisibility
              />
              <Input
                id="confirm-password"
                type="password"
                labelText="Confirm password"
                required
                value={confirmedPassword}
                onChange={(event) => setConfirmedPassword(event.target.value)}
                withIcon
                togglePasswordVisibility
              />
              <CustomCheckbox
                required
                labelContent={
                  <>
                    I agree to the{' '}
                    <Button to="/terms-and-conditions" variant="transparent" isLink underline isTextLink>
                      terms and conditions
                    </Button>{' '}
                    *
                  </>
                }
                id="terms-and-conditions"
                onChange={(event) => setAgreementTerms(event.target.checked)}
              />
              <CustomCheckbox
                required
                labelContent={
                  <>
                    I accept the{' '}
                    <Button to="/privacy-policy" variant="transparent" isLink underline isTextLink>
                      privacy policy
                    </Button>{' '}
                    *
                  </>
                }
                id="privacy-policy"
                onChange={(event) => setAgreementPolicy(event.target.checked)}
              />
              {errors && <ErrorBar errorMsg={errors} />}
            </FormCard>
          ) : (
            <FormCard
              cardType="signup-typ"
              headline="Thank you for registration!"
              subheadline="There are only three steps to start using your wallet:"
            >
              <AfterRegistrationSteps mnemonic={mnemonic} paymail={paymail} />
            </FormCard>
          )}
        </Column>
      </Row>
    </ViewContent>
  )
}
