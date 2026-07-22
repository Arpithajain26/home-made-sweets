/** Format a number as a currency string (USD by default) */
export const formatCurrency = (amount: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

/** Capitalize the first letter of a string */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
