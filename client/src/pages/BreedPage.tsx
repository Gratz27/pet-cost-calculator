import { Link } from 'wouter';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Heart, Shield, Clock, ChevronRight, PawPrint } from 'lucide-react';

// Breed data for the 10 most-searched breeds
const breedData: Record<string, {
  name: string;
  slug: string;
  species: 'dog' | 'cat';
  image: string;
  tagline: string;
  description: string;
  firstYearCost: { low: number; high: number };
  annualCost: { low: number; high: number };
  lifetimeCost: { low: number; high: number };
  lifespan: string;
  size: string;
  groomingLevel: string;
  healthRisk: string;
  costBreakdown: { label: string; amount: string }[];
  facts: string[];
  relatedBreeds: { name: string; slug: string }[];
}> = {
  'golden-retriever': {
    name: 'Golden Retriever',
    slug: 'golden-retriever',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80',
    tagline: 'How much does a Golden Retriever cost per year?',
    description: 'Golden Retrievers are one of the most popular dog breeds in the US and UK, loved for their friendly temperament and loyalty. However, their size, grooming needs, and health predispositions make them one of the more expensive breeds to own long-term.',
    firstYearCost: { low: 3800, high: 6500 },
    annualCost: { low: 2200, high: 3800 },
    lifetimeCost: { low: 25000, high: 45000 },
    lifespan: '10–12 years',
    size: 'Large (55–75 lbs)',
    groomingLevel: 'High (professional grooming every 6–8 weeks)',
    healthRisk: 'High (prone to hip dysplasia, cancer, heart disease)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$500–$3,000' },
      { label: 'Initial Vet & Vaccinations', amount: '$300–$600' },
      { label: 'Food (annual)', amount: '$600–$1,000' },
      { label: 'Grooming (annual)', amount: '$400–$800' },
      { label: 'Pet Insurance (annual)', amount: '$600–$1,200' },
      { label: 'Vet Care (annual)', amount: '$500–$1,000' },
      { label: 'Supplies & Toys', amount: '$200–$500' },
      { label: 'Training', amount: '$200–$600' },
    ],
    facts: [
      'Golden Retrievers are the 3rd most popular breed in the US (AKC, 2024)',
      'They are prone to cancer — up to 60% of Goldens develop cancer in their lifetime',
      'Hip dysplasia affects an estimated 20% of Golden Retrievers',
      'Professional grooming every 6–8 weeks is recommended to manage their thick double coat',
      'Average lifespan has declined from 16–17 years in the 1970s to 10–12 years today',
    ],
    relatedBreeds: [
      { name: 'Labrador Retriever', slug: 'labrador-retriever' },
      { name: 'French Bulldog', slug: 'french-bulldog' },
      { name: 'German Shepherd', slug: 'german-shepherd' },
    ],
  },
  'french-bulldog': {
    name: 'French Bulldog',
    slug: 'french-bulldog',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80',
    tagline: 'How much does a French Bulldog cost per year?',
    description: 'French Bulldogs are the most popular breed in the UK and consistently top the charts in the US. Their compact size and charming personality make them ideal city dogs, but their brachycephalic (flat-faced) anatomy means significant ongoing vet costs.',
    firstYearCost: { low: 5000, high: 9000 },
    annualCost: { low: 2500, high: 5000 },
    lifetimeCost: { low: 25000, high: 55000 },
    lifespan: '10–12 years',
    size: 'Small (20–28 lbs)',
    groomingLevel: 'Low (occasional brushing, regular wrinkle cleaning)',
    healthRisk: 'Very High (BOAS, spinal issues, allergies, eye problems)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$2,000–$5,000' },
      { label: 'Initial Vet & Vaccinations', amount: '$400–$800' },
      { label: 'Food (annual)', amount: '$400–$700' },
      { label: 'Grooming (annual)', amount: '$150–$300' },
      { label: 'Pet Insurance (annual)', amount: '$1,000–$2,500' },
      { label: 'Vet Care (annual)', amount: '$800–$2,000' },
      { label: 'Supplies & Toys', amount: '$200–$400' },
      { label: 'BOAS Surgery (if needed)', amount: '$1,500–$5,000' },
    ],
    facts: [
      'French Bulldogs are the #1 most registered breed in the UK (Kennel Club, 2023)',
      'Up to 70% of French Bulldogs suffer from Brachycephalic Obstructive Airway Syndrome (BOAS)',
      'BOAS corrective surgery can cost $1,500–$5,000',
      'French Bulldogs cannot reproduce naturally — most litters require C-sections costing $1,500–$3,000',
      'Pet insurance premiums are among the highest of any breed due to their health risks',
    ],
    relatedBreeds: [
      { name: 'English Bulldog', slug: 'english-bulldog' },
      { name: 'Pug', slug: 'pug' },
      { name: 'Golden Retriever', slug: 'golden-retriever' },
    ],
  },
  'labrador-retriever': {
    name: 'Labrador Retriever',
    slug: 'labrador-retriever',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
    tagline: 'How much does a Labrador Retriever cost per year?',
    description: 'The Labrador Retriever has been the most popular dog breed in the US for over 30 consecutive years. Friendly, trainable, and versatile, Labs make excellent family dogs — but their large size and appetite mean food and vet bills add up quickly.',
    firstYearCost: { low: 3200, high: 5500 },
    annualCost: { low: 1800, high: 3200 },
    lifetimeCost: { low: 20000, high: 38000 },
    lifespan: '10–12 years',
    size: 'Large (55–80 lbs)',
    groomingLevel: 'Moderate (weekly brushing, seasonal heavy shedding)',
    healthRisk: 'Moderate (hip/elbow dysplasia, obesity, exercise-induced collapse)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$800–$2,000' },
      { label: 'Initial Vet & Vaccinations', amount: '$300–$600' },
      { label: 'Food (annual)', amount: '$700–$1,200' },
      { label: 'Grooming (annual)', amount: '$200–$400' },
      { label: 'Pet Insurance (annual)', amount: '$500–$1,000' },
      { label: 'Vet Care (annual)', amount: '$400–$900' },
      { label: 'Supplies & Toys', amount: '$200–$500' },
      { label: 'Training', amount: '$200–$600' },
    ],
    facts: [
      'Labradors held the #1 spot in AKC breed rankings for 31 consecutive years (1991–2022)',
      'Labs are highly prone to obesity — over 50% are overweight, increasing joint and health costs',
      'Hip dysplasia affects approximately 12% of Labradors',
      'Labs have a strong food drive and are known to eat non-food items, leading to emergency vet visits',
      'Working/field Labs and show Labs can have significantly different health profiles and costs',
    ],
    relatedBreeds: [
      { name: 'Golden Retriever', slug: 'golden-retriever' },
      { name: 'German Shepherd', slug: 'german-shepherd' },
      { name: 'Beagle', slug: 'beagle' },
    ],
  },
  'german-shepherd': {
    name: 'German Shepherd',
    slug: 'german-shepherd',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=1200&q=80',
    tagline: 'How much does a German Shepherd cost per year?',
    description: 'German Shepherds are intelligent, loyal, and versatile working dogs. They are widely used in police, military, and service roles. As a large, active breed with known orthopedic health issues, they require significant investment in food, training, and veterinary care.',
    firstYearCost: { low: 3500, high: 6000 },
    annualCost: { low: 2000, high: 3500 },
    lifetimeCost: { low: 22000, high: 40000 },
    lifespan: '9–13 years',
    size: 'Large (50–90 lbs)',
    groomingLevel: 'High (double coat, heavy seasonal shedding)',
    healthRisk: 'High (hip/elbow dysplasia, degenerative myelopathy, bloat)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$800–$2,500' },
      { label: 'Initial Vet & Vaccinations', amount: '$300–$600' },
      { label: 'Food (annual)', amount: '$700–$1,200' },
      { label: 'Grooming (annual)', amount: '$300–$600' },
      { label: 'Pet Insurance (annual)', amount: '$600–$1,200' },
      { label: 'Vet Care (annual)', amount: '$500–$1,000' },
      { label: 'Training (annual)', amount: '$400–$1,000' },
      { label: 'Supplies', amount: '$200–$500' },
    ],
    facts: [
      'German Shepherds are the 4th most popular breed in the US (AKC, 2024)',
      'Hip dysplasia affects up to 19% of German Shepherds',
      'Degenerative Myelopathy (DM) is a progressive spinal disease common in the breed',
      'GSDs are one of the most trainable breeds but require consistent mental stimulation',
      'Bloat (GDV) is a life-threatening emergency that can cost $3,000–$7,000 to treat',
    ],
    relatedBreeds: [
      { name: 'Labrador Retriever', slug: 'labrador-retriever' },
      { name: 'Golden Retriever', slug: 'golden-retriever' },
      { name: 'Husky', slug: 'siberian-husky' },
    ],
  },
  'english-bulldog': {
    name: 'English Bulldog',
    slug: 'english-bulldog',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200&q=80',
    tagline: 'How much does an English Bulldog cost per year?',
    description: 'English Bulldogs (also called British Bulldogs) are beloved for their wrinkled faces and gentle nature. However, they are one of the most expensive breeds to own due to serious health issues related to their flat faces, compact bodies, and skin folds.',
    firstYearCost: { low: 5000, high: 10000 },
    annualCost: { low: 3000, high: 6000 },
    lifetimeCost: { low: 30000, high: 65000 },
    lifespan: '8–10 years',
    size: 'Medium (40–55 lbs)',
    groomingLevel: 'Moderate (regular wrinkle/skin fold cleaning required)',
    healthRisk: 'Very High (BOAS, hip dysplasia, skin infections, heart disease)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$2,000–$5,000' },
      { label: 'Initial Vet & Vaccinations', amount: '$400–$800' },
      { label: 'Food (annual)', amount: '$500–$900' },
      { label: 'Grooming & Skin Care (annual)', amount: '$300–$600' },
      { label: 'Pet Insurance (annual)', amount: '$1,200–$3,000' },
      { label: 'Vet Care (annual)', amount: '$1,000–$2,500' },
      { label: 'BOAS Surgery (if needed)', amount: '$2,000–$6,000' },
    ],
    facts: [
      'English Bulldogs have one of the shortest average lifespans of any breed at 7–10 years',
      'Nearly all English Bulldogs require C-sections to give birth due to puppy head size',
      'Skin fold dermatitis is extremely common and requires regular cleaning and vet visits',
      'BOAS surgery is recommended for a large proportion of the breed',
      'English Bulldogs are among the top 5 most expensive breeds to insure in the UK',
    ],
    relatedBreeds: [
      { name: 'French Bulldog', slug: 'french-bulldog' },
      { name: 'Pug', slug: 'pug' },
      { name: 'Beagle', slug: 'beagle' },
    ],
  },
  'poodle': {
    name: 'Poodle',
    slug: 'poodle',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1575859431774-2e57ed632664?w=1200&q=80',
    tagline: 'How much does a Poodle cost per year?',
    description: 'Poodles (Standard, Miniature, and Toy) are highly intelligent, hypoallergenic dogs that are popular with allergy sufferers. Their curly coats require regular professional grooming, making them one of the higher-maintenance breeds in terms of ongoing grooming costs.',
    firstYearCost: { low: 3000, high: 6000 },
    annualCost: { low: 2000, high: 4000 },
    lifetimeCost: { low: 24000, high: 55000 },
    lifespan: '12–15 years (Standard); 14–17 years (Miniature/Toy)',
    size: 'Varies: Toy (4–6 lbs), Miniature (10–15 lbs), Standard (40–70 lbs)',
    groomingLevel: 'Very High (professional grooming every 4–6 weeks)',
    healthRisk: 'Moderate (Addison\'s disease, bloat in Standards, eye conditions)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$1,000–$3,000' },
      { label: 'Initial Vet & Vaccinations', amount: '$300–$600' },
      { label: 'Food (annual)', amount: '$300–$900' },
      { label: 'Grooming (annual)', amount: '$600–$1,500' },
      { label: 'Pet Insurance (annual)', amount: '$400–$900' },
      { label: 'Vet Care (annual)', amount: '$400–$800' },
      { label: 'Supplies & Toys', amount: '$200–$500' },
    ],
    facts: [
      'Poodles are consistently ranked in the top 5 most intelligent dog breeds',
      'Their curly, non-shedding coats require professional grooming every 4–6 weeks',
      'Standard Poodles are prone to bloat (GDV), a potentially fatal condition',
      'Poodles are the foundation breed for many popular "doodle" crossbreeds',
      'Their long lifespan means lifetime costs can be higher than shorter-lived large breeds',
    ],
    relatedBreeds: [
      { name: 'Golden Retriever', slug: 'golden-retriever' },
      { name: 'Labrador Retriever', slug: 'labrador-retriever' },
      { name: 'German Shepherd', slug: 'german-shepherd' },
    ],
  },
  'beagle': {
    name: 'Beagle',
    slug: 'beagle',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=1200&q=80',
    tagline: 'How much does a Beagle cost per year?',
    description: 'Beagles are cheerful, curious, and compact dogs that make excellent family pets. They are one of the more affordable medium-sized breeds to own, though their strong scent drive and tendency to roam means secure fencing and training are essential investments.',
    firstYearCost: { low: 2000, high: 4000 },
    annualCost: { low: 1200, high: 2500 },
    lifetimeCost: { low: 15000, high: 32000 },
    lifespan: '12–15 years',
    size: 'Small-Medium (20–30 lbs)',
    groomingLevel: 'Low (weekly brushing, occasional bathing)',
    healthRisk: 'Moderate (epilepsy, hip dysplasia, hypothyroidism, obesity)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$400–$1,200' },
      { label: 'Initial Vet & Vaccinations', amount: '$300–$500' },
      { label: 'Food (annual)', amount: '$400–$700' },
      { label: 'Grooming (annual)', amount: '$100–$250' },
      { label: 'Pet Insurance (annual)', amount: '$350–$700' },
      { label: 'Vet Care (annual)', amount: '$300–$700' },
      { label: 'Training (essential)', amount: '$200–$500' },
    ],
    facts: [
      'Beagles are scent hounds with one of the most powerful noses of any breed',
      'They are notorious escape artists — secure fencing is a non-negotiable expense',
      'Beagles are prone to obesity, which can lead to costly joint and metabolic conditions',
      'Epilepsy affects a notable proportion of the breed, requiring ongoing medication',
      'Their long lifespan of 12–15 years means total lifetime costs can be substantial',
    ],
    relatedBreeds: [
      { name: 'Labrador Retriever', slug: 'labrador-retriever' },
      { name: 'Golden Retriever', slug: 'golden-retriever' },
      { name: 'English Bulldog', slug: 'english-bulldog' },
    ],
  },
  'siberian-husky': {
    name: 'Siberian Husky',
    slug: 'siberian-husky',
    species: 'dog',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=1200&q=80',
    tagline: 'How much does a Siberian Husky cost per year?',
    description: 'Siberian Huskies are striking, energetic working dogs originally bred for sled pulling in Arctic conditions. They require extensive exercise, mental stimulation, and are prolific shedders. Their high energy and independence make them a significant time and financial commitment.',
    firstYearCost: { low: 2500, high: 5000 },
    annualCost: { low: 1500, high: 3000 },
    lifetimeCost: { low: 18000, high: 37000 },
    lifespan: '12–14 years',
    size: 'Medium (35–60 lbs)',
    groomingLevel: 'High (heavy seasonal shedding, regular brushing)',
    healthRisk: 'Moderate (eye conditions, hip dysplasia, hypothyroidism)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$600–$1,500' },
      { label: 'Initial Vet & Vaccinations', amount: '$300–$600' },
      { label: 'Food (annual)', amount: '$500–$900' },
      { label: 'Grooming (annual)', amount: '$300–$600' },
      { label: 'Pet Insurance (annual)', amount: '$400–$900' },
      { label: 'Vet Care (annual)', amount: '$400–$800' },
      { label: 'Exercise/Activities', amount: '$200–$600' },
    ],
    facts: [
      'Huskies require at least 2 hours of vigorous exercise per day',
      'They are escape artists — 6-foot fences and secure yards are essential',
      'Huskies "blow" their coat twice a year, requiring intensive grooming sessions',
      'Progressive Retinal Atrophy (PRA) and cataracts are common eye conditions in the breed',
      'Huskies are known for howling and can be challenging for apartment dwellers',
    ],
    relatedBreeds: [
      { name: 'German Shepherd', slug: 'german-shepherd' },
      { name: 'Labrador Retriever', slug: 'labrador-retriever' },
      { name: 'Golden Retriever', slug: 'golden-retriever' },
    ],
  },
  'ragdoll-cat': {
    name: 'Ragdoll Cat',
    slug: 'ragdoll-cat',
    species: 'cat',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80',
    tagline: 'How much does a Ragdoll cat cost per year?',
    description: 'Ragdolls are large, gentle cats known for their docile temperament and tendency to go limp when held (hence the name). They are one of the most popular pedigree cat breeds in the UK and US, but their long coats and genetic health predispositions mean higher-than-average ownership costs.',
    firstYearCost: { low: 2000, high: 4500 },
    annualCost: { low: 900, high: 2000 },
    lifetimeCost: { low: 12000, high: 30000 },
    lifespan: '12–15 years',
    size: 'Large (10–20 lbs)',
    groomingLevel: 'Moderate (semi-long coat, weekly brushing)',
    healthRisk: 'Moderate (HCM heart disease, bladder stones, polycystic kidney disease)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$800–$2,500' },
      { label: 'Initial Vet & Vaccinations', amount: '$200–$400' },
      { label: 'Food (annual)', amount: '$400–$800' },
      { label: 'Grooming (annual)', amount: '$100–$300' },
      { label: 'Pet Insurance (annual)', amount: '$300–$700' },
      { label: 'Vet Care (annual)', amount: '$300–$700' },
      { label: 'Litter & Supplies (annual)', amount: '$200–$400' },
    ],
    facts: [
      'Ragdolls are one of the largest domestic cat breeds, often weighing 15–20 lbs',
      'Hypertrophic Cardiomyopathy (HCM) is a serious genetic heart condition common in Ragdolls',
      'They are known as "puppy cats" for their dog-like tendency to follow owners around',
      'Ragdolls are indoor-only cats and should not be allowed to roam outdoors unsupervised',
      'Their calm temperament makes them one of the best breeds for families with children',
    ],
    relatedBreeds: [
      { name: 'Maine Coon', slug: 'maine-coon' },
      { name: 'British Shorthair', slug: 'british-shorthair' },
    ],
  },
  'maine-coon': {
    name: 'Maine Coon',
    slug: 'maine-coon',
    species: 'cat',
    image: 'https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=1200&q=80',
    tagline: 'How much does a Maine Coon cat cost per year?',
    description: 'Maine Coons are the largest domestic cat breed and are known for their tufted ears, bushy tails, and playful personalities. They are often called "dogs of the cat world" due to their sociable nature. Their large size means higher food costs, and they carry genetic risks for serious heart conditions.',
    firstYearCost: { low: 2500, high: 5000 },
    annualCost: { low: 1000, high: 2200 },
    lifetimeCost: { low: 13000, high: 32000 },
    lifespan: '12–15 years',
    size: 'Very Large (10–25 lbs)',
    groomingLevel: 'High (long, thick coat requires regular brushing)',
    healthRisk: 'Moderate-High (HCM, hip dysplasia, spinal muscular atrophy)',
    costBreakdown: [
      { label: 'Purchase / Adoption Fee', amount: '$1,000–$3,000' },
      { label: 'Initial Vet & Vaccinations', amount: '$200–$400' },
      { label: 'Food (annual)', amount: '$500–$1,000' },
      { label: 'Grooming (annual)', amount: '$150–$400' },
      { label: 'Pet Insurance (annual)', amount: '$350–$800' },
      { label: 'Vet Care (annual)', amount: '$300–$700' },
      { label: 'Litter & Supplies (annual)', amount: '$200–$400' },
    ],
    facts: [
      'Maine Coons are the largest domestic cat breed, with some males exceeding 25 lbs',
      'They are one of the few cat breeds that enjoy water',
      'HCM (heart disease) is the leading cause of death in Maine Coons',
      'Maine Coons develop slowly and are not fully grown until 3–5 years of age',
      'They are highly sociable and do not do well when left alone for long periods',
    ],
    relatedBreeds: [
      { name: 'Ragdoll Cat', slug: 'ragdoll-cat' },
      { name: 'British Shorthair', slug: 'british-shorthair' },
    ],
  },
};

