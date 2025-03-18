## Revised Architecture & Implementation Plan

The current implementation has a well-structured landing page with clear sections, which we'll maintain while improving the overall code organization, backend integration, and maintainability. This document outlines the recommended changes while preserving what's working well.

### Key Observations from Current Implementation

1. **Landing Page Structure**: Well-organized with distinct section components in `src/app/_components/landing/` (Hero, UserPersonas, CompatibleApps, Pricing, Benefits, FAQ, Footer).
2. **App Router Implementation**: Using Next.js App Router with a clean structure.
3. **Authentication**: Implemented via Supabase in the login and dashboard sections.
4. **Missing Subscription Flow**: Need to implement Paddle integration for the $5/month subscription with a 7-day free trial.

### Implementation Improvements

While preserving the current landing page structure and content, we'll enhance:

1. **Code Organization**: Improved component structure and naming
2. **Backend Integration**: Adding Paddle for subscription management
3. **Type Safety**: Enhanced TypeScript usage throughout
4. **Maintainability**: Clearer separation of concerns

## Updated Architecture

### 1. Maintain Current Landing Page Structure

- **Keep Current Components**: Preserve the existing landing page sections in `src/app/_components/landing/`
- **Refactoring Opportunity**: Minor improvements to component structure:
  - Add proper TypeScript interfaces for component props
  - Extract reusable UI elements to shared components
  - Implement more consistent styling patterns

### 2. Authentication Flow Enhancement

- **Current**: Supabase Auth UI in `src/app/login/page.tsx`
- **Improvement**: 
  - Add proper loading/error states
  - Enhance redirect logic
  - Improve session management in `src/lib/auth.ts`
  - Better integration with the protected dashboard layout

### 3. Subscription Flow Implementation

- **Add Paddle Integration** (currently missing):
  - Install Paddle SDK
  - Implement a new `/subscribe` route after signup
  - Create proper subscription management UI in the dashboard

### 4. Dashboard Enhancement

- **Current**: Basic dashboard in `src/app/dashboard/`
- **Improvements**:
  - Add subscription status display
  - Integrate with Paddle for subscription management
  - Improve UI/UX for managing account
  - Add app download section

## Implementation Plan

### 1. Backend Enhancement

#### Paddle Integration

- **Add Paddle SDK**:
  ```tsx
  // src/lib/paddle.ts
  import type { PaddleOptions } from '@paddle/paddle-js';

  export const initPaddle = () => {
    if (typeof window !== 'undefined') {
      window.Paddle?.Setup({
        vendor: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
      });
    }
  };

  export const openCheckout = (options: PaddleOptions) => {
    if (typeof window !== 'undefined') {
      window.Paddle?.Checkout.open(options);
    }
  };
  ```

- **Create Webhook Handler**:
  ```tsx
  // src/app/api/paddle/webhook/route.ts
  import { NextRequest, NextResponse } from 'next/server';
  import { createServerClient } from '~/lib/supabase/server';
  
  export async function POST(req: NextRequest) {
    const body = await req.json();
    // Verify webhook signature from Paddle
    
    const supabase = createServerClient();
    
    // Process different alert types (subscription_created, subscription_updated, etc.)
    switch (body.alert_name) {
      case 'subscription_created':
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: body.passthrough,
            paddle_subscription_id: body.subscription_id,
            status: 'active',
            trial_ends: new Date(body.next_bill_date),
            plan_id: body.subscription_plan_id
          });
        break;
      // Handle other webhook events
    }
    
    return NextResponse.json({ success: true });
  }
  ```

- **Database Schema** (add to existing Supabase setup):
  ```sql
  -- In Supabase SQL Editor:
  CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    paddle_subscription_id TEXT NOT NULL,
    status TEXT NOT NULL,
    trial_ends TIMESTAMP WITH TIME ZONE,
    plan_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
  ```

### 2. New Subscribe Page

```tsx
// src/app/subscribe/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "~/lib/auth";
import { initPaddle, openCheckout } from "~/lib/paddle";
import { Button } from "~/components/ui/button";

export default function SubscribePage() {
  const router = useRouter();
  const { session, loading } = useSession();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  
  useEffect(() => {
    if (!loading && !session) {
      router.push("/login");
    }
    
    initPaddle();
  }, [loading, session, router]);
  
  const handleSubscribe = () => {
    if (!session?.user) return;
    
    setCheckoutLoading(true);
    
    openCheckout({
      product: process.env.NEXT_PUBLIC_PADDLE_PLAN_ID,
      email: session.user.email,
      passthrough: session.user.id,
      successCallback: () => {
        setCheckoutLoading(false);
        router.push("/dashboard");
      },
      closeCallback: () => {
        setCheckoutLoading(false);
      }
    });
  };
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="container max-w-lg py-12 mx-auto text-center">
      <h1 className="mb-6 text-3xl font-bold">Start Your 7-Day Free Trial</h1>
      <p className="mb-8">
        Try Sonic Flow for 7 days free, then $5/month. Cancel anytime.
      </p>
      <Button 
        size="lg" 
        onClick={handleSubscribe} 
        disabled={checkoutLoading}
        className="w-full"
      >
        {checkoutLoading ? "Loading..." : "Start Free Trial"}
      </Button>
    </div>
  );
}
```

### 3. Enhanced Dashboard

Enhance the existing dashboard to show subscription status:

