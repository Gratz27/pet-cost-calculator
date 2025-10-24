import { PawPrint } from 'lucide-react';
import { Link } from 'wouter';

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
              <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

