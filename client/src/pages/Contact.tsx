import { PawPrint, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'wouter';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-2">
                <PawPrint className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">PetCost-Calculator.com</span>
              </a>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </Link>
              <Link href="/how-it-works">
                <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-sm font-medium text-foreground transition-colors">
                  Contact
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions, feedback, or partnership inquiries? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="mt-2 min-h-[150px]"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Other Ways to Reach Us</h2>
                
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
                    Check out our How It Works page for detailed information about using the calculator.
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

