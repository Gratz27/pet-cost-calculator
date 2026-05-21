import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from './ui/button';

interface SocialShareProps {
  title: string;
  description: string;
  url?: string;
}

export function SocialShare({ title, description, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800" data-social-share>
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Share Your Results
        </h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Help others plan their pet budget by sharing your cost estimate
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => handleShare('facebook')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>

        <Button
          onClick={() => handleShare('twitter')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-colors"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>

        <Button
          onClick={() => handleShare('linkedin')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>

        <Button
          onClick={() => handleShare('email')}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-gray-600 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="hidden sm:inline">Email</span>
        </Button>

        <Button
          onClick={handleCopyLink}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Copy Link</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

