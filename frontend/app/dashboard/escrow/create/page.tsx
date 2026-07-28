'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateEscrow } from '@/hooks/useEscrow';
import { toast } from 'sonner';
import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { Input } from '@/components/shared/input';
import { Label } from '@/components/shared/label';

export default function CreateEscrowPage() {
  const router = useRouter();
  const createEscrow = useCreateEscrow();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    propertyId: '',
    payeeId: '',
    amount: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await createEscrow.mutateAsync({
        propertyId: formData.propertyId,
        payerId: formData.payeeId,
        payeeId: formData.payeeId,
        walletId: formData.payeeId,
        amount: parseFloat(formData.amount),
        description: formData.description,
      });
      toast.success('Escrow created successfully');
      router.push('/dashboard/escrow');
    } catch {
      // Error handled by hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Escrow
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create New Escrow</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="propertyId">Property ID</Label>
                <Input
                  id="propertyId"
                  value={formData.propertyId}
                  onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="payeeId">Payee ID</Label>
                <Input
                  id="payeeId"
                  value={formData.payeeId}
                  onChange={(e) => setFormData({ ...formData, payeeId: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>


              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Escrow'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
