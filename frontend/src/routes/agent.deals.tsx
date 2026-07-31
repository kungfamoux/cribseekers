import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, DollarSign, User, Home, TrendingUp, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { agentApi } from "@/lib/api/agent";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/agent/deals")({
  beforeLoad: createAuthGuard({ requiredRole: "AGENT" }),
  component: AgentDeals,
});

function AgentDeals() {
  const { user, role } = useAuth();
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeals() {
      try {
        setLoading(true);
        setError(null);
        const result = await agentApi.deals();
        setDeals(result);
      } catch (err) {
        setError("Failed to load deals. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
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
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case "offer":
        return <Badge variant="outline">Offer</Badge>;
      case "negotiation":
        return <Badge variant="outline">Negotiation</Badge>;
      case "inspection":
        return <Badge variant="outline">Inspection</Badge>;
      case "closing":
        return <Badge variant="outline">Closing</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">{stage}</Badge>;
    }
  };

  const activeDeals = deals.filter((d) => d.status === "active");
  const completedDeals = deals.filter((d) => d.status === "completed");

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
          <h2 className="text-3xl font-bold tracking-tight">Deals</h2>
          <p className="text-muted-foreground">Track your property transactions</p>
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
                  <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeDeals.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(activeDeals.reduce((sum, d) => sum + d.amount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedDeals.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(deals.reduce((sum, d) => sum + d.commission, 0))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deals List */}
            <div className="space-y-4">
              {deals.map((deal) => (
                <Card key={deal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="rounded-full bg-muted p-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{deal.client.name}</h3>
                            {getStatusBadge(deal.status)}
                            {getStageBadge(deal.stage)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {deal.property.title}
                          </p>
                          <div className="grid gap-4 md:grid-cols-3 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Deal Amount</p>
                              <p className="font-semibold">{formatAmount(deal.amount)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Commission</p>
                              <p className="font-semibold">{formatAmount(deal.commission)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Created</p>
                              <p className="font-medium">{formatDate(deal.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {deal.status === "active" && (
                          <Button size="sm">Update Stage</Button>
                        )}
                        {deal.status === "completed" && (
                          <Button size="sm" variant="outline">View Details</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {deals.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No deals yet</h3>
                  <p className="text-muted-foreground text-center">
                    Your deals will appear here when you convert leads to transactions
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