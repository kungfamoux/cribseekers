import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, CreditCard, Banknote, History } from "lucide-react";

export const Route = createFileRoute("/tenant/wallet")({
  component: TenantWallet,
});

function TenantWallet() {
  // Mock data - replace with API call
  const balance = 150000;
  const transactions = [
    { id: "1", type: "credit", amount: 100000, description: "Wallet Funding", date: "2024-01-18" },
    { id: "2", type: "debit", amount: 125000, description: "Rent Payment - 2-Bedroom Apartment", date: "2024-01-17" },
    { id: "3", type: "credit", amount: 200000, description: "Wallet Funding", date: "2024-01-15" },
    { id: "4", type: "debit", amount: 250000, description: "Rent Payment - 3-Bedroom Flat", date: "2024-01-14" },
    { id: "5", type: "credit", amount: 75000, description: "Refund", date: "2024-01-12" },
  ];

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

  return (
    <DashboardLayout role="tenant" userName="Jane Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
          <p className="text-muted-foreground">Manage your funds for rent payments</p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-primary-foreground/80">Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{formatAmount(balance)}</div>
            <div className="flex gap-3">
              <Button className="bg-background text-foreground hover:bg-background/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
              <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Add Money</h3>
              <p className="text-sm text-muted-foreground text-center">Fund your wallet securely</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Pay Rent</h3>
              <p className="text-sm text-muted-foreground text-center">Pay rent from wallet</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <ArrowDownLeft className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Withdraw</h3>
              <p className="text-sm text-muted-foreground text-center">Withdraw to bank account</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Funds Form */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Add Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input type="number" placeholder="Enter amount (₦)" className="flex-1" />
              <Button>Add Funds</Button>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">₦10,000</Button>
              <Button variant="outline" size="sm">₦50,000</Button>
              <Button variant="outline" size="sm">₦100,000</Button>
              <Button variant="outline" size="sm">₦500,000</Button>
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
                  <p
                    className={`font-semibold ${
                      transaction.type === "credit" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatAmount(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
