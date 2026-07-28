'use client';

import { useState } from 'react';
import { useWalletByUser } from '@/hooks/useWallet';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { Input } from '@/components/shared/input';
import { Label } from '@/components/shared/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const PRESET_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];

export default function FundWalletPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: wallet } = useWalletByUser(user?.id || '');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return new Intl.NumberFormat('en-NG').format(num);
  };

  const handlePresetAmount = (preset: number) => {
    setAmount(preset.toString());
  };

  const handleFundWallet = async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount < 100) {
      toast.error('Minimum amount is ₦100');
      return;
    }

    if (!wallet?.data?.id) {
      toast.error('Wallet not found');
      return;
    }

    setIsProcessing(true);

    try {
      // Initialize Paystack payment
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numAmount,
          email: user?.email,
          walletId: wallet.data.id,
        }),
      });

      const data = await response.json();

      if (data.success && data.data?.paymentUrl) {
        // Redirect to Paystack checkout
        window.location.href = data.data.paymentUrl;
      } else {
        toast.error('Failed to initialize payment');
      }
    } catch {
      toast.error('Payment initialization failed');
    } finally {
      setIsProcessing(false);
    }
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
        Back to Wallet
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Fund Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Balance */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Current Balance</p>
            <p className="text-2xl font-bold text-blue-900">
              ₦{new Intl.NumberFormat('en-NG').format(wallet?.data?.balance || 0)}
            </p>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (NGN)</Label>
            <Input
              id="amount"
              type="text"
              value={amount ? formatCurrency(amount) : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="Enter amount"
              className="text-lg"
            />
            <p className="text-sm text-gray-500">Minimum amount: ₦100</p>
          </div>

          {/* Preset Amounts */}
          <div className="space-y-2">
            <Label>Quick Amounts</Label>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  onClick={() => handlePresetAmount(preset)}
                  className={amount === preset.toString() ? 'bg-blue-50 border-blue-500' : ''}
                >
                  ₦{new Intl.NumberFormat('en-NG').format(preset)}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          {amount && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">₦{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-medium">₦0.00</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₦{formatCurrency(amount)}</span>
              </div>
            </div>
          )}

          {/* Fund Button */}
          <Button
            onClick={handleFundWallet}
            disabled={!amount || isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Continue to Paystack'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by Paystack
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
