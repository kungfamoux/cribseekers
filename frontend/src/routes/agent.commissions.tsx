import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, Briefcase, Clock, CheckCircle, AlertCircle, Wallet, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { agentApi } from "@/lib/api/agent";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/agent/commissions")({
  beforeLoad: createAuthGuard({ requiredRole: "AGENT" }),
  component: AgentCommissions,
});

function AgentCommissions() {
  const { user, role } = useAuth();
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommissions() {
      try {
        setLoading(true);
        setError(null);
        const result = await agentApi.commissions();
        setCommissions(result);
      } catch (err) {
        setError("Failed to load commissions. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCommissions();
  }, []);

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-orange-500">Pending</Badge>;
      case "available":
        return <Badge className="bg-blue-500">Available</Badge>;
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-orange-500" />;
      case "available":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const availableCommissions = commissions.filter((c) => c.status === "available");
  const paidCommissions = commissions.filter((c) => c.status === "paid");

  if (loading) {
    return (
      <DashboardLayout role={role} userName={user?.firstName || "User"}>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role} userName={user?.firstName || "User"}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Commissions</h2>
          <p className="text-muted-foreground">Track your earnings and payments</p>
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
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(availableCommissions.reduce((sum, c) => sum + c.amount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(commissions.filter((c) => c.status === "pending").reduce((sum, c) => sum + c.amount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(paidCommissions.reduce((sum, c) => sum + c.amount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(commissions.reduce((sum, c) => sum + c.amount, 0))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available for Withdrawal */}
            {availableCommissions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Available for Withdrawal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableCommissions.map((commission) => (
                    <div
                      key={commission.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-500/10 p-2">
                          {getStatusIcon(commission.status)}
                        </div>
                        <div>
                          <p className="font-semibold">{commission.deal.property.title}</p>
                          <p className="text-sm text-muted-foreground">Due: {formatDate(commission.dueDate)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatAmount(commission.amount)}</p>
                        {getStatusBadge(commission.status)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Commission History */}
            <Card>
              <CardHeader>
                <CardTitle>Commission History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {commissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No commission history</p>
                ) : (
                  commissions.map((commission) => (
                    <div
                      key={commission.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          {getStatusIcon(commission.status)}
                        </div>
                        <div>
                          <p className="font-semibold">{commission.deal.property.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {commission.status === "paid" ? `Paid: ${formatDate(commission.paidDate || commission.dueDate)}` : `Due: ${formatDate(commission.dueDate)}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatAmount(commission.amount)}</p>
                        {getStatusBadge(commission.status)}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {commissions.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No commissions yet</h3>
                  <p className="text-muted-foreground text-center">
                    Your commissions will appear here when deals are completed
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}