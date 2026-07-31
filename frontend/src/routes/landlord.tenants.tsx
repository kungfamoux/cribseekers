import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Mail, Phone, MapPin, Calendar, DollarSign, MessageSquare, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { landlordApi } from "@/lib/api/landlord";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/landlord/tenants")({
  beforeLoad: createAuthGuard({ requiredRole: "LANDLORD" }),
  component: LandlordTenants,
});

function LandlordTenants() {
  const { user, role } = useAuth();
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTenants() {
      try {
        setLoading(true);
        setError(null);
        const result = await landlordApi.tenants();
        setTenants(result);
      } catch (err) {
        setError("Failed to load tenants. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTenants();
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
      case "expired":
        return <Badge className="bg-red-500">Expired</Badge>;
      case "pending":
        return <Badge className="bg-orange-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
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
          <h2 className="text-3xl font-bold tracking-tight">My Tenants</h2>
          <p className="text-muted-foreground">Manage your tenant relationships</p>
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
                  <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {tenants.filter((t) => t.status === "active").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      tenants.filter((t) => t.status === "active").reduce((sum, t) => sum + t.rent, 0)
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tenants.length > 0 ? `${Math.round((tenants.filter((t) => t.status === "active").length / tenants.length) * 100)}%` : "0%"}</div>
                </CardContent>
              </Card>
            </div>

            {/* Tenants List */}
            <div className="space-y-4">
              {tenants.map((tenant) => (
                <Card key={tenant.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-2xl">{tenant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{tenant.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <Mail className="h-3 w-3" />
                              {tenant.email}
                            </div>
                            {tenant.phone && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                                <Phone className="h-3 w-3" />
                                {tenant.phone}
                              </div>
                            )}
                          </div>
                          {getStatusBadge(tenant.status)}
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Property</p>
                            <p className="font-medium">{tenant.property.title}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Monthly Rent</p>
                            <p className="font-medium">{formatAmount(tenant.rent)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Lease Period</p>
                            <p className="font-medium">
                              {formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="mr-2 h-4 w-4" />
                            View Lease
                          </Button>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {tenants.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tenants yet</h3>
                  <p className="text-muted-foreground text-center">
                    Your tenant list will appear here once you have active leases
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
