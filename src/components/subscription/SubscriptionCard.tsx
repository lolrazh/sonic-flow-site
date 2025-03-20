import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database } from '@/types/database.types';
import {
  formatPrice,
  getBillingPeriodInWords,
  getSubscriptionStatus,
  formatNextBillingDate,
  getNextBillingDate,
  canManageSubscription,
  openCustomerPortal,
} from '@/lib/paddle';

type SubscriptionCardProps = {
  subscription: Database['public']['Tables']['subscriptions']['Row'] & {
    price: Database['public']['Tables']['prices']['Row'] & {
      product: Database['public']['Tables']['products']['Row'];
    };
  };
  customerEmail: string;
  locale?: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'trialing':
      return 'bg-blue-500';
    case 'canceled_but_active':
      return 'bg-yellow-500';
    case 'canceled':
      return 'bg-red-500';
    case 'paused':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};

export function SubscriptionCard({ subscription, customerEmail, locale = 'en' }: SubscriptionCardProps) {
  const status = getSubscriptionStatus(subscription);
  const nextBillingDate = getNextBillingDate(subscription);
  const canManage = canManageSubscription(subscription);

  const handleManageSubscription = async () => {
    await openCustomerPortal({
      customerId: subscription.user_id,
      customerEmail,
      locale,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{subscription.price.product.name}</CardTitle>
          <Badge className={`${getStatusColor(status)} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription>
          {subscription.price.product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-2xl font-bold">
            {formatPrice(subscription.price.unit_price, subscription.price.currency, locale)}
          </div>
          <div className="text-sm text-gray-500">
            per {getBillingPeriodInWords(subscription.price.billing_period, locale)}
          </div>
        </div>
        {nextBillingDate && (
          <div>
            <div className="text-sm font-medium">Next billing date</div>
            <div className="text-sm text-gray-500">
              {formatNextBillingDate(nextBillingDate, locale)}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {canManage && (
          <Button
            onClick={handleManageSubscription}
            className="w-full"
            variant="outline"
          >
            Manage Subscription
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 