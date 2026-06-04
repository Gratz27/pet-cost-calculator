/**
 * Post-build static HTML generator for SEO
 *
 * Generates static HTML files for all blog articles, breed pages, and static
 * pages so that Googlebot receives fully-rendered HTML on first fetch, rather
 * than an empty JavaScript shell.
 *
 * IMPORTANT: This script REPLACES (not appends) all conflicting head tags AND
 * the noscript body block so that search engines see exactly one canonical,
 * one title, one description, one set of og/twitter tags, and unique visible
 * body content per page.
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
 * twitter tags, meta description, or noscript body content.
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
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
    // Remove the homepage noscript block — each page gets its own unique noscript
    .replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
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
    const authorMatches = [...content.matchAll(/author:\s*['"]([^'"]+)['"]/g)];

    for (let i = 0; i < slugMatches.length; i++) {
      const slug = slugMatches[i]?.[1];
      const title = titleMatches[i]?.[1];
      const description = descMatches[i]?.[1];
      const image = imageMatches[i]?.[1];
      const date = dateMatches[i]?.[1];
      const author = authorMatches[i]?.[1];

      if (slug && title && !seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        articles.push({
          slug,
          title,
          description: description || '',
          image: image || `${BASE_URL}/og-image.png`,
          date: date || '2026-01-01',
          author: author || 'PetCost-Calculator.com Editorial Team',
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

  // Match each top-level breed entry: 'slug': { ... }
  // We look for the pattern '  \'slug\': {' at 2-space indent (top-level keys)
  const breedBlockRegex = /^  '([a-z-]+)':\s*\{(.*?)^  \}/gms;
  const breedBlocks = [...breedPageContent.matchAll(breedBlockRegex)];

  for (const block of breedBlocks) {
    const slug = block[1];
    const blockContent = block[2];

    if (!slug || seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    // Extract the top-level name field (first name: before relatedBreeds)
    // Split at relatedBreeds to avoid picking up related breed names
    const beforeRelated = blockContent.split('relatedBreeds')[0];
    const nameMatch = beforeRelated.match(/^\s+name:\s*['"](([^'"]+))['"]]/m);
    const descMatch = beforeRelated.match(/^\s+description:\s*['"](([^'"]+))['"]]/m);

    const displayName = nameMatch?.[1] ||
      slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const description = descMatch?.[1] ||
      `Complete cost guide for owning a ${displayName} in the US and UK.`;

    breeds.push({ slug, name: displayName, description });
  }

  return breeds;
}

// ─── Noscript Content Generators ─────────────────────────────────────────────

function buildBlogNoscript(article) {
  const canonical = `${BASE_URL}/blog/${article.slug}`;
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  return `<noscript>
      <header>
        <nav>
          <a href="${BASE_URL}/">PetCost-Calculator.com</a> |
          <a href="${BASE_URL}/blog">Blog</a> |
          <a href="${BASE_URL}/breeds/golden-retriever">Breed Guides</a> |
          <a href="${BASE_URL}/about">About</a>
        </nav>
        <nav aria-label="Breadcrumb">
          <a href="${BASE_URL}/">Home</a> &rsaquo;
          <a href="${BASE_URL}/blog">Blog</a> &rsaquo;
          <span>${article.title}</span>
        </nav>
      </header>
      <main>
        <article>
          <h1>${article.title}</h1>
          ${formattedDate ? `<p><time datetime="${article.date}">Published: ${formattedDate}</time> &mdash; By ${article.author || 'PetCost-Calculator.com Editorial Team'}</p>` : ''}
          <p>${article.description}</p>
          <p>Use our free <a href="${BASE_URL}/">pet cost calculator</a> to get a personalised breakdown for your chosen breed.</p>
        </article>
        <aside>
          <h2>Related Breed Cost Guides</h2>
          <ul>
            <li><a href="${BASE_URL}/breeds/golden-retriever">Golden Retriever Cost Guide</a></li>
            <li><a href="${BASE_URL}/breeds/labrador-retriever">Labrador Retriever Cost Guide</a></li>
            <li><a href="${BASE_URL}/breeds/french-bulldog">French Bulldog Cost Guide</a></li>
            <li><a href="${BASE_URL}/breeds/german-shepherd">German Shepherd Cost Guide</a></li>
            <li><a href="${BASE_URL}/breeds/maine-coon">Maine Coon Cost Guide</a></li>
          </ul>
        </aside>
      </main>
      <footer>
        <a href="${BASE_URL}/privacy-policy">Privacy Policy</a> |
        <a href="${BASE_URL}/terms">Terms of Use</a> |
        <a href="${BASE_URL}/sitemap.xml">Sitemap</a>
      </footer>
    </noscript>`;
}

function buildBreedNoscript(breed) {
  const canonical = `${BASE_URL}/breeds/${breed.slug}`;
  return `<noscript>
      <header>
        <nav>
          <a href="${BASE_URL}/">PetCost-Calculator.com</a> |
          <a href="${BASE_URL}/blog">Blog</a> |
          <a href="${BASE_URL}/breeds/golden-retriever">Breed Guides</a> |
          <a href="${BASE_URL}/about">About</a>
        </nav>
        <nav aria-label="Breadcrumb">
          <a href="${BASE_URL}/">Home</a> &rsaquo;
          <a href="${BASE_URL}/breeds">Breed Guides</a> &rsaquo;
          <span>${breed.name}</span>
        </nav>
      </header>
      <main>
        <article>
          <h1>${breed.name} Cost Guide – Lifetime Ownership Costs</h1>
          <p>${breed.description}</p>
          <p>Use our free <a href="${BASE_URL}/">pet cost calculator</a> to get a personalised cost breakdown for a ${breed.name}, including adoption fees, vet care, food, grooming, insurance, and hidden costs.</p>
          <h2>What Does a ${breed.name} Cost Per Year?</h2>
          <p>Annual costs for a ${breed.name} vary based on location, lifestyle, and whether you choose pet insurance. Our calculator provides a personalised estimate covering all major expense categories.</p>
          <h2>Calculate Your ${breed.name} Costs</h2>
          <p><a href="${BASE_URL}/">Start the free pet cost calculator</a> to get a detailed, personalised breakdown for a ${breed.name}.</p>
        </article>
        <aside>
          <h2>Other Breed Cost Guides</h2>
          <ul>
            <li><a href="${BASE_URL}/breeds/golden-retriever">Golden Retriever</a></li>
            <li><a href="${BASE_URL}/breeds/labrador-retriever">Labrador Retriever</a></li>
            <li><a href="${BASE_URL}/breeds/french-bulldog">French Bulldog</a></li>
            <li><a href="${BASE_URL}/breeds/german-shepherd">German Shepherd</a></li>
            <li><a href="${BASE_URL}/breeds/maine-coon">Maine Coon</a></li>
          </ul>
        </aside>
      </main>
      <footer>
        <a href="${BASE_URL}/privacy-policy">Privacy Policy</a> |
        <a href="${BASE_URL}/terms">Terms of Use</a> |
        <a href="${BASE_URL}/sitemap.xml">Sitemap</a>
      </footer>
    </noscript>`;
}

function buildStaticNoscript(page) {
  return `<noscript>
      <header>
        <nav>
          <a href="${BASE_URL}/">PetCost-Calculator.com</a> |
          <a href="${BASE_URL}/blog">Blog</a> |
          <a href="${BASE_URL}/breeds/golden-retriever">Breed Guides</a> |
          <a href="${BASE_URL}/about">About</a>
        </nav>
        <nav aria-label="Breadcrumb">
          <a href="${BASE_URL}/">Home</a> &rsaquo;
          <span>${page.title.split('–')[0].trim()}</span>
        </nav>
      </header>
      <main>
        <h1>${page.title}</h1>
        <p>${page.description}</p>
        <p><a href="${BASE_URL}/">Use our free pet cost calculator</a> to get a personalised cost breakdown for any dog or cat breed.</p>
      </main>
      <footer>
        <a href="${BASE_URL}/privacy-policy">Privacy Policy</a> |
        <a href="${BASE_URL}/terms">Terms of Use</a> |
        <a href="${BASE_URL}/sitemap.xml">Sitemap</a>
      </footer>
    </noscript>`;
}

// ─── HTML Generator ───────────────────────────────────────────────────────────

function generatePageHtml({ title, description, canonical, ogImage, ogType, articleSchema, breadcrumbs, noscriptBlock }) {
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

  // Strip all existing conflicting SEO tags AND the homepage noscript block
  const cleanedHtml = stripExistingSeoTags(rawIndexHtml);

  // Inject page-specific head tags
  let html = cleanedHtml.replace('</head>', `${seoTags}\n</head>`);

  // Inject page-specific noscript block after <div id="root"></div>
  if (noscriptBlock) {
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n    ${noscriptBlock}`);
  }

  return html;
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
      name: article.author || 'PetCost-Calculator.com Editorial Team',
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
    noscriptBlock: buildBlogNoscript(article),
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
    noscriptBlock: buildBreedNoscript(breed),
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
    noscriptBlock: buildStaticNoscript(page),
  });
  writePageHtml(page.path, html);
}

console.log(
  `\n✅ Done! Generated ${articles.length} blog pages, ${breeds.length} breed pages, ${staticPages.length} static pages.\n`
);
