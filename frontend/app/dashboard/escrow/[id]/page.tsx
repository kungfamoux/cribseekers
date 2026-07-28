'use client';

export const dynamic = 'force-dynamic';

import { useEscrow } from '@/hooks/useEscrow';
import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { ArrowLeft, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useReleaseEscrow, useRefundEscrow, useDisputeEscrow } from '@/hooks/useEscrow';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function EscrowDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const { data: escrow, isLoading } = useEscrow(id);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);
  const releaseEscrow = useReleaseEscrow();
  const refundEscrow = useRefundEscrow();
  const disputeEscrow = useDisputeEscrow();
  const [showDisputeDialog, setShowDisputeDialog] = useState(false);
  const [disputeReason, setDisputeReason] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleRelease = async () => {
    try {
      await releaseEscrow.mutateAsync({ id, data: {} });
      toast.success('Escrow released successfully');
    } catch {
      toast.error('Failed to release escrow');
    }
  };

  const handleRefund = async () => {
    try {
      await refundEscrow.mutateAsync({ id, data: {} });
      toast.success('Escrow refunded successfully');
    } catch {
      toast.error('Failed to refund escrow');
    }
  };

  const handleDispute = async () => {
    if (!disputeReason.trim()) {
      toast.error('Please provide a reason for the dispute');
      return;
    }

    try {
      await disputeEscrow.mutateAsync({ id, data: { reason: disputeReason } });
      toast.success('Dispute raised successfully');
      setShowDisputeDialog(false);
      setDisputeReason('');
    } catch {
      toast.error('Failed to raise dispute');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!escrow?.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Escrow not found</h2>
        </div>
      </div>
    );
  }

  const canRelease = ['HELD', 'RELEASE_PENDING'].includes(escrow.data.status);
  const canRefund = ['HELD', 'REFUND_PENDING'].includes(escrow.data.status);
  const canDispute = ['HELD', 'FUNDED'].includes(escrow.data.status);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Escrow
      </Button>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{escrow.data.description}</CardTitle>
                <p className="text-gray-500 mt-1">{`ESC-${escrow.data.id.slice(0, 8)}`}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  escrow.data.status === 'RELEASED' ? 'bg-green-100 text-green-600' :
                  escrow.data.status === 'DISPUTED' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {escrow.data.status}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(escrow.data.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Currency</p>
                <p className="text-xl font-semibold">{escrow.data.currency}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {(canRelease || canRefund || canDispute) && (
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {canRelease && (
                <Button onClick={handleRelease} disabled={releaseEscrow.isPending}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Release Escrow
                </Button>
              )}
              {canRefund && (
                <Button variant="outline" onClick={handleRefund} disabled={refundEscrow.isPending}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refund Escrow
                </Button>
              )}
              {canDispute && (
                <Button variant="destructive" onClick={() => setShowDisputeDialog(true)}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Raise Dispute
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dispute Dialog */}
        {showDisputeDialog && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Raise Dispute</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Reason for dispute</label>
                <textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-lg"
                  rows={4}
                  placeholder="Describe the issue..."
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleDispute} disabled={disputeEscrow.isPending}>
                  Submit Dispute
                </Button>
                <Button variant="outline" onClick={() => setShowDisputeDialog(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium">Escrow Created</p>
                  <p className="text-sm text-gray-500">{new Date(escrow.data.createdAt).toLocaleString()}</p>
                </div>
              </div>
              {escrow.data.releasedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Escrow Released</p>
                    <p className="text-sm text-gray-500">{new Date(escrow.data.releasedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {escrow.data.refundedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Escrow Refunded</p>
                    <p className="text-sm text-gray-500">{new Date(escrow.data.refundedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {escrow.data.disputedAt && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Dispute Raised</p>
                    <p className="text-sm text-gray-500">{new Date(escrow.data.disputedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
