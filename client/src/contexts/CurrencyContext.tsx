import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CURRENCIES, CurrencyInfo, detectCurrencyFromPostalCode } from '@/lib/currency';

interface CurrencyContextType {
  currency: string;
  setCurrency: (code: string) => void;
  currencyInfo: CurrencyInfo;
  autoDetectCurrency: (postalCode: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Default to USD
  const [currency, setCurrencyState] = useState<string>('USD');

  // Load saved currency from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('pet-cost-currency');
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      localStorage.setItem('pet-cost-currency', code);
    }
  };

  const autoDetectCurrency = (postalCode: string) => {
    // Only auto-detect if user hasn't manually set a preference (optional logic, 
    // but for now let's just detect based on input to be helpful)
    const detected = detectCurrencyFromPostalCode(postalCode);
    if (detected && CURRENCIES[detected] && detected !== currency) {
      setCurrency(detected);
    }
  };

  const value = {
    currency,
    setCurrency,
    currencyInfo: CURRENCIES[currency] || CURRENCIES['USD'],
    autoDetectCurrency
  };

  return (
    <CurrencyContext.Provider value={value}>
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
