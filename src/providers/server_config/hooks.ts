import { useContext } from 'react';

import { ServerConfigContext } from './provider';

export const useServerConfig = () => {
  const ctx = useContext(ServerConfigContext);
  if (!ctx) {
    throw new Error('ServerConfig provider is missing');
  }
  return ctx;
};
