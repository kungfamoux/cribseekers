'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useWalletByUser } from '@/hooks/useWallet';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { Input } from '@/components/shared/input';
import { Label } from '@/components/shared/label';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function WithdrawPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: wallet } = useWalletByUser(user?.id || '');
  const [amount, setAmount] = useState('');
  const [bankAccountId, setBankAccountId] = useState('');
  const [reason, setReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('en-NG').format(num);
  };

  const handleWithdraw = async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 1000) {
      toast.error('Minimum withdrawal amount is ₦1,000');
      return;
    }

    if (!bankAccountId) {
      toast.error('Please select a bank account');
      return;
    }

    if (numAmount > (wallet?.data?.availableBalance || 0)) {
      toast.error('Insufficient balance');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletId: wallet?.data?.id,
          bankAccountId,
          amount: numAmount,
          reason,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Withdrawal request submitted successfully');
        router.push('/dashboard/wallet');
      } else {
        toast.error(data.message || 'Withdrawal failed');
      }
    } catch {
      toast.error('Withdrawal request failed');
    } finally {
      setIsProcessing(false);
    }
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
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
          <CardTitle>Withdraw Funds</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Available Balance */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-blue-900">
              ₦{new Intl.NumberFormat('en-NG').format(wallet.data.availableBalance)}
            </p>
          </div>

          {/* Bank Account Selection */}
          <div className="space-y-2">
            <Label htmlFor="bankAccount">Bank Account</Label>
            <select
              id="bankAccount"
              value={bankAccountId}
              onChange={(e) => setBankAccountId(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">Select bank account</option>
              <option value="bank_1">Access Bank - ****1234</option>
              <option value="bank_2">GTBank - ****5678</option>
            </select>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (NGN)</Label>
            <Input
              id="amount"
              type="text"
              value={amount ? formatCurrency(amount) : ''}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="Enter amount"
              className="text-lg"
            />
            <p className="text-sm text-gray-500">Minimum amount: ₦1,000</p>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for withdrawal"
            />
          </div>

          {/* Warning */}
          {amount && parseFloat(amount) > wallet.data.availableBalance && (
            <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Insufficient balance. Please enter a lower amount.</p>
            </div>
          )}

          {/* Withdrawal Summary */}
          {amount && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">₦{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-medium">₦50.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₦{formatCurrency((parseFloat(amount) || 0).toString())}</span>
              </div>
            </div>
          )}

          {/* Withdraw Button */}
          <Button
            onClick={handleWithdraw}
            disabled={!amount || !bankAccountId || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Withdraw Funds'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Withdrawals are processed within 1-3 business days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
