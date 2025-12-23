import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Currency, CURRENCIES, detectCurrencyFromPostalCode } from '@/lib/currency';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  detectAndSetCurrency: (postalCode: string) => void;
  format: (amount: number) => string;
  convert: (amountUSD: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Try to get saved currency from localStorage, default to USD
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('pet_calculator_currency');
    return (saved as Currency) || 'USD';
  });

  // Update localStorage when currency changes
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('pet_calculator_currency', newCurrency);
  };

  // Detect currency from postal code
  const detectAndSetCurrency = (postalCode: string) => {
    const detected = detectCurrencyFromPostalCode(postalCode);
    if (detected && detected !== currency) {
      setCurrency(detected);
    }
  };

  // Helper to format amount in current currency
  const format = (amount: number) => {
    const currencyInfo = CURRENCIES[currency];
    const convertedAmount = amount * currencyInfo.rate;
    const formattedNumber = Math.round(convertedAmount).toLocaleString('en-US');
    return `${currencyInfo.symbol}${formattedNumber}`;
  };

  // Helper to convert amount to current currency (raw number)
  const convert = (amountUSD: number) => {
    return amountUSD * CURRENCIES[currency].rate;
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        detectAndSetCurrency, 
        format, 
        convert,
        symbol: CURRENCIES[currency].symbol 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
