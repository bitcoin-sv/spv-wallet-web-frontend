import { Input } from '@/components/Input';
import { ViewContent } from '@/components/_layout/ViewContent';
import { Column, Row } from '@/styles/grid';
import { FormCard } from '@/components/FormCard';
import { FormEvent, useState } from 'react';
import { EMAIL_REGEX } from '@/utils/constants';
import { ErrorBar } from '@/components/ErrorBar';
import { Loader } from '@/components/Loader';
import { useAuthorization } from '@/providers';
import { useNavigate } from 'react-router-dom';
import { LoggedInUser, loginUser } from '@/api';
import { PasswordInput } from '@/components/Input/PasswordInput';

export const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { setAuthorization } = useAuthorization();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      return;
    }

    if (!email.match(EMAIL_REGEX)) {
      setErrors('Invalid email address!');
    }

    const User = {
      email: email,
      password: password,
    };

    loginUser(User)
      .then((response) => {
        setErrors('');
        const LoggedInUser: LoggedInUser = {
          email: email,
          paymail: response.paymail,
          balance: response.balance,
        };
        setAuthorization(LoggedInUser);
        navigate('/dashboard');
        setLoading(false);
      })
      .catch((error) => {
        const errorMsg = error.response.data ? error.response.data : 'Something went wrong... Please, try again later!';
        setErrors(errorMsg);
        setLoading(false);
      });
  };

  return (
    <ViewContent centeredContent>
      <Row>
        <Column>
          <FormCard
            cardType="login"
            headline="Login here"
            subheadline="and go to the wallet!"
            formLegend="Login form"
            onFormSubmitHandler={handleSubmit}
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
            <PasswordInput
              id="password"
              labelText="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {errors && <ErrorBar errorMsg={errors} />}
          </FormCard>
        </Column>
      </Row>
    </ViewContent>
  );
};
