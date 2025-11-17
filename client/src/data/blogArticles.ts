import { goldenRetrieverCosts } from './blog-articles/golden-retriever-costs';
import { labradorRetrieverCosts } from './blog-articles/labrador-retriever-costs';
import { germanShepherdCosts } from './blog-articles/german-shepherd-costs';
import { persianCatCosts, maineCoonCosts, budgetFriendlyPetCare, petInsuranceWorthIt } from './blog-articles/remaining-articles';

export type BlogCategory = 'breed-guide' | 'cost-saving' | 'comparison';

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  author: string;
  publishDate: string;
  readTime: number;
  image: string;
  keywords: string[];
  content: string;
}

// Complete article collection with metadata for remaining 8 articles
const additionalArticles: BlogArticle[] = [
  {
    id: '8',
    slug: 'first-year-puppy-costs',
    title: 'First Year Puppy Costs: Complete Budget Breakdown',
    description: 'Detailed breakdown of first-year puppy expenses including supplies, vet care, training, and hidden costs. Plan your budget with expert guidance.',
    category: 'cost-saving',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-11-01',
    readTime: 9,
    image: '/blog-images/first-year-puppy.jpg',
    keywords: ['first year puppy costs', 'puppy expenses', 'cost of raising a puppy', 'puppy budget'],
    content: '<p>First year puppy costs average $3,000-$6,000 including purchase, supplies, vet care, training, and food. This comprehensive guide breaks down every expense...</p>'
  },
  {
    id: '9',
    slug: 'senior-pet-care-costs',
    title: 'Senior Pet Care Costs: What to Expect and How to Prepare',
    description: 'Complete guide to senior pet expenses including increased vet visits, medications, and end-of-life care. Budget effectively for your aging pet.',
    category: 'cost-saving',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-10-31',
    readTime: 8,
    image: '/blog-images/senior-pet-care.jpg',
    keywords: ['senior pet costs', 'elderly pet care', 'aging pet expenses', 'senior dog costs'],
    content: '<p>Senior pet care costs increase 50-100% compared to adult years due to more frequent vet visits, medications, and age-related conditions...</p>'
  },
  {
    id: '10',
    slug: 'emergency-vet-costs',
    title: 'Emergency Vet Costs: Common Scenarios and How to Prepare',
    description: 'Learn about common emergency vet costs from $500-$5,000+ and how to prepare financially. Includes real examples and money-saving strategies.',
    category: 'cost-saving',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-10-30',
    readTime: 7,
    image: '/blog-images/emergency-vet.jpg',
    keywords: ['emergency vet costs', 'emergency pet care', 'vet emergency prices', 'pet emergency fund'],
    content: '<p>Emergency vet visits cost $1,000-$5,000 on average, with critical care reaching $10,000+. Common emergencies include foreign object ingestion, bloat, and trauma...</p>'
  },
  {
    id: '11',
    slug: 'dog-vs-cat-costs',
    title: 'Dog vs Cat Costs: Which Pet is More Affordable?',
    description: 'Comprehensive cost comparison between dog and cat ownership including purchase, food, vet care, and lifetime expenses. Make an informed decision.',
    category: 'comparison',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-10-29',
    readTime: 9,
    image: '/blog-images/dog-vs-cat.jpg',
    keywords: ['dog vs cat cost', 'cat vs dog expenses', 'which pet costs more', 'dog cat cost comparison'],
    content: '<p>Dogs cost $1,500-$4,000 annually vs cats at $800-$2,000 annually. Lifetime costs: dogs $20,000-$60,000, cats $12,000-$35,000 over 12-15 years...</p>'
  },
  {
    id: '12',
    slug: 'purebred-vs-mixed-breed-costs',
    title: 'Purebred vs Mixed Breed: Cost and Health Comparison',
    description: 'Compare costs and health outcomes between purebred and mixed breed pets. Learn which option provides better value for your situation.',
    category: 'comparison',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-10-28',
    readTime: 8,
    image: '/blog-images/purebred-vs-mixed.jpg',
    keywords: ['purebred vs mixed breed cost', 'purebred vs mutt', 'mixed breed health', 'purebred dog costs'],
    content: '<p>Purebreds cost $1,000-$3,000 vs mixed breeds at $50-$500. However, purebreds often have higher lifetime vet costs due to genetic health issues...</p>'
  },
  {
    id: '13',
    slug: 'small-vs-large-dog-costs',
    title: 'Small vs Large Dog Costs: Complete Financial Comparison',
    description: 'Detailed cost comparison between small and large dogs including food, vet care, grooming, and supplies. Find the right size for your budget.',
    category: 'comparison',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-10-27',
    readTime: 8,
    image: '/blog-images/small-vs-large-dog.jpg',
    keywords: ['small vs large dog cost', 'big dog expenses', 'small dog costs', 'dog size cost comparison'],
    content: '<p>Large dogs cost $2,000-$4,500 annually vs small dogs at $1,200-$2,500. Food, medications, and boarding all cost significantly more for larger breeds...</p>'
  },
  {
    id: '14',
    slug: 'puppy-vs-adult-dog-costs',
    title: 'Puppy vs Adult Dog: Which Costs Less Long-Term?',
    description: 'Compare costs and benefits of adopting puppies vs adult dogs. Learn about first-year expenses, training, and lifetime value.',
    category: 'comparison',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-10-26',
    readTime: 7,
    image: '/blog-images/puppy-vs-adult.jpg',
    keywords: ['puppy vs adult dog cost', 'adopt puppy or adult dog', 'puppy vs older dog', 'adult dog adoption'],
    content: '<p>Puppies cost $3,000-$6,000 in year one vs adult dogs at $1,500-$3,000. However, puppies offer more years of companionship and easier training...</p>'
  },
  {
    id: '15',
    slug: 'pet-ownership-by-location',
    title: 'Pet Ownership Costs by Location: Regional Price Comparison',
    description: 'Compare pet ownership costs across different US regions and cities. Learn how location impacts vet care, grooming, and boarding prices.',
    category: 'comparison',
    author: 'Pet Cost Calculator Team',
    publishDate: '2025-10-25',
    readTime: 9,
    image: '/blog-images/location-costs.jpg',
    keywords: ['pet costs by location', 'pet ownership by state', 'regional pet costs', 'vet costs by city'],
    content: '<p>Pet ownership costs vary 30-50% by location. Urban areas like NYC and SF cost 40-60% more than rural Midwest for vet care, grooming, and boarding...</p>'
  }
];

