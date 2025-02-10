/**
 * Checks if a string is empty/contains only whitespace.
 *
 * @param value - The string to check.
 * @returns `true` if the string is empty or contains only whitespace, `false` otherwise.
 *
 * @example
 * isStringEmpty(""); // true
 * isStringEmpty("   "); // true
 * isStringEmpty("hello"); // false
 */
export const isStringEmpty = (value: string | null): boolean => {
  return !value || value.trim().length === 0;
};

export const generateRandomString = (length: number = 24): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));

  return result;
};
