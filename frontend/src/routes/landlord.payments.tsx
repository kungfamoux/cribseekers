import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, CheckCircle, Clock, AlertCircle, TrendingUp, Download, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { landlordApi } from "@/lib/api/landlord";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/landlord/payments")({
  beforeLoad: createAuthGuard({ requiredRole: "LANDLORD" }),
  component: LandlordPayments,
});

function LandlordPayments() {
  const { user, role } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        setLoading(true);
        setError(null);
        const result = await landlordApi.payments();
        setPayments(result);
      } catch (err) {
        setError("Failed to load payments. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "pending":
        return <Badge className="bg-orange-500">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-orange-500" />;
      case "overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const paidPayments = payments.filter((p) => p.status === "paid");
  const pendingPayments = payments.filter((p) => p.status === "pending" || p.status === "overdue");

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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Rent Payments</h2>
            <p className="text-muted-foreground">Track rent payments from tenants</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
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
                  <CardTitle className="text-sm font-medium">Expected This Month</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(payments.reduce((sum, p) => sum + p.amount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Collected</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(paidPayments.reduce((sum, p) => sum + p.amount, 0))}
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
                    {formatAmount(pendingPayments.reduce((sum, p) => sum + p.amount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {payments.length > 0
                      ? Math.round((paidPayments.length / payments.length) * 100)
                      : 0}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Payments */}
            {pendingPayments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pending Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-orange-500/10 p-2">
                          {getStatusIcon(payment.status)}
                        </div>
                        <div>
                          <p className="font-semibold">{payment.property.title}</p>
                          <p className="text-sm text-muted-foreground">Tenant: {payment.tenant.name}</p>
                          <p className="text-sm text-muted-foreground">Due: {formatDate(payment.dueDate)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatAmount(payment.amount)}</p>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paidPayments.length === 0 && pendingPayments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No payment history</p>
                ) : (
                  paidPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-lg border opacity-75"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-green-500/10 p-2">
                          {getStatusIcon(payment.status)}
                        </div>
                        <div>
                          <p className="font-semibold">{payment.property.title}</p>
                          <p className="text-sm text-muted-foreground">Tenant: {payment.tenant.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Paid: {formatDate(payment.paidDate)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatAmount(payment.amount)}</p>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
