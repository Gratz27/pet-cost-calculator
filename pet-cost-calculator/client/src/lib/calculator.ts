import breedsData from '../data/breeds.json';

export interface Breed {
  id: string;
  name: string;
  size: string;
  adoptionFee: number;
  initialVet: number;
  initialSupplies: number;
  training: number;
  annualFood: number;
  annualVet: number;
  annualGrooming: number;
  annualInsurance: number;
  annualSupplies: number;
  lifespan: number;
  description: string;
}

export interface CalculatorInputs {
  petType: 'dog' | 'cat';
  breedId: string;
  location: string;
  livingSituation: 'own-home' | 'rent-apartment' | 'rent-house' | 'other';
  workSchedule: string;
  travelFrequency: string;
  activityLevel: string;
  // New fields for upfront cost questions
  purchaseFee?: number;
  insurance?: 'yes' | 'maybe' | 'no';
  training?: 'yes' | 'maybe' | 'no';
  initialVet?: number;
  petDeposit?: number;
  foodType?: 'premium' | 'standard';
  groomingFrequency?: '1-2-weeks' | 'monthly' | '3-months' | 'diy';
  daycareFrequency?: 'daily' | '2-3-week' | 'occasionally' | 'never';
  dentalCare?: 'annual' | 'as-needed';
}

export interface CostBreakdown {
  firstYear: {
    adoptionFee: number;
    initialVet: number;
    supplies: number;
    training: number;
    petDeposit: number;
    food: number;
    grooming: number;
    insurance: number;
    total: number;
  };
  annual: {
    food: number;
    vet: number;
    grooming: number;
    insurance: number;
    supplies: number;
    total: number;
  };
  lifetime: {
    total: number;
    years: number;
    emergencyFund: number;
  };
  hiddenCosts: {
    boarding: number;
    furniture: number;
    cleaning: number;
  };
}

export function getAllBreeds(petType: 'dog' | 'cat'): Breed[] {
  return petType === 'dog' ? breedsData.dogs : breedsData.cats;
}

export function getBreedById(petType: 'dog' | 'cat', breedId: string): Breed | undefined {
  const breeds = getAllBreeds(petType);
  return breeds.find(b => b.id === breedId);
}

export function calculateCosts(inputs: CalculatorInputs): CostBreakdown | null {
  const breed = getBreedById(inputs.petType, inputs.breedId);
  if (!breed) return null;

  // Location multiplier (simplified - could be more sophisticated)
  const locationMultiplier = getLocationMultiplier(inputs.location);

  // Use user-provided values or defaults
  
  // Purchase/Adoption Fee - use provided value or breed default
  const adoptionFee = inputs.purchaseFee !== undefined ? inputs.purchaseFee : breed.adoptionFee;
  
  // Initial Vet - use provided value or breed default
  const initialVet = inputs.initialVet !== undefined ? inputs.initialVet : (breed.initialVet * locationMultiplier);
  
  // Training - adjust based on user choice
  let training = 0;
  if (inputs.training === 'yes') {
    training = breed.training;
  } else if (inputs.training === 'maybe') {
    training = breed.training * 0.5; // Include half for "maybe"
  }
  // If 'no', training = 0
  
  // Pet Deposit - use provided value or default
  const petDeposit = inputs.petDeposit !== undefined ? inputs.petDeposit : 
    (inputs.livingSituation.includes('rent') ? 400 : 0);
  
  // Food - adjust based on food type
  let foodMultiplier = 1;
  if (inputs.foodType === 'premium') {
    foodMultiplier = 1.5;
  } else if (inputs.foodType === 'standard') {
    foodMultiplier = 1;
  }
  const firstYearFood = breed.annualFood * locationMultiplier * foodMultiplier;
  
  // Grooming - adjust based on frequency
  let groomingMultiplier = 1;
  if (inputs.groomingFrequency === '1-2-weeks') {
    groomingMultiplier = 2.0; // Very frequent grooming
  } else if (inputs.groomingFrequency === 'monthly') {
    groomingMultiplier = 1.5; // Monthly grooming
  } else if (inputs.groomingFrequency === '3-months') {
    groomingMultiplier = 1; // Standard quarterly
  } else if (inputs.groomingFrequency === 'diy') {
    groomingMultiplier = 0.2; // Minimal professional grooming
  }
  const firstYearGrooming = breed.annualGrooming * locationMultiplier * groomingMultiplier;
  
  // Insurance - include based on user choice
  let firstYearInsurance = 0;
  if (inputs.insurance === 'yes' || inputs.insurance === 'maybe') {
    firstYearInsurance = breed.annualInsurance;
  }
  // If 'no', insurance = 0

  const firstYear = {
    adoptionFee,
    initialVet,
    supplies: breed.initialSupplies,
    training,
    petDeposit,
    food: firstYearFood,
    grooming: firstYearGrooming,
    insurance: firstYearInsurance,
    total: 0
  };

  firstYear.total = 
    firstYear.adoptionFee +
    firstYear.initialVet +
    firstYear.supplies +
    firstYear.training +
    firstYear.petDeposit +
    firstYear.food +
    firstYear.grooming +
    firstYear.insurance;

  // Annual ongoing costs (use same multipliers as first year)
  const annual = {
    food: breed.annualFood * locationMultiplier * foodMultiplier,
    vet: breed.annualVet * locationMultiplier,
    grooming: breed.annualGrooming * locationMultiplier * groomingMultiplier,
    insurance: (inputs.insurance === 'yes' || inputs.insurance === 'maybe') ? breed.annualInsurance : 0,
    supplies: breed.annualSupplies,
    total: 0
  };

  annual.total = 
    annual.food +
    annual.vet +
    annual.grooming +
    annual.insurance +
    annual.supplies;

  // Lifetime costs
  const lifetimeYears = breed.lifespan;
  const lifetimeTotal = firstYear.total + (annual.total * (lifetimeYears - 1));
  const emergencyFund = breed.size === 'large' ? 3000 : breed.size === 'medium' ? 2500 : 2000;

  // Hidden costs (annual estimates)
  const hiddenCosts = {
    boarding: inputs.travelFrequency === 'frequently' ? 600 : 
              inputs.travelFrequency === 'occasionally' ? 300 : 100,
    furniture: inputs.petType === 'dog' ? 200 : 150,
    cleaning: 150
  };

  return {
    firstYear,
    annual,
    lifetime: {
      total: Math.round(lifetimeTotal),
      years: lifetimeYears,
      emergencyFund
    },
    hiddenCosts
  };
}

function getLocationMultiplier(location: string): number {
  // Simplified location-based cost adjustment
  const lowerLocation = location.toLowerCase();
  
  // High-cost cities
  if (lowerLocation.includes('new york') || 
      lowerLocation.includes('san francisco') ||
      lowerLocation.includes('los angeles') ||
      lowerLocation.includes('seattle') ||
      lowerLocation.includes('boston')) {
    return 1.3;
  }
  
  // Medium-cost cities
  if (lowerLocation.includes('chicago') ||
      lowerLocation.includes('austin') ||
      lowerLocation.includes('denver') ||
      lowerLocation.includes('portland')) {
    return 1.15;
  }
  
  // Default/lower-cost areas
  return 1.0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

