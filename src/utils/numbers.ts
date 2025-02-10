export const isNumber = (value: string) => {
  const numericValue = Number(value);
  return !isNaN(numericValue) && !isNaN(parseFloat(value));
};

export const generateRandomNumbers = (digits: number) => {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

export const convertNumberToFloat = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};
