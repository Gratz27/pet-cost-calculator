import { goldenRetrieverCosts } from './blog-articles/golden-retriever-costs';
import { labradorRetrieverCosts } from './blog-articles/labrador-retriever-costs';
import { germanShepherdCosts } from './blog-articles/german-shepherd-costs';
import { persianCatCosts, maineCoonCosts, budgetFriendlyPetCare, petInsuranceWorthIt } from './blog-articles/remaining-articles';
import { firstYearPuppyCosts, seniorPetCareCosts, emergencyVetCosts, dogVsCatCosts } from './blog-articles/cost-saving-articles';
import { purebredVsMixedCosts, smallVsLargeDogCosts, puppyVsAdultDogCosts, petCostsByLocation } from './blog-articles/comparison-articles';
import { holidayPetCareTravel } from './blog-articles/holiday-pet-care-travel';
import { petsAsHolidayGifts } from './blog-articles/pets-as-holiday-gifts';
import { holidayPetSafetyCosts } from './blog-articles/holiday-pet-safety-costs';
import { bestPetFoodBrandsUK } from './blog-articles/best-pet-food-brands-uk';
import { frenchBulldogCompleteCostGuide } from './blog-articles/french-bulldog-complete-cost-guide';

export type BlogCategory = 'breed-guide' | 'cost-saving' | 'comparison' | 'guide';

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

// All articles now have complete content imported from separate files

export const allBlogArticles: BlogArticle[] = [
  // Newest articles first
  frenchBulldogCompleteCostGuide,
  bestPetFoodBrandsUK,
  // Holiday articles
  holidayPetSafetyCosts,
  petsAsHolidayGifts,
  holidayPetCareTravel,
  // Existing articles
  goldenRetrieverCosts,
  labradorRetrieverCosts,
  germanShepherdCosts,
  persianCatCosts,
  maineCoonCosts,
  budgetFriendlyPetCare,
  petInsuranceWorthIt,
  firstYearPuppyCosts,
  seniorPetCareCosts,
  emergencyVetCosts,
  dogVsCatCosts,
  purebredVsMixedCosts,
  smallVsLargeDogCosts,
  puppyVsAdultDogCosts,
  petCostsByLocation
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

