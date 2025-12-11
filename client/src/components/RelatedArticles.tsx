import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { BlogArticle } from '@/data/blogArticles';

interface RelatedArticlesProps {
  currentArticleId: string;
  allArticles: BlogArticle[];
  maxArticles?: number;
}

/**
 * RelatedArticles Component
 * 
 * Displays related blog articles at the bottom of each blog post
 * to improve internal linking and user engagement.
 * 
 * Selection strategy:
 * 1. Prioritize articles with shared keywords in title
 * 2. Fall back to recent articles if no matches
 * 3. Exclude current article
 */
export default function RelatedArticles({ 
  currentArticleId, 
  allArticles, 
  maxArticles = 3 
}: RelatedArticlesProps) {
  const currentArticle = allArticles.find(a => a.id === currentArticleId);
  
  if (!currentArticle) return null;

  // Extract keywords from current article title
  const titleWords = currentArticle.title
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 4); // Filter out short words like "the", "and"

  // Score articles based on keyword matches
  const scoredArticles = allArticles
    .filter(article => article.id !== currentArticleId)
    .map(article => {
      const articleTitleLower = article.title.toLowerCase();
      const matchScore = titleWords.filter(word => 
        articleTitleLower.includes(word)
      ).length;
      
      return { article, score: matchScore };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxArticles)
    .map(item => item.article);

  if (scoredArticles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {scoredArticles.map(article => (
          <Link key={article.id} href={`/blog/${article.slug}`}>
            <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {article.description}
              </p>
              <div className="flex items-center text-sm text-primary font-medium">
                Read more
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
