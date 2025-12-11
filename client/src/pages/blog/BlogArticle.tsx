import { useRoute, Link } from 'wouter';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { marked } from 'marked';
import { useMemo } from 'react';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import AdSense from '@/components/AdSense';
import { Button } from '@/components/ui/button';
import { allBlogArticles } from '@/data/blogArticles';

export default function BlogArticle() {
  const [, params] = useRoute('/blog/:slug');
  const article = allBlogArticles.find(a => a.slug === params?.slug);

  if (!article) {
    return (
      <>
        <Header />
        <div className="container max-w-4xl py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        canonical={`https://petcost-calculator.com/blog/${article.slug}`}
        keywords={article.keywords.join(', ')}
        breadcrumbs={[
          { name: 'Home', url: 'https://petcost-calculator.com' },
          { name: 'Blog', url: 'https://petcost-calculator.com/blog' },
          { name: article.title, url: `https://petcost-calculator.com/blog/${article.slug}` }
        ]}
        isBlogArticle={true}
        articleImage={article.image}
        articlePublishDate={article.publishDate}
        articleAuthor={article.author}
        articleTags={article.keywords}
      />
      <Header />
      
      <article className="container max-w-4xl py-8">
        {/* Back button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        {/* Article header */}
        <header className="mb-8">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {article.title}
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <p className="text-xl text-muted-foreground mb-6">
            {article.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime} min read
            </div>
          </div>
        </header>

        {/* Article content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: useMemo(() => marked(article.content), [article.content]) }}
        />

        {/* Call to action */}
        <div className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Calculate Your Pet Costs?
          </h2>
          <p className="text-muted-foreground mb-6">
            Get a personalized cost estimate for your future pet in less than 2 minutes.
          </p>
          <Button size="lg" asChild>
            <Link href="/">Start Free Calculation</Link>
          </Button>
        </div>


      </article>
    </>
  );
}

