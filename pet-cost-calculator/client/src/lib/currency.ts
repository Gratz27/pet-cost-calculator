/**
 * Currency conversion utilities
 * Exchange rates are approximate and should be updated periodically
 * Base currency: USD
 */

export type Currency = 'USD' | 'GBP' | 'AUD' | 'SGD' | 'EUR' | 'CAD';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}

// Exchange rates (approximate, as of November 2024)
// In production, these should be fetched from a live API
export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.79, // 1 USD = 0.79 GBP
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    rate: 1.53, // 1 USD = 1.53 AUD
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    rate: 1.34, // 1 USD = 1.34 SGD
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.92, // 1 USD = 0.92 EUR
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    rate: 1.39, // 1 USD = 1.39 CAD
  },
};

/**
 * Convert amount from USD to target currency
 */
export function convertCurrency(amountUSD: number, targetCurrency: Currency): number {
  const rate = CURRENCIES[targetCurrency].rate;
  return amountUSD * rate;
}

/**
 * Format currency amount with proper symbol and formatting
 */
export function formatCurrency(amount: number, currency: Currency): string {
  const currencyInfo = CURRENCIES[currency];
  const formattedAmount = Math.round(amount).toLocaleString('en-US');
  
  // For currencies with symbols that go before the amount
  if (currency === 'USD' || currency === 'GBP' || currency === 'EUR') {
    return `${currencyInfo.symbol}${formattedAmount}`;
  }
  
  // For currencies with symbols that can go before (AUD, SGD, CAD)
  return `${currencyInfo.symbol}${formattedAmount}`;
}

/**
 * Get currency info by code
 */
export function getCurrencyInfo(currency: Currency): CurrencyInfo {
  return CURRENCIES[currency];
}

/**
 * Get all available currencies
 */
export function getAllCurrencies(): CurrencyInfo[] {
  return Object.values(CURRENCIES);
}

/**
 * Detect currency from postal/ZIP code format
 * Returns the most likely currency based on postal code pattern
 */
export function detectCurrencyFromPostalCode(postalCode: string): Currency {
  if (!postalCode) return 'USD';
  
  const code = postalCode.trim().toUpperCase();
  
  // UK: Letters and numbers (e.g., SW1A 1AA, M1 1AE)
  if (/^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i.test(code)) {
    return 'GBP';
  }
  
  // Canada: Letter-Number-Letter Number-Letter-Number (e.g., K1A 0B1, M5V 3A8)
  if (/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i.test(code)) {
    return 'CAD';
  }
  
  // Australia: 4 digits (e.g., 2000, 3000)
  if (/^\d{4}$/.test(code)) {
    return 'AUD';
  }
  
  // Singapore: 6 digits (e.g., 018956, 238801)
  if (/^\d{6}$/.test(code)) {
    return 'SGD';
  }
  
  // European countries: Various formats
  // Germany: 5 digits (e.g., 10115)
  // France: 5 digits (e.g., 75001)
  // Spain: 5 digits (e.g., 28001)
  // Italy: 5 digits (e.g., 00100)
  // Netherlands: 4 digits + 2 letters (e.g., 1012 AB)
  if (/^\d{5}$/.test(code) || /^\d{4}\s?[A-Z]{2}$/i.test(code)) {
    // Could be US (5 digits) or EU (5 digits or 4+2 letters)
    // Check if it looks more European (has letters or specific patterns)
    if (/[A-Z]/i.test(code)) {
      return 'EUR'; // Netherlands format
    }
    // For 5-digit codes, default to USD (most common)
    // In production, you might want to use IP geolocation for better accuracy
    return 'USD';
  }
  
  // US: 5 digits or 5+4 digits (e.g., 90210, 90210-1234)
  if (/^\d{5}(-\d{4})?$/.test(code)) {
    return 'USD';
  }
  
  // Default to USD if no pattern matches
  return 'USD';
}

