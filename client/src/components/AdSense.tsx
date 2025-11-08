import { useEffect } from 'react';

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
  style = { display: 'block' }
}: AdSenseProps) {
  useEffect(() => {
    // Load AdSense script dynamically only when component mounts
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3275113356221002';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Push ad after script loads
    script.onload = () => {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    };

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-3275113356221002"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}

