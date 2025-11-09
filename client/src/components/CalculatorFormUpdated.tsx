import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { CurrencyInput } from '@/components/ui/currency-input';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { HelpTooltip } from '@/components/ui/help-tooltip';
import { PopularBadge } from '@/components/ui/popular-badge';
import { ExpandableHelp } from '@/components/ui/expandable-help';
import { ExampleScenario } from '@/components/ui/example-scenario';
import { 
  Dog, Cat, PawPrint, ArrowLeft, ArrowRight, CheckCircle2, Edit2, Save, Share2,
  DollarSign, Shield, GraduationCap, Stethoscope, Home, Briefcase, Plane, 
  Activity, UtensilsCrossed, Scissors
} from 'lucide-react';
import { getAllBreeds, calculateCosts, type CalculatorInputs, type CostBreakdown } from '@/lib/calculator';
import { lookupPostalCode, formatLocation, type LocationData } from '@/lib/postalCodeLookup';
import { saveProgress, loadProgress, generateShareableLink, clearProgress, type SavedProgress } from '@/lib/saveProgress';
import { saveLocation, getSavedLocation } from '@/lib/locationMemory';
import { getBreedRecommendation, generalStatistics } from '@/data/breedRecommendations';
import { toast } from 'sonner';

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs, results: CostBreakdown) => void;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [step, setStep] = useState(1);
  
  // Step 1-2: Pet selection
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [breedId, setBreedId] = useState('');
  
  // Step 3: Location
  const [location, setLocation] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  
  // Step 4: Living situation
  const [livingSituation, setLivingSituation] = useState<'own-home' | 'rent-apartment' | 'rent-house' | 'other'>('own-home');
  const [hasPetDeposit, setHasPetDeposit] = useState<'yes' | 'no' | 'not-sure'>('no');
  const [petDepositAmount, setPetDepositAmount] = useState('');
  
  // Step 5: Initial costs
  const [purchaseFee, setPurchaseFee] = useState('');
  const [purchaseFeeUnknown, setPurchaseFeeUnknown] = useState(false);
  const [insurance, setInsurance] = useState<'yes' | 'maybe' | 'no'>('maybe');
  const [training, setTraining] = useState<'yes' | 'maybe' | 'no'>('maybe');
  const [initialVet, setInitialVet] = useState<'known' | 'estimate'>('estimate');
  const [initialVetAmount, setInitialVetAmount] = useState('');
  
  // Step 6: Lifestyle
  const [workSchedule, setWorkSchedule] = useState('9-5');
  const [travelFrequency, setTravelFrequency] = useState('occasionally');
  const [activityLevel, setActivityLevel] = useState('moderate');
  
  // Step 7: Ongoing services
  const [foodType, setFoodType] = useState<'premium' | 'standard'>('standard');
  const [groomingFrequency, setGroomingFrequency] = useState<'1-2-weeks' | 'monthly' | '3-months' | 'diy'>('3-months');
  const [daycareFrequency, setDaycareFrequency] = useState<'daily' | '2-3-week' | 'occasionally' | 'never'>('never');
  const [dentalCare, setDentalCare] = useState<'annual' | 'as-needed'>('as-needed');

  const breeds = getAllBreeds(petType);
  const totalSteps = 8;
  const breedRec = breedId ? getBreedRecommendation(breedId) : null;

  // Load saved progress and location on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeCode = urlParams.get('resume');
    const saved = loadProgress(resumeCode || undefined);
    
    // Load saved location if no progress to restore
    if (!saved) {
      const savedLoc = getSavedLocation();
      if (savedLoc) {
        setLocation(savedLoc.postalCode);
        setLocationData({
          city: savedLoc.city,
          state: savedLoc.state,
          country: savedLoc.country,
          countryCode: ''
        });
      }
    }
    
    if (saved) {
      setStep(saved.step);
      setPetType(saved.petType);
      setBreedId(saved.breedId);
      setLocation(saved.location);
      setLivingSituation(saved.livingSituation);
      setPurchaseFee(saved.purchaseFee);
      setPurchaseFeeUnknown(saved.purchaseFeeUnknown);
      setInsurance(saved.insurance);
      setTraining(saved.training);
      setInitialVet(saved.initialVet);
      setInitialVetAmount(saved.initialVetAmount);
      setPetDepositAmount(saved.petDepositAmount);
      setWorkSchedule(saved.workSchedule);
      setTravelFrequency(saved.travelFrequency);
      setActivityLevel(saved.activityLevel);
      setFoodType(saved.foodType);
      setGroomingFrequency(saved.groomingFrequency);
      setDaycareFrequency(saved.daycareFrequency);
      setDentalCare(saved.dentalCare);
      toast.success('Progress restored!');
    }
  }, []);

  // Auto-save progress when form changes
  useEffect(() => {
    if (step > 1) {
      const progress: SavedProgress = {
        step,
        petType,
        breedId,
        location,
        livingSituation,
        purchaseFee,
        purchaseFeeUnknown,
        insurance,
        training,
        initialVet,
        initialVetAmount,
        petDepositAmount,
        workSchedule,
        travelFrequency,
        activityLevel,
        foodType,
        groomingFrequency,
        daycareFrequency,
        dentalCare,
        timestamp: Date.now()
      };
      saveProgress(progress);
    }
  }, [step, petType, breedId, location, livingSituation, purchaseFee, purchaseFeeUnknown, insurance, training, initialVet, initialVetAmount, petDepositAmount, workSchedule, travelFrequency, activityLevel, foodType, groomingFrequency, daycareFrequency, dentalCare]);

  // Lookup postal code when user types
  useEffect(() => {
    if (location.length >= 4) {
      setIsLookingUp(true);
      const timer = setTimeout(async () => {
        const data = await lookupPostalCode(location);
        setLocationData(data);
        setIsLookingUp(false);
        
        // Save location for future visits
        if (data) {
          saveLocation({
            postalCode: location,
            city: data.city,
            state: data.state,
            country: data.country,
            timestamp: Date.now()
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setLocationData(null);
    }
  }, [location]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    const inputs: CalculatorInputs = {
      petType,
      breedId,
      location,
      livingSituation,
      workSchedule,
      travelFrequency,
      activityLevel,
      purchaseFee: purchaseFeeUnknown ? undefined : (purchaseFee ? parseFloat(purchaseFee) : undefined),
      insurance,
      training,
      initialVet: initialVet === 'known' ? parseFloat(initialVetAmount) : undefined,
      petDeposit: hasPetDeposit === 'yes' ? parseFloat(petDepositAmount || '0') : 0,
      foodType,
      groomingFrequency,
      daycareFrequency,
      dentalCare
    };

    const results = calculateCosts(inputs);
    if (results) {
      onCalculate(inputs, results);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return petType === 'dog' || petType === 'cat';
      case 2:
        return breedId !== '';
      case 3:
        return location.trim() !== '';
      case 4:
        return livingSituation !== null;
      case 5:
      case 6:
      case 7:
      case 8:
        return true;
      default:
        return false;
    }
  };

  const jumpToStep = (targetStep: number) => {
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper function to calculate estimated monthly costs
  function calculateMonthlyEstimate() {
    let total = 0;
    
    if (foodType === 'premium') total += 80;
    else total += 40;
    
    if (groomingFrequency === '1-2-weeks') total += 120;
    else if (groomingFrequency === 'monthly') total += 60;
    else if (groomingFrequency === '3-months') total += 20;
    
    // Daycare (dogs only)
    if (petType === 'dog') {
      if (daycareFrequency === 'daily') total += 500;
      else if (daycareFrequency === '2-3-week') total += 250;
      else if (daycareFrequency === 'occasionally') total += 75;
    }
    
    if (dentalCare === 'annual') total += 25;
    
    return Math.round(total);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="container max-w-3xl">
        {/* Enhanced Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-sm font-semibold text-foreground">
                Step {step} of {totalSteps}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                • {Math.round((step / totalSteps) * 100)}% Complete
              </span>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              ~{Math.max(1, totalSteps - step)} min remaining
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-3">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  stepNum < step ? 'bg-primary text-primary-foreground' :
                  stepNum === step ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {stepNum < step ? '✓' : stepNum}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card - Mobile optimized with bottom margin */}
        <Card className="p-6 md:p-8 mb-24 md:mb-0">
          {/* STEP 1: Pet Type - With Example Scenarios */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">What type of pet are you considering?</h2>
                <p className="text-muted-foreground">Choose the pet type to get started</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPetType('dog')}
                  className={`p-6 md:p-8 rounded-lg border-2 transition-all hover:scale-105 min-h-[120px] md:min-h-auto ${
                    petType === 'dog' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Dog className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="text-xl font-semibold">Dog</p>
                </button>
                
                <button
                  onClick={() => setPetType('cat')}
                  className={`p-6 md:p-8 rounded-lg border-2 transition-all hover:scale-105 min-h-[120px] md:min-h-auto ${
                    petType === 'cat' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Cat className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="text-xl font-semibold">Cat</p>
                </button>
              </div>

              {/* Example Scenarios */}
              <ExpandableHelp title="See real examples from pet owners">
                <div className="space-y-3 mt-3">
                  <ExampleScenario
                    name="Sarah"
                    pet="Golden Retriever"
                    location="Seattle, WA"
                    cost="$28,450 lifetime"
                    details="Includes premium food, monthly grooming, pet insurance, and annual vet visits. First year: $4,200."
                  />
                  <ExampleScenario
                    name="Mike"
                    pet="Domestic Shorthair Cat"
                    location="Austin, TX"
                    cost="$12,800 lifetime"
                    details="Standard food, minimal grooming, no insurance. First year: $1,850 including adoption fee."
                  />
                </div>
              </ExpandableHelp>
            </div>
          )}

          {/* STEP 2: Breed Selection - With Breed Insights */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Which breed are you interested in?</h2>
                <p className="text-muted-foreground">
                  Choose from {breeds.length} {petType} breeds (alphabetically sorted)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="breed" className="flex items-center gap-2">
                  <PawPrint className="w-4 h-4" />
                  Select Breed
                </Label>
                <select
                  id="breed"
                  value={breedId}
                  onChange={(e) => setBreedId(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary min-h-[48px] text-base"
                >
                  <option value="">-- Select a breed --</option>
                  {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted-foreground">
                  Don't see your breed? Select "Other Breed (Not Listed)" for average estimates
                </p>
              </div>

              {/* Breed-specific insight */}
              {breedRec && breedId && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>💡 Insight:</strong> {breedRec.insight}
                  </p>
                </div>
              )}

              {/* Helpful Tips */}
              <ExpandableHelp title="How breed affects costs">
                <div className="space-y-2">
                  <p><strong>Size matters:</strong> Larger breeds typically cost more for food, medications, and boarding.</p>
                  <p><strong>Grooming needs:</strong> Breeds like Poodles and Shih Tzus require regular professional grooming ($50-80/visit).</p>
                  <p><strong>Health considerations:</strong> Some breeds are prone to specific health issues that increase vet costs.</p>
                  <p><strong>Activity level:</strong> High-energy breeds may need daycare or dog walking services.</p>
                </div>
              </ExpandableHelp>
            </div>
          )}

          {/* STEP 3: Location - Already has location memory */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Where do you live?</h2>
                <p className="text-muted-foreground">
                  Location helps us estimate regional costs for veterinary care and services
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Postal/ZIP Code</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Enter your postal/ZIP code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="text-lg p-6 min-h-[48px]"
                  />
                </div>

                {isLookingUp && (
                  <p className="text-sm text-muted-foreground">Looking up location...</p>
                )}

                {locationData && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-900 dark:text-green-100">
                      ✓ Location confirmed: {formatLocation(locationData)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons - Mobile Optimized with Sticky Bottom */}
          <div className="mt-8 pt-6 border-t space-y-4 md:relative md:static fixed bottom-0 left-0 right-0 bg-card md:bg-transparent p-4 md:p-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none z-50">
            {/* Save & Share buttons */}
            {step > 1 && step < totalSteps && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const progress: SavedProgress = {
                      step, petType, breedId, location, livingSituation,
                      purchaseFee, purchaseFeeUnknown, insurance, training,
                      initialVet, initialVetAmount, petDepositAmount,
                      workSchedule, travelFrequency, activityLevel,
                      foodType, groomingFrequency, daycareFrequency, dentalCare,
                      timestamp: Date.now()
                    };
                    const code = saveProgress(progress);
                    toast.success('Progress saved! You can close this page and return later.');
                  }}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Progress
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const progress: SavedProgress = {
                      step, petType, breedId, location, livingSituation,
                      purchaseFee, purchaseFeeUnknown, insurance, training,
                      initialVet, initialVetAmount, petDepositAmount,
                      workSchedule, travelFrequency, activityLevel,
                      foodType, groomingFrequency, daycareFrequency, dentalCare,
                      timestamp: Date.now()
                    };
                    const code = saveProgress(progress);
                    const link = generateShareableLink(code);
                    navigator.clipboard.writeText(link);
                    toast.success('Link copied! Share it to resume later or on another device.');
                  }}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </Button>
              </div>
            )}
            
            {/* Back & Next buttons - Mobile Optimized */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2 min-h-[48px] text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2 min-h-[48px] text-base"
              >
                {step === totalSteps ? 'Calculate My Costs' : 'Next'}
                {step < totalSteps && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

