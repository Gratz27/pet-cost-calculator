import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Download, Mail, CheckCircle2 } from 'lucide-react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email to Web3Forms (free email service)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY', // You'll need to replace this
          subject: 'New Pet Budget Checklist Request',
          from_name: 'PetCost-Calculator.com',
          email: email,
          message: `User ${email} requested the Pet Budget Checklist`,
        }),
      });

      if (response.ok) {
        // Trigger PDF download
        const link = document.createElement('a');
        link.href = '/pet-budget-checklist.pdf';
        link.download = 'Pet-Budget-Checklist.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setIsSubmitted(true);
        toast.success('Success! Check your downloads for the checklist.');
        
        // Track in Google Analytics if available
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'download', {
            event_category: 'engagement',
            event_label: 'pet_budget_checklist',
          });
        }
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      // Even if email fails, still provide the download
      const link = document.createElement('a');
      link.href = '/pet-budget-checklist.pdf';
      link.download = 'Pet-Budget-Checklist.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Downloading checklist now!');
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3 text-green-900">Checklist Downloaded!</h2>
          <p className="text-green-700 mb-4">
            Your Pet Budget Checklist should be in your downloads folder.
          </p>
          <Button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/pet-budget-checklist.pdf';
              link.download = 'Pet-Budget-Checklist.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            variant="outline"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-3">Get Your Free Pet Budget Checklist</h2>
        <p className="text-muted-foreground mb-6">
          Download our comprehensive 15-page checklist covering all pet ownership costs, money-saving tips, and budget worksheets.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors"
            required
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            size="lg" 
            className="px-8 gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Get Checklist
              </>
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-3">
          We respect your privacy. Unsubscribe anytime. No spam, ever.
        </p>
      </div>
    </Card>
  );
}

