import { useConfig } from '@4chain-ag/react-configuration';

export const useWsUrl = () => {
  const { config } = useConfig();
  return config.wsUrl ? config.wsUrl : undefined;
};
