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

// Breed-specific FAQ data for FAQPage schema
const BREED_FAQS = {
  'golden-retriever': [
    { question: 'How much does a Golden Retriever cost per year?', answer: 'A Golden Retriever costs approximately $2,650–$5,200 per year in ongoing expenses, including food, vet care, grooming, pet insurance, and supplies. The first year is more expensive at $3,000–$6,000 including acquisition costs.' },
    { question: 'What is the lifetime cost of a Golden Retriever?', answer: 'The lifetime cost of a Golden Retriever ranges from $25,000 to $55,000 over a 10–12 year lifespan. This includes all ongoing costs but excludes major medical events like cancer treatment or orthopaedic surgery, which can add $10,000–$20,000.' },
    { question: 'Is pet insurance worth it for a Golden Retriever?', answer: 'Yes — pet insurance is strongly recommended for Golden Retrievers. Approximately 60% of Goldens develop cancer in their lifetime, and cancer treatment costs $5,000–$20,000+. A comprehensive policy costs $50–$100/month and can save tens of thousands of dollars.' },
  ],
  'french-bulldog': [
    { question: 'How much does a French Bulldog cost per year?', answer: 'A French Bulldog costs approximately $3,000–$6,000 per year in ongoing expenses. Their brachycephalic health issues (breathing problems, IVDD, skin allergies) make them one of the most expensive breeds to own.' },
    { question: 'What is the lifetime cost of a French Bulldog?', answer: 'The lifetime cost of a French Bulldog ranges from $20,000 to $40,000+ over an 8–12 year lifespan. BOAS surgery ($1,500–$3,500), IVDD treatment ($3,000–$8,000), and high insurance premiums ($100–$180/month) drive costs significantly above average.' },
    { question: 'Do French Bulldogs need expensive surgery?', answer: 'Many French Bulldogs require BOAS (Brachycephalic Obstructive Airway Syndrome) surgery to correct breathing difficulties, costing $1,500–$3,500. Up to 40% also develop IVDD (spinal disc disease) requiring surgery at $3,000–$8,000.' },
  ],
  'labrador-retriever': [
    { question: 'How much does a Labrador Retriever cost per year?', answer: 'A Labrador Retriever costs approximately $2,000–$4,000 per year in ongoing expenses, including food (they eat a lot), routine vet care, pet insurance, and grooming. Their primary health risks are hip dysplasia and obesity.' },
    { question: 'What is the lifetime cost of a Labrador Retriever?', answer: 'The lifetime cost of a Labrador Retriever ranges from $18,000 to $35,000 over a 10–14 year lifespan. Hip replacement surgery ($3,500–$7,000 per hip) is the most significant potential one-time cost.' },
    { question: 'Are Labrador Retrievers expensive to insure?', answer: 'Labrador Retrievers attract moderate insurance premiums of $50–$75/month for comprehensive coverage. Their risk of hip dysplasia and obesity-related conditions makes insurance worthwhile, particularly for larger Labs.' },
  ],
  'german-shepherd': [
    { question: 'How much does a German Shepherd cost per year?', answer: 'A German Shepherd costs approximately $2,000–$4,500 per year in ongoing expenses. Their large size means higher food costs, and they are prone to hip dysplasia and degenerative myelopathy, which can generate significant vet bills.' },
    { question: 'What is the lifetime cost of a German Shepherd?', answer: 'The lifetime cost of a German Shepherd ranges from $18,000 to $38,000 over a 9–13 year lifespan. Hip replacement surgery ($3,500–$7,000 per hip) and management of degenerative myelopathy in later life are the primary cost drivers.' },
    { question: 'Do German Shepherds need a lot of vet care?', answer: 'German Shepherds have above-average vet costs due to their high prevalence of hip and elbow dysplasia (affecting up to 20% of the breed) and degenerative myelopathy. Regular screening and maintaining a healthy weight can reduce these risks.' },
  ],
  'english-bulldog': [
    { question: 'How much does an English Bulldog cost per year?', answer: 'An English Bulldog costs approximately $3,500–$7,000 per year in ongoing expenses — one of the highest of any breed. Breathing surgery, skin fold care, joint issues, and high insurance premiums ($150–$250/month) drive costs significantly above average.' },
    { question: 'What is the lifetime cost of an English Bulldog?', answer: 'The lifetime cost of an English Bulldog ranges from $25,000 to $50,000+ over an 8–12 year lifespan. BOAS surgery, hip dysplasia treatment, and the extremely high insurance premiums make English Bulldogs the most expensive breed to own long-term.' },
    { question: 'Are English Bulldogs the most expensive dog breed to own?', answer: 'Yes — English Bulldogs are consistently ranked as one of the most expensive dog breeds to own due to their extreme brachycephalic anatomy, which causes breathing difficulties requiring surgery, plus high rates of hip dysplasia, skin infections, and eye conditions.' },
  ],
  'poodle': [
    { question: 'How much does a Poodle cost per year?', answer: 'A Standard Poodle costs approximately $2,500–$4,500 per year in ongoing expenses. Professional grooming every 6–8 weeks ($65–$100 per session) is the most significant ongoing cost unique to the breed, adding $400–$800 annually.' },
    { question: 'What is the lifetime cost of a Poodle?', answer: 'The lifetime cost of a Standard Poodle ranges from $20,000 to $40,000 over a 12–15 year lifespan. Miniature and Toy Poodles have lower food and medication costs but similar grooming expenses, with lifetime costs of $15,000–$30,000.' },
    { question: 'Do Poodles need professional grooming?', answer: 'Yes — Poodles have continuously growing coats that require professional grooming every 6–8 weeks. Skipping grooming causes severe matting that can only be resolved by shaving the coat entirely. Budget $400–$800 per year for professional grooming.' },
  ],
  'beagle': [
    { question: 'How much does a Beagle cost per year?', answer: 'A Beagle costs approximately $1,500–$3,000 per year in ongoing expenses. They are a relatively affordable breed with moderate food consumption, minimal grooming needs, and generally good health. Their main cost risk is obesity-related conditions.' },
    { question: 'What is the lifetime cost of a Beagle?', answer: 'The lifetime cost of a Beagle ranges from $15,000 to $28,000 over a 12–15 year lifespan. They are one of the more affordable medium-sized breeds to own long-term, with lower-than-average vet costs and no professional grooming requirements.' },
    { question: 'Are Beagles expensive to own?', answer: 'Beagles are one of the more affordable dog breeds to own. Their short coats require no professional grooming, they eat a moderate amount of food, and they have relatively few breed-specific genetic health issues compared to many popular breeds.' },
  ],
  'siberian-husky': [
    { question: 'How much does a Siberian Husky cost per year?', answer: 'A Siberian Husky costs approximately $2,000–$4,000 per year in ongoing expenses. Their high energy requirements mean significant food consumption and exercise needs. They shed heavily twice a year, requiring regular grooming during shedding season.' },
    { question: 'What is the lifetime cost of a Siberian Husky?', answer: 'The lifetime cost of a Siberian Husky ranges from $18,000 to $35,000 over a 12–15 year lifespan. They are generally a healthy breed with fewer genetic issues than many popular breeds, but their high energy and exercise needs can add indirect costs.' },
    { question: 'Do Huskies need professional grooming?', answer: 'Huskies do not require professional grooming in the same way as Poodles or Doodles, but they shed heavily twice a year ("blowing their coat"). Regular brushing with an undercoat rake during shedding season is essential. Professional de-shedding treatments cost $60–$100.' },
  ],
  'ragdoll-cat': [
    { question: 'How much does a Ragdoll cat cost per year?', answer: 'A Ragdoll cat costs approximately $1,200–$2,500 per year in ongoing expenses. Their semi-long coat requires regular brushing to prevent matting, and they are prone to hypertrophic cardiomyopathy (HCM), which can generate significant vet costs.' },
    { question: 'What is the lifetime cost of a Ragdoll cat?', answer: 'The lifetime cost of a Ragdoll cat ranges from $15,000 to $30,000 over a 12–17 year lifespan. HCM (heart disease) affects approximately 30% of Ragdolls and can require ongoing medication and monitoring costing $500–$2,000 per year.' },
    { question: 'Are Ragdoll cats expensive to insure?', answer: 'Ragdoll cats attract higher insurance premiums than mixed breed cats due to their predisposition to HCM (hypertrophic cardiomyopathy). Expect to pay $30–$60/month for comprehensive coverage, compared to $20–$40/month for a mixed breed cat.' },
  ],
  'maine-coon': [
    { question: 'How much does a Maine Coon cost per year?', answer: 'A Maine Coon costs approximately $1,500–$3,000 per year in ongoing expenses. Their large size means higher food costs than average cats, and their long, thick coat requires regular brushing. They are also prone to HCM and hip dysplasia.' },
    { question: 'What is the lifetime cost of a Maine Coon?', answer: 'The lifetime cost of a Maine Coon ranges from $18,000 to $35,000 over a 12–15 year lifespan. They are one of the more expensive cat breeds to own due to their size, grooming needs, and predisposition to HCM and spinal muscular atrophy.' },
    { question: 'Do Maine Coons need professional grooming?', answer: 'Maine Coons benefit from professional grooming 3–4 times per year ($60–$100 per session) to manage their thick, semi-long coat and prevent matting. Regular home brushing (3–4 times per week) is also essential, particularly during shedding season.' },
  ],
};

// 2. Breed pages
console.log('\n🐾 Breed pages:');
const breeds = extractBreedMetadata();
for (const breed of breeds) {
  const canonical = `${BASE_URL}/breeds/${breed.slug}`;
  const faqs = BREED_FAQS[breed.slug] || [];
  const faqSchema = faqs.length > 0 ? JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }) : null;

  const html = generatePageHtml({
    title: `${breed.name} Cost Guide – Lifetime Ownership Costs`,
    description: breed.description,
    canonical,
    ogImage: `${BASE_URL}/og-image.png`,
    ogType: 'article',
    articleSchema: faqSchema,
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
    extraSchema: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      'name': 'About PetCost-Calculator.com',
      'description': 'Learn about PetCost-Calculator.com, our mission to help pet owners budget wisely, and how we source our breed-specific cost data.',
      'url': `${BASE_URL}/about`,
      'publisher': {
        '@type': 'Organization',
        'name': 'PetCost-Calculator.com',
        'url': BASE_URL,
        'logo': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/favicon.svg`
        }
      }
    }),
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
    articleSchema: page.extraSchema || null,
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
