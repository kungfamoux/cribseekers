'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { Button } from '@/components/shared/button';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';

function FundSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get('reference');

  useEffect(() => {
    // Verify payment on mount
    if (reference) {
      // Payment verification happens via webhook
      // This page just shows success
    }
  }, [reference]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <p className="text-gray-600 mt-2">
              Your wallet has been funded successfully
            </p>
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
              onClick={() => router.push('/dashboard/wallet')}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Return to Wallet
            </Button>
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FundSuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 max-w-md">Loading...</div>}>
      <FundSuccessContent />
    </Suspense>
  );
}
