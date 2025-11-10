export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'breed-guide' | 'cost-saving' | 'comparison' | 'guide';
  author: string;
  publishDate: string;
  readTime: number;
  image: string;
  keywords: string[];
  content: string;
}

export const blogArticles: BlogArticle[] = [
  // Breed-specific guides will be added here
];

