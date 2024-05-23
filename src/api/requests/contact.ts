 
import { PaginationParams } from '../types';
import { Contact, ContactMetadata } from '../types/contact';
import axios from 'axios';

export const searchContacts = async (pagination?: PaginationParams) => {
  const { data: response } = await axios.post(`/contact/search`, {
    params: pagination
  });
  return response;
};

export const upsertContact = async (paymail: string, fullName: string, metadata?: ContactMetadata) => {
  await axios.put(`/contact/${encodeURIPaymail(paymail)}`, {
    fullName,
    metadata,
  });
};

export const rejectContact = async (paymail: string) => {
  await axios.patch(`/contact/rejected/${encodeURIPaymail(paymail)}`);
};

export const acceptContact = async (paymail: string) => {
  await axios.patch(`/contact/accepted/${encodeURIPaymail(paymail)}`);
};

export const getTOTP = async (contact: Contact) => {
  const res = await axios.post(`/contact/totp`, contact);
  return res.data.passcode;
};

export const confirmContactWithTOTP = async (contact: Contact, totp: string) => {
  await axios.patch(`/contact/confirmed`, {
    passcode: totp,
    contact,
  });
};

const encodeURIPaymail = (paymail: string) => {
  // Remove control characters from the paymail
  function* iterator() {
    for (let i = 0; i < paymail.length; i++) {
      const code = paymail.charCodeAt(i);
      if (code > 32 && code !== 127) {
        yield code;
      }
    }
  }
  const sanitizedPaymail = String.fromCharCode(...iterator());
  return encodeURIComponent(sanitizedPaymail);
};
