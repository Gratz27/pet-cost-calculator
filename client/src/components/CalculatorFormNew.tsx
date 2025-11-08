import { useState, useEffect, useMemo } from 'react';
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
import { Dog, Cat, PawPrint, ArrowLeft, ArrowRight, CheckCircle2, Edit2, Save, Share2, DollarSign, Shield, GraduationCap, Stethoscope, Home, Briefcase, Plane, Activity, UtensilsCrossed, Scissors } from 'lucide-react';
import { getAllBreeds, calculateCosts, type CalculatorInputs, type CostBreakdown } from '@/lib/calculator';
import { lookupPostalCode, formatLocation, type LocationData } from '@/lib/postalCodeLookup';
import { saveProgress, loadProgress, generateShareableLink, clearProgress, type SavedProgress } from '@/lib/saveProgress';
import { saveLocation, getSavedLocation } from '@/lib/locationMemory';
import { getBreedRecommendation, generalStatistics } from '@/data/breedRecommendations';
import { toast } from 'sonner';
import Header from './Header';

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
  
  // Step 5: Initial costs (NEW)
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
  
  // Step 7: Ongoing services (NEW)
  const [foodType, setFoodType] = useState<'premium' | 'standard'>('standard');
  const [groomingFrequency, setGroomingFrequency] = useState<'1-2-weeks' | 'monthly' | '3-months' | 'diy'>('3-months');
  const [daycareFrequency, setDaycareFrequency] = useState<'daily' | '2-3-week' | 'occasionally' | 'never'>('never');
  const [dentalCare, setDentalCare] = useState<'annual' | 'as-needed'>('as-needed');

  const breeds = getAllBreeds(petType);
  const totalSteps = 8;
  const breedRec = breedId ? getBreedRecommendation(breedId) : null;

  // Load saved progress on mount
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
      // New fields
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
        // Can proceed if they've made choices (or left defaults)
        return true;
      case 6:
        return true;
      case 7:
        return true;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      <Header />
      <div className="py-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
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
          <div className="h-3 bg-muted rounded-full overflow-hidden shadow-inner relative">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 transition-all duration-500 ease-out relative"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
          {/* Step indicators */}
          <div className="flex justify-between mt-3">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
              <div key={stepNum} className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  stepNum < step ? 'bg-primary text-primary-foreground shadow-md' :
                  stepNum === step ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 shadow-lg animate-pulse-subtle' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {stepNum < step ? '✓' : stepNum}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-6 md:p-8 mb-24 md:mb-0 shadow-xl border-2 hover:shadow-2xl transition-shadow duration-300">
          {/* Step 1: Pet Type */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">What type of pet are you considering?</h2>
                <p className="text-muted-foreground">Choose the pet type to get started</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPetType('dog')}
                  className={`p-6 md:p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 min-h-[120px] md:min-h-auto group ${
                    petType === 'dog' 
                      ? 'border-primary bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg shadow-primary/20' 
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <Dog className={`w-16 h-16 mx-auto mb-4 transition-transform group-hover:scale-110 ${
                    petType === 'dog' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <p className="text-xl font-semibold">Dog</p>
                </button>
                
                <button
                  onClick={() => setPetType('cat')}
                  className={`p-6 md:p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 min-h-[120px] md:min-h-auto group ${
                    petType === 'cat' 
                      ? 'border-primary bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg shadow-primary/20' 
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <Cat className={`w-16 h-16 mx-auto mb-4 transition-transform group-hover:scale-110 ${
                    petType === 'cat' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
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

          {/* Step 2: Breed Selection */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-2">Which breed are you interested in?</h2>
                <p className="text-muted-foreground">
                  Choose from {breeds.length} {petType} breeds (alphabetically sorted)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="breed">Select Breed</Label>
                <select
                  id="breed"
                  value={breedId}
                  onChange={(e) => setBreedId(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
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
                  {petType === 'dog' ? (
                    <>
                      <p><strong>Size matters:</strong> Larger breeds typically cost more for food, medications, and boarding.</p>
                      <p><strong>Grooming needs:</strong> Breeds like Poodles and Shih Tzus require regular professional grooming ($50-80/visit).</p>
                      <p><strong>Health considerations:</strong> Some breeds are prone to specific health issues that increase vet costs.</p>
                      <p><strong>Activity level:</strong> High-energy breeds may need daycare or dog walking services.</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Size matters:</strong> Larger cat breeds typically cost more for food and medications.</p>
                      <p><strong>Grooming needs:</strong> Long-haired breeds like Persians and Maine Coons may need regular professional grooming ($50-70/visit).</p>
                      <p><strong>Health considerations:</strong> Some breeds are prone to specific health issues (e.g., Persians with breathing issues, Maine Coons with heart conditions).</p>
                      <p><strong>Indoor vs outdoor:</strong> Indoor cats generally have lower health risks but may need more enrichment and toys.</p>
                    </>
                  )}
                </div>
              </ExpandableHelp>
            </div>
          )}

          {/* Step 3: Location */}
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
                    className="text-lg p-6"
                  />
                </div>

                {isLookingUp && (
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Looking up location...</p>
                  </div>
                )}

                {locationData && !isLookingUp && (
                  <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-primary">Location confirmed</p>
                      <p className="text-sm">{formatLocation(locationData)}</p>
                    </div>
                  </div>
                )}

                {!locationData && !isLookingUp && location.length >= 4 && (
                  <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-lg">
                    <p className="text-sm text-amber-800">
                      Could not verify location. Costs will use average estimates.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Living Situation */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">What's your living situation?</h2>
                <p className="text-muted-foreground">This helps us estimate housing-related costs</p>
              </div>
              
              <RadioGroup value={livingSituation} onValueChange={(value: any) => setLivingSituation(value)}>
                <div className="space-y-3">
                  {[
                    { value: 'own-home', label: 'Own Home' },
                    { value: 'rent-apartment', label: 'Rent Apartment' },
                    { value: 'rent-house', label: 'Rent House' },
                    { value: 'other', label: 'Other' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        livingSituation === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </RadioGroup>

              {/* Conditional: Pet Deposit */}
              {(livingSituation === 'rent-apartment' || livingSituation === 'rent-house') && (
                <div className="mt-6 p-6 bg-muted rounded-lg space-y-4">
                  <Label className="text-base font-semibold">Does your rental require a pet deposit?</Label>
                  <RadioGroup value={hasPetDeposit} onValueChange={(value: any) => setHasPetDeposit(value)}>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <RadioGroupItem value="yes" id="deposit-yes" className="mr-2" />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center">
                        <RadioGroupItem value="no" id="deposit-no" className="mr-2" />
                        <span>No</span>
                      </label>
                      <label className="flex items-center">
                        <RadioGroupItem value="not-sure" id="deposit-not-sure" className="mr-2" />
                        <span>Not sure</span>
                      </label>
                    </div>
                  </RadioGroup>

                  {hasPetDeposit === 'yes' && (
                    <div className="mt-4">
                      <Label htmlFor="deposit-amount">How much?</Label>
                      <div className="flex items-center mt-2">
                        <span className="text-2xl font-bold mr-2">$</span>
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder="500"
                          value={petDepositAmount}
                          onChange={(e) => setPetDepositAmount(e.target.value)}
                          className="text-lg"
                        />
                      </div>
                    </div>
                  )}

                  {hasPetDeposit === 'not-sure' && (
                    <p className="text-sm text-muted-foreground mt-2">
                      We'll use average estimate ($300-500)
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Initial Cost Questions (NEW) */}
          {step === 5 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Let's get specific about your initial costs</h2>
                <p className="text-muted-foreground">Provide details for more accurate estimates</p>
              </div>

              {/* Purchase/Adoption Fee */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <Label className="text-lg font-semibold">Purchase/Adoption Fee</Label>
                  <InfoTooltip content="Adoption fees from shelters typically range from $50-500. Breeder puppies can cost $500-3,000+ depending on breed and lineage." />
                </div>
                <CurrencyInput
                  value={purchaseFee}
                  onChange={setPurchaseFee}
                  disabled={purchaseFeeUnknown}
                  placeholder="1200"
                  min={0}
                  max={10000}
                  helperText="Typical range: $50-$3,000"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={purchaseFeeUnknown}
                    onCheckedChange={(checked) => setPurchaseFeeUnknown(checked as boolean)}
                  />
                  <span className="text-sm">I don't know yet (use breed average)</span>
                </label>
                {purchaseFeeUnknown && breedId && (() => {
                  const selectedBreed = breeds.find(b => b.id === breedId);
                  if (selectedBreed) {
                    return (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm">
                          <span className="font-semibold">Using breed average:</span> ${selectedBreed.adoptionFee}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>

              {/* Pet Insurance */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <Label className="text-lg font-semibold">Pet Insurance</Label>
                </div>
                {breedRec && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    💡 {breedRec.insuranceRate}% of {breeds.find(b => b.id === breedId)?.name} owners choose pet insurance
                  </p>
                )}
                <p className="text-sm text-muted-foreground mb-3">Will you get pet insurance?</p>
                <RadioGroup value={insurance} onValueChange={(value: any) => setInsurance(value)}>
                  <div className="grid gap-3">
                    {[
                      { value: 'yes', label: 'Yes, definitely', desc: '~$40-60/month for your pet', popular: true, percentage: breedRec?.insuranceRate || generalStatistics.insurance.yes },
                      { value: 'maybe', label: "Maybe, I'm considering it", desc: "We'll include it in estimates with a note" },
                      { value: 'no', label: "No, I'll self-insure", desc: 'Insurance costs will be excluded' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          insurance === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={option.value} id={`insurance-${option.value}`} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{option.label}</p>
                              {option.popular && <PopularBadge percentage={option.percentage} />}
                            </div>
                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Professional Training - Dogs only */}
              {petType === 'dog' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  <Label className="text-lg font-semibold">Professional Training</Label>
                </div>
                {breedRec && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    💡 {breedRec.trainingRate}% of {breeds.find(b => b.id === breedId)?.name} owners do professional training
                  </p>
                )}
                <p className="text-sm text-muted-foreground mb-3">Do you plan to do professional training?</p>
                <RadioGroup value={training} onValueChange={(value: any) => setTraining(value)}>
                  <div className="grid gap-3">
                    {[
                      { value: 'yes', label: 'Yes, definitely', desc: '~$200-500 for basic obedience', popular: true, percentage: breedRec?.trainingRate || generalStatistics.training.yes },
                      { value: 'maybe', label: 'Maybe, if needed', desc: "We'll include average training costs" },
                      { value: 'no', label: "No, I'll train myself", desc: 'Training costs will be minimal' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          training === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={option.value} id={`training-${option.value}`} className="mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{option.label}</p>
                              {option.popular && <PopularBadge percentage={option.percentage} />}
                            </div>
                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              )}

              {/* Initial Vet Care */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-red-600" />
                  <Label className="text-lg font-semibold">Initial Vet Care</Label>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Have you budgeted for initial vet costs? (vaccinations, spay/neuter, microchip)
                </p>
                <RadioGroup value={initialVet} onValueChange={(value: any) => setInitialVet(value)}>
                  <div className="space-y-3">
                    <div
                      className={`p-4 rounded-lg border-2 transition-all ${
                        initialVet === 'known'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="known" id="vet-known" className="mt-1 cursor-pointer" />
                        <div className="flex-1">
                          <label htmlFor="vet-known" className="font-semibold mb-2 cursor-pointer block">Yes, I know the costs</label>
                          {initialVet === 'known' && (
                            <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                              <CurrencyInput
                                value={initialVetAmount}
                                onChange={setInitialVetAmount}
                                placeholder="500"
                                min={0}
                                max={2000}
                                helperText="Typical range: $300-$800"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        initialVet === 'estimate'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setInitialVet('estimate')}
                    >
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="estimate" id="vet-estimate" className="mt-1" />
                        <div>
                          <label htmlFor="vet-estimate" className="font-semibold cursor-pointer block">No, use estimates</label>
                          <p className="text-sm text-muted-foreground">We'll use breed-specific averages (~$300-800)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 6: Lifestyle (existing) */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Tell us about your lifestyle</h2>
                <p className="text-muted-foreground">This helps estimate daycare, boarding, and activity-related costs</p>
              </div>

              {/* Work Schedule */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <Label className="text-base font-semibold">Work Schedule</Label>
                </div>
                <RadioGroup value={workSchedule} onValueChange={setWorkSchedule}>
                  <div className="space-y-2">
                    {[
                      { value: '9-5', label: 'Standard 9-5' },
                      { value: 'wfh', label: 'Work from Home' },
                      { value: 'irregular', label: 'Irregular Hours' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          workSchedule === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={`work-${option.value}`} className="mr-3" />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Travel Frequency */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-purple-600" />
                  <Label className="text-base font-semibold">Travel Frequency</Label>
                </div>
                <RadioGroup value={travelFrequency} onValueChange={setTravelFrequency}>
                  <div className="space-y-2">
                    {[
                      { value: 'rarely', label: 'Rarely (1-2 times/year)' },
                      { value: 'occasionally', label: 'Occasionally (3-5 times/year)' },
                      { value: 'frequently', label: 'Frequently (6+ times/year)' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          travelFrequency === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={`travel-${option.value}`} className="mr-3" />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Activity Level - Dogs Only */}
              {petType === 'dog' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <Label className="text-base font-semibold">Activity Level</Label>
                  </div>
                  <RadioGroup value={activityLevel} onValueChange={setActivityLevel}>
                    <div className="space-y-2">
                      {[
                        { value: 'very-active', label: 'Very Active (daily long walks/runs)' },
                        { value: 'moderate', label: 'Moderately Active (regular walks)' },
                        { value: 'low', label: 'Low Activity (minimal exercise)' }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            activityLevel === option.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={`activity-${option.value}`} className="mr-3" />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Ongoing Service Preferences (NEW) */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">What ongoing services will you use?</h2>
                <p className="text-muted-foreground">Select the services you plan to use regularly</p>
              </div>

              {/* Food Type */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                  <Label className="text-base font-semibold">Food Type</Label>
                </div>
                {breedRec && (
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    💡 Most {breeds.find(b => b.id === breedId)?.name} owners choose {breedRec.popularFood} food
                  </p>
                )}
                <RadioGroup value={foodType} onValueChange={(value: any) => setFoodType(value)}>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        foodType === 'premium'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="premium" id="food-premium" className="mb-2" />
                      <p className="font-semibold">Premium</p>
                      <p className="text-sm text-muted-foreground">$60-100/month</p>
                    </label>
                    <label
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        foodType === 'standard'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="standard" id="food-standard" className="mb-2" />
                      <p className="font-semibold">Standard</p>
                      <p className="text-sm text-muted-foreground">$30-50/month</p>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Grooming Frequency */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-pink-600" />
                  <Label className="text-base font-semibold">Professional Grooming</Label>
                </div>
                <RadioGroup value={groomingFrequency} onValueChange={(value: any) => setGroomingFrequency(value)}>
                  <div className="space-y-2">
                    {[
                      { value: '1-2-weeks', label: 'Every 1-2 weeks', desc: 'High-maintenance breeds' },
                      { value: 'monthly', label: 'Monthly', desc: 'Regular maintenance' },
                      { value: '3-months', label: 'Every 3 months', desc: 'For low-maintenance coats' },
                      { value: 'diy', label: 'DIY grooming only', desc: 'Minimal professional grooming' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          groomingFrequency === option.value
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} id={`groom-${option.value}`} className="mr-3" />
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Daycare/Walking Services - Dogs Only */}
              {petType === 'dog' && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Daycare/Walking Services</Label>
                  <RadioGroup value={daycareFrequency} onValueChange={(value: any) => setDaycareFrequency(value)}>
                    <div className="space-y-2">
                      {[
                        { value: 'daily', label: 'Daily', desc: '$400-600/month' },
                        { value: '2-3-week', label: '2-3 times per week', desc: '$200-300/month' },
                        { value: 'occasionally', label: 'Occasionally', desc: '$50-100/month' },
                        { value: 'never', label: 'Never', desc: "I'll handle all walks" }
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            daycareFrequency === option.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <RadioGroupItem value={option.value} id={`daycare-${option.value}`} className="mr-3" />
                          <div>
                            <p className="font-medium">{option.label}</p>
                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Dental Care */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Preventive Dental Care</Label>
                <RadioGroup value={dentalCare} onValueChange={(value: any) => setDentalCare(value)}>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        dentalCare === 'annual'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="annual" id="dental-annual" className="mb-2" />
                      <p className="font-semibold">Annual cleanings</p>
                      <p className="text-sm text-muted-foreground">$200-400/year</p>
                    </label>
                    <label
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        dentalCare === 'as-needed'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value="as-needed" id="dental-as-needed" className="mb-2" />
                      <p className="font-semibold">As needed only</p>
                      <p className="text-sm text-muted-foreground">When problems arise</p>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Estimated Monthly Total */}
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border-2 border-primary">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Estimated monthly ongoing:</span>
                  <span className="text-2xl font-bold text-primary">
                    ${calculateMonthlyEstimate()}-{calculateMonthlyEstimate() + 50}
                  </span>
                </div>
              </div>

              {/* Money-Saving Tips */}
              <ExpandableHelp title="💰 Tips to reduce ongoing costs">
                <div className="space-y-2">
                  <p><strong>Buy in bulk:</strong> Premium food costs 20-30% less when bought in larger quantities.</p>
                  <p><strong>Learn basic grooming:</strong> Nail trimming and brushing at home can reduce grooming visits.</p>
                  <p><strong>Preventive care:</strong> Regular vet checkups and dental care prevent expensive emergencies.</p>
                  <p><strong>Compare prices:</strong> Vet and grooming costs vary significantly by location and provider.</p>
                </div>
              </ExpandableHelp>
            </div>
          )}

          {/* Step 8: Review & Confirm (NEW) */}
          {step === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Review your pet budget plan</h2>
                <p className="text-muted-foreground">Check your inputs before calculating</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Pet Details */}
                <Card className="p-4 relative">
                  <button
                    onClick={() => jumpToStep(1)}
                    className="absolute top-3 right-3 p-1 hover:bg-muted rounded"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <div className="flex items-center gap-3 mb-3">
                    {petType === 'dog' ? <Dog className="w-8 h-8 text-primary" /> : <Cat className="w-8 h-8 text-primary" />}
                    <h3 className="font-semibold text-lg">Pet Details</h3>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Type:</span> {petType === 'dog' ? 'Dog' : 'Cat'}</p>
                    <p><span className="text-muted-foreground">Breed:</span> {breeds.find(b => b.id === breedId)?.name}</p>
                    <p><span className="text-muted-foreground">Location:</span> {locationData ? formatLocation(locationData) : location}</p>
                  </div>
                </Card>

                {/* Initial Costs */}
                <Card className="p-4 relative">
                  <button
                    onClick={() => jumpToStep(5)}
                    className="absolute top-3 right-3 p-1 hover:bg-muted rounded"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <h3 className="font-semibold text-lg mb-3">Initial Costs</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Purchase Fee:</span> {purchaseFeeUnknown ? 'Using average' : `$${purchaseFee || '0'}`}</p>
                    <p><span className="text-muted-foreground">Insurance:</span> {insurance === 'yes' ? 'Yes' : insurance === 'maybe' ? 'Maybe' : 'No'}</p>
                    <p><span className="text-muted-foreground">Training:</span> {training === 'yes' ? 'Yes, professional' : training === 'maybe' ? 'Maybe' : 'DIY'}</p>
                    <p><span className="text-muted-foreground">Initial Vet:</span> {initialVet === 'known' ? `$${initialVetAmount}` : 'Using estimates'}</p>
                  </div>
                </Card>

                {/* Living Situation */}
                <Card className="p-4 relative">
                  <button
                    onClick={() => jumpToStep(4)}
                    className="absolute top-3 right-3 p-1 hover:bg-muted rounded"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <h3 className="font-semibold text-lg mb-3">Living Situation</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Home:</span> {livingSituation.replace('-', ' ')}</p>
                    <p><span className="text-muted-foreground">Pet Deposit:</span> {
                      hasPetDeposit === 'yes' ? `$${petDepositAmount || '0'}` : 
                      hasPetDeposit === 'not-sure' ? 'Using average' : 
                      'None'
                    }</p>
                  </div>
                </Card>

                {/* Lifestyle */}
                <Card className="p-4 relative">
                  <button
                    onClick={() => jumpToStep(6)}
                    className="absolute top-3 right-3 p-1 hover:bg-muted rounded"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <h3 className="font-semibold text-lg mb-3">Lifestyle</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Work:</span> {workSchedule}</p>
                    <p><span className="text-muted-foreground">Travel:</span> {travelFrequency}</p>
                    {petType === 'dog' && <p><span className="text-muted-foreground">Activity:</span> {activityLevel}</p>}
                  </div>
                </Card>

                {/* Ongoing Services */}
                <Card className="p-4 relative md:col-span-2">
                  <button
                    onClick={() => jumpToStep(7)}
                    className="absolute top-3 right-3 p-1 hover:bg-muted rounded"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <h3 className="font-semibold text-lg mb-3">Ongoing Services</h3>
                  <div className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                    <p><span className="text-muted-foreground">Food:</span> {foodType === 'premium' ? 'Premium' : 'Standard'}</p>
                    <p><span className="text-muted-foreground">Grooming:</span> {groomingFrequency.replace('-', ' ')}</p>
                    {petType === 'dog' && <p><span className="text-muted-foreground">Daycare:</span> {daycareFrequency === 'never' ? 'Never' : daycareFrequency}</p>}
                    <p><span className="text-muted-foreground">Dental:</span> {dentalCare === 'annual' ? 'Annual cleanings' : 'As needed'}</p>
                  </div>
                </Card>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Your results in 3 seconds...
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
            
            {/* Back & Next buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2 min-h-[48px] text-base hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2 min-h-[48px] text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {step === totalSteps ? 'Calculate My Costs' : 'Next'}
                {step < totalSteps && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      </div>
    </div>
  );

  // Helper function to calculate estimated monthly costs
  function calculateMonthlyEstimate() {
    let total = 0;
    
    // Food
    if (foodType === 'premium') total += 80;
    else total += 40;
    
    // Grooming (convert to monthly)
    if (groomingFrequency === '1-2-weeks') total += 120;
    else if (groomingFrequency === 'monthly') total += 60;
    else if (groomingFrequency === '3-months') total += 20;
    
    // Daycare (dogs only)
    if (petType === 'dog') {
      if (daycareFrequency === 'daily') total += 500;
      else if (daycareFrequency === '2-3-week') total += 250;
      else if (daycareFrequency === 'occasionally') total += 75;
    }
    
    // Dental (convert to monthly)
    if (dentalCare === 'annual') total += 25;
    
    return Math.round(total);
  }
}

