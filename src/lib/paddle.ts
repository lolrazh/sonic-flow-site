import { initializePaddle, Paddle, InitializePaddleOptions } from '@paddle/paddle-js';
import { Database } from '@/types/database.types';

export type PriceWithProduct = Database['public']['Tables']['prices']['Row'] & {
  product: Database['public']['Tables']['products']['Row'];
};

export type SubscriptionWithDetails = Database['public']['Tables']['subscriptions']['Row'] & {
  transactions: Database['public']['Tables']['transactions']['Row'][];
  price: PriceWithProduct;
};

export type CustomerWithSubscriptions = Database['public']['Tables']['customers']['Row'] & {
  subscriptions: SubscriptionWithDetails[];
};

let paddleInstance: Paddle | null = null;

export const initPaddle = async () => {
  if (paddleInstance) return paddleInstance;

  const settings: InitializePaddleOptions = {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox' ? 'sandbox' : 'production' as const,
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
  };

  const instance = await initializePaddle(settings);
  if (!instance) throw new Error('Failed to initialize Paddle');
  paddleInstance = instance;
  return paddleInstance;
};

export const getPaddleInstance = () => {
  if (!paddleInstance) {
    throw new Error('Paddle not initialized');
  }
  return paddleInstance;
};

export const formatPrice = (amount: number, currency: string, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const getBillingPeriodInWords = (billingPeriod: string, locale = 'en-US') => {
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  switch (billingPeriod.toLowerCase()) {
    case 'month':
      return formatter.format(1, 'month');
    case 'year':
      return formatter.format(1, 'year');
    case 'week':
      return formatter.format(1, 'week');
    default:
      return billingPeriod;
  }
};

export const openCheckout = async ({
  priceId,
  customerId,
  customerEmail,
  successUrl,
  customerLocale = 'en',
}: {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl?: string;
  customerLocale?: string;
}) => {
  const paddle = getPaddleInstance();

  const checkoutOptions = {
    items: [{ priceId }],
    customData: { customer_id: customerId },
    customerEmail,
    successUrl,
    displayMode: 'overlay' as const,
    settings: {
      locale: customerLocale,
      theme: 'light' as const,
    },
  };

  return paddle.Checkout.open(checkoutOptions);
};

export const openCustomerPortal = async ({
  customerId,
  customerEmail,
  locale = 'en',
}: {
  customerId: string;
  customerEmail: string;
  locale?: string;
}) => {
  // We need to create a portal session through our server API
  const response = await fetch('/api/paddle/create-portal-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      customerEmail,
      locale,
    }),
  });

  const data = await response.json();
  
  if (data.url) {
    window.location.href = data.url;
  } else {
    throw new Error('Failed to create customer portal session');
  }
};

export const getTrialDaysRemaining = (subscription: Database['public']['Tables']['subscriptions']['Row']) => {
  if (!subscription.trial_end) return 0;
  
  const trialEnd = new Date(subscription.trial_end);
  const now = new Date();
  
  if (now > trialEnd) return 0;
  
  const diffTime = Math.abs(trialEnd.getTime() - now.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getSubscriptionStatus = (subscription: Database['public']['Tables']['subscriptions']['Row']) => {
  if (!subscription) return 'inactive';

  switch (subscription.status.toLowerCase()) {
    case 'active':
      return subscription.trial_end ? 'trialing' : 'active';
    case 'canceled':
      return new Date(subscription.current_period_end) > new Date() ? 'canceled_but_active' : 'canceled';
    default:
      return subscription.status.toLowerCase();
  }
};

export const canManageSubscription = (subscription: Database['public']['Tables']['subscriptions']['Row']) => {
  const status = getSubscriptionStatus(subscription);
  return ['active', 'trialing', 'canceled_but_active'].includes(status);
};

export const getNextBillingDate = (subscription: Database['public']['Tables']['subscriptions']['Row']) => {
  if (!subscription) return null;
  return new Date(subscription.current_period_end);
};

export const formatNextBillingDate = (date: Date | null, locale = 'en-US') => {
  if (!date) return '';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}; 