import { Link } from "wouter";
import { allBlogArticles, type BlogCategory } from "@/data/blogArticles";
import SEO from "@/components/SEO";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, PawPrint } from "lucide-react";

const categoryLabels: Record<BlogCategory, string> = {
  'breed-guide': 'Breed Guides',
  'cost-saving': 'Cost-Saving Tips',
  'comparison': 'Comparisons'
};

const categoryColors: Record<BlogCategory, string> = {
  'breed-guide': 'bg-blue-100 text-blue-800',
  'cost-saving': 'bg-green-100 text-green-800',
  'comparison': 'bg-purple-100 text-purple-800'
};

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  
  const filteredArticles = selectedCategory === 'all' 
    ? allBlogArticles 
    : allBlogArticles.filter(article => article.category === selectedCategory);

  return (
    <>
      <SEO
        title="Pet Cost Calculator Blog - Expert Guides & Money-Saving Tips"
        description="Expert guides on pet ownership costs, breed-specific expenses, money-saving tips, and cost comparisons. Make informed decisions about pet care budgeting."
        canonical="/blog"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Navigation Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <PawPrint className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-foreground">PetCost-Calculator.com</span>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-sm font-medium text-foreground">
                  Blog
                </Link>
                <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
                <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pet Cost Calculator Blog</h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl">
              Expert guides, money-saving tips, and comprehensive cost breakdowns to help you make informed decisions about pet ownership.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="container py-8">
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
            >
              All Articles ({allBlogArticles.length})
            </Button>
            {(Object.keys(categoryLabels) as BlogCategory[]).map(category => {
              const count = allBlogArticles.filter(a => a.category === category).length;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {categoryLabels[category]} ({count})
                </Button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="container pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <Link key={article.id} href={`/blog/${article.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={categoryColors[article.category]}>
                        {categoryLabels[article.category]}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime} min
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(article.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

