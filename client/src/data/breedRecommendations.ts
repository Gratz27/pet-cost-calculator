// Breed-specific recommendations and popular choices

export interface BreedRecommendation {
  breedId: string;
  popularFood: 'premium' | 'standard';
  popularGrooming: '1-2-weeks' | 'monthly' | '3-months' | 'diy';
  insuranceRate: number; // Percentage of owners who get insurance
  trainingRate: number; // Percentage who do professional training
  insight: string;
}

export const breedRecommendations: Record<string, BreedRecommendation> = {
  'golden-retriever': {
    breedId: 'golden-retriever',
    popularFood: 'premium',
    popularGrooming: '3-months',
    insuranceRate: 72,
    trainingRate: 65,
    insight: '72% of Golden Retriever owners choose pet insurance due to potential hip dysplasia costs'
  },
  'labrador-retriever': {
    breedId: 'labrador-retriever',
    popularFood: 'premium',
    popularGrooming: '3-months',
    insuranceRate: 68,
    trainingRate: 58,
    insight: '85% of Labrador owners choose premium food to maintain healthy weight'
  },
  'german-shepherd': {
    breedId: 'german-shepherd',
    popularFood: 'premium',
    popularGrooming: '3-months',
    insuranceRate: 75,
    trainingRate: 82,
    insight: '82% of German Shepherd owners invest in professional training for obedience'
  },
  'french-bulldog': {
    breedId: 'french-bulldog',
    popularFood: 'premium',
    popularGrooming: 'diy',
    insuranceRate: 85,
    trainingRate: 45,
    insight: '85% of French Bulldog owners get insurance due to breathing and health issues'
  },
  'english-bulldog': {
    breedId: 'english-bulldog',
    popularFood: 'premium',
    popularGrooming: 'diy',
    insuranceRate: 88,
    trainingRate: 42,
    insight: 'English Bulldogs have high vet costs - 88% of owners carry pet insurance'
  },
  'poodle-standard': {
    breedId: 'poodle-standard',
    popularFood: 'premium',
    popularGrooming: '1-2-weeks',
    insuranceRate: 62,
    trainingRate: 70,
    insight: 'Poodles require professional grooming every 4-6 weeks to maintain their coat'
  },
  'poodle-miniature': {
    breedId: 'poodle-miniature',
    popularFood: 'standard',
    popularGrooming: 'monthly',
    insuranceRate: 60,
    trainingRate: 68,
    insight: 'Miniature Poodles are highly trainable - 68% of owners do professional training'
  },
  'beagle': {
    breedId: 'beagle',
    popularFood: 'standard',
    popularGrooming: 'diy',
    insuranceRate: 55,
    trainingRate: 48,
    insight: 'Beagles are relatively low-maintenance with minimal grooming needs'
  },
  'shih-tzu': {
    breedId: 'shih-tzu',
    popularFood: 'standard',
    popularGrooming: 'monthly',
    insuranceRate: 58,
    trainingRate: 52,
    insight: 'Shih Tzus need regular grooming - monthly visits are most common'
  },
  'siberian-husky': {
    breedId: 'siberian-husky',
    popularFood: 'premium',
    popularGrooming: '3-months',
    insuranceRate: 64,
    trainingRate: 72,
    insight: 'Huskies are high-energy dogs - 72% of owners invest in training'
  },
  'persian': {
    breedId: 'persian',
    popularFood: 'premium',
    popularGrooming: 'monthly',
    insuranceRate: 52,
    trainingRate: 15,
    insight: 'Persian cats require daily brushing and monthly professional grooming'
  },
  'maine-coon': {
    breedId: 'maine-coon',
    popularFood: 'premium',
    popularGrooming: '3-months',
    insuranceRate: 48,
    trainingRate: 12,
    insight: 'Maine Coons are large cats with higher food costs than average'
  },
  'siamese': {
    breedId: 'siamese',
    popularFood: 'standard',
    popularGrooming: 'diy',
    insuranceRate: 42,
    trainingRate: 18,
    insight: 'Siamese cats are low-maintenance with minimal grooming needs'
  },
  'bengal': {
    breedId: 'bengal',
    popularFood: 'premium',
    popularGrooming: 'diy',
    insuranceRate: 55,
    trainingRate: 25,
    insight: 'Bengal cats are active and benefit from premium, high-protein food'
  },
  'british-shorthair': {
    breedId: 'british-shorthair',
    popularFood: 'standard',
    popularGrooming: 'diy',
    insuranceRate: 45,
    trainingRate: 10,
    insight: 'British Shorthairs are easy-going cats with minimal grooming requirements'
  }
};

// General statistics for options without breed-specific data
export const generalStatistics = {
  insurance: {
    yes: 68,
    maybe: 20,
    no: 12
  },
  training: {
    yes: 55,
    maybe: 30,
    no: 15
  },
  foodType: {
    premium: 58,
    standard: 42
  },
  groomingFrequency: {
    '1-2-weeks': 8,
    'monthly': 25,
    '3-months': 35,
    'diy': 32
  },
  daycareFrequency: {
    daily: 12,
    '2-3-week': 18,
    occasionally: 35,
    never: 35
  }
};

export function getBreedRecommendation(breedId: string): BreedRecommendation | null {
  return breedRecommendations[breedId] || null;
}

export function getPopularityPercentage(option: string, category: keyof typeof generalStatistics): number {
  const stats = generalStatistics[category] as any;
  return stats[option] || 0;
}

