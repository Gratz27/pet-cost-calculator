import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Dog, Cat, PawPrint, ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllBreeds, calculateCosts, type CalculatorInputs, type CostBreakdown } from '@/lib/calculator';
import { lookupPostalCode, formatLocation, type LocationData } from '@/lib/postalCodeLookup';

interface CalculatorFormProps {
  onCalculate: (inputs: CalculatorInputs, results: CostBreakdown) => void;
}

export default function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [step, setStep] = useState(1);
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [breedId, setBreedId] = useState('');
  const [location, setLocation] = useState('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [livingSituation, setLivingSituation] = useState<'own-home' | 'rent-apartment' | 'rent-house' | 'other'>('own-home');
  const [workSchedule, setWorkSchedule] = useState('9-5');
  const [travelFrequency, setTravelFrequency] = useState('occasionally');
  const [activityLevel, setActivityLevel] = useState('moderate');

  const breeds = getAllBreeds(petType);
  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
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
      activityLevel
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
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="container max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round((step / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-2">Tell Us About Your Future Pet</h2>
          <p className="text-muted-foreground mb-8">
            Answer a few quick questions to get your personalized cost estimate
          </p>

          {/* Step 1: Pet Type */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">What type of pet are you considering?</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setPetType('dog')}
                    className={`p-6 border-2 rounded-lg flex flex-col items-center gap-3 transition-all hover:border-primary ${
                      petType === 'dog' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <Dog className="h-12 w-12" />
                    <span className="font-semibold">Dog</span>
                  </button>
                  <button
                    onClick={() => setPetType('cat')}
                    className={`p-6 border-2 rounded-lg flex flex-col items-center gap-3 transition-all hover:border-primary ${
                      petType === 'cat' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <Cat className="h-12 w-12" />
                    <span className="font-semibold">Cat</span>
                  </button>
                  <button
                    disabled
                    className="p-6 border-2 rounded-lg flex flex-col items-center gap-3 opacity-50 cursor-not-allowed"
                  >
                    <PawPrint className="h-12 w-12" />
                    <span className="font-semibold">Other</span>
                    <span className="text-xs text-muted-foreground">Coming Soon</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Breed Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="breed" className="text-lg font-semibold mb-4 block">
                  What breed are you considering?
                </Label>
                <select
                  id="breed"
                  value={breedId}
                  onChange={(e) => setBreedId(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-background"
                >
                  <option value="">Select a breed...</option>
                  {breeds.map((breed) => (
                    <option key={breed.id} value={breed.id}>
                      {breed.name}
                    </option>
                  ))}
                </select>
                {breedId && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {breeds.find(b => b.id === breedId)?.description}
                  </p>
                )}
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>{breeds.length} {petType === 'dog' ? 'dog' : 'cat'} breeds available</strong> - Can't find yours? Select "Other Breed (Not Listed)" for average estimates.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Popular breeds:</strong>
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {breeds.slice(0, 5).map((breed) => (
                    <Button
                      key={breed.id}
                      variant="outline"
                      size="sm"
                      onClick={() => setBreedId(breed.id)}
                      className={breedId === breed.id ? 'border-primary' : ''}
                    >
                      {breed.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="location" className="text-lg font-semibold mb-4 block">
                  Where do you live?
                </Label>
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Enter your postal/ZIP code"
                    value={location}
                    onChange={async (e) => {
                      const value = e.target.value;
                      setLocation(value);
                      
                      // Auto-lookup when user enters enough characters
                      if (value.length >= 4) {
                        setIsLookingUp(true);
                        const data = await lookupPostalCode(value);
                        setLocationData(data);
                        setIsLookingUp(false);
                      } else {
                        setLocationData(null);
                      }
                    }}
                    className="text-lg p-6"
                  />
                  
                  {isLookingUp && (
                    <p className="text-sm text-muted-foreground animate-pulse">
                      Looking up location...
                    </p>
                  )}
                  
                  {locationData && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium text-primary">
                        ✓ Location confirmed: {formatLocation(locationData)}
                      </p>
                    </div>
                  )}
                  
                  {!isLookingUp && !locationData && location.length >= 4 && (
                    <p className="text-sm text-amber-600">
                      Could not verify location. Costs will use average estimates.
                    </p>
                  )}
                  
                  <p className="text-sm text-muted-foreground">
                    Location helps us estimate regional costs for veterinary care and services
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Living Situation */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">What's your living situation?</Label>
                <RadioGroup value={livingSituation} onValueChange={(value: any) => setLivingSituation(value)}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="own-home" id="own-home" />
                    <Label htmlFor="own-home" className="flex-1 cursor-pointer">Own Home</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="rent-apartment" id="rent-apartment" />
                    <Label htmlFor="rent-apartment" className="flex-1 cursor-pointer">Rent Apartment</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="rent-house" id="rent-house" />
                    <Label htmlFor="rent-house" className="flex-1 cursor-pointer">Rent House</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="flex-1 cursor-pointer">Other</Label>
                  </div>
                </RadioGroup>
                <p className="mt-2 text-sm text-muted-foreground">
                  This helps us factor in potential pet deposits and space-related costs
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Lifestyle */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">Tell us about your lifestyle</Label>
                
                <div className="space-y-4">
                  <div>
                    <Label className="font-medium mb-2 block">Work Schedule</Label>
                    <RadioGroup value={workSchedule} onValueChange={setWorkSchedule}>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="9-5" id="9-5" />
                        <Label htmlFor="9-5" className="flex-1 cursor-pointer">Standard 9-5</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="remote" id="remote" />
                        <Label htmlFor="remote" className="flex-1 cursor-pointer">Work from Home</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="irregular" id="irregular" />
                        <Label htmlFor="irregular" className="flex-1 cursor-pointer">Irregular Hours</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="font-medium mb-2 block">Travel Frequency</Label>
                    <RadioGroup value={travelFrequency} onValueChange={setTravelFrequency}>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="rarely" id="rarely" />
                        <Label htmlFor="rarely" className="flex-1 cursor-pointer">Rarely</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="occasionally" id="occasionally" />
                        <Label htmlFor="occasionally" className="flex-1 cursor-pointer">Occasionally</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="frequently" id="frequently" />
                        <Label htmlFor="frequently" className="flex-1 cursor-pointer">Frequently</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="font-medium mb-2 block">Activity Level</Label>
                    <RadioGroup value={activityLevel} onValueChange={setActivityLevel}>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low" className="flex-1 cursor-pointer">Low - Mostly indoors</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="moderate" id="moderate" />
                        <Label htmlFor="moderate" className="flex-1 cursor-pointer">Moderate - Regular walks</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-3 border rounded-lg">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high" className="flex-1 cursor-pointer">High - Very active</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === totalSteps ? 'Calculate' : 'Next'}
              {step < totalSteps && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

