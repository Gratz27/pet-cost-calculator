import { Input } from './input';
import { forwardRef, useState } from 'react';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  helperText?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, min, max, helperText, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState('');

    const formatCurrency = (val: string) => {
      // Remove non-digits
      const digits = val.replace(/\D/g, '');
      if (!digits) return '';
      
      // Convert to number and format with commas
      const number = parseInt(digits, 10);
      return number.toLocaleString();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\D/g, '');
      const numValue = rawValue ? parseInt(rawValue, 10) : 0;

      // Validation
      if (min !== undefined && numValue < min) {
        setError(`Minimum value is $${min.toLocaleString()}`);
      } else if (max !== undefined && numValue > max) {
        setError(`Maximum value is $${max.toLocaleString()}`);
      } else {
        setError('');
      }

      onChange(rawValue);
    };

    const displayValue = isFocused ? value : formatCurrency(value);

    return (
      <div className="space-y-1">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
            $
          </span>
          <Input
            {...props}
            ref={ref}
            type="text"
            inputMode="numeric"
            value={displayValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`pl-7 ${error ? 'border-destructive' : ''}`}
          />
        </div>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

