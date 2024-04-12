import { FC, PropsWithChildren, createContext, useState } from 'react';

type Autoupdate = string | '';

interface AutoupdateContextValue {
  autoupdate: Autoupdate;
  setAutoupdate: (autoupdate: Autoupdate) => void;
}

export const AutoupdateContext = createContext<AutoupdateContextValue | ''>('');
AutoupdateContext.displayName = 'AutoupdateContext';

export const AutoupdateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [autoupdate, setAutoupdate] = useState<Autoupdate>('');

  const value = {
    autoupdate,
    setAutoupdate,
  };
  return <AutoupdateContext.Provider value={value}>{children}</AutoupdateContext.Provider>;
};
