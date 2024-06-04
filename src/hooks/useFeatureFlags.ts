import { useServerConfig } from '@/providers/server_config/hooks';

export const useExperimentalFeatures = () => {
  return useServerConfig().experimental_features;
};

export const usePikePaymentEnabled = () => {
  return useExperimentalFeatures().pike_payment_enabled;
};


export const usePikeContactsEnabled = () => {
  return useExperimentalFeatures().pike_contacts_enabled;
};