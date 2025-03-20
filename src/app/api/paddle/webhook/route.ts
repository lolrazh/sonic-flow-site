import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyPaddleWebhook } from '@/lib/paddle-webhook';
import type { Database } from '@/types/database.types';
import type {
  PaddleWebhookEvent,
  PaddleSubscription,
  PaddleTransaction,
  PaddleCustomer
} from '@/types/paddle';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SubscriptionEventData {
  subscription: PaddleSubscription;
  customer: PaddleCustomer;
}

interface TransactionEventData {
  transaction: PaddleTransaction;
  customer: PaddleCustomer;
  subscription?: PaddleSubscription;
}

function isSubscriptionEvent(data: PaddleWebhookEvent['data']): data is SubscriptionEventData {
  return 'subscription' in data && 
         data.subscription !== undefined && 
         'customer' in data &&
         data.customer !== undefined;
}

function isTransactionEvent(data: PaddleWebhookEvent['data']): data is TransactionEventData {
  return 'transaction' in data && 
         data.transaction !== undefined &&
         'customer' in data &&
         data.customer !== undefined;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('Paddle-Signature');

    if (!signature) {
      return new NextResponse('Missing signature', { status: 400 });
    }

    // Verify webhook signature
    const isValid = verifyPaddleWebhook(rawBody, signature);
    if (!isValid) {
      return new NextResponse('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(rawBody) as PaddleWebhookEvent;
    const { data } = event;

    switch (event.event_type) {
      case 'subscription.created':
        if (isSubscriptionEvent(data)) await handleSubscriptionCreated(data);
        break;
      case 'subscription.updated':
        if (isSubscriptionEvent(data)) await handleSubscriptionUpdated(data);
        break;
      case 'subscription.canceled':
        if (isSubscriptionEvent(data)) await handleSubscriptionCanceled(data);
        break;
      case 'subscription.activated':
        if (isSubscriptionEvent(data)) await handleSubscriptionActivated(data);
        break;
      case 'subscription.paused':
        if (isSubscriptionEvent(data)) await handleSubscriptionPaused(data);
        break;
      case 'subscription.resumed':
        if (isSubscriptionEvent(data)) await handleSubscriptionResumed(data);
        break;
      case 'transaction.created':
        if (isTransactionEvent(data)) await handleTransactionCreated(data);
        break;
      case 'transaction.completed':
        if (isTransactionEvent(data)) await handleTransactionCompleted(data);
        break;
      case 'transaction.failed':
        if (isTransactionEvent(data)) await handleTransactionFailed(data);
        break;
      case 'transaction.refunded':
        if (isTransactionEvent(data)) await handleTransactionRefunded(data);
        break;
      default:
        console.log(`Unhandled webhook event: ${event.event_type}`);
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Webhook error', { status: 500 });
  }
}

async function handleSubscriptionCreated(data: SubscriptionEventData) {
  const { subscription, customer } = data;
  
  // Create or update customer
  await supabase.from('customers').upsert({
    id: customer.custom_data?.user_id ?? '',
    paddle_customer_id: customer.id,
    email: customer.email,
  });

  // Create subscription
  await supabase.from('subscriptions').insert({
    user_id: customer.custom_data?.user_id ?? '',
    paddle_subscription_id: subscription.id,
    paddle_plan_id: subscription.items[0]?.price.id ?? '',
    status: subscription.status,
    current_period_start: subscription.current_billing_period.start_at,
    current_period_end: subscription.current_billing_period.end_at,
    trial_start: subscription.trial_period?.start_at ?? null,
    trial_end: subscription.trial_period?.end_at ?? null,
  });
}

async function handleSubscriptionUpdated(data: SubscriptionEventData) {
  const { subscription } = data;
  
  await supabase.from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: subscription.current_billing_period.start_at,
      current_period_end: subscription.current_billing_period.end_at,
      trial_start: subscription.trial_period?.start_at ?? null,
      trial_end: subscription.trial_period?.end_at ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', subscription.id);
}

async function handleSubscriptionCanceled(data: SubscriptionEventData) {
  const { subscription } = data;
  
  await supabase.from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', subscription.id);
}

async function handleSubscriptionActivated(data: SubscriptionEventData) {
  const { subscription } = data;
  
  await supabase.from('subscriptions')
    .update({
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', subscription.id);
}

async function handleSubscriptionPaused(data: SubscriptionEventData) {
  const { subscription } = data;
  
  await supabase.from('subscriptions')
    .update({
      status: 'paused',
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', subscription.id);
}

async function handleSubscriptionResumed(data: SubscriptionEventData) {
  const { subscription } = data;
  
  await supabase.from('subscriptions')
    .update({
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', subscription.id);
}

async function handleTransactionCreated(data: TransactionEventData) {
  const { transaction, subscription } = data;
  
  await supabase.from('transactions').insert({
    user_id: transaction.customer.custom_data?.user_id ?? '',
    subscription_id: subscription?.id ?? null,
    paddle_transaction_id: transaction.id,
    amount: transaction.items[0]?.total_amount ?? 0,
    currency: transaction.currency_code,
    status: transaction.status,
    billing_period_start: subscription?.current_billing_period?.start_at ?? null,
    billing_period_end: subscription?.current_billing_period?.end_at ?? null,
  });
}

async function handleTransactionCompleted(data: TransactionEventData) {
  const { transaction } = data;
  
  await supabase.from('transactions')
    .update({
      status: 'completed',
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_transaction_id', transaction.id);
}

async function handleTransactionFailed(data: TransactionEventData) {
  const { transaction } = data;
  
  await supabase.from('transactions')
    .update({
      status: 'failed',
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_transaction_id', transaction.id);
}

async function handleTransactionRefunded(data: TransactionEventData) {
  const { transaction } = data;
  
  await supabase.from('transactions')
    .update({
      status: 'refunded',
      updated_at: new Date().toISOString(),
    })
    .eq('paddle_transaction_id', transaction.id);
} 