import { createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard';
import { TransactionHistory } from '@/components/subscription/TransactionHistory';
import type { Database } from '@/types/database.types';

export default async function AccountPage() {
  const supabase = createServerClient();
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Get customer data with active subscription
  const { data: customer } = await supabase
    .from('customers')
    .select<string, {
      id: string;
      subscriptions: Array<Database['public']['Tables']['subscriptions']['Row'] & {
        price: Database['public']['Tables']['prices']['Row'] & {
          product: Database['public']['Tables']['products']['Row'];
        };
      }>;
    }>(`
      *,
      subscriptions (
        *,
        price: prices (
          *,
          product: products (*)
        )
      )
    `)
    .eq('id', session.user.id)
    .single();

  // Get transaction history
  const { data: transactions } = await supabase
    .from('transactions')
    .select<string, Database['public']['Tables']['transactions']['Row']>('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  const activeSubscription = customer?.subscriptions?.[0] ?? null;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Account</h1>
      
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Subscription</h2>
          {activeSubscription ? (
            <SubscriptionCard
              subscription={activeSubscription}
              customerEmail={session.user.email ?? ''}
            />
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No active subscription</p>
              <a
                href="/pricing"
                className="text-primary hover:underline mt-2 inline-block"
              >
                View pricing plans
              </a>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
          <TransactionHistory transactions={transactions ?? []} />
        </section>
      </div>
    </div>
  );
} 