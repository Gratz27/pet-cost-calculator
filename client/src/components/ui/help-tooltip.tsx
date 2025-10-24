import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HelpTooltipProps {
  content: string;
  example?: string;
}

export function HelpTooltip({ content, example }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-muted transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-sm">{content}</p>
          {example && (
            <p className="text-xs text-muted-foreground mt-2 italic">
              Example: {example}
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

