import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, DollarSign, TrendingUp, Calendar, CheckCircle2, Info, Download, Share2 } from 'lucide-react';
import { exportToPDF } from '@/lib/exportPDF';
import { toast } from 'sonner';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { formatCurrency, type CalculatorInputs, type CostBreakdown, getBreedById } from '@/lib/calculator';
import LegalDisclaimer from './LegalDisclaimer';
import { SocialShare } from './SocialShare';
import Header from './Header';
import EmailCapture from './EmailCapture';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ResultsProps {
  inputs: CalculatorInputs;
  results: CostBreakdown;
  onRecalculate: () => void;
}

export default function Results({ inputs, results, onRecalculate }: ResultsProps) {
  const breed = getBreedById(inputs.petType, inputs.breedId);
  const [costView, setCostView] = useState<'firstYear' | 'annual' | 'lifetime'>('firstYear');

  // Determine which values were user-provided
  const userProvided = {
    adoptionFee: inputs.purchaseFee !== undefined,
    initialVet: inputs.initialVet !== undefined,
    insurance: inputs.insurance !== undefined,
    training: inputs.training !== undefined,
    petDeposit: inputs.petDeposit !== undefined,
    food: inputs.foodType !== undefined,
    grooming: inputs.groomingFrequency !== undefined,
  };

  // Pie chart data for first-year costs
  const pieData = useMemo(() => {
    const costs = results.firstYear;
    const data = [];
    const labels = [];
    const colors = [];

    if (costs.adoptionFee > 0) {
      data.push(costs.adoptionFee);
      labels.push('Purchase/Adoption Fee');
      colors.push('rgba(59, 130, 246, 0.8)'); // Blue
    }
    if (costs.initialVet > 0) {
      data.push(costs.initialVet);
      labels.push('Initial Vet Care');
      colors.push('rgba(251, 146, 60, 0.8)'); // Orange
    }
    if (costs.insurance > 0) {
      data.push(costs.insurance);
      labels.push('Pet Insurance');
      colors.push('rgba(239, 68, 68, 0.8)'); // Red
    }
    if (costs.supplies > 0) {
      data.push(costs.supplies);
      labels.push('Supplies');
      colors.push('rgba(236, 72, 153, 0.8)'); // Pink
    }
    if (costs.training > 0) {
      data.push(costs.training);
      labels.push('Training');
      colors.push('rgba(168, 85, 247, 0.8)'); // Purple
    }
    if (costs.food > 0) {
      data.push(costs.food);
      labels.push('Food');
      colors.push('rgba(34, 197, 94, 0.8)'); // Green
    }
    if (costs.grooming > 0) {
      data.push(costs.grooming);
      labels.push('Grooming');
      colors.push('rgba(14, 165, 233, 0.8)'); // Sky
    }
    if (costs.petDeposit > 0) {
      data.push(costs.petDeposit);
      labels.push('Pet Deposit');
      colors.push('rgba(234, 179, 8, 0.8)'); // Yellow
    }

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderColor: colors.map(c => c.replace('0.8', '1')),
        borderWidth: 2,
      }]
    };
  }, [results.firstYear]);

  // Pie chart data for annual costs
  const annualPieData = useMemo(() => {
    return {
      labels: ['Food', 'Vet Care', 'Grooming', 'Insurance', 'Supplies'],
      datasets: [{
        data: [
          results.annual.food,
          results.annual.vet,
          results.annual.grooming,
          results.annual.insurance,
          results.annual.supplies
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
      }]
    };
  }, [results.annual]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      <div className="py-12">
      <div className="container max-w-6xl" data-pdf-export>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Your {breed?.name} Cost Breakdown
            </h1>
            <p className="text-muted-foreground">
              Personalized estimate based on your inputs
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                try {
                  await exportToPDF(inputs, results);
                  toast.success('PDF downloaded successfully!');
                } catch (error) {
                  toast.error('Failed to generate PDF');
                }
              }}
              variant="outline"
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
              }}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button onClick={onRecalculate} variant="outline">
              Recalculate
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">First-Year Cost</p>
                <p className="text-3xl font-bold">{formatCurrency(results.firstYear.total)}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Everything you need to get started
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annual Ongoing</p>
                <p className="text-3xl font-bold">{formatCurrency(results.annual.total)}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              ~{formatCurrency(results.annual.total / 12)}/month
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-500/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lifetime ({results.lifetime.years} years)</p>
                <p className="text-3xl font-bold">{formatCurrency(results.lifetime.total)}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Total investment over pet's life
            </p>
          </Card>
        </div>

        {/* Cost View Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={costView === 'firstYear' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCostView('firstYear')}
          >
            First Year
          </Button>
          <Button
            variant={costView === 'annual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCostView('annual')}
          >
            Annual
          </Button>
          <Button
            variant={costView === 'lifetime' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCostView('lifetime')}
          >
            Lifetime
          </Button>
        </div>

        {/* First-Year Breakdown */}
        {costView === 'firstYear' && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Pie Chart */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">First-Year Cost Breakdown</h2>
            <div className="max-w-md mx-auto">
              <Pie data={pieData} options={chartOptions} />
            </div>
          </Card>

          {/* Detailed List */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Your First-Year Costs</h2>
            <div className="space-y-3">
              {results.firstYear.adoptionFee > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Purchase/Adoption Fee</span>
                    {userProvided.adoptionFee && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="font-semibold">{formatCurrency(results.firstYear.adoptionFee)}</span>
                </div>
              )}
              
              {results.firstYear.initialVet > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Initial Vet Care</span>
                    {userProvided.initialVet && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="font-semibold">{formatCurrency(results.firstYear.initialVet)}</span>
                </div>
              )}
              
              {results.firstYear.insurance > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Pet Insurance</span>
                    {userProvided.insurance && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="font-semibold">{formatCurrency(results.firstYear.insurance)}</span>
                </div>
              )}
              
              {results.firstYear.supplies > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="font-medium">Supplies</span>
                  <span className="font-semibold">{formatCurrency(results.firstYear.supplies)}</span>
                </div>
              )}
              
              {results.firstYear.training > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Training</span>
                    {userProvided.training && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="font-semibold">{formatCurrency(results.firstYear.training)}</span>
                </div>
              )}
              
              {results.firstYear.food > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Food</span>
                    {userProvided.food && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="font-semibold">{formatCurrency(results.firstYear.food)}</span>
                </div>
              )}
              
              {results.firstYear.grooming > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Grooming</span>
                    {userProvided.grooming && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="font-semibold">{formatCurrency(results.firstYear.grooming)}</span>
                </div>
              )}
              
              {results.firstYear.petDeposit > 0 && (
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Pet Deposit</span>
                    {userProvided.petDeposit && (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="font-semibold">{formatCurrency(results.firstYear.petDeposit)}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between py-3 pt-4 font-bold text-lg">
                <span>Total First Year</span>
                <span className="text-primary">{formatCurrency(results.firstYear.total)}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary/10 rounded-lg flex items-start gap-2">
              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                <CheckCircle2 className="w-3 h-3 inline text-primary" /> indicates values you provided or choices you made
              </p>
            </div>
          </Card>
        </div>

        )}

        {/* Annual Ongoing Costs */}
        {costView === 'annual' && (
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Annual Ongoing Costs</h2>
          <div className="max-w-3xl mx-auto">
            <Pie data={annualPieData} options={chartOptions} />
          </div>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Total Annual: <span className="font-bold text-2xl text-primary">{formatCurrency(results.annual.total)}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Approximately {formatCurrency(results.annual.total / 12)} per month
            </p>
          </div>
          </Card>
        )}

        {/* Lifetime Projection */}
        {costView === 'lifetime' && (
          <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Lifetime Cost Projection</h2>
          <p className="text-muted-foreground mb-6">
            Based on average {breed?.name} lifespan of {results.lifetime.years} years
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">First Year</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(results.firstYear.total)}</p>
            </div>
            
            <div className="p-6 bg-secondary/5 rounded-lg border-2 border-secondary/20">
              <p className="text-sm text-muted-foreground mb-2">Years 2-{results.lifetime.years}</p>
              <p className="text-3xl font-bold text-secondary">
                {formatCurrency(results.annual.total * (results.lifetime.years - 1))}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {formatCurrency(results.annual.total)}/year × {results.lifetime.years - 1} years
              </p>
            </div>
            
            <div className="p-6 bg-amber-500/5 rounded-lg border-2 border-amber-500/20">
              <p className="text-sm text-muted-foreground mb-2">Total Lifetime</p>
              <p className="text-3xl font-bold text-amber-600">{formatCurrency(results.lifetime.total)}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Emergency Fund Recommendation:</strong> Set aside {formatCurrency(results.lifetime.emergencyFund)} for unexpected veterinary emergencies
            </p>
          </div>
        </Card>
        )}

        {/* Hidden Costs Warning */}
        <Card className="p-8 mb-12 border-2 border-amber-500/50 bg-amber-50">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4 text-amber-900">Don't Forget Hidden Costs!</h2>
              <p className="text-amber-800 mb-4">
                Beyond regular expenses, budget for these often-overlooked costs:
              </p>
              <ul className="space-y-2 text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Boarding/Pet Sitting:</strong> {formatCurrency(results.hiddenCosts.boarding)}/year based on your travel frequency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Furniture Damage:</strong> ~{formatCurrency(results.hiddenCosts.furniture)}/year for repairs and replacements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Extra Cleaning:</strong> ~{formatCurrency(results.hiddenCosts.cleaning)}/year for additional cleaning supplies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span><strong>Emergency Vet Visits:</strong> Unexpected illnesses or injuries can cost $500-5,000+</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Personalized Recommendations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Personalized Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Show insurance card only if user selected yes or maybe */}
            {(inputs.insurance === 'yes' || inputs.insurance === 'maybe') && (
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4 text-center">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Recommended Insurance Plans</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your {breed?.name} in {inputs.location}
                </p>
                <p className="text-2xl font-bold text-primary mb-4">
                  $40-60/month
                </p>
                <Button className="w-full" variant="default" disabled>
                  Coming Soon
                </Button>
              </Card>
            )}

            {/* Food subscription - personalized to food type */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-center">🍖</div>
              <h3 className="text-xl font-bold mb-2">
                {inputs.foodType === 'premium' ? 'Premium' : 'Quality'} Food Delivery
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Fresh, nutritious meals from trusted brands
              </p>
              <div className="space-y-2 mb-4">
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => window.open('https://yumwoof.com/discount/PETCOSTCALCULAT?ref=rjdfquwx', '_blank')}
                >
                  YumWoof - Use code: PETCOSTCALCULAT
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.open('https://tidd.ly/3JqYJ4T', '_blank')}
                >
                  Barking Heads & Meowing Heads
                </Button>
              </div>
            </Card>

            {/* Essential supplies */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4 text-center">📦</div>
              <h3 className="text-xl font-bold mb-2">Pet Accessories</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Essential accessories and lifestyle products
              </p>
              <div className="space-y-2 mb-4">
                <Button 
                  className="w-full" 
                  variant="default"
                  onClick={() => window.open('https://tidd.ly/3LabGk5', '_blank')}
                >
                  Pet Lifestyle and You
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => window.open('https://tidd.ly/4oFAlLH', '_blank')}
                >
                  Purr & Mutt
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Email Capture */}
        <EmailCapture />

        {/* Social Share */}
        <SocialShare
          title={`My ${breed?.name || inputs.petType} will cost ${formatCurrency(results.lifetime.total)} over their lifetime`}
          description={`I used PetCost-Calculator.com to estimate my pet costs: First Year: ${formatCurrency(results.firstYear.total)}, Annual: ${formatCurrency(results.annual.total)}, Lifetime: ${formatCurrency(results.lifetime.total)}`}
        />

        {/* Legal Disclaimer */}
        <LegalDisclaimer />
      </div>
      </div>
    </div>
  );
}

