import { FC, PropsWithChildren, createContext, useState } from 'react';
import { LoggedInUser } from '@/api';

type Authorization = LoggedInUser | null;

interface AuthorizationContextValue {
  authorization: Authorization;
  setAuthorization: (authorization: Authorization) => void;
}

export const AuthorizationContext = createContext<AuthorizationContextValue | undefined>(undefined);
AuthorizationContext.displayName = 'AuthorizationContext';

export const AuthorizationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [authorization, setAuthorization] = useState<Authorization>(null);

  const value = {
    authorization,
    setAuthorization,
  };
  return <AuthorizationContext.Provider value={value}>{children}</AuthorizationContext.Provider>;
};
