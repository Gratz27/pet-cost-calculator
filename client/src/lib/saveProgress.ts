import type { CalculatorInputs } from './calculator';

export interface SavedProgress {
  step: number;
  petType: 'dog' | 'cat';
  breedId: string;
  location: string;
  livingSituation: 'own-home' | 'rent-apartment' | 'rent-house' | 'other';
  purchaseFee: string;
  purchaseFeeUnknown: boolean;
  insurance: 'yes' | 'maybe' | 'no';
  training: 'yes' | 'maybe' | 'no';
  initialVet: 'known' | 'estimate';
  initialVetAmount: string;
  petDepositAmount: string;
  workSchedule: string;
  travelFrequency: string;
  activityLevel: string;
  foodType: 'premium' | 'standard';
  groomingFrequency: '1-2-weeks' | 'monthly' | '3-months' | 'diy';
  daycareFrequency: 'daily' | '2-3-week' | 'occasionally' | 'never';
  dentalCare: 'annual' | 'as-needed';
  timestamp: number;
}

const STORAGE_KEY = 'petCostCalculatorProgress';

export function saveProgress(progress: SavedProgress): string {
  const progressWithTimestamp = {
    ...progress,
    timestamp: Date.now()
  };
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressWithTimestamp));
  
  // Generate shareable code (base64 encoded)
  const encoded = btoa(JSON.stringify(progressWithTimestamp));
  return encoded;
}

export function loadProgress(code?: string): SavedProgress | null {
  try {
    if (code) {
      // Load from shareable code
      const decoded = atob(code);
      return JSON.parse(decoded);
    } else {
      // Load from localStorage
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
  return null;
}

export function clearProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateShareableLink(code: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/?resume=${code}`;
}

