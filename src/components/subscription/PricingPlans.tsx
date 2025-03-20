import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Database } from '@/types/database.types';
import { formatPrice, getBillingPeriodInWords, openCheckout } from '@/lib/paddle';

type PriceWithProduct = Database['public']['Tables']['prices']['Row'] & {
  product: Database['public']['Tables']['products']['Row'];
};

type PricingPlansProps = {
  prices: PriceWithProduct[];
  customerId?: string;
  customerEmail?: string;
  locale?: string;
};

export function PricingPlans({
  prices,
  customerId,
  customerEmail,
  locale = 'en',
}: PricingPlansProps) {
  const handleSubscribe = async (priceId: string) => {
    await openCheckout({
      priceId,
      customerId,
      customerEmail,
      customerLocale: locale,
      successUrl: `${window.location.origin}/account`,
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {prices.map((price) => (
        <Card key={price.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{price.product.name}</CardTitle>
            <CardDescription>{price.product.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div>
              <div className="text-3xl font-bold">
                {formatPrice(price.unit_price, price.currency, locale)}
              </div>
              <div className="text-sm text-gray-500">
                per {getBillingPeriodInWords(price.billing_period, locale)}
              </div>
            </div>
            {price.trial_period_days && (
              <div className="text-sm text-blue-600">
                {price.trial_period_days} days free trial
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => handleSubscribe(price.paddle_price_id)}
            >
              Subscribe
            </Button>
          </CardFooter>
        </Card>
      ))}
      {prices.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No pricing plans available
        </div>
      )}
    </div>
  );
} 