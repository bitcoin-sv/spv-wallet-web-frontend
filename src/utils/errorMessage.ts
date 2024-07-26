type SPVError = {
  message: string;
  code: string;
};

const isSPVError = (error: unknown): error is SPVError => {
  return (error as SPVError).code !== undefined && (error as SPVError).message !== undefined;
};

const DEFAULT_ERROR_MESSAGE = 'Something went wrong... Please, try again later!';

export const errorMessage = (error: SPVError | unknown, fallbackMessage = DEFAULT_ERROR_MESSAGE) => {
  return isSPVError(error) ? error.message : fallbackMessage;
};
