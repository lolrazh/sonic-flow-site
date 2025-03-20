export interface PaddleCustomer {
  id: string;
  email: string;
  custom_data?: {
    user_id: string;
  };
}

export interface PaddlePrice {
  id: string;
}

export interface PaddleSubscriptionItem {
  price: PaddlePrice;
  total_amount: number;
}

export interface PaddlePeriod {
  start_at: string;
  end_at: string;
}

export interface PaddleSubscription {
  id: string;
  status: 'active' | 'canceled' | 'paused' | 'past_due' | 'trialing';
  items: PaddleSubscriptionItem[];
  current_billing_period: PaddlePeriod;
  trial_period?: PaddlePeriod;
}

export interface PaddleTransaction {
  id: string;
  customer: PaddleCustomer;
  items: PaddleSubscriptionItem[];
  currency_code: string;
  status: 'completed' | 'failed' | 'refunded' | 'pending';
}

export interface PaddleWebhookEvent {
  event_type: string;
  data: {
    customer: PaddleCustomer;
    subscription?: PaddleSubscription;
    transaction?: PaddleTransaction;
  };
} 