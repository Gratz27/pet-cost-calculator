import { useEffect, useRef } from 'react';

interface AdSenseProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

/**
 * AdSense component - Only use on content-rich pages
 * Do NOT use on:
 * - Calculator form steps
 * - Loading screens
 * - Navigation screens
 * - Pages under construction
 *
 * Fix: Guards against double-initialization on React re-renders by:
 * 1. Checking data-adsbygoogle-status before calling push()
 * 2. Only appending the AdSense script once per page (singleton check)
 * 3. Using a ref flag to prevent double-push within the same component instance
 */

const ADSENSE_CLIENT = 'ca-pub-3275113356221002';
const ADSENSE_SCRIPT_ID = 'adsense-script-singleton';

function ensureAdSenseScript(): Promise<void> {
  return new Promise((resolve) => {
    // If script already exists and is loaded, resolve immediately
    const existing = document.getElementById(ADSENSE_SCRIPT_ID);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = ADSENSE_SCRIPT_ID;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => resolve(); // Resolve anyway so we don't block
    document.head.appendChild(script);
  });
}

export default function AdSense({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  style = { display: 'block', minHeight: '250px' },
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    // Prevent double-push within the same component instance lifecycle
    if (pushedRef.current) return;

    const timer = setTimeout(async () => {
      try {
        const ins = adRef.current;
        if (!ins) return;

        // Guard: if this <ins> element already has an ad, do not push again
        if (ins.getAttribute('data-adsbygoogle-status')) return;

        // Guard: only push if the element has a non-zero width
        if (ins.offsetWidth === 0) return;

        await ensureAdSenseScript();

        // Re-check after async wait — element may have been removed or already filled
        if (!adRef.current) return;
        if (ins.getAttribute('data-adsbygoogle-status')) return;

        pushedRef.current = true;
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        // Swallow — AdSense errors should not crash the page
        console.warn('AdSense initialization skipped:', e);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '250px', width: '100%' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: '300px',
          minHeight: '250px',
          ...style,
        }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
