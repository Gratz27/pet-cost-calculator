import { useEffect } from 'react';

interface EzoicAdProps {
  placementId: number;
  className?: string;
}

/**
 * Ezoic Ad Placement Component
 * 
 * Usage:
 * <EzoicAd placementId={101} />
 * 
 * Placement IDs must be created in your Ezoic dashboard first.
 * Common placement IDs (configure in Ezoic dashboard):
 * - 101: Homepage Hero
 * - 102: Homepage Mid-Content
 * - 103: Homepage Bottom
 * - 104: Blog Article Top
 * - 105: Blog Article Mid-Content
 * - 106: Blog Article Bottom
 * - 107: Calculator Results
 * - 108: About Page Mid-Content
 * - 109: How It Works Mid-Content
 * 
 * @param placementId - The Ezoic placement ID from your dashboard
 * @param className - Optional CSS classes for the container
 */
export default function EzoicAd({ placementId, className = '' }: EzoicAdProps) {
  useEffect(() => {
    // Check if Ezoic is loaded
    if (typeof window !== 'undefined' && (window as any).ezstandalone) {
      try {
        // Call Ezoic to show ads for this placement
        (window as any).ezstandalone.cmd.push(function () {
          (window as any).ezstandalone.showAds(placementId);
        });
      } catch (error) {
        console.error(`Ezoic ad placement ${placementId} failed to load:`, error);
      }
    }
  }, [placementId]);

  return (
    <div className={`ezoic-ad-container ${className}`}>
      {/* Ezoic ad placeholder - DO NOT add styling to this div */}
      <div id={`ezoic-pub-ad-placeholder-${placementId}`}></div>
    </div>
  );
}
