export type ExperimentalConfig = {
  pike_enabled: boolean
}

export type ServerConfig = {
  paymail_domain: string
  experimental_features: ExperimentalConfig
}
