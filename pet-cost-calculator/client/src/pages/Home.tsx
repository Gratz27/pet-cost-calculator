import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Clock, Dog, Cat, PawPrint } from 'lucide-react';
import { Link } from 'wouter';
import CalculatorForm from '@/components/CalculatorFormNew';
import Results from '@/components/ResultsNew';
import FooterDisclaimer from '@/components/FooterDisclaimer';
import FAQ, { faqData } from '@/components/FAQ';
import AdSense from '@/components/AdSense';
import SEO from '@/components/SEO';
import { trackButtonClick } from '@/lib/analytics';
import type { CalculatorInputs, CostBreakdown } from '@/lib/calculator';

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [results, setResults] = useState<CostBreakdown | null>(null);
  const [inputs, setInputs] = useState<CalculatorInputs | null>(null);

  const handleCalculate = (calculatorInputs: CalculatorInputs, breakdown: CostBreakdown) => {
    setInputs(calculatorInputs);
    setResults(breakdown);
  };

  const handleRecalculate = () => {
    setResults(null);
    setShowCalculator(true);
  };

  if (results && inputs) {
    return <Results inputs={inputs} results={results} onRecalculate={handleRecalculate} />;
  }

  if (showCalculator) {
    return <CalculatorForm onCalculate={handleCalculate} />;
  }

  return (
    <>
      <SEO
        title="Pet Adoption Cost Reality Calculator - Free Pet Cost Estimator"
        description="Free pet cost calculator with breed-specific data. Get accurate estimates for adoption fees, vet care, food, grooming, and lifetime costs. Used by 50,000+ prospective pet owners."
        keywords="pet cost calculator, dog cost calculator, cat cost calculator, pet ownership costs, pet adoption costs, lifetime pet costs, petcost-calculator"
        canonical="https://petcost-calculator.com"
        isHomepage={true}
        faqSchema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />
      <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">PetCost-Calculator.com</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find Out the True Lifetime Cost of Your Future Pet
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get a personalized cost breakdown for any breed. Free, instant, and comprehensive—including the hidden expenses most people forget. <Link href="/how-it-works" className="text-primary hover:underline">Learn how it works</Link>.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => {
                trackButtonClick('Calculate Your Pet Costs', 'Hero Section');
                setShowCalculator(true);
              }}
            >
              Calculate Your Pet Costs
            </Button>
                  <p className="text-sm text-muted-foreground">Free tool for prospective pet owners worldwide</p>
          </div>
        </div>
      </section>

      {/* Introduction Content Section - AdSense Compliance */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">Understanding the True Cost of Pet Ownership</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bringing a pet into your home is one of life's most rewarding experiences, but it's also a significant financial commitment that extends far beyond the initial adoption fee. Whether you're in London, Singapore, Sydney, or New York, the reality is the same: pet ownership involves substantial ongoing costs. Annual expenses typically range from £1,200-£2,000 in the UK, $2,000-$3,500 AUD in Australia, $2,500-$4,000 SGD in Singapore, or $1,500-$2,500 USD in the United States, depending on your pet's size and needs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Many prospective pet owners underestimate the long-term financial responsibility, focusing primarily on upfront costs like adoption fees and initial supplies. The reality is that veterinary care, quality food, grooming, training, insurance, and unexpected medical emergencies add up significantly over your pet's lifetime. A large breed dog living 10-12 years could cost £15,000-£40,000 total in the UK, $25,000-$60,000 AUD in Australia, or $20,000-$55,000 USD in the US. Smaller breeds and cats typically cost less but still represent a substantial multi-year financial commitment.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              That's where our Pet Cost Calculator becomes a useful planning tool. We use breed-specific data, regional cost variations, and comprehensive expense categories to provide personalized estimates based on your location and circumstances. We factor in everything from routine vet visits and vaccinations to less obvious costs like pet deposits for rental properties, boarding fees during travel, and grooming requirements. By entering your postal code or ZIP code, you'll receive estimates adjusted for your region's typical costs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Our goal is to help prospective pet owners make informed, responsible decisions by providing transparent, realistic cost projections. Understanding the financial commitment upfront leads to better outcomes for both pets and their families, reducing the number of animals surrendered to shelters due to unexpected expenses. This free tool is available to anyone worldwide who wants to understand what pet ownership will cost in their specific situation before making this important decision.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <Dog className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Breed-Specific Data</h2>
              <p className="text-muted-foreground">
                Accurate cost estimates based on your chosen breed's size, grooming needs, and common health issues.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Hidden Costs Included</h2>
              <p className="text-muted-foreground">
                We account for expenses most calculators miss—pet deposits, boarding, furniture damage, and more.
              </p>
            </div>

            <div className="bg-card border rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold mb-3">Lifetime Projections</h2>
              <p className="text-muted-foreground">
                See the full financial picture with first-year, annual, and lifetime cost breakdowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Use Our Calculator?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Make Informed Decisions</h3>
                  <p className="text-muted-foreground text-sm">
                    Understand the true financial commitment before adopting to avoid surprises and ensure you can provide the best care.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cat className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Compare Breeds</h3>
                  <p className="text-muted-foreground text-sm">
                    Explore different breeds to find one that fits your budget and lifestyle without compromising on quality of care.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Budget Confidently</h3>
                  <p className="text-muted-foreground text-sm">
                    Plan your finances with detailed breakdowns of one-time and recurring costs over your pet's lifetime.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Trusted by Shelters</h3>
                  <p className="text-muted-foreground text-sm">
                    Partnered with animal shelters nationwide to help prospective owners make responsible adoption decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* How Our Calculator Works - Detailed Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">How the Calculator Provides Estimates</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our calculator uses breed-specific data and regional cost information to generate personalized estimates. When you enter your chosen breed, postal code or ZIP code, and lifestyle details, the system considers multiple cost factors including breed size, grooming requirements, typical health issues, and your location's general cost of living. The estimates are based on publicly available research and data from veterinary associations, pet insurance reports, and published pet ownership surveys.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The process covers essential expense categories: initial adoption and setup costs, routine veterinary care, food and treats, grooming and maintenance, training, insurance or emergency funds, and miscellaneous expenses like toys and boarding. Each category is adjusted based on your pet's characteristics and your location. For example, veterinary costs in London or Singapore are typically higher than in rural areas, while grooming costs for a Poodle will be substantially more than for a Beagle.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The calculator also accounts for often-overlooked expenses that catch many new pet owners by surprise. These include pet deposits and monthly pet rent for renters (which vary by region and landlord), professional dog walking or daycare if you work long hours, boarding or pet-sitting costs when you travel, and potential home repairs from normal pet wear and tear. These hidden costs can add up to thousands over your pet's lifetime.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your results show three views of the financial commitment: first-year costs (typically highest due to initial setup), average annual costs for subsequent years, and total lifetime costs based on typical breed lifespan. This breakdown helps you budget effectively, compare different breeds, and make informed decisions about pet insurance and emergency funds. Remember, these are estimates to help you plan—actual costs will vary based on your specific circumstances and choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Cost Breakdown Education */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Understanding Pet Ownership Cost Categories</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Pet ownership costs fall into several distinct categories, each with its own considerations and potential for variation. Understanding these categories helps you identify areas where you might save money without compromising your pet's wellbeing, and where cutting corners could lead to expensive problems down the road. The following breakdown examines each major expense category in detail, providing context for the estimates our calculator generates.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 mt-8">Initial Adoption and Setup Costs</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The first-year expenses for a new pet typically run 50-100% higher than subsequent years due to one-time setup costs. Adoption fees vary dramatically based on source and location, ranging from £50-£150 for shelter adoptions in the UK to £500-£3,000 for purebred puppies or kittens from reputable breeders. Initial veterinary care includes spaying or neutering (if not already done), first vaccinations, microchipping, and a wellness exam, totaling £200-£500 depending on your location and pet size.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Essential supplies represent another significant first-year expense. You'll need bedding, food and water bowls, collar and leash or harness, identification tags, toys, grooming supplies, and either a crate for dogs or litter box setup for cats. Quality initial supplies typically cost £150-£400, though you can reduce this by purchasing gradually rather than all at once. Many new pet owners overspend on unnecessary items marketed as essential—focus on the basics first and add specialty items as you learn your pet's preferences.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Routine Veterinary Care</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Annual veterinary expenses for a healthy pet typically range from £200-£600 in the UK, $300-$800 AUD in Australia, or $250-$700 USD in the United States. This includes annual wellness exams, routine vaccinations (which may be required annually or every three years depending on the vaccine and local regulations), flea and tick prevention, heartworm prevention for dogs, and routine dental care. Larger dogs generally cost more to treat than smaller dogs or cats due to medication dosing based on weight.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Preventive care represents one of the best investments in long-term cost management. Regular dental cleanings (£200-£400 annually) prevent expensive dental surgery later. Maintaining a healthy weight through proper diet and exercise prevents obesity-related conditions that can cost thousands to treat. Annual blood work for senior pets (typically £80-£150) catches developing health issues early when they're less expensive to address. While these preventive measures increase your annual costs, they typically save money over your pet's lifetime by avoiding emergency treatments.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Food and Nutrition</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Food costs vary dramatically based on pet size, activity level, and food quality. A small cat eating 200g daily of mid-range food costs approximately £300-£500 annually, while a large breed dog consuming 600g daily of similar quality food costs £800-£1,400 annually. Premium foods cost 50-100% more than mid-range options, while budget supermarket brands cost 30-50% less. The quality difference matters—premium foods typically offer better digestibility, meaning your pet needs less food to meet nutritional requirements, and may contribute to better long-term health outcomes.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Treats and supplements add another £100-£300 annually depending on your approach. While treats serve important training and enrichment purposes, many pet owners overfeed treats, contributing to obesity and increasing food costs unnecessarily. Supplements like glucosamine for joint health or omega-3 fatty acids for coat condition may benefit certain pets, particularly senior animals or breeds prone to specific conditions, but should be discussed with your veterinarian rather than purchased based on marketing claims.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Grooming and Maintenance</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Grooming costs represent one of the most variable expense categories, ranging from nearly nothing for short-haired cats to £600-£1,200 annually for breeds requiring professional grooming every 6-8 weeks. Poodles, Bichon Frises, Shih Tzus, and similar breeds need regular professional grooming to prevent matting and maintain coat health. Long-haired cats benefit from professional grooming several times yearly to manage shedding and prevent hairballs. Short-haired dogs and cats can usually be maintained with home grooming using basic tools costing £30-£80 initially.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Learning basic grooming skills saves substantial money over your pet's lifetime. Nail trimming, ear cleaning, teeth brushing, and basic coat maintenance can all be done at home with proper technique and tools. Many veterinary practices and pet stores offer grooming classes teaching these skills. However, some tasks like anal gland expression for dogs or lion cuts for long-haired cats are best left to professionals due to the skill and equipment required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Budgeting Mistakes */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Pet Budgeting Mistakes to Avoid</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Even well-intentioned pet owners frequently underestimate costs or overlook important expense categories when budgeting for a new pet. Understanding these common mistakes helps you create more accurate financial projections and avoid the financial stress that leads many families to surrender pets to shelters. The following represent the most frequent budgeting errors we see among prospective and new pet owners.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Underestimating Emergency and Unexpected Costs</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The single most common budgeting mistake is failing to plan for emergency veterinary care and unexpected expenses. Surveys consistently show that 60-70% of pet owners would struggle to cover an unexpected £500 veterinary bill, yet emergency situations requiring £1,000-£5,000 in treatment are not uncommon over a pet's lifetime. Accidents like broken bones from falls, ingestion of foreign objects requiring surgery, or sudden illnesses like pancreatitis or urinary blockages can occur regardless of how carefully you care for your pet.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Financial advisors recommend either purchasing comprehensive pet insurance (typically £20-£60 monthly depending on pet age, breed, and coverage level) or maintaining a dedicated emergency fund of at least £1,000-£3,000 for pet medical expenses. Insurance works best when purchased while your pet is young and healthy, as pre-existing conditions are typically excluded from coverage. An emergency fund offers more flexibility but requires discipline to maintain and not raid for non-emergency purposes.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Focusing Only on Purchase Price</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Many prospective pet owners focus heavily on the initial purchase or adoption price while giving insufficient attention to lifetime costs. A "free" kitten from a friend will cost just as much to feed, vaccinate, and care for as one adopted from a shelter for £100, and both will cost substantially less over their lifetime than a purebred kitten purchased for £800. The adoption fee represents typically less than 5% of total lifetime costs—making adoption decisions based primarily on upfront price rather than total cost of ownership leads to poor financial planning.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Similarly, choosing a breed based on purchase price without considering ongoing costs can backfire financially. A Labrador Retriever puppy might cost less initially than a French Bulldog, but the Frenchie's potential breathing problems, skin issues, and other breed-specific health concerns could result in substantially higher veterinary costs over the dog's lifetime. Researching breed-specific health issues and typical costs before committing helps you make financially sound decisions.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Overlooking Hidden Costs</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Numerous "hidden" costs catch new pet owners by surprise. Renters often discover that pet-friendly properties charge non-refundable pet deposits (£200-£500) plus monthly pet rent (£20-£50) that can add £240-£600 annually to housing costs. Homeowners insurance may increase by £50-£150 annually when you add a pet, particularly for certain dog breeds. Travel becomes more expensive when you need to pay for pet-sitting (£15-£35 daily), boarding (£20-£50 daily), or pet-friendly accommodations that charge additional fees.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Other commonly overlooked expenses include replacement costs for damaged furniture, shoes, or household items (particularly during the puppy or kitten stage), professional training or behavior modification (£200-£800 for group classes or £500-£2,000 for private training), and the opportunity cost of time spent on pet care rather than income-generating activities. While not all of these apply to every pet owner, budgeting for at least some unexpected expenses prevents financial stress when they inevitably occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Cost Variations */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How Location Affects Pet Ownership Costs</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Geographic location significantly impacts pet ownership costs, with variations of 50-100% or more between high-cost urban areas and lower-cost rural regions. Understanding these regional differences helps you budget accurately for your specific circumstances and may even influence decisions about where to live if pet ownership is a priority. Our calculator adjusts estimates based on your postal code or ZIP code to reflect these local cost variations.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">Urban vs Rural Cost Differences</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Urban areas typically feature higher costs across nearly all pet ownership categories. Veterinary care in London, Manchester, or Edinburgh costs 30-60% more than in rural areas due to higher overhead costs for veterinary practices (rent, salaries, insurance). Professional grooming, boarding, and pet-sitting services similarly cost more in cities. However, urban areas often offer more competition among service providers and greater availability of low-cost vaccination clinics, potentially offsetting some cost differences.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Housing-related pet costs vary dramatically by location. Urban renters face steeper pet deposits and monthly pet rent than those in smaller towns or rural areas. Some competitive urban rental markets have such limited pet-friendly housing that pet owners must accept less desirable properties or pay premium prices for pet-friendly units. Conversely, rural and suburban areas with more single-family homes and lower housing costs generally offer more affordable pet-friendly options.
              </p>

              <h3 className="text-2xl font-semibold mb-4 mt-8">International Cost Comparisons</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Pet ownership costs vary substantially between countries due to differences in veterinary care standards, regulations, availability of services, and general cost of living. The UK, Australia, Singapore, and the United States all feature relatively high pet ownership costs compared to global averages, but with significant variations between them. Singapore's limited space and import restrictions make pet ownership particularly expensive, while parts of the United States and Australia offer lower costs due to greater competition and different regulatory environments.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These international differences affect not just routine costs but also availability of services and treatment options. Some countries have more developed pet insurance markets offering better value, while others rely more heavily on out-of-pocket payment for veterinary care. Understanding your local market helps you make appropriate financial preparations and take advantage of available resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Calculate Your Pet Costs?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get your personalized estimate in less than 2 minutes.
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              onClick={() => setShowCalculator(true)}
            >
              Start Free Calculation
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Expert Pet Care Guides & Tips
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive guides on pet costs, breed-specific information, and money-saving tips.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/blog/golden-retriever-lifetime-costs" className="group">
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                <img 
                  src="/blog-images/golden-retriever.jpg" 
                  alt="Golden Retriever Cost Guide"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Breed Guide</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    Golden Retriever Lifetime Costs
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete breakdown of Golden Retriever ownership costs from puppyhood to senior years.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/blog/budget-friendly-pet-care-tips" className="group">
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                <img 
                  src="/blog-images/budget-pet-care.jpg" 
                  alt="Budget Pet Care Tips"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Cost-Saving Tips</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    15 Budget-Friendly Pet Care Tips
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Save money on pet care without compromising quality or your pet's happiness.
                  </p>
                </div>
              </div>
            </Link>
            <Link href="/blog/dog-vs-cat-costs" className="group">
              <div className="bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                <img 
                  src="/blog-images/dog-vs-cat.jpg" 
                  alt="Dog vs Cat Costs"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">Comparison</div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    Dog vs Cat: Which Costs More?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive cost comparison to help you choose the right pet for your budget.
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="text-center">
            <Link href="/blog">
              <Button variant="outline" size="lg">
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Ad Section - Content-rich page */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <AdSense />
        </div>
      </section>

      {/* Affiliate Partners Section */}
      <section className="py-12 bg-muted/10 border-t">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-8">Our Trusted Partners</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg border-2 border-border">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">Purina UK</h3>
                  <p className="text-sm text-muted-foreground mb-4">Premium pet nutrition and food</p>
                </div>
                <div className="space-y-3">
                  <a 
                    href="https://www.awin1.com/cread.php?awinmid=24465&awinaffid=2632402&ued=https%3A%2F%2Fdirect.purina.co.uk%2Fproducts%2Fshop-all.list" 
                    target="_blank" 
                    rel="noopener noreferrer sponsored"
                    className="block px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-center font-medium"
                  >
                    25% Off New Customers - Code: PURINA25
                  </a>
                  <a 
                    href="https://www.awin1.com/cread.php?awinmid=24465&awinaffid=2632402&ued=https%3A%2F%2Fdirect.purina.co.uk%2Fproducts%2Fshop-all.list" 
                    target="_blank" 
                    rel="noopener noreferrer sponsored"
                    className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors text-center font-medium"
                  >
                    15% Off Existing Customers - Code: 15PURINA
                  </a>
                  <p className="text-xs text-muted-foreground text-center">Valid until 31/12/2025</p>
                </div>
              </div>
              <a 
                href="https://www.pet24.org.uk/affiliatecustomerlanding/?affiliate=9SPRRUSDL5" 
                target="_blank" 
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center p-6 bg-white rounded-lg border-2 border-border hover:border-primary transition-colors group"
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Pet 24 UK</h3>
                  <p className="text-sm text-muted-foreground">24/7 veterinary care and support</p>
                </div>
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              We may earn a commission from purchases made through these affiliate links at no extra cost to you.
            </p>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="font-semibold">PetCost-Calculator.com</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <p className="text-sm text-muted-foreground">
                © 2025 PetCost-Calculator.com. Helping pet owners make informed decisions.
              </p>
            </div>
          </div>
          <FooterDisclaimer />
        </div>
      </footer>
    </div>
    </>
  );
}

