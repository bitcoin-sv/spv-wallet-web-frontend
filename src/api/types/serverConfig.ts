export type ExperimentalConfig = {
  pike_contacts_enabled: boolean;
  pike_payment_enabled: boolean;
};

export type ServerConfig = {
  paymail_domain: string;
  experimental_features: ExperimentalConfig;
};
