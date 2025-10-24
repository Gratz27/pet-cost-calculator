import { TrendingUp } from 'lucide-react';

interface PopularBadgeProps {
  percentage?: number;
}

export function PopularBadge({ percentage }: PopularBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
      <TrendingUp className="w-3 h-3" />
      {percentage ? `${percentage}% choose this` : 'Popular'}
    </span>
  );
}

