export const convertSatToBsv = (value: string | number | '' | undefined) => {
  if (!value) {
    return;
  }

  return typeof value === 'number' ? (value / 100000000).toFixed(8) : (parseInt(value) / 100000000).toFixed(8);
};
