export const ContactAwaitingAcceptance = 'awaiting';
export const ContactNotConfirmed = 'unconfirmed';
export const ContactConfirmed = 'confirmed';
export const ContactRejected = 'rejected';

export type ContactStatus =
  | typeof ContactAwaitingAcceptance
  | typeof ContactNotConfirmed
  | typeof ContactConfirmed
  | typeof ContactRejected;

export type Contact = {
  created_at: string;
  updated_at: string;
  deleted_at: string;
  metadata?: ContactMetadata;
  id: string;
  pubKey: string;
  paymail: string;
  status: ContactStatus;
  fullName: string;
};

export type ContactMetadata = {
  phoneNumber?: string;
};
