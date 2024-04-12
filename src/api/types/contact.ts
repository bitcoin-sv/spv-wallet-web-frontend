export const ContactAwaitingAcceptance = 'awaiting-acceptance';
export const ContactNotConfirmed = 'not-confirmed';
export const ContactConfirmed = 'confirmed';

export type ContactStatus = typeof ContactAwaitingAcceptance | typeof ContactNotConfirmed | typeof ContactConfirmed;

export type Contact = {
  paymail: string;
  name: string;
  status: ContactStatus;

  //TODO: Add more fields (...metadata)
};
