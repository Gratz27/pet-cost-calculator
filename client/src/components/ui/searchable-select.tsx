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
  const filteredOptions = options.filter(option => {
    const searchLower = searchQuery.toLowerCase().trim();
    if (!searchLower) return true;
    
    const nameLower = option.name.toLowerCase();
    
    // Direct match
    if (nameLower.includes(searchLower)) return true;
    
    // Handle common aliases/variations
    const aliases: Record<string, string[]> = {
      'british bulldog': ['english bulldog', 'bulldog'],
      'english bulldog': ['british bulldog', 'bulldog'],
      'frenchie': ['french bulldog'],
      'staffy': ['staffordshire bull terrier'],
      'staffie': ['staffordshire bull terrier'],
      'amstaff': ['american staffordshire terrier'],
      'pitbull': ['american pit bull terrier', 'american staffordshire terrier'],
      'wiener dog': ['dachshund'],
      'sausage dog': ['dachshund'],
      'doxie': ['dachshund'],
      'yorkie': ['yorkshire terrier'],
      'pom': ['pomeranian'],
      'sheltie': ['shetland sheepdog'],
      'cocker': ['cocker spaniel'],
      'springer': ['english springer spaniel'],
      'aussie': ['australian shepherd'],
      'heeler': ['australian shepherd'],
      'malamute': ['australian shepherd'], // Often confused
      'husky': ['alaskan malamute', 'siberian husky'],
      'mally': ['alaskan malamute'],
      'dobie': ['doberman pinscher'],
      'rottie': ['rottweiler'],
      'gsd': ['german shepherd dog'],
      'alsatian': ['german shepherd dog'],
      'lab': ['labrador retriever'],
      'golden': ['golden retriever'],
      'chihuahua': ['teacup chihuahua', 'apple head chihuahua', 'deer head chihuahua'],
      'pug': ['teacup pug'],
      'shih tzu': ['teacup shih tzu'],
      'maltese': ['teacup maltese'],
      'poodle': ['teacup poodle', 'toy poodle', 'miniature poodle', 'standard poodle'],
      'bichon': ['bichon frise'],
      'corgi': ['pembroke welsh corgi', 'cardigan welsh corgi'],
      'boston': ['boston terrier'],
      'scottie': ['scottish terrier'],
      'westie': ['scottish terrier', 'west highland white terrier'],
      'cairn': ['cairn terrier'],
      'jack russell': ['jack russell terrier', 'parson russell terrier'],
      'bull terrier': ['bull terrier', 'miniature bull terrier'],
      'greyhound': ['greyhound', 'italian greyhound'],
      'whippet': ['whippet', 'italian greyhound'],
      'pointer': ['pointer', 'german shorthaired pointer', 'german wirehaired pointer'],
      'setter': ['english setter', 'irish setter', 'gordon setter'],
      'spaniel': ['cocker spaniel', 'english springer spaniel', 'welsh springer spaniel', 'cavalier king charles spaniel'],
      'retriever': ['labrador retriever', 'golden retriever', 'flat-coated retriever', 'curly-coated retriever', 'chesapeake bay retriever', 'nova scotia duck tolling retriever'],
      'terrier': ['yorkshire terrier', 'boston terrier', 'scottish terrier', 'west highland white terrier', 'cairn terrier', 'jack russell terrier', 'bull terrier', 'miniature bull terrier', 'staffordshire bull terrier', 'american staffordshire terrier', 'american pit bull terrier', 'airedale terrier', 'border terrier', 'welsh terrier', 'irish terrier', 'kerry blue terrier', 'soft coated wheaten terrier', 'bedlington terrier', 'dandie dinmont terrier', 'manchester terrier', 'norwich terrier', 'skye terrier', 'sealyham terrier', 'australian terrier', 'silky terrier', 'norfolk terrier', 'lakeland terrier', 'parson russell terrier', 'russell terrier', 'rat terrier', 'cesky terrier', 'glen of imaal terrier', 'wire fox terrier', 'smooth fox terrier', 'irish terrier', 'kerry blue terrier', 'soft coated wheaten terrier', 'bedlington terrier', 'dandie dinmont terrier', 'manchester terrier', 'norwich terrier', 'skye terrier', 'sealyham terrier', 'australian terrier', 'silky terrier', 'norfolk terrier', 'lakeland terrier', 'parson russell terrier', 'russell terrier', 'rat terrier', 'cesky terrier', 'glen of imaal terrier', 'wire fox terrier', 'smooth fox terrier'],
      'hound': ['greyhound', 'whippet', 'afghan hound', 'saluki', 'borzoi', 'irish wolfhound', 'scottish deerhound', 'bloodhound', 'basenji', 'ibizan hound', 'pharaoh hound', 'rhodesian ridgeback', 'dachshund', 'basset hound', 'beagle', 'bloodhound', 'coonhound', 'foxhound', 'harrier', 'otterhound', 'petit basset griffon vendeen', 'treeing walker coonhound', 'american english coonhound', 'black and tan coonhound', 'bluetick coonhound', 'plott hound', 'redbone coonhound', 'treeing tennessee brindle'],
      'mastiff': ['mastiff', 'bullmastiff', 'neapolitan mastiff', 'tibetan mastiff', 'cane corso', 'dogue de bordeaux', 'boerboel', 'presa canario', 'spanish mastiff', 'pyrenean mastiff', 'tibetan mastiff'],
      'collie': ['pembroke welsh corgi', 'cardigan welsh corgi', 'border collie', 'rough collie', 'smooth collie', 'bearded collie'],
      'sheepdog': ['shetland sheepdog', 'old english sheepdog', 'belgian sheepdog', 'icelandic sheepdog', 'polish lowlands sheepdog'],
      'cattle dog': ['australian cattle dog', 'bouvier des flandres', 'briard', 'canaan dog', 'entlebucher mountain dog', 'finnish spitz', 'german pinscher', 'norwegian buhund', 'puli', 'pumi', 'swedish vallhund'],
      'spitz': ['finnish spitz', 'japanese spitz', 'norwegian elkhound', 'norwegian lundehund', 'samoyed', 'shiba inu', 'siberian husky', 'alaskan malamute', 'american eskimo dog', 'chow chow', 'keeshond', 'korean jindo dog', 'akita', 'alaskan klee kai', 'american hairless terrier', 'canadian eskimo dog', 'chinook', 'eurasier', 'icelandic sheepdog', 'norwegian buhund', 'pomeranian', 'schiller hound', 'swedish vallhund', 'volpino italiano'],
      'water dog': ['portuguese water dog', 'spanish water dog', 'irish water spaniel', 'american water spaniel', 'barbet', 'lagotto romagnolo', 'poodle', 'standard poodle', 'miniature poodle', 'toy poodle'],
      'mountain dog': ['bernese mountain dog', 'greater swiss mountain dog', 'appenzeller sennenhund', 'entlebucher mountain dog', 'great pyrenees', 'kuvasz', 'leonberger', 'newfoundland', 'saint bernard', 'tibetan mastiff', 'anatolian shepherd dog', 'caucasian shepherd dog', 'central asian shepherd dog', 'estrela mountain dog', 'komondor', 'maremma sheepdog', 'polish tatra sheepdog', 'pyrenean mastiff', 'rafeiro do alentejo', 'sarplaninac', 'slovak tatra sheepdog', 'spanish mastiff', 'tornjak', 'volpino italiano'],
      'sled dog': ['alaskan malamute', 'siberian husky', 'samoyed', 'canadian eskimo dog', 'chinook', 'greenland dog', 'karelian bear dog', 'norwegian elkhound', 'norwegian lundehund', 'shiba inu', 'akita', 'alaskan klee kai', 'american eskimo dog', 'chow chow', 'eurasier', 'finnish spitz', 'icelandic sheepdog', 'japanese spitz', 'keeshond', 'korean jindo dog', 'norwegian buhund', 'pomeranian', 'schiller hound', 'swedish vallhund', 'volpino italiano'],
      'toy': ['chihuahua', 'pug', 'shih tzu', 'maltese', 'pomeranian', 'yorkshire terrier', 'toy poodle', 'papillon', 'cavalier king charles spaniel', 'pekingese', 'bichon frise', 'havanese', 'miniature pinscher', 'japanese chin', 'brussels griffon', 'chinese crested', 'english toy spaniel', 'italian greyhound', 'miniature schnauzer', 'silky terrier', 'toy fox terrier', 'affenpinscher', 'american hairless terrier', 'biewer terrier', 'bolognese', 'coton de tulear', 'dandie dinmont terrier', 'lowchen', 'manchester terrier', 'norfolk terrier', 'norwich terrier', 'parson russell terrier', 'rat terrier', 'russell terrier', 'scottish terrier', 'sealyham terrier', 'skye terrier', 'smooth fox terrier', 'tibetan spaniel', 'tibetan terrier', 'welsh terrier', 'west highland white terrier', 'wire fox terrier', 'yorkshire terrier'],
      'working': ['akita', 'alaskan malamute', 'anatolian shepherd dog', 'bernese mountain dog', 'black russian terrier', 'boerboel', 'boxer', 'bullmastiff', 'cane corso', 'caucasian shepherd dog', 'central asian shepherd dog', 'chinook', 'doberman pinscher', 'dogo argentino', 'dogue de bordeaux', 'estrela mountain dog', 'german pinscher', 'giant schnauzer', 'great dane', 'great pyrenees', 'greater swiss mountain dog', 'komondor', 'kuvasz', 'leonberger', 'mastiff', 'neapolitan mastiff', 'newfoundland', 'portuguese water dog', 'presa canario', 'rafeiro do alentejo', 'rottweiler', 'saint bernard', 'samoyed', 'sarplaninac', 'siberian husky', 'slovak tatra sheepdog', 'spanish mastiff', 'standard schnauzer', 'tibetan mastiff', 'tornjak', 'volpino italiano'],
      'herding': ['australian cattle dog', 'australian shepherd', 'bearded collie', 'beauceron', 'belgian malinois', 'belgian sheepdog', 'belgian tervuren', 'bergamasco sheepdog', 'berger picard', 'border collie', 'bouvier des flandres', 'briard', 'canaan dog', 'cardigan welsh corgi', 'collie', 'entlebucher mountain dog', 'finnish lapphund', 'german shepherd dog', 'icelandic sheepdog', 'miniature american shepherd', 'norwegian buhund', 'old english sheepdog', 'pembroke welsh corgi', 'polish lowland sheepdog', 'puli', 'pumi', 'pyrenean shepherd', 'rough collie', 'shetland sheepdog', 'smooth collie', 'spanish water dog', 'swedish vallhund'],
      'sporting': ['american water spaniel', 'barbet', 'boykin spaniel', 'brittany', 'chesapeake bay retriever', 'clumber spaniel', 'cocker spaniel', 'curly-coated retriever', 'english cocker spaniel', 'english setter', 'english springer spaniel', 'field spaniel', 'flat-coated retriever', 'german shorthaired pointer', 'german wirehaired pointer', 'golden retriever', 'gordon setter', 'irish red and white spaniel', 'irish setter', 'irish water spaniel', 'labrador retriever', 'lagotto romagnolo', 'nederlandse kooikerhondje', 'nova scotia duck tolling retriever', 'pointer', 'spinone italiano', 'sussex spaniel', 'vizsla', 'weimaraner', 'welsh springer spaniel', 'wirehaired pointing griffon', 'wirehaired vizsla'],
      'non-sporting': ['american eskimo dog', 'bichon frise', 'boston terrier', 'bulldog', 'chinese shar-pei', 'chow chow', 'coton de tulear', 'dalmatian', 'finnish spitz', 'french bulldog', 'keeshond', 'lhasa apso', 'lowchen', 'norwegian lundehund', 'poodle', 'schipperke', 'shiba inu', 'tibetan spaniel', 'tibetan terrier', 'xoloitzcuintli'],
      'mixed': ['mixed breed', 'mutt', 'mongrel', 'crossbreed', 'designer dog', 'labradoodle', 'goldendoodle', 'cockapoo', 'puggle', 'schnoodle', 'maltipoo', 'yorkipoo', 'pomsky', 'chiweenie', 'peekapoo', 'cavapoo', 'bernedoodle', 'sheepadoodle', 'aussiedoodle', 'bordoodle', 'springerdoodle', 'whoodle', 'boxador', 'bullador', 'borador', 'huskador', 'mastador', 'weimador', 'pyredoodle', 'saint berdoodle', 'newfypoo', 'irish doodle', 'afghan retriever', 'basset retriever', 'beaglier', 'bocker', 'boggle', 'bugg', 'bull pug', 'cava-chon', 'cava-poo-chon', 'chug', 'corkie', 'dorgi', 'dorkie', 'doxiepoo', 'frenchton', 'glechon', 'havapoo', 'jack-a-poo', 'morkie', 'papipoo', 'poochon', 'pugapoo', 'puggle', 'schnoxie', 'shih-poo', 'shorkie', 'snorkie', 'westiepoo', 'whoodle', 'yorkipoo'],
      
      // Cat aliases
      'tabby': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat'],
      'shorthair': ['domestic shorthair', 'british shorthair', 'american shorthair', 'exotic shorthair', 'oriental shorthair', 'colorpoint shorthair'],
      'longhair': ['domestic longhair', 'persian', 'maine coon', 'ragdoll', 'norwegian forest cat', 'siberian', 'himalayan', 'birman', 'turkish angora', 'somali', 'balinese', 'cymric', 'nebelung', 'ragamuffin', 'turkish van', 'york chocolate'],
      'calico': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat'],
      'tortie': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat', 'tortoiseshell'],
      'tuxedo': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat'],
      'ginger': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat'],
      'black cat': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat', 'bombay'],
      'white cat': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat', 'khao manee', 'turkish angora'],
      'grey cat': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat', 'russian blue', 'chartreux', 'korat', 'nebelung'],
      'orange cat': ['domestic shorthair', 'domestic mediumhair', 'domestic longhair', 'mixed breed cat'],
      'siamese': ['siamese', 'balinese', 'colorpoint shorthair', 'himalayan', 'javanese', 'oriental shorthair', 'oriental longhair', 'snowshoe', 'thai', 'tonkinese'],
      'persian': ['persian', 'exotic shorthair', 'himalayan'],
      'maine coon': ['maine coon'],
      'ragdoll': ['ragdoll', 'ragamuffin'],
      'bengal': ['bengal', 'toyger', 'savannah', 'egyptian mau', 'ocicat', 'abyssinian', 'somali', 'singapura', 'ceylon', 'sokoke', 'chausie', 'cheetoh', 'serengeti', 'safari'],
      'sphynx': ['sphynx', 'donskoy', 'peterbald', 'ukrainian levkoy', 'bambino', 'dwelf', 'elf cat', 'minskin'],
      'scottish fold': ['scottish fold', 'scottish straight', 'highland fold', 'highland straight'],
      'munchkin': ['munchkin', 'minuet', 'napoleon', 'skookum', 'bambino', 'dwelf', 'kinkalow', 'lambkin', 'genetta', 'melf', 'jaguarundi curl'],
      'bobtail': ['japanese bobtail', 'american bobtail', 'kurilian bobtail', 'karelian bobtail', 'mekong bobtail', 'pixie-bob', 'cymric', 'manx'],
      'curl': ['american curl', 'highlander', 'kinkalow'],
      'wirehair': ['american wirehair'],
      'rex': ['cornish rex', 'devon rex', 'selkirk rex', 'german rex', 'la perm', 'ural rex'],
      'forest cat': ['norwegian forest cat', 'siberian'],
      'wildcat': ['bengal', 'savannah', 'toyger', 'chausie', 'cheetoh', 'serengeti', 'safari', 'caracat', 'pixie-bob', 'ocicat', 'egyptian mau', 'abyssinian', 'somali', 'singapura', 'ceylon', 'sokoke'],
      'hairless': ['sphynx', 'donskoy', 'peterbald', 'ukrainian levkoy', 'bambino', 'dwelf', 'elf cat', 'minskin'],
      'dwarf': ['munchkin', 'minuet', 'napoleon', 'skookum', 'bambino', 'dwelf', 'kinkalow', 'lambkin', 'genetta', 'melf', 'jaguarundi curl'],
      'giant': ['maine coon', 'savannah', 'ragdoll', 'norwegian forest cat', 'siberian', 'ragamuffin', 'chausie', 'bengal', 'highlander', 'pixie-bob', 'american bobtail', 'kurilian bobtail', 'karelian bobtail', 'mekong bobtail', 'cymric', 'manx', 'british shorthair', 'chartreux', 'exotic shorthair', 'persian', 'himalayan', 'birman', 'turkish van', 'turkish angora', 'somali', 'abyssinian', 'ocicat', 'egyptian mau', 'singapura', 'ceylon', 'sokoke', 'toyger', 'cheetoh', 'serengeti', 'safari', 'caracat'],
      'miniature': ['munchkin', 'minuet', 'napoleon', 'skookum', 'bambino', 'dwelf', 'kinkalow', 'lambkin', 'genetta', 'melf', 'jaguarundi curl', 'singapura', 'ceylon', 'sokoke', 'toyger', 'cheetoh', 'serengeti', 'safari', 'caracat', 'pixie-bob', 'american bobtail', 'kurilian bobtail', 'karelian bobtail', 'mekong bobtail', 'cymric', 'manx', 'british shorthair', 'chartreux', 'exotic shorthair', 'persian', 'himalayan', 'birman', 'turkish van', 'turkish angora', 'somali', 'abyssinian', 'ocicat', 'egyptian mau', 'bengal', 'savannah', 'ragdoll', 'norwegian forest cat', 'siberian', 'ragamuffin', 'chausie', 'highlander'],
      'teacup': ['munchkin', 'minuet', 'napoleon', 'skookum', 'bambino', 'dwelf', 'kinkalow', 'lambkin', 'genetta', 'melf', 'jaguarundi curl', 'singapura', 'ceylon', 'sokoke', 'toyger', 'cheetoh', 'serengeti', 'safari', 'caracat', 'pixie-bob', 'american bobtail', 'kurilian bobtail', 'karelian bobtail', 'mekong bobtail', 'cymric', 'manx', 'british shorthair', 'chartreux', 'exotic shorthair', 'persian', 'himalayan', 'birman', 'turkish van', 'turkish angora', 'somali', 'abyssinian', 'ocicat', 'egyptian mau', 'bengal', 'savannah', 'ragdoll', 'norwegian forest cat', 'siberian', 'ragamuffin', 'chausie', 'highlander'],
      'hypoallergenic': ['sphynx', 'donskoy', 'peterbald', 'ukrainian levkoy', 'bambino', 'dwelf', 'elf cat', 'minskin', 'cornish rex', 'devon rex', 'selkirk rex', 'german rex', 'la perm', 'ural rex', 'siberian', 'balinese', 'oriental shorthair', 'javanese', 'colorpoint shorthair', 'russian blue', 'bengal', 'ocicat', 'egyptian mau', 'abyssinian', 'somali', 'singapura', 'ceylon', 'sokoke', 'toyger', 'cheetoh', 'serengeti', 'safari', 'caracat', 'pixie-bob', 'american bobtail', 'kurilian bobtail', 'karelian bobtail', 'mekong bobtail', 'cymric', 'manx', 'british shorthair', 'chartreux', 'exotic shorthair', 'persian', 'himalayan', 'birman', 'turkish van', 'turkish angora', 'ragdoll', 'norwegian forest cat', 'ragamuffin', 'chausie', 'highlander', 'munchkin', 'minuet', 'napoleon', 'skookum', 'kinkalow', 'lambkin', 'genetta', 'melf', 'jaguarundi curl', 'american curl', 'american wirehair', 'scottish fold', 'scottish straight', 'highland fold', 'highland straight', 'japanese bobtail', 'snowshoe', 'thai', 'tonkinese', 'siamese', 'korat', 'nebelung', 'bombay', 'burmese', 'burmilla', 'havana brown', 'khao manee', 'lykoi', 'ojos azules', 'sokoke', 'toyger', 'york chocolate'],
    };

    // Check aliases
    for (const [alias, targets] of Object.entries(aliases)) {
      if (searchLower.includes(alias) || alias.includes(searchLower)) {
        if (targets.some(target => nameLower.includes(target))) {
          return true;
        }
      }
    }
    
    // Split search into words and check if all words are in the name
    const searchWords = searchLower.split(/\s+/);
    return searchWords.every(word => nameLower.includes(word));
  });

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
                className="w-full pl-9 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-[16px]"
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
                    "w-full flex items-center justify-between px-3 py-3 text-left min-h-[44px]",
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

