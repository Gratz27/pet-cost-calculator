import { useCurrency } from '@/contexts/CurrencyContext';
import { CURRENCIES, Currency } from '@/lib/currency';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

interface CurrencySelectorProps {
  className?: string;
  variant?: 'minimal' | 'full';
}

export function CurrencySelector({ className = '', variant = 'minimal' }: CurrencySelectorProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {variant === 'full' && <Globe className="w-4 h-4 text-muted-foreground" />}
      <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
        <SelectTrigger className="w-[100px] h-8 text-xs">
          <SelectValue placeholder="Currency" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(CURRENCIES).map((info) => (
            <SelectItem key={info.code} value={info.code} className="text-xs">
              {info.code} ({info.symbol})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
