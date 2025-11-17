import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  name: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  id
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected option
  const selectedOption = options.find(opt => opt.id === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Reset highlighted index when search query changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Scroll to highlighted item
  useEffect(() => {
    if (listRef.current && highlightedIndex >= 0) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex].id);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "w-full flex items-center justify-between px-3 py-3 border rounded-lg",
          "bg-background hover:bg-accent/50 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "ring-2 ring-primary"
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-left truncate",
          !selectedOption && "text-muted-foreground"
        )}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ml-2",
          isOpen && "transform rotate-180"
        )} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-background border rounded-lg shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search breeds..."
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Options List */}
          <div
            ref={listRef}
            className="max-h-64 overflow-y-auto"
            role="listbox"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                No breeds found matching "{searchQuery}"
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-left",
                    "hover:bg-accent transition-colors",
                    highlightedIndex === index && "bg-accent",
                    value === option.id && "bg-primary/10"
                  )}
                  role="option"
                  aria-selected={value === option.id}
                >
                  <span className="truncate">{option.name}</span>
                  {value === option.id && (
                    <Check className="h-4 w-4 text-primary flex-shrink-0 ml-2" />
                  )}
                </button>
              ))
            )}
          </div>

          {/* Results count */}
          {searchQuery && filteredOptions.length > 0 && (
            <div className="px-3 py-2 border-t text-xs text-muted-foreground bg-muted/30">
              {filteredOptions.length} {filteredOptions.length === 1 ? 'breed' : 'breeds'} found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

