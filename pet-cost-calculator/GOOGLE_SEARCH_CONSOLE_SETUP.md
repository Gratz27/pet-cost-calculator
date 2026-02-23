# Google Search Console Setup Instructions

## Overview
Your website now has a comprehensive XML sitemap and robots.txt file configured for optimal search engine indexing. This guide will help you submit your sitemap to Google Search Console.

## What's Included

### 1. XML Sitemap (`/sitemap.xml`)
- **Location**: `https://www.petcost-calculator.com/sitemap.xml`
- **Total URLs**: 21 pages
- **Last Updated**: November 30, 2025

**Included Pages:**
- Homepage (priority: 1.0)
- Main pages: About, How It Works, Contact, Privacy Policy (priority: 0.6-0.8)
- Blog index (priority: 0.9)
- 15 blog articles covering breed guides, comparisons, and cost-saving tips (priority: 0.7-0.8)

**Update Frequency:**
- Homepage & Blog: Weekly
- Main pages: Monthly
- Blog articles: Monthly
- Privacy Policy: Yearly

### 2. Robots.txt (`/robots.txt`)
- **Location**: `https://www.petcost-calculator.com/robots.txt`
- Allows all search engines to crawl the site
- References the sitemap location
- Sets crawl-delay to 1 second for polite crawling

---

## Step-by-Step Submission Instructions

### Step 1: Access Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. If you haven't already, verify ownership of `petcost-calculator.com`:
   - Click "Add Property"
   - Enter your domain: `petcost-calculator.com`
   - Follow verification instructions (DNS, HTML file, or HTML tag method)

### Step 2: Submit Your Sitemap
1. In Google Search Console, select your property (`petcost-calculator.com`)
2. Click on **"Sitemaps"** in the left sidebar
3. In the "Add a new sitemap" section, enter: `sitemap.xml`
4. Click **"Submit"**

**Expected Result:**
- Status should show "Success" after processing (may take a few minutes to hours)
- Google will discover 21 URLs from your sitemap

### Step 3: Verify Robots.txt
1. In Google Search Console, go to **"Settings"** → **"robots.txt Tester"** (or use the old Search Console)
2. Verify that `https://www.petcost-calculator.com/robots.txt` is accessible
3. Check that it contains the sitemap reference

### Step 4: Request Indexing (Optional but Recommended)
For immediate indexing of important pages:
1. Go to **"URL Inspection"** tool in Google Search Console
2. Enter your homepage URL: `https://www.petcost-calculator.com/`
3. Click **"Request Indexing"**
4. Repeat for key pages like:
   - `/blog`
   - `/about`
   - Top blog articles (Golden Retriever, Labrador, German Shepherd guides)

---

## Monitoring & Maintenance

### Check Indexing Status
- **Coverage Report**: Go to "Coverage" to see which pages are indexed
- **Sitemaps Report**: Monitor how many URLs from your sitemap are indexed
- **Performance Report**: Track search impressions, clicks, and rankings

### Update Schedule
- **After adding new blog articles**: Update `sitemap.xml` with new URLs and resubmit
- **Monthly**: Check for crawl errors and fix any issues
- **After major updates**: Resubmit sitemap to expedite re-indexing

### Expected Timeline
- **Sitemap Processing**: 1-24 hours
- **Initial Indexing**: 1-7 days for most pages
- **Full Indexing**: 2-4 weeks for all 21 pages
- **Ranking Improvements**: 4-12 weeks as Google evaluates content quality

---

## Troubleshooting

### Sitemap Not Found
- Verify the file is accessible at `https://www.petcost-calculator.com/sitemap.xml`
- Check that your hosting/CDN is serving the file correctly
- Ensure there are no redirect issues

### URLs Not Indexed
- Check "Coverage" report for specific errors
- Verify pages are accessible (not 404 or blocked by robots.txt)
- Ensure pages have unique, quality content
- Check for duplicate content issues

### Crawl Errors
- Review "Coverage" report for error details
- Fix any broken links or server errors
- Ensure mobile-friendliness (already implemented)

---

## Additional SEO Recommendations

### 1. Set Up Google Analytics (Already Configured)
Your site already has Google Analytics (G-M2Y343CDP8) configured. Link it to Search Console for deeper insights.

### 2. Monitor Core Web Vitals
- Check "Core Web Vitals" report in Search Console
- Ensure all pages pass mobile usability tests (already implemented)

### 3. Build Backlinks
- Share blog articles on social media
- Reach out to pet-related websites for guest posting
- List your calculator on pet resource directories

### 4. Regular Content Updates
- Add new blog articles monthly
- Update breed cost data annually
- Refresh existing articles with current information

---

## Quick Reference

| Resource | URL |
|----------|-----|
| Google Search Console | https://search.google.com/search-console |
| Your Sitemap | https://www.petcost-calculator.com/sitemap.xml |
| Your Robots.txt | https://www.petcost-calculator.com/robots.txt |
| Sitemap Validator | https://www.xml-sitemaps.com/validate-xml-sitemap.html |

---

## Need Help?

If you encounter issues:
1. Check Google Search Console Help Center: https://support.google.com/webmasters
2. Review the "Coverage" and "Sitemaps" reports for specific error messages
3. Verify your website is accessible and not blocking Googlebot

---

**Last Updated**: November 30, 2025  
**Sitemap Version**: 1.1  
**Total URLs**: 21 pages
