import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '~/lib/supabase/server';
import { verifyPaddleWebhook } from '~/lib/paddle-webhook';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('paddle-signature');

    // Verify webhook signature
    if (!signature || !verifyPaddleWebhook(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);
    const supabase = createServerClient();

    // Handle different webhook events
    switch (body.event_type) {
      case 'subscription.created':
        await handleSubscriptionCreated(body, supabase);
        break;
      case 'subscription.updated':
        await handleSubscriptionUpdated(body, supabase);
        break;
      case 'subscription.canceled':
        await handleSubscriptionCanceled(body, supabase);
        break;
      // Add more event handlers as needed
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(
  data: any,
  supabase: ReturnType<typeof createClient>
) {
  const { subscription, customer } = data.data;
  
  await supabase.from('subscriptions').upsert({
    user_id: customer.id,
    paddle_subscription_id: subscription.id,
    status: subscription.status,
    plan_id: subscription.items[0].price.id,
    trial_ends: subscription.trial_ends_at,
    current_period_start: subscription.current_period_start,
    current_period_end: subscription.current_period_end,
  });
}

async function handleSubscriptionUpdated(
  data: any,
  supabase: ReturnType<typeof createClient>
) {
  const { subscription } = data.data;

  await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at: subscription.scheduled_change?.action === 'cancel' 
        ? subscription.scheduled_change.effective_at 
        : null,
    })
    .eq('paddle_subscription_id', subscription.id);
}

async function handleSubscriptionCanceled(
  data: any,
  supabase: ReturnType<typeof createClient>
) {
  const { subscription } = data.data;

  await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
      canceled_at: new Date().toISOString(),
    })
    .eq('paddle_subscription_id', subscription.id);
} 