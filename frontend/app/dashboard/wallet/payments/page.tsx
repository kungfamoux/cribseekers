'use client';

import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { ArrowLeft, Filter, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentsPage() {
  const router = useRouter();

  // Mock payment data
  const payments = [
    { id: 'pay_1', amount: 50000, status: 'COMPLETED', date: '2026-07-19', description: 'Wallet Funding' },
    { id: 'pay_2', amount: 25000, status: 'COMPLETED', date: '2026-07-18', description: 'Property Deposit' },
    { id: 'pay_3', amount: 100000, status: 'FAILED', date: '2026-07-17', description: 'Wallet Funding' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Wallet
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment History</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                    payment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
