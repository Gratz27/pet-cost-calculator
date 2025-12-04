/**
 * Ezoic Ad Placement Configuration
 * 
 * These placement IDs must be created in your Ezoic dashboard before ads will display.
 * 
 * To create placements:
 * 1. Log into Ezoic dashboard
 * 2. Navigate to "Ad Placements" or "Monetization"
 * 3. Create new placements with these IDs
 * 4. Configure ad sizes and types for each placement
 * 
 * Recommended ad sizes:
 * - Hero/Top: 728x90 (Leaderboard), 970x250 (Billboard)
 * - Mid-Content: 300x250 (Medium Rectangle), 336x280 (Large Rectangle)
 * - Sidebar: 300x600 (Half Page), 160x600 (Wide Skyscraper)
 * - Bottom: 728x90 (Leaderboard), 320x50 (Mobile Banner)
 */

export const EZOIC_PLACEMENTS = {
  // Homepage placements
  HOMEPAGE_HERO: 101,
  HOMEPAGE_MID_CONTENT: 102,
  HOMEPAGE_BOTTOM: 103,

  // Blog article placements
  BLOG_ARTICLE_TOP: 104,
  BLOG_ARTICLE_MID_CONTENT: 105,
  BLOG_ARTICLE_BOTTOM: 106,

  // Calculator placements
  CALCULATOR_RESULTS: 107,

  // Main page placements
  ABOUT_MID_CONTENT: 108,
  HOW_IT_WORKS_MID_CONTENT: 109,

  // Additional placements (optional)
  SIDEBAR_TOP: 110,
  SIDEBAR_MID: 111,
  FOOTER: 112,
} as const;

export type EzoicPlacementId = typeof EZOIC_PLACEMENTS[keyof typeof EZOIC_PLACEMENTS];
