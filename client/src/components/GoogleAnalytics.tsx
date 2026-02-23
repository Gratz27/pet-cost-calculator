import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { initGA, trackPageView } from '@/lib/analytics';

/**
 * Google Analytics component
 * Initializes GA4 and tracks page views automatically
 * 
 * To use:
 * 1. Get your GA4 Measurement ID from https://analytics.google.com
 * 2. Add it to your .env file as VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 * 3. Add this component to your App.tsx
 */
export default function GoogleAnalytics() {
  const [location] = useLocation();

  // Initialize GA on mount
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (measurementId) {
      initGA(measurementId);
    } else {
      console.warn('Google Analytics: VITE_GA_MEASUREMENT_ID not found in environment variables');
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (measurementId) {
      trackPageView(location);
    }
  }, [location]);

  return null; // This component doesn't render anything
}

