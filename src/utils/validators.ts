import { isStringEmpty } from "./string";

export const isUndefinedOrNullOrEmpty = (
  ...values: (string | undefined | null)[]
): boolean => {
  return values.some(
    (value) => value === undefined || value === null || value === ""
  );
};

export const isUndefinedOrNull = (
  ...values: (any | undefined | null)[]
): boolean => {
  return values.some((value) => value === undefined || value === null);
};

export const isNullOrEmpty = (
  ...values: (string | undefined | null)[]
): boolean => {
  return values.some((value) => value === null || isStringEmpty(value ?? ""));
};

export const isUndefinedOrEmpty = (
  ...values: (string | undefined | null)[]
): boolean => {
  return values.some(
    (value) => value === undefined || isStringEmpty(value ?? "")
  );
};

export const isUndefined = (...values: (any | undefined | null)[]): boolean => {
  return values.some((value) => value === undefined);
};

export const isNull = (...values: (any | undefined | null)[]): boolean => {
  return values.some((value) => value === null);
};

export const isEmpty = (...values: (string | undefined | null)[]): boolean => {
  return values.some((value) => isStringEmpty(value ?? ""));
};
