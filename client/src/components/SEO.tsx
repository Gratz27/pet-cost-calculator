import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  breadcrumbs?: BreadcrumbItem[];
  // Blog article specific props
  isBlogArticle?: boolean;
  articleImage?: string;
  articlePublishDate?: string;
  articleModifiedDate?: string;
  articleAuthor?: string;
  articleTags?: string[];
  // Breed page specific props
  isBreedPage?: boolean;
  breedFAQs?: FAQItem[];
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  keywords, 
  breadcrumbs, 
  isBlogArticle = false,
  articleImage,
  articlePublishDate,
  articleModifiedDate,
  articleAuthor = 'Pet Cost Calculator Team',
  articleTags = [],
  isBreedPage = false,
  breedFAQs = []
}: SEOProps) {
  const fullTitle = `${title} | PetCost-Calculator.com`;
  // Ensure canonical URL is always absolute, www-prefixed, and clean (no query params)
  const BASE = 'https://www.petcost-calculator.com';
  const rawCanonical = canonical || window.location.pathname;
  const canonicalUrl = rawCanonical.startsWith('http')
    ? rawCanonical
        .replace(/^https?:\/\/(www\.)?petcost-calculator\.com/, BASE)
    : `${BASE}${rawCanonical === '/' ? '' : rawCanonical}`;
  
  // Construct full image URL for social sharing
  const fullImageUrl = articleImage 
    ? `https://www.petcost-calculator.com${articleImage}` 
    : 'https://www.petcost-calculator.com/favicon.svg';
  
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  } : null;

  // Blog article schema
  const articleSchema = isBlogArticle && articlePublishDate ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": fullImageUrl,
    "datePublished": articlePublishDate,
    "dateModified": articleModifiedDate || articlePublishDate,
    "author": {
      "@type": "Organization",
      "name": articleAuthor,
      "url": "https://www.petcost-calculator.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PetCost-Calculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.petcost-calculator.com/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": articleTags.join(', ')
  } : null;

  // Breed page FAQPage schema
  const breedFAQSchema = isBreedPage && breedFAQs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": breedFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  // Homepage-specific schemas (SoftwareApplication, Organization, WebSite, FAQPage) are
  // defined statically in index.html to avoid runtime duplication detected by Google.
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {/* keywords meta tag intentionally omitted — not used by Google and flagged as SEO noise */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:image" content={articleImage || 'https://www.petcost-calculator.com/og-image.png'} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={articleImage || 'https://www.petcost-calculator.com/og-image.png'} />
      <meta property="og:type" content={(isBlogArticle || isBreedPage) ? "article" : "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="PetCost-Calculator.com" />
      <meta property="og:locale" content="en_US" />
      
      {/* Blog article specific Open Graph tags */}
      {isBlogArticle && articlePublishDate && (
        <>
          <meta property="article:published_time" content={articlePublishDate} />
          {articleModifiedDate && (
            <meta property="article:modified_time" content={articleModifiedDate} />
          )}
          <meta property="article:author" content={articleAuthor} />
          {articleTags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@petcostcalc" />
      <meta name="twitter:creator" content="@petcostcalc" />
      
      {/* Structured Data Schemas */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {breedFAQSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breedFAQSchema)}
        </script>
      )}

    </Helmet>
  );
}