export const allBlogArticles: BlogArticle[] = [
  goldenRetrieverCosts,
  labradorRetrieverCosts,
  germanShepherdCosts,
  persianCatCosts,
  maineCoonCosts,
  budgetFriendlyPetCare,
  petInsuranceWorthIt,
  ...additionalArticles
];

export const getBlogArticleBySlug = (slug: string): BlogArticle | undefined => {
  return allBlogArticles.find(article => article.slug === slug);
};

export const getBlogArticlesByCategory = (category: BlogCategory): BlogArticle[] => {
  return allBlogArticles.filter(article => article.category === category);
};

export const getRelatedArticles = (currentSlug: string, limit: number = 3): BlogArticle[] => {
  const currentArticle = getBlogArticleBySlug(currentSlug);
  if (!currentArticle) return [];
  
  // Get articles from same category, excluding current
  const related = allBlogArticles
    .filter(article => 
      article.category === currentArticle.category && 
      article.slug !== currentSlug
    )
    .slice(0, limit);
  
  // If not enough, add from other categories
  if (related.length < limit) {
    const remaining = allBlogArticles
      .filter(article => 
        article.category !== currentArticle.category && 
        article.slug !== currentSlug
      )
      .slice(0, limit - related.length);
    related.push(...remaining);
  }
  
  return related;
};

