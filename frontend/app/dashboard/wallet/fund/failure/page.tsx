'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { Button } from '@/components/shared/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Suspense } from 'react';

function FundFailureContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');
  const message = searchParams.get('message') || 'Payment failed';

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl">Payment Failed</CardTitle>
            <p className="text-gray-600 mt-2">{message}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {reference && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Reference</p>
              <p className="font-mono text-sm">{reference}</p>
            </div>
          )}

          <div className="space-y-2">
            <Button
              onClick={() => router.push('/dashboard/wallet/fund')}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/wallet')}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Wallet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FundFailurePage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 max-w-md">Loading...</div>}>
      <FundFailureContent />
    </Suspense>
  );
}
