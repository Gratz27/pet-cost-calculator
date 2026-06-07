import { User } from 'lucide-react';

interface ExampleScenarioProps {
  name: string;
  pet: string;
  location: string;
  cost: string;
  details: string;
}

export function ExampleScenario({ name, pet, location, cost, details }: ExampleScenarioProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{name}'s {pet}</h4>
            <span className="text-xs text-muted-foreground">in {location}</span>
          </div>
          <p className="text-2xl font-bold text-primary mb-2">{cost}</p>
          <p className="text-sm text-muted-foreground">{details}</p>
        </div>
      </div>
    </div>
  );
}

