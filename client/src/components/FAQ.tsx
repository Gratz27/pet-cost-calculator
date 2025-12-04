import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'wouter';

export default function FAQ() {
  const faqs = [
    {
      question: "How accurate is the pet cost calculator?",
      answer: "Our calculator uses breed-specific data and location-based adjustments to provide accurate estimates. Costs are based on average data and may vary based on individual circumstances, but we include hidden costs that most calculators miss, such as boarding, furniture damage, and emergency vet visits."
    },
    {
      question: "What costs does the calculator include?",
      answer: "The calculator includes adoption fees, initial vet care, pet insurance, supplies, training, food, grooming, dental care, daycare, and hidden costs like boarding, furniture damage, and emergency vet visits. We provide first-year, annual, and lifetime cost projections."
    },
    {
      question: "Can I use this for both dogs and cats?",
      answer: "Yes! Our calculator supports 27 dog breeds and 11 cat breeds, with breed-specific cost data for accurate estimates. Each breed has different grooming, health, and care requirements that affect overall costs."
    },
    {
      question: "Is the pet cost calculator really free?",
      answer: "Yes, completely free with no registration required. You can download your results as a PDF, share them with family, and save your calculation to return later. We believe everyone should have access to accurate pet cost information."
    },
    {
      question: "How much does a dog cost per year?",
      answer: "Annual dog costs typically range from $1,500 to $4,000 depending on breed, size, location, and care choices. Larger breeds and those with special health needs tend to cost more. Use our calculator for breed-specific estimates tailored to your location and lifestyle."
    },
    {
      question: "What are the hidden costs of pet ownership?",
      answer: "Hidden costs include pet boarding/sitting ($300-800/year), furniture and item damage ($200-500/year), extra cleaning supplies ($150-300/year), emergency vet visits ($500-5,000+), and pet deposits for rentals ($200-500). Our calculator includes all of these."
    },
    {
      question: "Does location affect pet costs?",
      answer: "Yes! Pet costs vary significantly by location. Urban areas and high cost-of-living regions typically have 20-40% higher vet care, grooming, and service costs. Our calculator adjusts estimates based on your postal code."
    },
    {
      question: "Should I get pet insurance?",
      answer: "Pet insurance can save thousands in emergency vet costs. For breeds prone to health issues, insurance typically costs $40-80/month but can cover $5,000-10,000+ in unexpected medical expenses. Our calculator helps you compare costs with and without insurance."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about pet ownership costs
          </p>
        </div>

        <Card className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

// Export FAQ data for use in schema markup
export const faqData = [
  {
    question: "How accurate is the pet cost calculator?",
    answer: "Our calculator uses breed-specific data and location-based adjustments to provide accurate estimates. Costs are based on average data and may vary based on individual circumstances, but we include hidden costs that most calculators miss, such as boarding, furniture damage, and emergency vet visits."
  },
  {
    question: "What costs does the calculator include?",
    answer: "The calculator includes adoption fees, initial vet care, pet insurance, supplies, training, food, grooming, dental care, daycare, and hidden costs like boarding, furniture damage, and emergency vet visits. We provide first-year, annual, and lifetime cost projections."
  },
  {
    question: "Can I use this for both dogs and cats?",
    answer: "Yes! Our calculator supports 27 dog breeds and 11 cat breeds, with breed-specific cost data for accurate estimates. Each breed has different grooming, health, and care requirements that affect overall costs."
  },
  {
    question: "Is the pet cost calculator really free?",
    answer: "Yes, completely free with no registration required. You can download your results as a PDF, share them with family, and save your calculation to return later. We believe everyone should have access to accurate pet cost information."
  },
  {
    question: "How much does a dog cost per year?",
    answer: "Annual dog costs typically range from $1,500 to $4,000 depending on breed, size, location, and care choices. Larger breeds and those with special health needs tend to cost more. Use our calculator for breed-specific estimates tailored to your location and lifestyle."
  },
  {
    question: "What are the hidden costs of pet ownership?",
    answer: "Hidden costs include pet boarding/sitting ($300-800/year), furniture and item damage ($200-500/year), extra cleaning supplies ($150-300/year), emergency vet visits ($500-5,000+), and pet deposits for rentals ($200-500). Our calculator includes all of these."
  },
  {
    question: "Does location affect pet costs?",
    answer: "Yes! Pet costs vary significantly by location. Urban areas and high cost-of-living regions typically have 20-40% higher vet care, grooming, and service costs. Our calculator adjusts estimates based on your postal code."
  },
  {
    question: "Should I get pet insurance?",
    answer: "Pet insurance can save thousands in emergency vet costs. For breeds prone to health issues, insurance typically costs $40-80/month but can cover $5,000-10,000+ in unexpected medical expenses. Our calculator helps you compare costs with and without insurance."
  }
];

