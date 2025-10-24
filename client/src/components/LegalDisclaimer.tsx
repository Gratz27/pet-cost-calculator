import { AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function LegalDisclaimer() {
  return (
    <Card className="p-6 bg-muted/30 border-muted-foreground/20">
      <div className="flex gap-3">
        <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Important Disclaimer</p>
          
          <p>
            The cost estimates provided by PetCost-Calculator.com are based on average data compiled from various sources 
            and are intended for informational and planning purposes only. <strong>Actual costs may vary significantly</strong> based on numerous factors including but not limited to:
          </p>
          
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Geographic Location:</strong> Costs vary substantially by country, state, province, city, and even neighborhood. Urban areas typically have higher costs than rural areas.</li>
            <li><strong>Regional Economic Factors:</strong> Local cost of living, currency exchange rates, and regional economic conditions significantly impact pet care expenses.</li>
            <li><strong>Individual Pet Health:</strong> Pre-existing conditions, genetic predispositions, accidents, and unexpected illnesses can dramatically increase veterinary costs.</li>
            <li><strong>Service Provider Pricing:</strong> Veterinary clinics, groomers, trainers, and pet supply retailers have varying price structures and quality levels.</li>
            <li><strong>Breed-Specific Variations:</strong> Even within the same breed, individual pets may have different needs, temperaments, and health outcomes.</li>
            <li><strong>Lifestyle Choices:</strong> Your personal preferences for premium services, organic products, or specialized care will affect total costs.</li>
            <li><strong>Inflation and Market Changes:</strong> Pet care costs are subject to inflation and market fluctuations over time.</li>
          </ul>
          
          <p>
            <strong>No Warranty or Guarantee:</strong> PetCost-Calculator.com makes no representations or warranties regarding the accuracy, completeness, or reliability of the cost estimates provided. We do not guarantee that your actual costs will match the estimates shown.
          </p>
          
          <p>
            <strong>Not Professional Advice:</strong> The information provided is not intended as financial, veterinary, or professional advice. Always consult with qualified professionals including veterinarians, financial advisors, and pet care specialists before making decisions about pet ownership.
          </p>
          
          <p>
            <strong>Limitation of Liability:</strong> By using this calculator, you acknowledge that PetCost-Calculator.com, its owners, operators, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your reliance on these estimates or your decision to adopt a pet.
          </p>
          
          <p>
            <strong>International Users:</strong> Cost estimates are primarily based on United States data. Users in other countries should expect significant variations due to different healthcare systems, regulatory environments, currency values, and local market conditions.
          </p>
          
          <p className="text-xs pt-2 border-t border-muted-foreground/20">
            Last Updated: October 2025 | These estimates should be used as a general guideline only. Always budget for unexpected expenses and consider purchasing comprehensive pet insurance.
          </p>
        </div>
      </div>
    </Card>
  );
}

