"use client";

import { useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { createClientClient } from "@/lib/supabase/client";
import { useSession } from "@/lib/auth";
import { initPaddle, openCheckout } from "@/lib/paddle";
import type { Paddle } from '@paddle/paddle-js';
import type { Database } from '@/types/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

declare global {
  interface Window {
    Paddle?: Paddle;
  }
}

export default function SubscriptionStatus() {
  const { user } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadSubscription = async () => {
      const supabase = createClientClient();
      try {
        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (!error && data) {
          setSubscription(data);
        }
      } catch (err) {
        console.error("Error loading subscription:", err);
      }
      setLoading(false);
    };

    void loadSubscription();
    void initPaddle().catch(console.error);
  }, [user]);

  const handleManageSubscription = async () => {
    if (!subscription) {
      // No subscription - open checkout
      await openCheckout({
        priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!,
        customerEmail: user?.email,
        customerId: user?.id,
        successUrl: window.location.href,
      });
    } else {
      // Open Paddle's customer portal
      if (typeof window !== "undefined" && window.Paddle?.Checkout) {
        await window.Paddle.Checkout.open({
          items: [{ priceId: process.env.NEXT_PUBLIC_PADDLE_PLAN_ID! }],
          customer: user?.email ? { email: user.email } : undefined,
          settings: {
            displayMode: 'overlay',
            theme: 'dark',
            frameTarget: 'customer-portal',
            successUrl: window.location.href
          }
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[rgb(18,18,18)] p-8">
        <h2 className="mb-8 font-lexend text-xl lowercase tracking-tight text-white/90">subscription settings</h2>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 animate-pulse rounded-full bg-white/10"></div>
          <div className="h-4 w-24 animate-pulse rounded-full bg-white/10"></div>
        </div>
      </div>
    );
  }

  const isOnTrial = subscription?.status === 'trialing';
  const trialDaysLeft = subscription?.trial_end
    ? Math.max(0, Math.ceil((new Date(subscription.trial_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[rgb(18,18,18)] p-8">
      <h2 className="mb-8 font-lexend text-xl lowercase tracking-tight text-white/90">subscription settings</h2>
      
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-4 flex items-center">
            <span className={`mr-2 inline-block h-2 w-2 rounded-full ${
              isOnTrial ? "bg-white/40" : "bg-white"
            }`}></span>
            <span className="font-lexend text-white/90">
              {!subscription ? "no active subscription" :
               isOnTrial ? "trial period" :
               subscription.status === 'active' ? "active subscription" :
               subscription.status === 'canceled' ? "subscription canceled" :
               subscription.status}
            </span>
          </div>
          
          {subscription ? (
            isOnTrial ? (
              <p className="font-lexend text-white/40">
                <span className="text-white/90">{trialDaysLeft} days</span> left in your trial. upgrade to pro for unlimited access.
              </p>
            ) : subscription.status === 'active' ? (
              <p className="font-lexend text-white/40">
                you are currently on the <span className="text-white/90">pro plan</span>. next billing date:{' '}
                <span className="text-white/90">
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </span>
              </p>
            ) : (
              <p className="font-lexend text-white/40">
                your subscription will end on{' '}
                <span className="text-white/90">
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </span>
              </p>
            )
          ) : (
            <p className="font-lexend text-white/40">
              start your 7-day free trial to access all features.
            </p>
          )}
        </div>
        
        <button 
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-lexend text-sm text-black/90 transition-colors hover:bg-white/90"
          onClick={handleManageSubscription}
        >
          {!subscription ? "start free trial" :
           isOnTrial ? "upgrade plan" :
           "manage subscription"}
          <BiRightArrowAlt className="ml-1" size={18} />
        </button>
      </div>
    </div>
  );
} 