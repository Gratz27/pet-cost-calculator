import { PawPrint, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'wouter';
import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import SEO from '@/components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send to Web3Forms which forwards to hello@petcost-calculator.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with actual key
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'PetCost Calculator Contact Form',
          to_email: 'hello@petcost-calculator.com'
        }),
      });

      if (response.ok) {
        toast.success('Message sent! We\'ll get back to you within 24 hours.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again or email us directly.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please email us at hello@petcost-calculator.com');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Contact Pet Cost Calculator - Get Help with Pet Budgeting"
        description="Contact PetCost-Calculator.com for questions, feedback, partnership inquiries, or technical support. We're here to help you plan your pet budget."
        keywords="contact pet cost calculator, pet budgeting help, pet cost questions, partnership inquiries"
        breadcrumbs={[
          { name: "Home", url: "https://petcost-calculator.com" },
          { name: "Contact", url: "https://petcost-calculator.com/contact" }
        ]}
      />
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or partnership inquiries? We'd love to hear from you. <Link href="/" className="text-primary hover:underline">Try our calculator</Link> to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center">Ways to Reach Us</h2>
                
                <div className="space-y-6">
                  <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                        <p className="text-muted-foreground mb-2">
                          For general inquiries and support
                        </p>
                        <a href="mailto:hello@petcostcalculator.com" className="text-primary hover:underline">
                          hello@petcostcalculator.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Partnership Inquiries</h3>
                        <p className="text-muted-foreground mb-2">
                          Shelters, rescues, and pet businesses
                        </p>
                        <a href="mailto:partnerships@petcostcalculator.com" className="text-primary hover:underline">
                          partnerships@petcostcalculator.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <HelpCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Technical Support</h3>
                        <p className="text-muted-foreground mb-2">
                          Having issues with the calculator?
                        </p>
                        <a href="mailto:support@petcostcalculator.com" className="text-primary hover:underline">
                          support@petcostcalculator.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div className="mt-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">Looking for Quick Answers?</h3>
                  <p className="text-muted-foreground mb-4">
                    Check out our <Link href="/how-it-works" className="text-primary hover:underline">How It Works</Link> page for detailed information about using the calculator, or visit our <Link href="/about" className="text-primary hover:underline">About page</Link> to learn more about our mission.
                  </p>
                  <Link href="/how-it-works">
                    <Button variant="outline">
                      View How It Works
                    </Button>
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PawPrint className="h-6 w-6 text-primary" />
              <span className="text-sm font-semibold">PetCost-Calculator.com</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 PetCost-Calculator.com. Helping pets find forever homes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

