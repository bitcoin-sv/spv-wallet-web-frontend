/* eslint-disable @typescript-eslint/no-unused-vars */
import { timeoutPromise } from '@/utils/timeoutPromise';
import { PaginationParams } from '../types';
import { Contact } from '../types/contact';
import axios from 'axios';

export const searchContacts = async (_pagination?: PaginationParams) => {
  const { data: response } = await axios.get(`/contact/search`);
  return response;
};

export const upsertContact = async (paymail: string, fullName: string) => {
  await axios.put(`/contact/${encodeURIPaymail(paymail)}`, {
    fullName,
  });
};

export const rejectContact = async (paymail: string) => {
  console.log('reject');
  await timeoutPromise(1000);
  contacts = contacts.filter((contact) => contact.paymail !== paymail);
};

export const acceptContact = async (paymail: string) => {
  await timeoutPromise(1000);
  contacts = contacts.map((contact) => {
    if (contact.paymail === paymail) {
      contact.status = 'unconfirmed';
    }
    return { ...contact };
  });
};

export const getTOTP = async (_paymail: string) => {
  await timeoutPromise(1000);
  return Math.floor(10 + Math.random() * 89);
};

export const confirmContactWithTOTP = async (paymail: string, _totp: number) => {
  await timeoutPromise(1000);
  contacts = contacts.map((contact) => {
    if (contact.paymail === paymail) {
      contact.status = 'confirmed';
    }
    return { ...contact };
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

/// Mocked contacts

let contacts: Contact[] = [
  {
    paymail: 'bob@example.com',
    fullName: 'Bob',
    status: 'confirmed',
  },
  {
    paymail: 'tester@example.com',
    fullName: 'Tester',
    status: 'awaiting',
  },
  {
    paymail: 'theguy@example.com',
    fullName: 'The Guy',
    status: 'unconfirmed',
  },
];
