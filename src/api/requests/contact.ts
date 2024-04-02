/* eslint-disable @typescript-eslint/no-unused-vars */
import { timeoutPromise } from '@/utils/timeoutPromise';
import { PaginationParams } from '../types';
import { Contact } from '../types/contact';

export const searchContacts = async (_pagination?: PaginationParams) => {
  await timeoutPromise(500);
  return contacts;
};

export const addContact = async (paymail: string, name: string) => {
  await timeoutPromise(1000);
  contacts = [
    ...contacts,
    {
      paymail,
      name,
      status: 'awaiting-acceptance',
    },
  ];
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
      contact.status = 'not-confirmed';
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

/// Mocked contacts

let contacts: Contact[] = [
  {
    paymail: 'bob@example.com',
    name: 'Bob',
    status: 'confirmed',
  },
  {
    paymail: 'tester@example.com',
    name: 'Tester',
    status: 'awaiting-acceptance',
  },
  {
    paymail: 'theguy@example.com',
    name: 'The Guy',
    status: 'not-confirmed',
  },
];