interface BreedPageProps {
  params: { slug: string };
}

export default function BreedPage({ params }: BreedPageProps) {
  const breed = breedData[params.slug];

  if (!breed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Breed not found</h1>
        <Link href="/">
          <Button>Back to Calculator</Button>
        </Link>
      </div>
    );
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${breed.name} Cost Guide – Lifetime Ownership Costs`}
        description={`How much does a ${breed.name} cost? First-year: ${formatCurrency(breed.firstYearCost.low)}–${formatCurrency(breed.firstYearCost.high)}. Annual: ${formatCurrency(breed.annualCost.low)}–${formatCurrency(breed.annualCost.high)}. Lifetime: ${formatCurrency(breed.lifetimeCost.low)}–${formatCurrency(breed.lifetimeCost.high)}. Free personalised estimate.`}
        canonical={`https://www.petcost-calculator.com/breeds/${breed.slug}`}
        isBreedPage={true}
        breedFAQs={[
          {
            question: `How much does a ${breed.name} cost per year?`,
            answer: `A ${breed.name} typically costs ${formatCurrency(breed.annualCost.low)}–${formatCurrency(breed.annualCost.high)} per year in ongoing expenses, covering food, vet care, grooming, and insurance. First-year costs are higher at ${formatCurrency(breed.firstYearCost.low)}–${formatCurrency(breed.firstYearCost.high)} due to initial setup and vaccinations.`
          },
          {
            question: `What is the lifetime cost of a ${breed.name}?`,
            answer: `The total lifetime cost of owning a ${breed.name} is estimated at ${formatCurrency(breed.lifetimeCost.low)}–${formatCurrency(breed.lifetimeCost.high)} over a lifespan of ${breed.lifespan}. This includes all food, vet care, grooming, insurance, and supplies over the pet's life.`
          },
          {
            question: `Is a ${breed.name} expensive to own?`,
            answer: `${breed.name}s are considered a ${breed.healthRisk.startsWith('Very High') ? 'very high-cost' : breed.healthRisk.startsWith('High') ? 'higher-cost' : 'moderate-cost'} breed to own. Key ongoing expenses include food, vet care, grooming, and pet insurance. Health risks rated: ${breed.healthRisk}.`
          },
          {
            question: `How much does a ${breed.name} puppy cost?`,
            answer: `A ${breed.name} from a reputable breeder typically costs ${breed.costBreakdown[0].amount}. Rescue and adoption fees are usually significantly lower. First-year total costs including setup, vaccinations, and supplies typically reach ${formatCurrency(breed.firstYearCost.low)}–${formatCurrency(breed.firstYearCost.high)}.`
          }
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.petcost-calculator.com' },
          { name: 'Breeds', url: 'https://www.petcost-calculator.com/breeds' },
          { name: breed.name, url: `https://www.petcost-calculator.com/breeds/${breed.slug}` },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={breed.image}
          alt={`${breed.name} cost guide`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container">
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/breeds" className="hover:text-white">Breeds</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{breed.name}</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{breed.name} Cost Guide</h1>
            <p className="text-white/80 text-lg">{breed.tagline}</p>
          </div>
        </div>
      </section>

      {/* Cost Summary Cards */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-1">First Year Cost</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(breed.firstYearCost.low)} – {formatCurrency(breed.firstYearCost.high)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">includes purchase & setup</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-amber-500/20">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-1">Annual Ongoing Cost</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(breed.annualCost.low)} – {formatCurrency(breed.annualCost.high)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">per year after year one</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-green-500/20">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <div className="text-sm text-muted-foreground mb-1">Lifetime Cost</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatCurrency(breed.lifetimeCost.low)} – {formatCurrency(breed.lifetimeCost.high)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">over {breed.lifespan}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold mb-4">About the {breed.name}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{breed.description}</p>
              </div>

              {/* Cost Breakdown Table */}
              <div>
                <h2 className="text-2xl font-bold mb-4">{breed.name} Cost Breakdown</h2>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Cost Category</th>
                        <th className="text-right p-4 font-semibold">Estimated Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breed.costBreakdown.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                          <td className="p-4 text-sm">{item.label}</td>
                          <td className="p-4 text-sm text-right font-medium">{item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  * All figures are estimates based on US national averages. Costs vary by location, lifestyle, and individual animal health.
                </p>
              </div>

              {/* Key Facts */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Key Facts About {breed.name} Costs</h2>
                <ul className="space-y-3">
                  {breed.facts.map((fact, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <PawPrint className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lifespan</span>
                      <span className="font-medium">{breed.lifespan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <span className="font-medium text-right max-w-[60%]">{breed.size}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground flex-shrink-0">Grooming</span>
                      <span className="font-medium text-right text-xs">{breed.groomingLevel}</span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-muted-foreground flex-shrink-0">Health Risk</span>
                      <span className="font-medium text-right text-xs">{breed.healthRisk}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3 opacity-90" />
                  <h3 className="font-bold text-lg mb-2">Get Your Personalised Estimate</h3>
                  <p className="text-sm opacity-80 mb-4">
                    Use our free calculator to get a cost estimate tailored to your location and lifestyle.
                  </p>
                  <Link href="/">
                    <Button variant="secondary" className="w-full font-semibold">
                      Calculate My Costs
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Related Breeds */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Compare Similar Breeds</h3>
                  <div className="space-y-2">
                    {breed.relatedBreeds.map((related) => (
                      <Link key={related.slug} href={`/breeds/${related.slug}`}>
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <span className="text-sm font-medium">{related.name}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto bg-muted/20">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PetCost-Calculator.com · <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link> · <Link href="/terms" className="hover:underline">Terms</Link> · <Link href="/contact" className="hover:underline">Contact</Link></p>
          <p className="mt-2 text-xs max-w-2xl mx-auto">All cost estimates are based on national averages and are provided for informational purposes only. Actual costs will vary based on your location, the individual animal, and your lifestyle choices.</p>
        </div>
      </footer>
    </div>
  );
}
