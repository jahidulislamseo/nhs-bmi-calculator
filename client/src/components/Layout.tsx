import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/generated_images/minimalist_logo_for_bmi_calculator_with_heartbeat_icon.png";
import { Menu, X, Facebook, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Twitter icon component since it was renamed to X in lucide but might not be in this version or we want a specific look
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/disclaimer", label: "Disclaimer" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <img 
                src={logoImage} 
                alt="nhs bmi calculator logo" 
                className="h-10 w-auto object-contain" 
              />
              <span className="font-heading font-bold text-xl tracking-tight hidden sm:block text-primary-black">
                nhs bmi calculator
              </span>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            <Link href="/">
              <Button 
                variant="default" 
                className="bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Calculate Now
              </Button>
            </Link>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 mt-6">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a 
                        className={`text-lg font-medium transition-colors hover:text-primary ${
                          isActive(link.href) ? "text-primary" : "text-foreground"
                        }`}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                  <Link href="/">
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      Calculate Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 border-t border-neutral-200 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img src={logoImage} alt="nhs bmi calculator" className="h-8 w-auto" />
                <span className="font-heading font-bold text-lg">nhs bmi calculator</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A fast, accurate, and accessible tool to check your Body Mass Index. designed to help you understand your health metrics better.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-foreground">Quick Links</h3>
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="flex flex-col gap-3">
              <h3 className="font-heading font-semibold text-foreground">Resources</h3>
              <ul className="flex flex-col gap-2">
                <li><Link href="/#faq"><a className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">FAQ</a></Link></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">BMI Categories</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline">How it works</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Social */}
            <div className="flex flex-col gap-4">
              <h3 className="font-heading font-semibold text-foreground">Connect</h3>
              <a href="mailto:contact@nhsbmicalculator.mock" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                contact@nhsbmicalculator.mock
              </a>
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><TwitterIcon className="w-5 h-5" /></a>
                <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
                <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} nhs bmi calculator. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground italic">
              Not affiliated with the NHS. This tool is for information only and not a substitute for professional medical advice.
            </p>
            <div className="text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                Accessibility Compliant (WCAG AA)
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}