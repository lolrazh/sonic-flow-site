import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Database } from '@/types/database.types';
import { formatPrice } from '@/lib/paddle';

type Transaction = Database['public']['Tables']['transactions']['Row'];

type TransactionHistoryProps = {
  transactions: Transaction[];
  locale?: string;
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'text-green-600';
    case 'failed':
      return 'text-red-600';
    case 'refunded':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
};

export function TransactionHistory({ transactions, locale = 'en' }: TransactionHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Period</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => {
              const createdAt = new Date(transaction.created_at);
              const amount = transaction.amount ?? 0;
              const currency = transaction.currency ?? 'USD';
              const status = transaction.status ?? 'unknown';
              const billingStart = transaction.billing_period_start ? new Date(transaction.billing_period_start) : null;
              const billingEnd = transaction.billing_period_end ? new Date(transaction.billing_period_end) : null;

              return (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {createdAt.toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    {formatPrice(amount, currency, locale)}
                  </TableCell>
                  <TableCell className={getStatusColor(status)}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </TableCell>
                  <TableCell>
                    {billingStart && billingEnd ? (
                      <>
                        {billingStart.toLocaleDateString(locale, {
                          month: 'short',
                          day: 'numeric',
                        })}
                        {' - '}
                        {billingEnd.toLocaleDateString(locale, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </>
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 