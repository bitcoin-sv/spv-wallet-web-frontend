import axios from 'axios';
import { SendNewTransaction } from '@/api/types';
import { PaginationParams } from '../types/pagination';

export const getTransactions = async (pagination: PaginationParams) => {
  const { data: response } = await axios.post(`/transaction/search`, {
    params: pagination,
  });
  if (response != null && typeof response !== 'object') {
    throw new Error('Unexpected response from backend.', { cause: { response } });
  }
  return {
    transactions: response,
  };
};

export const getTransactionsDetails = async (transactionId: string) => {
  const { data: response } = await axios.get(`/transaction/${transactionId}`);
  return response;
};

export const sendTransaction = async (data: SendNewTransaction) => {
  const { data: response } = await axios.post('/transaction', data);
  return response;
};
