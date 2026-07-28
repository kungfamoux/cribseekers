'use client';

import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { ArrowLeft, Download, Share2, Receipt } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function TransactionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  // Mock transaction data - in real app, fetch by ID
  const transaction = {
    id,
    type: 'CREDIT' as const,
    amount: 50000,
    balanceBefore: 100000,
    balanceAfter: 150000,
    description: 'Wallet Funding',
    reference: 'TXN-123456789',
    status: 'COMPLETED' as const,
    createdAt: new Date('2026-07-19T13:00:00.000Z'),
    currency: 'NGN',
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Transactions
      </Button>

      <div className="space-y-6">
        {/* Transaction Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{transaction.description}</CardTitle>
                <p className="text-gray-500 mt-1">{transaction.reference}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                transaction.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                transaction.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {transaction.status}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className={`text-4xl font-bold ${transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'CREDIT' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </p>
              <p className="text-gray-500 mt-2">{transaction.currency || 'NGN'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Details */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Type</span>
              <span className="font-medium">{transaction.type}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Balance Before</span>
              <span className="font-medium">{formatCurrency(transaction.balanceBefore)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Balance After</span>
              <span className="font-medium">{formatCurrency(transaction.balanceAfter)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{formatDate(transaction.createdAt)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Reference</span>
              <span className="font-mono text-sm">{transaction.reference}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex-1">
                <Receipt className="h-4 w-4 mr-2" />
                View Invoice
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
