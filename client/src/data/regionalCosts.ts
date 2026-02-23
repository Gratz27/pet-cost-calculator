export interface RegionalCost {
  id: string;
  name: string;
  lat: number;
  lng: number;
  costLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  examFee: [number, number]; // Min, Max
  vaccines: [number, number];
  spayNeuter: [number, number];
  dentalCleaning: [number, number];
}

export const regionalCosts: RegionalCost[] = [
  // USA - High Cost
  {
    id: 'nyc',
    name: 'New York, NY',
    lat: 40.7128,
    lng: -74.0060,
    costLevel: 'Very High',
    examFee: [85, 150],
    vaccines: [45, 95],
    spayNeuter: [450, 1200],
    dentalCleaning: [600, 1500]
  },
  {
    id: 'sf',
    name: 'San Francisco, CA',
    lat: 37.7749,
    lng: -122.4194,
    costLevel: 'Very High',
    examFee: [90, 160],
    vaccines: [50, 100],
    spayNeuter: [500, 1300],
    dentalCleaning: [700, 1600]
  },
  {
    id: 'la',
    name: 'Los Angeles, CA',
    lat: 34.0522,
    lng: -118.2437,
    costLevel: 'High',
    examFee: [75, 130],
    vaccines: [40, 85],
    spayNeuter: [400, 1000],
    dentalCleaning: [500, 1200]
  },
  {
    id: 'chi',
    name: 'Chicago, IL',
    lat: 41.8781,
    lng: -87.6298,
    costLevel: 'High',
    examFee: [70, 120],
    vaccines: [35, 80],
    spayNeuter: [350, 900],
    dentalCleaning: [450, 1000]
  },
  // USA - Medium Cost
  {
    id: 'hou',
    name: 'Houston, TX',
    lat: 29.7604,
    lng: -95.3698,
    costLevel: 'Medium',
    examFee: [55, 95],
    vaccines: [30, 65],
    spayNeuter: [250, 600],
    dentalCleaning: [350, 800]
  },
  {
    id: 'atl',
    name: 'Atlanta, GA',
    lat: 33.7490,
    lng: -84.3880,
    costLevel: 'Medium',
    examFee: [60, 100],
    vaccines: [30, 70],
    spayNeuter: [300, 700],
    dentalCleaning: [400, 900]
  },
  // USA - Low Cost
  {
    id: 'okc',
    name: 'Oklahoma City, OK',
    lat: 35.4676,
    lng: -97.5164,
    costLevel: 'Low',
    examFee: [45, 75],
    vaccines: [25, 55],
    spayNeuter: [150, 400],
    dentalCleaning: [250, 600]
  },
  
  // UK
  {
    id: 'lon',
    name: 'London, UK',
    lat: 51.5074,
    lng: -0.1278,
    costLevel: 'Very High',
    examFee: [60, 90], // GBP approx converted to USD for consistency or handle currency later
    vaccines: [40, 80],
    spayNeuter: [300, 800],
    dentalCleaning: [400, 1000]
  },
  {
    id: 'man',
    name: 'Manchester, UK',
    lat: 53.4808,
    lng: -2.2426,
    costLevel: 'Medium',
    examFee: [40, 70],
    vaccines: [30, 60],
    spayNeuter: [200, 500],
    dentalCleaning: [300, 700]
  },

  // Australia
  {
    id: 'syd',
    name: 'Sydney, AU',
    lat: -33.8688,
    lng: 151.2093,
    costLevel: 'Very High',
    examFee: [80, 140],
    vaccines: [50, 100],
    spayNeuter: [400, 1000],
    dentalCleaning: [500, 1200]
  },
  {
    id: 'mel',
    name: 'Melbourne, AU',
    lat: -37.8136,
    lng: 144.9631,
    costLevel: 'High',
    examFee: [70, 120],
    vaccines: [45, 90],
    spayNeuter: [350, 900],
    dentalCleaning: [450, 1000]
  },

  // Canada
  {
    id: 'tor',
    name: 'Toronto, CA',
    lat: 43.6532,
    lng: -79.3832,
    costLevel: 'High',
    examFee: [75, 130],
    vaccines: [45, 90],
    spayNeuter: [400, 900],
    dentalCleaning: [500, 1100]
  },
  {
    id: 'van',
    name: 'Vancouver, CA',
    lat: 49.2827,
    lng: -123.1207,
    costLevel: 'Very High',
    examFee: [85, 150],
    vaccines: [50, 100],
    spayNeuter: [450, 1000],
    dentalCleaning: [600, 1300]
  }
];
