export type ContactStatus = 'pending-invitation' | 'untrusted' | 'trusted'

export type Contact = {
  paymail: string
  name: string
  status: ContactStatus

  //TODO: Add more fields (...metadata)
}
