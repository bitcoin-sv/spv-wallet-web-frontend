const phoneRegex = /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{1,4})[-. ]?([0-9]{1,4})[-. ]?([0-9]{1,4})$/;

export const isValidPhone = (phone: string) => {
  return phoneRegex.test(phone);
};
