import { ServerConfig } from '@/api';
import { getServerConfig } from '@/api/requests';
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react';

export const ServerConfigContext = createContext<ServerConfig>(null as never);

export const ServerConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [serverConfig, setServerConfig] = useState<ServerConfig | null>(null);

  useEffect(() => {
    getServerConfig()
      .then((response) => {
        setServerConfig(response);
      })
      .catch((e) => {
        console.error('Error during fetching server config', e);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return null;
  }

  if (!serverConfig) {
    throw new Error('Cannot fetch server configuration. Please try again later.');
  }

  return <ServerConfigContext.Provider value={serverConfig}>{children}</ServerConfigContext.Provider>;
};