```tsx
// src/app/dashboard/components/SubscriptionStatus.tsx
"use client";

import { useEffect, useState } from "react";
import { createClientClient } from "~/lib/supabase/client";
import { useSession } from "~/lib/auth";
import { Button } from "~/components/ui/button";
import { openCheckout, initPaddle } from "~/lib/paddle";

type Subscription = {
  status: string;
  trial_ends: string | null;
  paddle_subscription_id: string;
};

export function SubscriptionStatus() {
  const { session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!session?.user) return;
    
    async function loadSubscription() {
      const supabase = createClientClient();
      
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
        
      if (!error && data) {
        setSubscription(data);
      }
      
      setLoading(false);
    }
    
    loadSubscription();
    initPaddle();
  }, [session]);
  
  const handleManageSubscription = () => {
    if (!subscription) {
      // No subscription - open checkout
      openCheckout({
        product: process.env.NEXT_PUBLIC_PADDLE_PLAN_ID,
        email: session?.user.email,
        passthrough: session?.user.id,
      });
    } else {
      // Open Paddle's customer portal for subscription management
      if (typeof window !== "undefined") {
        window.Paddle?.Checkout.open({
          override: `https://vendors.paddle.com/subscription/customers/${subscription.paddle_subscription_id}`,
        });
      }
    }
  };
  
  if (loading) return <div>Loading subscription information...</div>;
  
  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Subscription Status</h2>
      
      {subscription ? (
        <div>
          <p className="mb-2">
            Status: <span className="font-medium">{subscription.status}</span>
          </p>
          
          {subscription.trial_ends && new Date(subscription.trial_ends) > new Date() && (
            <p className="mb-4">
              Trial ends: <span className="font-medium">
                {new Date(subscription.trial_ends).toLocaleDateString()}
              </span>
            </p>
          )}
          
          <Button onClick={handleManageSubscription}>
            Manage Subscription
          </Button>
        </div>
      ) : (
        <div>
          <p className="mb-4">You don't have an active subscription.</p>
          <Button onClick={handleManageSubscription}>
            Start 7-Day Free Trial
          </Button>
        </div>
      )}
    </div>
  );
}
```

Then integrate this component into your dashboard page:

```tsx
// Inside src/app/dashboard/page.tsx
<div className="grid gap-6 mb-8 md:grid-cols-2">
  <SubscriptionStatus />
  <DownloadApp />
</div>
```

### 4. Enhance Login Flow

Improve the existing login page to better handle redirects to subscribe:

```tsx
// Update the redirect logic in src/app/login/page.tsx
// After successful login:

const onAuthStateChange = (event: AuthChangeEvent) => {
  if (event === 'SIGNED_IN') {
    // Check if user has active subscription
    const checkSubscription = async () => {
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', supabase.auth.getUser().data.user?.id)
        .single();
        
      if (data && data.status === 'active') {
        // User has active subscription, go to dashboard
        router.push('/dashboard');
      } else {
        // No subscription, redirect to subscribe page
        router.push('/subscribe');
      }
    };
    
    checkSubscription();
  }
};
```

### 5. Environment Variables

Update `.env.local` with Paddle configuration:

```
# Existing variables
# ...

# Paddle
NEXT_PUBLIC_PADDLE_VENDOR_ID=YOUR_VENDOR_ID
NEXT_PUBLIC_PADDLE_PLAN_ID=YOUR_SUBSCRIPTION_PLAN_ID
PADDLE_API_KEY=YOUR_API_KEY_FOR_WEBHOOKS
```

## Updated Directory Structure

The revised structure maintains most of the existing architecture while adding new components for the subscription flow:

```
src/
├── app/
│   ├── layout.tsx           # Root layout (retains existing structure)
│   ├── page.tsx             # Landing page (keeps existing implementation)
│   ├── login/               # Authentication pages (enhance existing)
│   │   └── page.tsx
│   ├── subscribe/           # New subscription setup with Paddle
│   │   └── page.tsx
│   ├── dashboard/           # Enhanced dashboard with subscription management
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── SubscriptionStatus.tsx
│   │       └── DownloadApp.tsx
│   ├── _components/         # Keep existing landing page components
│   │   └── landing/         # Maintain existing structure
│   │       ├── Hero.tsx
│   │       ├── UserPersonas.tsx
│   │       ├── CompatibleApps.tsx
│   │       ├── Pricing.tsx
│   │       ├── Benefits.tsx
│   │       ├── FAQ.tsx
│   │       ├── Footer.tsx
│   │       └── index.ts
│   └── api/
│       └── paddle/
│           └── webhook/
│               └── route.ts   # Paddle webhook handler
├── components/
│   ├── ui/                  # Shared UI components (keep existing)
│   └── ClientWrapper.tsx    # Keep existing implementation
├── lib/
│   ├── auth.ts              # Enhanced Supabase auth utilities
│   ├── paddle.ts            # New Paddle integration utilities
│   └── supabase/            # Organized Supabase clients
│       ├── client.ts        # Client-side Supabase instance
│       └── server.ts        # Server-side Supabase instance
└── [rest of existing structure]
```

## User Flow (Enhanced)

1. **Landing Page (`/`)**: User views the value proposition and clicks "Start 7-Day Free Trial."
2. **Sign-Up (`/login?mode=signup`)**: Creates account with email/password via Supabase.
3. **Subscribe (`/subscribe`)**: Sets up $5/month subscription with 7-day trial via Paddle Checkout.
4. **Dashboard (`/dashboard`)**: Views subscription status, manages it via Paddle portal, and downloads the app.

This implementation maintains your existing landing page structure and content while enhancing the backend integration, particularly for subscription management through Paddle.