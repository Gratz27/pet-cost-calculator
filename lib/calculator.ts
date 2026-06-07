import breedsData from "@/data/breeds.json";

export interface Breed {
  id: string;
  name: string;
  size: "small" | "medium" | "large";
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
  petType: "dog" | "cat";
  breedId: string;
  location: string;
  livingSituation: "own-home" | "rent-apartment" | "rent-house" | "other";
  workSchedule: string;
  travelFrequency: string;
  activityLevel: string;
  purchaseFee?: number;
  insurance?: "yes" | "maybe" | "no";
  training?: "yes" | "maybe" | "no";
  initialVet?: number;
  petDeposit?: number;
  foodType?: "premium" | "standard";
  groomingFrequency?: "1-2-weeks" | "monthly" | "3-months" | "diy";
  daycareFrequency?: "daily" | "2-3-week" | "occasionally" | "never";
  dentalCare?: "annual" | "as-needed";
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
    daycare: number;
    dental: number;
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

export function getAllBreeds(petType: "dog" | "cat"): Breed[] {
  return (petType === "dog" ? breedsData.dogs : breedsData.cats) as Breed[];
}

export function getBreedById(petType: "dog" | "cat", breedId: string): Breed | undefined {
  return getAllBreeds(petType).find((b) => b.id === breedId);
}

export function calculateCosts(inputs: CalculatorInputs): CostBreakdown | null {
  const breed = getBreedById(inputs.petType, inputs.breedId);
  if (!breed) return null;

  const loc = getLocationMultiplier(inputs.location);

  const adoptionFee = inputs.purchaseFee !== undefined ? inputs.purchaseFee : breed.adoptionFee;
  const initialVet = inputs.initialVet !== undefined ? inputs.initialVet : breed.initialVet * loc;

  let trainingCost = 0;
  if (inputs.training === "yes") trainingCost = breed.training;
  else if (inputs.training === "maybe") trainingCost = breed.training * 0.5;

  const petDeposit =
    inputs.petDeposit !== undefined
      ? inputs.petDeposit
      : inputs.livingSituation.includes("rent")
      ? 400
      : 0;

  const foodMult = inputs.foodType === "premium" ? 1.5 : 1;

  let groomMult = 1;
  if (inputs.groomingFrequency === "1-2-weeks") groomMult = 2.0;
  else if (inputs.groomingFrequency === "monthly") groomMult = 1.5;
  else if (inputs.groomingFrequency === "3-months") groomMult = 1;
  else if (inputs.groomingFrequency === "diy") groomMult = 0.2;

  const hasInsurance = inputs.insurance === "yes" || inputs.insurance === "maybe";

  const daycareRate = breed.size === "large" ? 45 : breed.size === "medium" ? 38 : 30;
  let annualDaycare = 0;
  if (inputs.daycareFrequency === "daily") annualDaycare = daycareRate * 250;
  else if (inputs.daycareFrequency === "2-3-week") annualDaycare = daycareRate * 104;
  else if (inputs.daycareFrequency === "occasionally") annualDaycare = daycareRate * 24;
  annualDaycare *= loc;

  const annualDental = inputs.dentalCare === "annual" ? 300 * loc : 75 * loc;

  const firstYear = {
    adoptionFee,
    initialVet,
    supplies: breed.initialSupplies,
    training: trainingCost,
    petDeposit,
    food: breed.annualFood * loc * foodMult,
    grooming: breed.annualGrooming * loc * groomMult,
    insurance: hasInsurance ? breed.annualInsurance : 0,
    total: 0,
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

  const annual = {
    food: breed.annualFood * loc * foodMult,
    vet: breed.annualVet * loc,
    grooming: breed.annualGrooming * loc * groomMult,
    insurance: hasInsurance ? breed.annualInsurance : 0,
    supplies: breed.annualSupplies,
    daycare: annualDaycare,
    dental: annualDental,
    total: 0,
  };
  annual.total =
    annual.food + annual.vet + annual.grooming + annual.insurance + annual.supplies + annual.daycare + annual.dental;

  const lifetimeTotal = firstYear.total + annual.total * (breed.lifespan - 1);
  const emergencyFund = breed.size === "large" ? 3000 : breed.size === "medium" ? 2500 : 2000;

  return {
    firstYear,
    annual,
    lifetime: {
      total: Math.round(lifetimeTotal),
      years: breed.lifespan,
      emergencyFund,
    },
    hiddenCosts: {
      boarding: inputs.travelFrequency === "frequently" ? 600 : inputs.travelFrequency === "occasionally" ? 300 : 100,
      furniture: inputs.petType === "dog" ? 200 : 150,
      cleaning: 150,
    },
  };
}

function getLocationMultiplier(location: string): number {
  const loc = location.toLowerCase();
  if (loc.includes("united kingdom") || loc.includes(", uk") || loc.includes("england") || loc.includes("scotland") || loc.includes("wales")) return 1.25;
  if (loc.includes("australia") || loc.includes(", au") || loc.includes("sydney") || loc.includes("melbourne")) return 1.2;
  if (loc.includes("new zealand") || loc.includes("auckland") || loc.includes("wellington")) return 1.15;
  if (loc.includes("singapore") || loc.includes(", sg")) return 1.35;
  if (loc.includes("canada") || loc.includes("toronto") || loc.includes("vancouver")) return 1.1;
  if (loc.includes("germany") || loc.includes("france") || loc.includes("netherlands") || loc.includes("switzerland")) return 1.2;
  if (loc.includes("new york") || loc.includes("san francisco") || loc.includes("los angeles") || loc.includes("seattle") || loc.includes("boston")) return 1.3;
  if (loc.includes("chicago") || loc.includes("austin") || loc.includes("denver") || loc.includes("portland")) return 1.15;
  return 1.0;
}
