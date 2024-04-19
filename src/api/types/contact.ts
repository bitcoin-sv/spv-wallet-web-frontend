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
  paymail: string;
  fullName: string;
  status: ContactStatus;

  //TODO: Add more fields (...metadata)
};
