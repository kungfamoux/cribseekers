'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DashboardLayout } from '@/components/dashboard';
import { Button } from '@/components/shared/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/card';
import { Input } from '@/components/shared/input';
import { Label } from '@/components/shared/label';
import { ArrowLeft, Plus, Building2, Trash2, Star, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWalletByUser } from '@/hooks/useWallet';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { BankAccount } from '@/types/wallet.types';

const bankAccountSchema = z.object({
  bankName: z.string().min(2, 'Bank name is required'),
  accountNumber: z.string().min(10, 'Account number must be at least 10 digits').max(10, 'Account number must be exactly 10 digits'),
  accountName: z.string().min(2, 'Account name is required'),
  accountType: z.enum(['savings', 'current'], {
    required_error: 'Account type is required',
  }),
});

type BankAccountFormData = z.infer<typeof bankAccountSchema>;

export default function BankAccountsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: wallet, isLoading: walletLoading } = useWalletByUser(user?.id || '');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: addErrors, isSubmitting: isAdding },
    reset: resetAdd,
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors, isSubmitting: isEditing },
    reset: resetEdit,
    setValue: setEditValue,
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
  });

  // Mock bank accounts - in production, fetch from API
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: 'bank_1',
      bankName: 'Access Bank',
      accountNumber: '1234567890',
      accountName: 'John Doe',
      accountType: 'savings',
      isPrimary: true,
      isVerified: true,
      verifiedAt: new Date('2026-01-15'),
      createdAt: new Date('2026-01-15'),
    },
    {
      id: 'bank_2',
      bankName: 'GTBank',
      accountNumber: '0987654321',
      accountName: 'John Doe',
      accountType: 'current',
      isPrimary: false,
      isVerified: false,
      createdAt: new Date('2026-06-20'),
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const maskAccountNumber = (accountNumber: string) => {
    return `****${accountNumber.slice(-4)}`;
  };

  const handleSetPrimary = async (accountId: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      // API call to set primary account
      setBankAccounts(accounts =>
        accounts.map(acc => ({
          ...acc,
          isPrimary: acc.id === accountId,
        }))
      );
      toast.success('Primary account updated successfully');
    } catch {
      setError('Failed to update primary account');
      toast.error('Failed to update primary account');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedAccount) return;
    setIsProcessing(true);
    setError(null);
    try {
      // API call to delete account
      setBankAccounts(accounts => accounts.filter(acc => acc.id !== selectedAccount.id));
      setShowDeleteDialog(false);
      setSelectedAccount(null);
      toast.success('Bank account deleted successfully');
    } catch {
      setError('Failed to delete bank account');
      toast.error('Failed to delete bank account');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerify = async (accountId: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      // API call to verify account
      setBankAccounts(accounts =>
        accounts.map(acc =>
          acc.id === accountId
            ? { ...acc, isVerified: true, verifiedAt: new Date() }
            : acc
        )
      );
      toast.success('Bank account verified successfully');
    } catch {
      setError('Failed to verify bank account');
      toast.error('Failed to verify bank account');
    } finally {
      setIsProcessing(false);
    }
  };

  const onAddAccount = async (data: BankAccountFormData) => {
    setIsProcessing(true);
    setError(null);
    try {
      // API call to add account
      const newAccount: BankAccount = {
        id: `bank_${Date.now()}`,
        ...data,
        isPrimary: bankAccounts.length === 0,
        isVerified: false,
        createdAt: new Date(),
      };
      setBankAccounts([...bankAccounts, newAccount]);
      setShowAddModal(false);
      resetAdd();
      toast.success('Bank account added successfully');
    } catch {
      setError('Failed to add bank account');
      toast.error('Failed to add bank account');
    } finally {
      setIsProcessing(false);
    }
  };

  const onEditAccount = async (data: BankAccountFormData) => {
    if (!selectedAccount) return;
    setIsProcessing(true);
    setError(null);
    try {
      // API call to edit account
      setBankAccounts(accounts =>
        accounts.map(acc =>
          acc.id === selectedAccount.id
            ? { ...acc, ...data }
            : acc
        )
      );
      setShowEditModal(false);
      setSelectedAccount(null);
      resetEdit();
      toast.success('Bank account updated successfully');
    } catch {
      setError('Failed to update bank account');
      toast.error('Failed to update bank account');
    } finally {
      setIsProcessing(false);
    }
  };

  const openEditModal = (account: BankAccount) => {
    setSelectedAccount(account);
    setEditValue('bankName', account.bankName);
    setEditValue('accountNumber', account.accountNumber);
    setEditValue('accountName', account.accountName);
    setEditValue('accountType', account.accountType);
    setShowEditModal(true);
  };

  if (walletLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-48" />
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Bank Accounts</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
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

        <div className="space-y-6">
          {/* Wallet Balance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available Balance</p>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                    {wallet?.data ? formatCurrency(wallet.data.availableBalance) : '₦0.00'}
                  </p>
                </div>
                <Button onClick={() => router.push('/dashboard/wallet/fund')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Fund Wallet
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bank Accounts</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your linked bank accounts</p>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>

          {/* Bank Accounts List */}
          {bankAccounts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">No Bank Accounts</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Add a bank account to enable withdrawals</p>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <Card key={account.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{account.bankName}</h3>
                            {account.isPrimary && (
                              <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Primary
                              </span>
                            )}
                            {account.isVerified ? (
                              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Verified
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-full flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Unverified
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">{maskAccountNumber(account.accountNumber)}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">{account.accountName}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 capitalize">{account.accountType} Account</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(account)}
                          disabled={isProcessing}
                        >
                          Edit
                        </Button>
                        {!account.isPrimary && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetPrimary(account.id)}
                            disabled={isProcessing}
                          >
                            Set Primary
                          </Button>
                        )}
                        {!account.isVerified && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerify(account.id)}
                            disabled={isProcessing}
                          >
                            Verify
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => {
                            setSelectedAccount(account);
                            setShowDeleteDialog(true);
                          }}
                          disabled={isProcessing}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add Bank Account Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Add Bank Account</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowAddModal(false);
                      resetAdd();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitAdd(onAddAccount)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="add-bankName">Bank Name</Label>
                    <Input
                      id="add-bankName"
                      placeholder="e.g., Access Bank"
                      {...registerAdd('bankName')}
                    />
                    {addErrors.bankName && (
                      <p className="text-sm text-red-600 dark:text-red-400">{addErrors.bankName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-accountNumber">Account Number</Label>
                    <Input
                      id="add-accountNumber"
                      placeholder="10-digit account number"
                      maxLength={10}
                      {...registerAdd('accountNumber')}
                    />
                    {addErrors.accountNumber && (
                      <p className="text-sm text-red-600 dark:text-red-400">{addErrors.accountNumber.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-accountName">Account Name</Label>
                    <Input
                      id="add-accountName"
                      placeholder="Name on account"
                      {...registerAdd('accountName')}
                    />
                    {addErrors.accountName && (
                      <p className="text-sm text-red-600 dark:text-red-400">{addErrors.accountName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-accountType">Account Type</Label>
                    <select
                      id="add-accountType"
                      className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                      {...registerAdd('accountType')}
                    >
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                    </select>
                    {addErrors.accountType && (
                      <p className="text-sm text-red-600 dark:text-red-400">{addErrors.accountType.message}</p>
                    )}
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddModal(false);
                        resetAdd();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isAdding || isProcessing}>
                      {isAdding || isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        'Add Account'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Bank Account Modal */}
        {showEditModal && selectedAccount && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Edit Bank Account</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedAccount(null);
                      resetEdit();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitEdit(onEditAccount)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-bankName">Bank Name</Label>
                    <Input
                      id="edit-bankName"
                      placeholder="e.g., Access Bank"
                      {...registerEdit('bankName')}
                    />
                    {editErrors.bankName && (
                      <p className="text-sm text-red-600 dark:text-red-400">{editErrors.bankName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-accountNumber">Account Number</Label>
                    <Input
                      id="edit-accountNumber"
                      placeholder="10-digit account number"
                      maxLength={10}
                      {...registerEdit('accountNumber')}
                    />
                    {editErrors.accountNumber && (
                      <p className="text-sm text-red-600 dark:text-red-400">{editErrors.accountNumber.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-accountName">Account Name</Label>
                    <Input
                      id="edit-accountName"
                      placeholder="Name on account"
                      {...registerEdit('accountName')}
                    />
                    {editErrors.accountName && (
                      <p className="text-sm text-red-600 dark:text-red-400">{editErrors.accountName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-accountType">Account Type</Label>
                    <select
                      id="edit-accountType"
                      className="flex h-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                      {...registerEdit('accountType')}
                    >
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                    </select>
                    {editErrors.accountType && (
                      <p className="text-sm text-red-600 dark:text-red-400">{editErrors.accountType.message}</p>
                    )}
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedAccount(null);
                        resetEdit();
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isEditing || isProcessing}>
                      {isEditing || isProcessing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && selectedAccount && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Delete Bank Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete the bank account{' '}
                  <strong className="text-gray-900 dark:text-white">
                    {selectedAccount.bankName} ({maskAccountNumber(selectedAccount.accountNumber)})
                  </strong>
                  ? This action cannot be undone.
                </p>
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteDialog(false);
                      setSelectedAccount(null);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
