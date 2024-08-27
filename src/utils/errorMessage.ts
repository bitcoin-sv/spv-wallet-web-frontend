import { AxiosError } from 'axios';

type SPVError = {
  message: string;
  code: string;
};

const isSPVError = (error: unknown): error is SPVError => {
  return (error as SPVError).code !== undefined && (error as SPVError).message !== undefined;
};

const DEFAULT_ERROR_MESSAGE = 'Something went wrong... Please, try again later!';

export const errorMessage = (error: SPVError | AxiosError | unknown, fallbackMessage = DEFAULT_ERROR_MESSAGE) => {
  if (error instanceof AxiosError) {
    error = error.response?.data ?? error.message;
  }
  return isSPVError(error) ? error.message : fallbackMessage;
};
