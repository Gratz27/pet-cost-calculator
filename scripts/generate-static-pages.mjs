/**
 * Post-build static HTML generator for SEO
 *
 * Generates static HTML files for all blog articles, breed pages, and static
 * pages so that Googlebot receives fully-rendered HTML on first fetch, rather
 * than an empty JavaScript shell.
 *
 * IMPORTANT: This script REPLACES (not appends) all conflicting head tags so
 * that search engines see exactly one canonical, one title, one description,
 * and one set of og/twitter tags per page.
 *
 * Run after `vite build`: node scripts/generate-static-pages.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.resolve(ROOT, 'dist/public');
const BASE_URL = 'https://www.petcost-calculator.com';

// Read the base index.html shell
const rawIndexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

/**
 * Strip all existing SEO-related tags from the HTML shell so sub-pages
 * don't inherit the homepage's canonical, og:url, og:title, og:description,
 * twitter tags, or meta description.
 */
function stripExistingSeoTags(html) {
  return html
    // Remove <title>...</title>
    .replace(/<title>[^<]*<\/title>/gi, '')
    // Remove <link rel="canonical" ...>
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    // Remove <meta name="description" ...>
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    // Remove <meta name="keywords" ...>
    .replace(/<meta\s+name="keywords"[^>]*>/gi, '')
    // Remove <meta property="og:title" ...>
    .replace(/<meta\s+property="og:title"[^>]*>/gi, '')
    // Remove <meta property="og:description" ...>
    .replace(/<meta\s+property="og:description"[^>]*>/gi, '')
    // Remove <meta property="og:url" ...>
    .replace(/<meta\s+property="og:url"[^>]*>/gi, '')
    // Remove <meta property="og:image" ...>
    .replace(/<meta\s+property="og:image"[^>]*>/gi, '')
    // Remove <meta property="og:image:width" ...>
    .replace(/<meta\s+property="og:image:width"[^>]*>/gi, '')
    // Remove <meta property="og:image:height" ...>
    .replace(/<meta\s+property="og:image:height"[^>]*>/gi, '')
    // Remove <meta property="og:type" ...>
    .replace(/<meta\s+property="og:type"[^>]*>/gi, '')
    // Remove <meta name="twitter:title" ...>
    .replace(/<meta\s+name="twitter:title"[^>]*>/gi, '')
    // Remove <meta name="twitter:description" ...>
    .replace(/<meta\s+name="twitter:description"[^>]*>/gi, '')
    // Remove <meta name="twitter:image" ...>
    .replace(/<meta\s+name="twitter:image"[^>]*>/gi, '')
    // Remove <meta name="twitter:card" ...>
    .replace(/<meta\s+name="twitter:card"[^>]*>/gi, '')
    // Remove homepage schema blocks (SoftwareApplication, Organization, FAQPage)
    // These are only valid on the homepage and must not appear on sub-pages
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
}

// ─── Blog Articles ────────────────────────────────────────────────────────────

function extractArticleMetadata() {
  const dataDir = path.resolve(ROOT, 'client/src/data/blog-articles');
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

  const articles = [];
  const seenSlugs = new Set();

  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');

    const slugMatches = [...content.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
    const titleMatches = [...content.matchAll(/title:\s*['"]([^'"]+)['"]/g)];
    const descMatches = [...content.matchAll(/description:\s*['"]([^'"]+)['"]/g)];
    const imageMatches = [...content.matchAll(/image:\s*['"]([^'"]+)['"]/g)];
    const dateMatches = [...content.matchAll(/publishDate:\s*['"]([^'"]+)['"]/g)];

    for (let i = 0; i < slugMatches.length; i++) {
      const slug = slugMatches[i]?.[1];
      const title = titleMatches[i]?.[1];
      const description = descMatches[i]?.[1];
      const image = imageMatches[i]?.[1];
      const date = dateMatches[i]?.[1];

      if (slug && title && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        articles.push({
          slug,
          title,
          description: description || '',
          image: image || `${BASE_URL}/og-image.png`,
          date: date || '2026-01-01',
        });
      }
    }
  }

  return articles;
}

// ─── Breed Pages ─────────────────────────────────────────────────────────────

