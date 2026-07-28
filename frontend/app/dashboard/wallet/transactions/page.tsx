'use client';

import { useState } from 'react';
import { useWalletByUser, useWalletTransactions } from '@/hooks/useWallet';
import { useAuth } from '@/hooks/useAuth';
import { TransactionCard } from '@/components/wallet/transaction-card';
import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { Input } from '@/components/shared/input';
import { Label } from '@/components/shared/label';
import { ArrowLeft, Search, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TransactionsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: wallet } = useWalletByUser(user?.id || '');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'CREDIT' | 'DEBIT'>('ALL');
  const [page, setPage] = useState(1);

  const { data: transactions, isLoading } = useWalletTransactions(
    wallet?.data?.id || '',
    { page, limit: 20, type: filter === 'ALL' ? undefined : filter }
  );

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleExport = () => {
    // Export functionality
  };

  if (!wallet?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">No Wallet Found</h2>
        </div>
      </div>
    );
  }

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
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'ALL' ? 'default' : 'outline'}
                onClick={() => setFilter('ALL')}
              >
                All
              </Button>
              <Button
                variant={filter === 'CREDIT' ? 'default' : 'outline'}
                onClick={() => setFilter('CREDIT')}
              >
                Credits
              </Button>
              <Button
                variant={filter === 'DEBIT' ? 'default' : 'outline'}
                onClick={() => setFilter('DEBIT')}
              >
                Debits
              </Button>
            </div>
          </div>

          {/* Export Button */}
          <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          {/* Transactions List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : transactions?.data?.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No transactions found
            </div>
          ) : (
            <div className="space-y-4">
              {transactions?.data?.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {transactions?.meta && transactions.meta.totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-4">
                Page {page} of {transactions.meta.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page === transactions.meta.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
