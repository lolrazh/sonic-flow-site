import { createServerClient } from '@/lib/supabase/server';
import { PricingPlans } from '@/components/subscription/PricingPlans';
import type { Database } from '@/types/database.types';

export default async function PricingPage() {
  const supabase = createServerClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get all active prices with their products
  const { data: prices } = await supabase
    .from('prices')
    .select<string, Database['public']['Tables']['prices']['Row'] & {
      product: Database['public']['Tables']['products']['Row'];
    }>(`
      *,
      product: products (*)
    `)
    .eq('active', true)
    .order('unit_price', { ascending: true });

  // Get customer data if user is logged in
  const { data: customer } = session
    ? await supabase
        .from('customers')
        .select<string, Database['public']['Tables']['customers']['Row']>('*')
        .eq('id', session.user.id)
        .single()
    : { data: null };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-xl text-gray-600">
          Choose the perfect plan for your needs
        </p>
      </div>

      <PricingPlans
        prices={prices ?? []}
        customerId={customer?.id}
        customerEmail={session?.user.email}
      />

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">All plans include</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-4">
            <h3 className="font-medium mb-2">Feature 1</h3>
            <p className="text-gray-600">Description of feature 1</p>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-2">Feature 2</h3>
            <p className="text-gray-600">Description of feature 2</p>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-2">Feature 3</h3>
            <p className="text-gray-600">Description of feature 3</p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="font-medium mb-2">Can I cancel at any time?</h3>
            <p className="text-gray-600">
              Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">How does the trial work?</h3>
            <p className="text-gray-600">
              You can try our service for free during the trial period. You won&apos;t be charged until the trial ends, and you can cancel anytime.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards and process payments securely through Paddle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 