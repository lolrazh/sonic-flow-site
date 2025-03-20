export interface PaddleEventData {
  checkout?: {
    id: string;
    completed: boolean;
    prices: Array<{
      product: { id: string; name: string };
      billing: { interval: string; frequency: number };
      unit_price: { amount: string; currency_code: string };
    }>;
    customer: { email: string; id: string };
  };
  subscription?: {
    id: string;
    status: 'active' | 'trialing' | 'paused' | 'canceled';
    next_billed_at: string;
    current_period_end: string;
  };
  transaction?: {
    id: string;
    status: 'completed' | 'failed' | 'refunded';
    amount: string;
    currency_code: string;
  };
} 