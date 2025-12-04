import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  getSymbol: (curr?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencySymbols: Record<Currency, string> = {
  'NGN': '₦',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'INR': '₹',
  'CAD': 'C$',
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('userCurrency');
    return (saved as Currency) || 'NGN';
  });

  useEffect(() => {
    localStorage.setItem('userCurrency', currency);
  }, [currency]);

  const getSymbol = (curr?: Currency) => {
    const target = curr || currency;
    return currencySymbols[target];
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, getSymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
