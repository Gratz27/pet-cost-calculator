import React from 'react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { getAllCurrencies } from '@/lib/currency';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const currencies = getAllCurrencies();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground hidden sm:inline">Currency:</span>
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Select Currency" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {currencies.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              <span className="font-medium w-8 inline-block">{c.code}</span>
              <span className="text-muted-foreground ml-2">({c.symbol}) {c.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
