import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, CheckCircle, XCircle, AlertCircle, FileText, Calendar, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { buyerApi } from "@/lib/api/buyer";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/buyer/escrow")({
  beforeLoad: createAuthGuard({ requiredRole: "BUYER" }),
  component: BuyerEscrow,
});

function BuyerEscrow() {
  const { user, role } = useAuth();
  const [escrowTransactions, setEscrowTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEscrowTransactions() {
      try {
        setLoading(true);
        setError(null);
        const result = await buyerApi.escrowTransactions();
        setEscrowTransactions(result);
      } catch (err) {
        setError("Failed to load escrow transactions. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEscrowTransactions();
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
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "disputed":
        return <Badge className="bg-orange-500">Disputed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getMilestoneStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "disputed":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

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
          <h2 className="text-3xl font-bold tracking-tight">Escrow</h2>
          <p className="text-muted-foreground">Secure payment protection for your property transactions</p>
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
                  <CardTitle className="text-sm font-medium">Active Escrows</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {escrowTransactions.filter((e) => e.status === "active").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Protected</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      escrowTransactions.reduce((sum, e) => sum + e.amount, 0)
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {escrowTransactions.filter((e) => e.status === "completed").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Disputed</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {escrowTransactions.filter((e) => e.status === "disputed").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Escrow Transactions */}
            <div className="space-y-4">
              {escrowTransactions.map((escrow) => (
                <Card key={escrow.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{escrow.property.title}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          Property ID: {escrow.propertyId}
                        </div>
                      </div>
                      {getStatusBadge(escrow.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatAmount(escrow.amount)}
                        </p>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Started</p>
                          <p className="font-medium">{formatDate(escrow.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Payment Milestones
                      </h4>
                      {escrow.milestones.map((milestone: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            {getMilestoneStatusIcon(milestone.completed ? "completed" : "pending")}
                            <div>
                              <p className="font-medium">{milestone.title}</p>
                            </div>
                          </div>
                          <Badge
                            variant={
                              milestone.completed
                                ? "default"
                                : "outline"
                            }
                          >
                            {milestone.completed ? "Completed" : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-6">
                      {escrow.status === "active" && (
                        <>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">Release Payment</Button>
                        </>
                      )}
                      {escrow.status === "disputed" && (
                        <>
                          <Button size="sm" variant="outline">
                            View Dispute
                          </Button>
                          <Button size="sm">Resolve</Button>
                        </>
                      )}
                      {escrow.status === "completed" && (
                        <Button size="sm" variant="outline">
                          View Receipt
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {escrowTransactions.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No escrow transactions</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Your escrow-protected transactions will appear here
                  </p>
                  <Button>Start New Transaction</Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
