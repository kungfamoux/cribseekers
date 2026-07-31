import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Mail, Phone, Calendar, DollarSign, MessageSquare, FileText, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { agentApi } from "@/lib/api/agent";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/agent/clients")({
  beforeLoad: createAuthGuard({ requiredRole: "AGENT" }),
  component: AgentClients,
});

function AgentClients() {
  const { user, role } = useAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClients() {
      try {
        setLoading(true);
        setError(null);
        const result = await agentApi.clients();
        setClients(result);
      } catch (err) {
        setError("Failed to load clients. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
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
        return <Badge className="bg-green-500">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const activeClients = clients.filter((c) => c.status === "active");

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
          <h2 className="text-3xl font-bold tracking-tight">My Clients</h2>
          <p className="text-muted-foreground">Manage your client relationships</p>
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
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeClients.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(activeClients.reduce((sum, c) => sum + c.totalSpent, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activeClients.reduce((sum, c) => sum + c.totalDeals, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Clients List */}
            <div className="space-y-4">
              {clients.map((client) => (
                <Card key={client.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-2xl">{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{client.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <Mail className="h-3 w-3" />
                              {client.email}
                            </div>
                            {client.phone && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                <Phone className="h-3 w-3" />
                                {client.phone}
                              </div>
                            )}
                          </div>
                          {getStatusBadge(client.status)}
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Deals</p>
                            <p className="font-medium">{client.totalDeals}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Spent</p>
                            <p className="font-medium">{formatAmount(client.totalSpent)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Client Since</p>
                            <p className="font-medium">{formatDate(client.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            View History
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {clients.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No clients yet</h3>
                  <p className="text-muted-foreground text-center">
                    Your client list will appear here once you convert leads to clients
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