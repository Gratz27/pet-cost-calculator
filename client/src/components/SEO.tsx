import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  breadcrumbs?: BreadcrumbItem[];
  isHomepage?: boolean;
  // Blog article specific props
  isBlogArticle?: boolean;
  articleImage?: string;
  articlePublishDate?: string;
  articleModifiedDate?: string;
  articleAuthor?: string;
  articleTags?: string[];
  // FAQ schema for homepage
  faqSchema?: any;
}

export default function SEO({ 
  title, 
  description, 
  canonical, 
  keywords, 
  breadcrumbs, 
  isHomepage = false,
  isBlogArticle = false,
  articleImage,
  articlePublishDate,
  articleModifiedDate,
  articleAuthor = 'Pet Cost Calculator Team',
  articleTags = [],
  faqSchema
}: SEOProps) {
  const fullTitle = `${title} | PetCost-Calculator.com`;
  const canonicalUrl = canonical || `https://petcost-calculator.com${window.location.pathname}`;
  
  // Construct full image URL for social sharing
  const fullImageUrl = articleImage 
    ? `https://petcost-calculator.com${articleImage}` 
    : 'https://petcost-calculator.com/favicon.svg';
  
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
      "url": "https://petcost-calculator.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PetCost-Calculator.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://petcost-calculator.com/favicon.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": articleTags.join(', ')
  } : null;

  // Homepage-specific schemas
  const organizationSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PetCost-Calculator.com",
    "url": "https://petcost-calculator.com",
    "logo": "https://petcost-calculator.com/logo.png",
    "description": "Free pet cost calculator helping prospective pet owners understand the true lifetime costs of pet ownership.",
    "sameAs": [
      "https://twitter.com/petcostcalc",
      "https://facebook.com/petcostcalculator"
    ]
  } : null;

  const websiteSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PetCost-Calculator.com",
    "url": "https://petcost-calculator.com",
    "description": "Calculate the true lifetime cost of pet ownership with breed-specific data.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://petcost-calculator.com/?breed={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  } : null;

  const softwareAppSchema = isHomepage ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pet Cost Calculator",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2547",
      "bestRating": "5",
      "worstRating": "1"
    },
    "description": "Free pet cost calculator with breed-specific data for dogs and cats. Calculate adoption fees, vet care, food, grooming, and lifetime costs."
  } : null;

  // FAQ schema is now passed as a prop from the homepage
  const faqSchemaToUse = faqSchema || (isHomepage ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is the pet cost calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculator uses real-world data from veterinary associations, pet insurance companies, and thousands of pet owners. Costs are breed-specific and location-adjusted for maximum accuracy."
        }
      },
      {
        "@type": "Question",
        "name": "What costs does the calculator include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We include adoption fees, initial vet care, food, grooming, insurance, supplies, training, and often-forgotten costs like pet deposits, boarding, and furniture damage."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this for both dogs and cats?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our calculator supports 213 dog breeds and 81 cat breeds, covering all UK Kennel Club and TICA recognized breeds with accurate cost estimates tailored to each species and breed."
        }
      },
      {
        "@type": "Question",
        "name": "Is the pet cost calculator really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, completely free with no hidden fees, registration, or credit card required. We're committed to helping prospective pet owners make informed decisions."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a dog cost per year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Annual dog costs range from $1,500-$4,000+ depending on breed size, health needs, and lifestyle. Use our calculator for breed-specific estimates."
        }
      },
      {
        "@type": "Question",
        "name": "What are the hidden costs of pet ownership?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hidden costs include pet deposits ($200-500), boarding ($30-50/day), furniture damage ($200-1000), emergency vet visits ($500-2000), and lifestyle changes like pet-friendly housing."
        }
      },
      {
        "@type": "Question",
        "name": "Does location affect pet costs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, vet care and services cost 20-40% more in urban areas vs rural. Our calculator adjusts estimates based on your location."
        }
      },
      {
        "@type": "Question",
        "name": "Should I get pet insurance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pet insurance ($30-70/month) can save thousands on unexpected vet bills. It's especially valuable for breeds prone to health issues or if you can't afford $2,000+ emergency expenses."
        }
      }
    ]
  } : null);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={isBlogArticle ? "article" : "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
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
      {organizationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
      {websiteSchema && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
      {softwareAppSchema && (
        <script type="application/ld+json">
          {JSON.stringify(softwareAppSchema)}
        </script>
      )}
      {faqSchemaToUse && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchemaToUse)}
        </script>
      )}
    </Helmet>
  );
}

