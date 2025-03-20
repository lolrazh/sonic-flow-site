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
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.created_at).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  {formatPrice(transaction.amount, transaction.currency, locale)}
                </TableCell>
                <TableCell className={getStatusColor(transaction.status)}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </TableCell>
                <TableCell>
                  {transaction.billing_period_start && transaction.billing_period_end ? (
                    <>
                      {new Date(transaction.billing_period_start).toLocaleDateString(locale, {
                        month: 'short',
                        day: 'numeric',
                      })}
                      {' - '}
                      {new Date(transaction.billing_period_end).toLocaleDateString(locale, {
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
            ))}
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