export type CurrencyTypes = "EUR" | "USD" | "GBP";

export const convertNumberToCurrency = (
  number: number,
  currency: CurrencyTypes
): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
