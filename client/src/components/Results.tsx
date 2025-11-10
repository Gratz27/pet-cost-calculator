import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, DollarSign, TrendingUp, Calendar, PawPrint, Edit2, Check } from 'lucide-react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { formatCurrency, type CalculatorInputs, type CostBreakdown, getBreedById } from '@/lib/calculator';
import LegalDisclaimer from './LegalDisclaimer';
import { SocialShare } from './SocialShare';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ResultsProps {
  inputs: CalculatorInputs;
  results: CostBreakdown;
  onRecalculate: () => void;
}

interface EditableFirstYearCosts {
  adoptionFee: number;
  initialVet: number;
  supplies: number;
  training: number;
  petDeposit: number;
  food: number;
  grooming: number;
  insurance: number;
}

export default function Results({ inputs, results, onRecalculate }: ResultsProps) {
  const breed = getBreedById(inputs.petType, inputs.breedId);
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable first-year costs
  const [firstYearCosts, setFirstYearCosts] = useState<EditableFirstYearCosts>({
    adoptionFee: results.firstYear.adoptionFee,
    initialVet: results.firstYear.initialVet,
    supplies: results.firstYear.supplies,
    training: results.firstYear.training,
    petDeposit: results.firstYear.petDeposit,
    food: results.firstYear.food,
    grooming: results.firstYear.grooming,
    insurance: results.firstYear.insurance,
  });

  // Track which items are included
  const [includedItems, setIncludedItems] = useState({
    adoptionFee: true,
    initialVet: true,
    supplies: true,
    training: true,
    petDeposit: results.firstYear.petDeposit > 0,
    food: true,
    grooming: true,
    insurance: true,
  });

  // Calculate adjusted totals
  const adjustedFirstYearTotal = useMemo(() => {
    return Object.entries(firstYearCosts).reduce((sum, [key, value]) => {
      return sum + (includedItems[key as keyof typeof includedItems] ? value : 0);
    }, 0);
  }, [firstYearCosts, includedItems]);

  const adjustedAnnualTotal = useMemo(() => {
    return (
      (includedItems.food ? results.annual.food : 0) +
      (includedItems.initialVet ? results.annual.vet : 0) +
      (includedItems.grooming ? results.annual.grooming : 0) +
      (includedItems.insurance ? results.annual.insurance : 0) +
      (includedItems.supplies ? results.annual.supplies : 0)
    );
  }, [results.annual, includedItems]);

  const adjustedLifetimeTotal = useMemo(() => {
    return adjustedFirstYearTotal + (adjustedAnnualTotal * (results.lifetime.years - 1));
  }, [adjustedFirstYearTotal, adjustedAnnualTotal, results.lifetime.years]);

  // Pie chart data for first-year costs
  const firstYearChartData = useMemo(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const colors: string[] = [];
    
    const colorMap = {
      adoptionFee: 'rgb(76, 175, 80)',
      initialVet: 'rgb(33, 150, 243)',
      supplies: 'rgb(255, 193, 7)',
      training: 'rgb(156, 39, 176)',
      petDeposit: 'rgb(255, 87, 34)',
      food: 'rgb(0, 188, 212)',
      grooming: 'rgb(233, 30, 99)',
      insurance: 'rgb(121, 85, 72)',
    };

    const labelMap = {
      adoptionFee: 'Purchase/Adoption Fee',
      initialVet: 'Initial Vet',
      supplies: 'Supplies',
      training: 'Training',
      petDeposit: 'Pet Deposit',
      food: 'Food (Year 1)',
      grooming: 'Grooming',
      insurance: 'Insurance',
    };

    Object.entries(firstYearCosts).forEach(([key, value]) => {
      if (includedItems[key as keyof typeof includedItems] && value > 0) {
        labels.push(labelMap[key as keyof typeof labelMap]);
        data.push(value);
        colors.push(colorMap[key as keyof typeof colorMap]);
      }
    });

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
      }],
    };
  }, [firstYearCosts, includedItems]);

  // Pie chart data for annual costs comparison
  const annualChartData = {
    labels: ['Food', 'Vet Care', 'Grooming', 'Insurance', 'Supplies'],
    datasets: [
      {
        data: [
          includedItems.food ? results.annual.food : 0,
          includedItems.initialVet ? results.annual.vet : 0,
          includedItems.grooming ? results.annual.grooming : 0,
          includedItems.insurance ? results.annual.insurance : 0,
          includedItems.supplies ? results.annual.supplies : 0,
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green - Food
          'rgba(239, 68, 68, 0.8)',   // Red - Vet
          'rgba(14, 165, 233, 0.8)',  // Sky - Grooming
          'rgba(59, 130, 246, 0.8)',  // Blue - Insurance
          'rgba(236, 72, 153, 0.8)'   // Pink - Supplies
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const updateCost = (key: keyof EditableFirstYearCosts, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFirstYearCosts(prev => ({ ...prev, [key]: Math.max(0, numValue) }));
  };

  const toggleItem = (key: keyof typeof includedItems) => {
    setIncludedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">PetCost-Calculator.com</span>
            </div>
            <Button variant="outline" onClick={onRecalculate}>
              Recalculate
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-12 max-w-5xl">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Your Pet Cost Estimate: {breed?.name}
          </h1>
          <p className="text-muted-foreground">
            Based on your location in {inputs.location} and your lifestyle
          </p>
        </div>

        {/* Summary Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">First-Year Cost</div>
              <div className="text-4xl font-bold text-primary">
                {formatCurrency(adjustedFirstYearTotal)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Annual Ongoing Cost</div>
              <div className="text-4xl font-bold text-secondary">
                {formatCurrency(adjustedAnnualTotal)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                ~{formatCurrency(Math.round(adjustedAnnualTotal / 12))}/month
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">
                Lifetime Cost ({results.lifetime.years} years)
              </div>
              <div className="text-4xl font-bold">
                {formatCurrency(adjustedLifetimeTotal)}
              </div>
            </div>
          </div>
        </Card>

        {/* First-Year Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">First-Year Cost Breakdown</h2>
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Done
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </>
                )}
              </Button>
            </div>
            
            <div className="max-w-sm mx-auto mb-6">
              <Pie 
                data={firstYearChartData} 
                options={{ 
                  plugins: { 
                    legend: { 
                      position: 'bottom',
                      labels: {
                        font: { size: 11 },
                        padding: 8
                      }
                    } 
                  } 
                }} 
              />
            </div>

            {!isEditing && (
              <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
                💡 Click "Edit" to adjust costs or exclude items you don't need
              </div>
            )}
            
            <div className="space-y-3">
              {/* Purchase/Adoption Fee */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={includedItems.adoptionFee}
                  onCheckedChange={() => toggleItem('adoptionFee')}
                  disabled={!isEditing}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium">Purchase/Adoption Fee</Label>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={firstYearCosts.adoptionFee}
                    onChange={(e) => updateCost('adoptionFee', e.target.value)}
                    className="w-24 h-8 text-right"
                    disabled={!includedItems.adoptionFee}
                  />
                ) : (
                  <span className={`font-semibold ${!includedItems.adoptionFee ? 'line-through text-muted-foreground' : ''}`}>
                    {formatCurrency(firstYearCosts.adoptionFee)}
                  </span>
                )}
              </div>

              {/* Initial Vet Care */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={includedItems.initialVet}
                  onCheckedChange={() => toggleItem('initialVet')}
                  disabled={!isEditing}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium">Initial Vet Care</Label>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={firstYearCosts.initialVet}
                    onChange={(e) => updateCost('initialVet', e.target.value)}
                    className="w-24 h-8 text-right"
                    disabled={!includedItems.initialVet}
                  />
                ) : (
                  <span className={`font-semibold ${!includedItems.initialVet ? 'line-through text-muted-foreground' : ''}`}>
                    {formatCurrency(firstYearCosts.initialVet)}
                  </span>
                )}
              </div>

              {/* Supplies */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={includedItems.supplies}
                  onCheckedChange={() => toggleItem('supplies')}
                  disabled={!isEditing}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium">Supplies</Label>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={firstYearCosts.supplies}
                    onChange={(e) => updateCost('supplies', e.target.value)}
                    className="w-24 h-8 text-right"
                    disabled={!includedItems.supplies}
                  />
                ) : (
                  <span className={`font-semibold ${!includedItems.supplies ? 'line-through text-muted-foreground' : ''}`}>
                    {formatCurrency(firstYearCosts.supplies)}
                  </span>
                )}
              </div>

              {/* Training */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={includedItems.training}
                  onCheckedChange={() => toggleItem('training')}
                  disabled={!isEditing}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium">Training</Label>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={firstYearCosts.training}
                    onChange={(e) => updateCost('training', e.target.value)}
                    className="w-24 h-8 text-right"
                    disabled={!includedItems.training}
                  />
                ) : (
                  <span className={`font-semibold ${!includedItems.training ? 'line-through text-muted-foreground' : ''}`}>
                    {formatCurrency(firstYearCosts.training)}
                  </span>
                )}
              </div>

              {/* Pet Deposit */}
              {(isEditing || firstYearCosts.petDeposit > 0) && (
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={includedItems.petDeposit}
                    onCheckedChange={() => toggleItem('petDeposit')}
                    disabled={!isEditing}
                  />
                  <div className="flex-1">
                    <Label className="text-sm font-medium">Pet Deposit</Label>
                  </div>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={firstYearCosts.petDeposit}
                      onChange={(e) => updateCost('petDeposit', e.target.value)}
                      className="w-24 h-8 text-right"
                      disabled={!includedItems.petDeposit}
                    />
                  ) : (
                    <span className={`font-semibold ${!includedItems.petDeposit ? 'line-through text-muted-foreground' : ''}`}>
                      {formatCurrency(firstYearCosts.petDeposit)}
                    </span>
                  )}
                </div>
              )}

              {/* Food (Year 1) */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={includedItems.food}
                  onCheckedChange={() => toggleItem('food')}
                  disabled={!isEditing}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium">Food (Year 1)</Label>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={firstYearCosts.food}
                    onChange={(e) => updateCost('food', e.target.value)}
                    className="w-24 h-8 text-right"
                    disabled={!includedItems.food}
                  />
                ) : (
                  <span className={`font-semibold ${!includedItems.food ? 'line-through text-muted-foreground' : ''}`}>
                    {formatCurrency(firstYearCosts.food)}
                  </span>
                )}
              </div>

              {/* Grooming */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={includedItems.grooming}
                  onCheckedChange={() => toggleItem('grooming')}
                  disabled={!isEditing}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium">Grooming</Label>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={firstYearCosts.grooming}
                    onChange={(e) => updateCost('grooming', e.target.value)}
                    className="w-24 h-8 text-right"
                    disabled={!includedItems.grooming}
                  />
                ) : (
                  <span className={`font-semibold ${!includedItems.grooming ? 'line-through text-muted-foreground' : ''}`}>
                    {formatCurrency(firstYearCosts.grooming)}
                  </span>
                )}
              </div>

              {/* Insurance */}
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Checkbox
                  checked={includedItems.insurance}
                  onCheckedChange={() => toggleItem('insurance')}
                  disabled={!isEditing}
                />
                <div className="flex-1">
                  <Label className="text-sm font-medium">Pet Insurance</Label>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    value={firstYearCosts.insurance}
                    onChange={(e) => updateCost('insurance', e.target.value)}
                    className="w-24 h-8 text-right"
                    disabled={!includedItems.insurance}
                  />
                ) : (
                  <span className={`font-semibold ${!includedItems.insurance ? 'line-through text-muted-foreground' : ''}`}>
                    {formatCurrency(firstYearCosts.insurance)}
                  </span>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-3 border-t-2 border-primary">
                <span className="font-bold text-lg">First-Year Total:</span>
                <span className="font-bold text-lg text-primary">
                  {formatCurrency(adjustedFirstYearTotal)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Annual Ongoing Costs</h2>
            <Pie 
              data={annualChartData} 
              options={{ 
                responsive: true,
                plugins: { 
                  legend: { 
                    position: 'bottom' as const,
                    labels: {
                      padding: 15,
                      font: { size: 12 }
                    }
                  } 
                }
              }} 
            />
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Food:</span>
                <span className={`font-semibold ${!includedItems.food ? 'line-through text-muted-foreground' : ''}`}>
                  {formatCurrency(results.annual.food)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Routine Vet Care:</span>
                <span className={`font-semibold ${!includedItems.initialVet ? 'line-through text-muted-foreground' : ''}`}>
                  {formatCurrency(results.annual.vet)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Grooming:</span>
                <span className={`font-semibold ${!includedItems.grooming ? 'line-through text-muted-foreground' : ''}`}>
                  {formatCurrency(results.annual.grooming)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pet Insurance:</span>
                <span className={`font-semibold ${!includedItems.insurance ? 'line-through text-muted-foreground' : ''}`}>
                  {formatCurrency(results.annual.insurance)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Supplies:</span>
                <span className={`font-semibold ${!includedItems.supplies ? 'line-through text-muted-foreground' : ''}`}>
                  {formatCurrency(results.annual.supplies)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold">
                <span>Annual Total:</span>
                <span className="text-secondary">{formatCurrency(adjustedAnnualTotal)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Lifetime Projection */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Lifetime Cost Projection</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="font-semibold">Expected Lifespan</div>
                <div className="text-sm text-muted-foreground">{breed?.description}</div>
              </div>
              <div className="text-3xl font-bold">{results.lifetime.years} years</div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">First Year</div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(adjustedFirstYearTotal)}
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Years 2-{results.lifetime.years}</div>
                <div className="text-2xl font-bold text-secondary">
                  {formatCurrency(adjustedAnnualTotal * (results.lifetime.years - 1))}
                </div>
              </div>
              <div className="p-4 border rounded-lg bg-primary/5">
                <div className="text-sm text-muted-foreground mb-1">Total Lifetime</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(adjustedLifetimeTotal)}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Hidden Costs Warning */}
        <Card className="p-6 mb-8 border-amber-500/50 bg-amber-50/50">
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Don't Forget Hidden Costs!</h3>
              <p className="text-muted-foreground mb-4">
                These estimates don't include unexpected expenses that many pet owners face:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Emergency Vet Care:</strong> $500-$5,000+ per incident</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Boarding/Pet Sitting:</strong> $25-75 per day when traveling</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Furniture/Property Damage:</strong> Especially common with puppies and kittens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Dental Care:</strong> $300-1,500 for cleanings and treatments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span><strong>Specialized Diets:</strong> Medical conditions may require expensive prescription food</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-bold mb-2">🛡️ Pet Insurance</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Protect yourself from unexpected vet bills with comprehensive pet insurance.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-bold mb-2">🍖 Food Subscription</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Save 20-30% on premium pet food with auto-delivery subscriptions.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://www.chewy.com" target="_blank" rel="noopener noreferrer">
                Shop Chewy
              </a>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-bold mb-2">📦 Pet Supplies</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get everything you need for your new pet at competitive prices.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="https://www.amazon.com/pet-supplies" target="_blank" rel="noopener noreferrer">
                Shop Now
              </a>
            </Button>
          </Card>
        </div>

        {/* Email Capture */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">Get Your Free Pet Budget Checklist</h2>
            <p className="text-muted-foreground mb-6">
              Download our comprehensive checklist to make sure you're prepared for every expense.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="flex-1" />
              <Button>Send Checklist</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </Card>

        {/* Social Share */}
        <SocialShare
          title={`My ${breed?.name || inputs.petType} will cost ${formatCurrency(results.lifetime.total)} over their lifetime`}
          description={`I used PetCost-Calculator.com to estimate my pet costs: First Year: ${formatCurrency(results.firstYear.total)}, Annual: ${formatCurrency(results.annual.total)}, Lifetime: ${formatCurrency(results.lifetime.total)}`}
        />

        {/* Legal Disclaimer */}
        <LegalDisclaimer />
      </div>
    </div>
  );
}

