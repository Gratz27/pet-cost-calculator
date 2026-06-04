/**
 * Currency conversion utilities
 * Exchange rates are approximate and should be updated periodically
 * Base currency: USD
 */

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Exchange rate relative to USD
}

// Comprehensive list of world currencies (ISO 4217)
// Rates are approximate as of late 2024
export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 150.0 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.39 },
  CHF: { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', rate: 0.88 },
  CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.23 },
  HKD: { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', rate: 7.82 },
  NZD: { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', rate: 1.68 },
  SEK: { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', rate: 10.85 },
  KRW: { code: 'KRW', symbol: '₩', name: 'South Korean Won', rate: 1380.0 },
  SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 1.34 },
  NOK: { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', rate: 10.95 },
  MXN: { code: 'MXN', symbol: '$', name: 'Mexican Peso', rate: 19.85 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 84.0 },
  RUB: { code: 'RUB', symbol: '₽', name: 'Russian Ruble', rate: 97.5 },
  ZAR: { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 17.6 },
  TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira', rate: 34.2 },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 5.75 },
  TWD: { code: 'TWD', symbol: 'NT$', name: 'New Taiwan Dollar', rate: 32.1 },
  DKK: { code: 'DKK', symbol: 'kr', name: 'Danish Krone', rate: 6.85 },
  PLN: { code: 'PLN', symbol: 'zł', name: 'Polish Zloty', rate: 4.05 },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 33.8 },
  IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 15700.0 },
  HUF: { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint', rate: 375.0 },
  CZK: { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna', rate: 23.5 },
  ILS: { code: 'ILS', symbol: '₪', name: 'Israeli New Shekel', rate: 3.75 },
  CLP: { code: 'CLP', symbol: '$', name: 'Chilean Peso', rate: 950.0 },
  PHP: { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rate: 58.5 },
  AED: { code: 'AED', symbol: 'Dh', name: 'UAE Dirham', rate: 3.67 },
  COP: { code: 'COP', symbol: '$', name: 'Colombian Peso', rate: 4350.0 },
  SAR: { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal', rate: 3.75 },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 4.45 },
  RON: { code: 'RON', symbol: 'lei', name: 'Romanian Leu', rate: 4.6 },
  VND: { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', rate: 25300.0 },
  ARS: { code: 'ARS', symbol: '$', name: 'Argentine Peso', rate: 995.0 },
  EGP: { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', rate: 49.2 },
  PKR: { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', rate: 278.0 },
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 1650.0 },
  BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 119.5 },
  UAH: { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia', rate: 41.2 },
  QAR: { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal', rate: 3.64 },
  KWD: { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', rate: 0.31 },
  MAD: { code: 'MAD', symbol: 'DH', name: 'Moroccan Dirham', rate: 9.8 },
  OMR: { code: 'OMR', symbol: 'OMR', name: 'Omani Rial', rate: 0.38 },
  CRC: { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón', rate: 515.0 },
  DOP: { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso', rate: 60.5 },
  GTQ: { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', rate: 7.7 },
  PEN: { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', rate: 3.78 },
  UYU: { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso', rate: 41.5 },
  LKR: { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', rate: 293.0 },
  KES: { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 129.0 },
  GHS: { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi', rate: 16.2 },
  TZS: { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', rate: 2650.0 },
  UGX: { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling', rate: 3680.0 },
  ISK: { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna', rate: 138.0 },
  BGN: { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev', rate: 1.80 },
  HRK: { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna', rate: 7.0 }, // Note: Croatia uses Euro now, but keeping for legacy
  RSD: { code: 'RSD', symbol: 'дин.', name: 'Serbian Dinar', rate: 108.0 },
  JOD: { code: 'JOD', symbol: 'JD', name: 'Jordanian Dinar', rate: 0.71 },
  BHD: { code: 'BHD', symbol: 'BD', name: 'Bahraini Dinar', rate: 0.38 },
  LBP: { code: 'LBP', symbol: 'L£', name: 'Lebanese Pound', rate: 89500.0 },
  IQD: { code: 'IQD', symbol: 'IQD', name: 'Iraqi Dinar', rate: 1310.0 },
};

/**
 * Convert amount from USD to target currency
 */
export function convertCurrency(amountUSD: number, targetCurrencyCode: string): number {
  const currency = CURRENCIES[targetCurrencyCode];
  if (!currency) return amountUSD;
  return amountUSD * currency.rate;
}

/**
 * Format currency amount with proper symbol and formatting
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES['USD'];
  const formattedAmount = Math.round(amount).toLocaleString('en-US');
  
  // Most currencies put symbol before amount
  return `${currency.symbol}${formattedAmount}`;
}

/**
 * Get currency info by code
 */
export function getCurrencyInfo(currencyCode: string): CurrencyInfo {
  return CURRENCIES[currencyCode] || CURRENCIES['USD'];
}

/**
 * Get all available currencies sorted by name
 */
export function getAllCurrencies(): CurrencyInfo[] {
  return Object.values(CURRENCIES).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Detect currency from postal/ZIP code format
 * Returns the most likely currency based on postal code pattern
 */
export function detectCurrencyFromPostalCode(postalCode: string): string {
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
    // Could be many countries, but default to AUD for 4 digits if not clearly something else
    // New Zealand also uses 4 digits
    return 'AUD';
  }
  
  // Singapore: 6 digits (e.g., 018956, 238801)
  if (/^\d{6}$/.test(code)) {
    // India also uses 6 digits
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
    return 'USD';
  }
  
  // US: 5 digits or 5+4 digits (e.g., 90210, 90210-1234)
  if (/^\d{5}(-\d{4})?$/.test(code)) {
    return 'USD';
  }
  
  // Default to USD if no pattern matches
  return 'USD';
}
