import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Banknote, History, Building, Calendar, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { landlordApi } from "@/lib/api/landlord";

export const Route = createFileRoute("/landlord/wallet")({
  component: LandlordWallet,
});

function LandlordWallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    async function fetchWalletData() {
      try {
        setLoading(true);
        setError(null);
        // Mock data - replace with actual API call
        setBalance(4500000);
        setTransactions([
          {
            id: "1",
            type: "credit",
            amount: 125000,
            description: "Rent payment from Jane Doe",
            date: "2026-07-30",
            status: "completed",
          },
          {
            id: "2",
            type: "credit",
            amount: 200000,
            description: "Rent payment from Tunde Adeyemi",
            date: "2026-07-29",
            status: "completed",
          },
          {
            id: "3",
            type: "debit",
            amount: 500000,
            description: "Withdrawal to bank account",
            date: "2026-07-28",
            status: "completed",
          },
          {
            id: "4",
            type: "credit",
            amount: 150000,
            description: "Rent payment from Chioma Nwosu",
            date: "2026-07-27",
            status: "completed",
          },
        ]);
      } catch (err) {
        setError("Failed to load wallet data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWalletData();
  }, []);

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    if (!amount || amount <= 0) return;

    try {
      // Mock withdrawal - replace with actual API call
      setBalance(balance - amount);
      setTransactions([
        {
          id: Date.now().toString(),
          type: "debit",
          amount: amount,
          description: "Withdrawal to bank account",
          date: new Date().toISOString().split('T')[0],
          status: "pending",
        },
        ...transactions,
      ]);
      setWithdrawAmount("");
    } catch (err) {
      console.error("Failed to process withdrawal:", err);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <DashboardLayout role="landlord" userName="Emeka Okafor">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="landlord" userName="Emeka Okafor">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
          <p className="text-muted-foreground">Manage your rental income and withdrawals</p>
        </div>

        {error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        )}

        {!error && (
          <>
            {/* Balance Card */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-primary-foreground/80">Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">{formatAmount(balance)}</div>
                <div className="flex gap-3">
                  <Button className="bg-background text-foreground hover:bg-background/90">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Withdraw
                  </Button>
                  <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                    <History className="mr-2 h-4 w-4" />
                    View History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      transactions
                        .filter((t) => t.type === "credit" && new Date(t.date).getMonth() === new Date().getMonth())
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Total collected</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      transactions
                        .filter((t) => t.status === "pending")
                        .reduce((sum, t) => sum + t.amount, 0)
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Processing withdrawals</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Properties</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">Active rentals</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-3">
                    <Banknote className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Withdraw Funds</h3>
                  <p className="text-sm text-muted-foreground text-center">Transfer to bank account</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Payment History</h3>
                  <p className="text-sm text-muted-foreground text-center">View all transactions</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-3">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Property Income</h3>
                  <p className="text-sm text-muted-foreground text-center">View by property</p>
                </CardContent>
              </Card>
            </div>

            {/* Withdrawal Form */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Withdrawal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="Enter amount (₦)"
                    className="flex-1"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                  <Button onClick={handleWithdraw}>Withdraw</Button>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setWithdrawAmount("100000")}>₦100,000</Button>
                  <Button variant="outline" size="sm" onClick={() => setWithdrawAmount("250000")}>₦250,000</Button>
                  <Button variant="outline" size="sm" onClick={() => setWithdrawAmount("500000")}>₦500,000</Button>
                  <Button variant="outline" size="sm" onClick={() => setWithdrawAmount("1000000")}>₦1,000,000</Button>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between py-3 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`rounded-full p-2 ${
                              transaction.type === "credit"
                                ? "bg-green-500/10"
                                : "bg-red-500/10"
                            }`}
                          >
                            {transaction.type === "credit" ? (
                              <ArrowDownLeft className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === "credit" ? "text-green-500" : "text-red-500"
                          }`}>
                            {transaction.type === "credit" ? "+" : "-"}{formatAmount(transaction.amount)}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {transaction.status === "completed" ? (
                              <CheckCircle className="h-3 w-3 text-green-500" />
                            ) : (
                              <Clock className="h-3 w-3 text-orange-500" />
                            )}
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}