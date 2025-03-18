/**
 * TypeScript interfaces for landing page components
 */

export interface PillUIProps {
  isAnimated?: boolean;
  className?: string;
}

export interface HeroProps {
  headline?: string;
  subheadline?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export interface UserPersonaProps {
  personas?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}

export interface CompatibleAppProps {
  title?: string;
  subtitle?: string;
  apps?: Array<{
    name: string;
    logo: string;
    alt?: string;
  }>;
}

export interface PricingProps {
  title?: string;
  subtitle?: string;
  price?: number;
  currency?: string;
  trialDays?: number;
  features?: string[];
  ctaText?: string;
  ctaHref?: string;
}

export interface BenefitProps {
  title?: string;
  subtitle?: string;
  benefits?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
}

export interface FooterProps {
  columns?: Array<{
    title: string;
    links: Array<{
      title: string;
      href: string;
    }>;
  }>;
  legalLinks?: Array<{
    title: string;
    href: string;
  }>;
  copyright?: string;
} 