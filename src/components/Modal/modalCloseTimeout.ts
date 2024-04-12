import { timeoutPromise } from '@/utils/timeoutPromise';

//modalCloseTimeout is utilized as a delay for the modal to close after success message is displayed
export const modalCloseTimeout = () => timeoutPromise(3000);
