import { useEffect, useRef, useState } from 'react';

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
 */
export default function AdSense({ 
  slot = '1234567890', 
  format = 'auto',
  responsive = true,
  style = { display: 'block', minHeight: '250px' }
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Wait for container to be properly sized
    const timer = setTimeout(() => {
      try {
        // Check if container has width
        if (adRef.current && adRef.current.offsetWidth > 0) {
          // Load AdSense script dynamically
          const script = document.createElement('script');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3275113356221002';
          script.async = true;
          script.crossOrigin = 'anonymous';
          
          script.onload = () => {
            try {
              (window as any).adsbygoogle = (window as any).adsbygoogle || [];
              (window as any).adsbygoogle.push({});
              setAdLoaded(true);
            } catch (e) {
              console.error('AdSense push error:', e);
            }
          };

          script.onerror = () => {
            console.error('Failed to load AdSense script');
          };

          document.head.appendChild(script);

          return () => {
            // Cleanup script on unmount
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          };
        }
      } catch (e) {
        console.error('AdSense initialization error:', e);
      }
    }, 100); // Small delay to ensure container is sized

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '250px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          ...style,
          minWidth: '300px',
          minHeight: '250px'
        }}
        data-ad-client="ca-pub-3275113356221002"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
      {!adLoaded && (
        <div style={{ 
          position: 'absolute', 
          color: '#999', 
          fontSize: '12px',
          textAlign: 'center'
        }}>
          {/* Placeholder while ad loads */}
        </div>
      )}
    </div>
  );
}

