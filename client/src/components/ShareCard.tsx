import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { Button } from './ui/button';
import { Download, Share2 } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';

interface ShareCardProps {
  petType: string;
  breedName: string;
  lifespan: number;
  totalLifetimeCost: number;
  monthlyCost: number;
  annualCost: number;
  breakdown: {
    vet: number;
    food: number;
    grooming: number;
    other: number;
  };
}

type Theme = 'teal' | 'coral' | 'navy' | 'purple';

export const ShareCard: React.FC<ShareCardProps> = ({
  petType,
  breedName,
  lifespan,
  totalLifetimeCost,
  monthlyCost,
  annualCost,
  breakdown
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme>('teal');
  const [isGenerating, setIsGenerating] = useState(false);

  const petEmoji = petType.toLowerCase() === 'cat' ? '🐈' : petType.toLowerCase() === 'rabbit' ? '🐇' : '🐕';

  // Calculate biggest cost
  const costs = [
    { label: 'Vet & health', value: breakdown.vet },
    { label: 'Food', value: breakdown.food },
    { label: 'Grooming', value: breakdown.grooming },
    { label: 'Supplies & other', value: breakdown.other }
  ];
  
  const biggestCost = costs.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  const biggestCostPct = Math.round((biggestCost.value / totalLifetimeCost) * 100);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsGenerating(true);
      // Wait a tiny bit for fonts/styles to fully render before capturing
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Higher resolution
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `petcost-${breedName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsGenerating(true);
      // Wait a tiny bit for fonts/styles to fully render before capturing
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: true
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        
        const file = new File([blob], `petcost-${breedName.toLowerCase().replace(/\s+/g, '-')}.png`, { type: 'image/png' });
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `True cost of a ${breedName}`,
            text: `Check out the true lifetime cost of a ${breedName}! Calculated via petcost-calculator.com`,
            files: [file]
          });
        } else {
          // Fallback to download if Web Share API is not supported
          handleDownload();
        }
      });
    } catch (error) {
      console.error('Error sharing image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-8">
      <div className="mb-4 flex flex-col gap-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Choose Theme</label>
        <div className="flex gap-2">
          <button 
            onClick={() => setTheme('teal')}
            className={`w-8 h-8 rounded-full border-2 transition-colors ${theme === 'teal' ? 'border-primary' : 'border-transparent'}`}
            style={{ backgroundColor: '#0F6E56' }}
            aria-label="Teal theme"
          />
          <button 
            onClick={() => setTheme('coral')}
            className={`w-8 h-8 rounded-full border-2 transition-colors ${theme === 'coral' ? 'border-primary' : 'border-transparent'}`}
            style={{ backgroundColor: '#993C1D' }}
            aria-label="Coral theme"
          />
          <button 
            onClick={() => setTheme('navy')}
            className={`w-8 h-8 rounded-full border-2 transition-colors ${theme === 'navy' ? 'border-primary' : 'border-transparent'}`}
            style={{ backgroundColor: '#185FA5' }}
            aria-label="Navy theme"
          />
          <button 
            onClick={() => setTheme('purple')}
            className={`w-8 h-8 rounded-full border-2 transition-colors ${theme === 'purple' ? 'border-primary' : 'border-transparent'}`}
            style={{ backgroundColor: '#3C3489' }}
            aria-label="Purple theme"
          />
        </div>
      </div>

      {/* The Card */}
      <div 
        ref={cardRef}
        className={`share-card theme-${theme} rounded-[20px] overflow-hidden font-sans relative mb-6`}
      >
        <div className="card-header p-5 pb-4 relative">
          <div className="flex items-center justify-between mb-3">
            <div className="site-badge text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
              petcost-calculator.com
            </div>
            <div className="pet-emoji-wrap w-14 h-14 rounded-full flex items-center justify-center text-3xl">
              {petEmoji}
            </div>
          </div>
          <div className="text-[13px] font-semibold opacity-70 mb-0.5 uppercase tracking-wider">True ownership cost</div>
          <div className="text-[28px] font-extrabold leading-tight mb-1">{breedName}</div>
          <div className="text-[13px] opacity-65">{lifespan}-year lifetime estimate</div>
        </div>

        <div className="card-total-band py-4 px-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-0.5">Total lifetime cost</div>
          <div className="text-5xl font-black tracking-tight leading-none">{formatCurrency(totalLifetimeCost)}</div>
          <div className="text-[13px] opacity-60 mt-1">{formatCurrency(monthlyCost)} / month over {lifespan} years</div>
        </div>

        <div className="card-breakdown p-3.5 px-5 grid grid-cols-2 gap-2">
          <div className="breakdown-item rounded-lg p-2.5">
            <div className="text-base mb-1">🏥</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-65 mb-0.5">Vet & health</div>
            <div className="text-base font-extrabold">{formatCurrency(breakdown.vet)}</div>
            <div className="text-[10px] opacity-55">lifetime</div>
          </div>
          <div className="breakdown-item rounded-lg p-2.5">
            <div className="text-base mb-1">🍖</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-65 mb-0.5">Food</div>
            <div className="text-base font-extrabold">{formatCurrency(breakdown.food)}</div>
            <div className="text-[10px] opacity-55">lifetime</div>
          </div>
          <div className="breakdown-item rounded-lg p-2.5">
            <div className="text-base mb-1">✂️</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-65 mb-0.5">Grooming</div>
            <div className="text-base font-extrabold">{formatCurrency(breakdown.grooming)}</div>
            <div className="text-[10px] opacity-55">lifetime</div>
          </div>
          <div className="breakdown-item rounded-lg p-2.5">
            <div className="text-base mb-1">🎾</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-65 mb-0.5">Supplies & other</div>
            <div className="text-base font-extrabold">{formatCurrency(breakdown.other)}</div>
            <div className="text-[10px] opacity-55">lifetime</div>
          </div>
        </div>

        <div className="card-bar-section px-5 pb-4">
          <div className="flex justify-between text-[11px] mb-1.5 font-semibold">
            <span>Biggest cost: {biggestCost.label}</span>
            <span>{biggestCostPct}%</span>
          </div>
          <div className="bar-track h-2 rounded-full overflow-hidden">
            <div className="bar-fill h-2 rounded-full transition-all duration-500" style={{ width: `${biggestCostPct}%` }}></div>
          </div>
        </div>

        <div className="card-footer py-3 px-5 flex items-center justify-between border-t border-white/10">
          <div className="text-center">
            <div className="text-[15px] font-extrabold">{formatCurrency(annualCost)}</div>
            <div className="text-[9px] uppercase tracking-wider opacity-55 font-semibold">Per year</div>
          </div>
          <div className="text-[11px] opacity-50 font-semibold tracking-wide">petcost-calculator.com</div>
          <div className="text-center">
            <div className="text-[15px] font-extrabold">{formatCurrency(monthlyCost)}</div>
            <div className="text-[9px] uppercase tracking-wider opacity-55 font-semibold">Per month</div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button 
          variant="outline" 
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          {isGenerating ? 'Saving...' : 'Save Image'}
        </Button>
        
        {navigator.share && (
          <Button 
            onClick={handleShare}
            disabled={isGenerating}
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        )}
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-4">
        * All costs are based on averages and will vary by country and region.
      </p>
    </div>
  );
};