function extractBreedMetadata() {
  const breedPageContent = fs.readFileSync(
    path.resolve(ROOT, 'client/src/pages/BreedPage.tsx'),
    'utf8'
  );

  const breeds = [];
  const seenSlugs = new Set();

  const keyMatches = [...breedPageContent.matchAll(/^\s{2}'([a-z-]+)':\s*\{/gm)];
  const nameMatches = [...breedPageContent.matchAll(/name:\s*['"]([^'"]+)['"]/g)];
  const descMatches = [...breedPageContent.matchAll(/description:\s*['"]([^'"]+)['"]/g)];

  for (let i = 0; i < keyMatches.length; i++) {
    const slug = keyMatches[i]?.[1];
    const name = nameMatches[i]?.[1];
    const description = descMatches[i]?.[1];

    if (slug && !seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      const displayName =
        name || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      breeds.push({
        slug,
        name: displayName,
        description:
          description ||
          `Complete cost guide for owning a ${displayName} in the US and UK.`,
      });
    }
  }

  return breeds;
}

// ─── HTML Generator ───────────────────────────────────────────────────────────

function generatePageHtml({ title, description, canonical, ogImage, ogType, articleSchema, breadcrumbs }) {
  const SITE_NAME = 'PetCost-Calculator.com';
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = ogImage?.startsWith('http')
    ? ogImage
    : `${BASE_URL}/${ogImage || 'og-image.png'}`;
  const pageOgType = ogType || (articleSchema ? 'article' : 'website');

  const breadcrumbSchema = breadcrumbs
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      })
    : null;

  const seoTags = `
    <title>${fullTitle}</title>
    <meta name="description" content="${description.replace(/"/g, '&quot;')}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${fullTitle.replace(/"/g, '&quot;')}" />
    <meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="${pageOgType}" />
    <meta property="og:site_name" content="PetCost-Calculator.com" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${fullTitle.replace(/"/g, '&quot;')}" />
    <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />
    <meta name="twitter:image" content="${ogImageUrl}" />
    ${articleSchema ? `<script type="application/ld+json">${articleSchema}</script>` : ''}
    ${breadcrumbSchema ? `<script type="application/ld+json">${breadcrumbSchema}</script>` : ''}
  `;

  // Strip all existing conflicting SEO tags from the shell, then inject
  // the page-specific tags just before </head>
  const cleanedHtml = stripExistingSeoTags(rawIndexHtml);
  return cleanedHtml.replace('</head>', `${seoTags}\n</head>`);
}

function writePageHtml(urlPath, html) {
  const dir = path.join(DIST, urlPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
  console.log(`  ✓ ${urlPath}/index.html`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\n🔧 Generating static HTML pages for SEO...\n');

// 1. Blog articles
console.log('📝 Blog articles:');
const articles = extractArticleMetadata();
for (const article of articles) {
  const canonical = `${BASE_URL}/blog/${article.slug}`;
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image?.startsWith('http')
      ? article.image
      : `${BASE_URL}${article.image}`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'PetCost-Calculator.com',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PetCost-Calculator.com',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  });

  const html = generatePageHtml({
    title: article.title,
    description: article.description,
    canonical,
    ogImage: article.image,
    ogType: 'article',
    articleSchema,
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Blog', url: `${BASE_URL}/blog` },
      { name: article.title, url: canonical },
    ],
  });

  writePageHtml(`blog/${article.slug}`, html);
}

// 2. Breed pages
console.log('\n🐾 Breed pages:');
const breeds = extractBreedMetadata();
for (const breed of breeds) {
  const canonical = `${BASE_URL}/breeds/${breed.slug}`;
  const html = generatePageHtml({
    title: `${breed.name} Cost Guide – Lifetime Ownership Costs`,
    description: breed.description,
    canonical,
    ogImage: `${BASE_URL}/og-image.png`,
    ogType: 'website',
    articleSchema: null,
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Breeds', url: `${BASE_URL}/breeds` },
      { name: breed.name, url: canonical },
    ],
  });

  writePageHtml(`breeds/${breed.slug}`, html);
}

// 3. Static pages
console.log('\n📄 Static pages:');
const staticPages = [
  {
    path: 'blog',
    title: 'Pet Cost Blog – Expert Guides & Breed Cost Guides',
    description:
      'Read expert guides on pet ownership costs, breed-specific expenses, vet bills, insurance, and more. Real data to help you budget for your pet.',
    canonical: `${BASE_URL}/blog`,
  },
  {
    path: 'about',
    title: 'About PetCost-Calculator – Our Data Sources & Methodology',
    description:
      'Learn about PetCost-Calculator.com, our mission to help pet owners budget wisely, and how we source our breed-specific cost data.',
    canonical: `${BASE_URL}/about`,
  },
  {
    path: 'contact',
    title: 'Contact PetCost-Calculator – Get in Touch',
    description:
      'Contact the PetCost-Calculator team for questions, feedback, or partnership enquiries.',
    canonical: `${BASE_URL}/contact`,
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy',
    description:
      'Read our privacy policy to understand how PetCost-Calculator.com collects, uses, and protects your data when you use our free pet cost calculator.',
    canonical: `${BASE_URL}/privacy-policy`,
  },
  {
    path: 'terms',
    title: 'Terms of Service & Disclaimer',
    description:
      'Terms of service and cost disclaimer for PetCost-Calculator.com. All costs are estimates based on averages and will vary by region.',
    canonical: `${BASE_URL}/terms`,
  },
];

for (const page of staticPages) {
  const html = generatePageHtml({
    title: page.title,
    description: page.description,
    canonical: page.canonical,
    ogImage: `${BASE_URL}/og-image.png`,
    ogType: 'website',
    articleSchema: null,
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: page.title.split('–')[0].trim(), url: page.canonical },
    ],
  });
  writePageHtml(page.path, html);
}

console.log(
  `\n✅ Done! Generated ${articles.length} blog pages, ${breeds.length} breed pages, ${staticPages.length} static pages.\n`
);
