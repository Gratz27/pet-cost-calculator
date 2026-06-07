"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ChevronLeft, Search, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { getAllBreeds, calculateCosts, type CalculatorInputs, type CostBreakdown } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";
import dynamic from "next/dynamic";
const CostResults = dynamic(() => import("./CostResults"), { ssr: false });

type Step = "pet-type" | "breed" | "location" | "lifestyle" | "costs" | "results";

const STEPS: Step[] = ["pet-type", "breed", "location", "lifestyle", "costs", "results"];

const STEP_LABELS: Record<Step, string> = {
  "pet-type": "Pet Type",
  breed: "Breed",
  location: "Location",
  lifestyle: "Lifestyle",
  costs: "Cost Preferences",
  results: "Your Results",
};

const STEP_NUMBERS: Record<Step, number> = {
  "pet-type": 1, breed: 2, location: 3, lifestyle: 4, costs: 5, results: 6,
};

export default function CalculatorClient() {
  const [step, setStep] = useState<Step>("pet-type");
  const [inputs, setInputs] = useState<Partial<CalculatorInputs>>({
    petType: "dog",
    insurance: "maybe",
    training: "maybe",
    foodType: "standard",
    groomingFrequency: "monthly",
    daycareFrequency: "never",
    dentalCare: "as-needed",
    livingSituation: "own-home",
    workSchedule: "full-time",
    travelFrequency: "occasionally",
    activityLevel: "moderate",
  });
  const [breedSearch, setBreedSearch] = useState("");
  const [results, setResults] = useState<CostBreakdown | null>(null);

  const allBreeds = useMemo(() => getAllBreeds(inputs.petType ?? "dog"), [inputs.petType]);
  const breeds = useMemo(
    () => allBreeds.filter((b) => b.name.toLowerCase().includes(breedSearch.toLowerCase())),
    [allBreeds, breedSearch]
  );

  const update = (key: keyof CalculatorInputs, value: unknown) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) {
      const next = STEPS[idx + 1];
      if (next === "results") {
        const calc = calculateCosts(inputs as CalculatorInputs);
        setResults(calc);
      }
      setStep(next);
    }
  };

  const goBack = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const canContinue = () => {
    if (step === "pet-type") return !!inputs.petType;
    if (step === "breed") return !!inputs.breedId;
    if (step === "location") return !!(inputs.location && inputs.location.length > 1);
    return true;
  };

  const stepNum = STEP_NUMBERS[step];
  const totalSteps = STEPS.length - 1;
  const progress = ((stepNum - 1) / (totalSteps - 1)) * 100;

  if (step === "results" && results) {
    return <CostResults results={results} inputs={inputs as CalculatorInputs} onReset={() => { setStep("pet-type"); setResults(null); }} />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100">
        <div className="h-full bg-[#16A34A] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-500">Step {stepNum} of {totalSteps}</span>
          <span className="text-xs font-medium text-[#2E7D32]">{STEP_LABELS[step]}</span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.slice(0, -1).map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${i < stepNum ? "bg-[#16A34A]" : "bg-slate-100"}`} />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Step 1: Pet Type */}
        {step === "pet-type" && (
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">What type of pet are you planning for?</h2>
            <p className="text-slate-500 mb-6">We'll use this to find accurate breed data and cost estimates.</p>
            <div className="grid grid-cols-2 gap-4">
              {(["dog", "cat"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    update("petType", type);
                    // Reset breed selection when switching pet type
                    setInputs((prev) => ({ ...prev, petType: type, breedId: undefined }));
                    setBreedSearch("");
                  }}
                  className={`rounded-2xl border-2 p-6 text-left transition-all hover:border-[#2E7D32] ${inputs.petType === type ? "border-[#2E7D32] bg-[#2E7D32]/5" : "border-slate-200"}`}
                >
                  <div className="text-4xl mb-3">{type === "dog" ? "🐕" : "🐈"}</div>
                  <div className="text-lg font-bold text-[#0f172a] capitalize">{type}</div>
                  <div className="text-sm text-slate-500 mt-1">{type === "dog" ? "100+ breeds" : "30+ breeds"}</div>
                  {inputs.petType === type && <CheckCircle2 className="h-5 w-5 text-[#16A34A] mt-3" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Breed */}
        {step === "breed" && (
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Which breed are you considering?</h2>
            <p className="text-slate-500 mb-4">Search for your breed. Costs vary significantly between breeds.</p>
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search breeds..."
                value={breedSearch}
                onChange={(e) => setBreedSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="max-h-72 overflow-y-auto space-y-1.5 rounded-xl border border-slate-100 p-2">
              {breeds.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">No breeds found. Try a different search.</div>
              ) : (
                breeds.map((breed) => (
                  <button
                    key={breed.id}
                    onClick={() => update("breedId", breed.id)}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all hover:bg-slate-50 ${inputs.breedId === breed.id ? "bg-[#2E7D32]/5 border border-[#2E7D32]/20" : ""}`}
                  >
                    <div>
                      <div className="text-sm font-medium text-[#0f172a]">{breed.name}</div>
                      <div className="text-xs text-slate-400 capitalize">{breed.size} · {breed.lifespan} yr lifespan</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#2E7D32]">{formatCurrency(breed.annualFood + breed.annualVet + breed.annualGrooming)}/yr</div>
                      {inputs.breedId === breed.id && <CheckCircle2 className="h-4 w-4 text-[#16A34A] ml-auto mt-1" />}
                    </div>
                  </button>
                ))
              )}
            </div>
            {inputs.breedId && (
              <p className="mt-3 text-sm text-[#16A34A] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {allBreeds.find(b => b.id === inputs.breedId)?.name} selected
              </p>
            )}
          </div>
        )}

        {/* Step 3: Location */}
        {step === "location" && (
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Where are you located?</h2>
            <p className="text-slate-500 mb-6">Costs vary significantly by city and country. We adjust all estimates to your local market.</p>
            <input
              type="text"
              placeholder="e.g. New York, London, Sydney..."
              value={inputs.location ?? ""}
              onChange={(e) => update("location", e.target.value)}
              className="input-field text-base"
            />
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>We support US cities, UK, Australia, Canada, Singapore, and Western Europe. Enter your nearest major city for the most accurate results.</span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2">Quick select:</p>
              <div className="flex flex-wrap gap-2">
                {["New York", "Los Angeles", "London", "Sydney", "Toronto", "Singapore"].map((city) => (
                  <button key={city} onClick={() => update("location", city)} className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${inputs.location === city ? "bg-[#2E7D32] text-white border-[#2E7D32]" : "bg-white text-slate-600 border-slate-200 hover:border-[#2E7D32]"}`}>
                    {city}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-3">Living situation</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "own-home", label: "Own a home" },
                  { value: "rent-house", label: "Rent a house" },
                  { value: "rent-apartment", label: "Rent an apartment" },
                  { value: "other", label: "Other" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("livingSituation", value)} className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${inputs.livingSituation === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Lifestyle */}
        {step === "lifestyle" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Tell us about your lifestyle</h2>
              <p className="text-slate-500">This helps us calculate daycare, boarding, and activity-related costs accurately.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Work schedule</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { value: "full-time", label: "Full-time office" },
                  { value: "hybrid", label: "Hybrid" },
                  { value: "work-from-home", label: "Work from home" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("workSchedule", value)} className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${inputs.workSchedule === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">How often do you travel?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { value: "rarely", label: "Rarely" },
                  { value: "occasionally", label: "Occasionally" },
                  { value: "frequently", label: "Frequently" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("travelFrequency", value)} className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${inputs.travelFrequency === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Your activity level</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { value: "low", label: "Low" },
                  { value: "moderate", label: "Moderate" },
                  { value: "high", label: "High" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("activityLevel", value)} className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${inputs.activityLevel === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Daycare / dog walker frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "daily", label: "Daily" },
                  { value: "2-3-week", label: "2–3x per week" },
                  { value: "occasionally", label: "Occasionally" },
                  { value: "never", label: "Never" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("daycareFrequency", value as CalculatorInputs["daycareFrequency"])} className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${inputs.daycareFrequency === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Cost Preferences */}
        {step === "costs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#0f172a] mb-2">Your cost preferences</h2>
              <p className="text-slate-500">These choices significantly affect your annual costs. Answer honestly for the most accurate results.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Food quality preference</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "standard", label: "Standard", sub: "Good quality supermarket brands" },
                  { value: "premium", label: "Premium", sub: "Raw diet, organic, or vet-recommended" },
                ].map(({ value, label, sub }) => (
                  <button key={value} onClick={() => update("foodType", value as CalculatorInputs["foodType"])} className={`rounded-xl border p-4 text-left transition-all ${inputs.foodType === value ? "border-[#2E7D32] bg-[#2E7D32]/5" : "border-slate-200 hover:border-slate-300"}`}>
                    <div className="text-sm font-semibold text-[#0f172a]">{label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{sub}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Pet insurance</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "yes", label: "Yes, definitely" },
                  { value: "maybe", label: "Possibly" },
                  { value: "no", label: "No" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("insurance", value as CalculatorInputs["insurance"])} className={`rounded-xl border px-3 py-3 text-sm font-medium text-left transition-all ${inputs.insurance === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Professional training</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "yes", label: "Yes, definitely" },
                  { value: "maybe", label: "Possibly" },
                  { value: "no", label: "No" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("training", value as CalculatorInputs["training"])} className={`rounded-xl border px-3 py-3 text-sm font-medium text-left transition-all ${inputs.training === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Grooming frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "1-2-weeks", label: "Every 1–2 weeks" },
                  { value: "monthly", label: "Monthly" },
                  { value: "3-months", label: "Every 3 months" },
                  { value: "diy", label: "DIY only" },
                ].map(({ value, label }) => (
                  <button key={value} onClick={() => update("groomingFrequency", value as CalculatorInputs["groomingFrequency"])} className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${inputs.groomingFrequency === value ? "border-[#2E7D32] bg-[#2E7D32]/5 text-[#2E7D32]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
        {step !== "pet-type" ? (
          <button onClick={goBack} className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
        ) : <div />}

        <button
          onClick={goNext}
          disabled={!canContinue()}
          className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${canContinue() ? "bg-[#2E7D32] text-white hover:bg-[#1B5E20] shadow-sm" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
        >
          {step === "costs" ? "Get My Results" : "Continue"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
