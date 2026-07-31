import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, DollarSign, TrendingUp, Calendar, Wrench, FileText, Plus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { landlordApi } from "@/lib/api/landlord";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/landlord/dashboard")({
  beforeLoad: createAuthGuard({ requiredRole: "LANDLORD" }),
  component: LandlordDashboard,
});

function LandlordDashboard() {
  const { user, role } = useAuth();
  const [properties, setProperties] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);
        const [propertiesData, tenantsData, maintenanceData] = await Promise.all([
          landlordApi.properties(),
          landlordApi.tenants(),
          landlordApi.maintenanceRequests(),
        ]);
        setProperties(propertiesData);
        setTenants(tenantsData);
        setMaintenance(maintenanceData);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const availableProperties = properties.filter((p) => p.status === "available");
  const rentedProperties = properties.filter((p) => p.status === "rented");
  const activeTenants = tenants.filter((t) => t.status === "active");
  const pendingMaintenance = maintenance.filter((m) => m.status === "pending");

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
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.firstName || "User"}!</h2>
          <p className="text-muted-foreground">Here's what's happening with your properties.</p>
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
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{properties.length}</div>
                  <p className="text-xs text-muted-foreground">{availableProperties.length} available</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeTenants.length}</div>
                  <p className="text-xs text-muted-foreground">{properties.length > 0 ? `${Math.round((rentedProperties.length / properties.length) * 100)}% occupancy` : "0% occupancy"}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(activeTenants.reduce((sum, t) => sum + t.rent, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">From {activeTenants.length} tenants</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingMaintenance.length}</div>
                  <p className="text-xs text-muted-foreground">{pendingMaintenance.filter((m) => m.priority === "urgent").length} urgent</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Add Property
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    List a new property for rent or sale
                  </p>
                  <Button className="w-full">Add Property</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    View Tenants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your tenant relationships
                  </p>
                  <Button className="w-full" variant="outline">View Tenants</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    View Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track rent payments and income
                  </p>
                  <Button className="w-full" variant="outline">View Payments</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Handle maintenance requests
                  </p>
                  <Button className="w-full" variant="outline">View Requests</Button>
                </CardContent>
              </Card>
            </div>

            {/* My Properties */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>My Properties</CardTitle>
                <Button size="sm" variant="outline">View All</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {properties.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-start gap-4 p-4 rounded-lg border">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                      <Home className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm text-muted-foreground">{property.city}, {property.state}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="text-muted-foreground">Rent: {formatAmount(property.price)}/month</span>
                        <span className={property.status === "rented" ? "text-green-500" : "text-orange-500"}>
                          {property.status === "rented" ? "Occupied" : "Vacant"}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Manage</Button>
                  </div>
                ))}
                {properties.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No properties yet</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity & Revenue */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rent payment received</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <p className="font-semibold text-green-500">+₦125,000</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-500/10 p-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Lease agreement signed</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-orange-500/10 p-2">
                      <Wrench className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maintenance request submitted</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">This Month</p>
                      <p className="text-sm text-muted-foreground">January 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatAmount(activeTenants.reduce((sum, t) => sum + t.rent, 0))}</p>
                      <p className="text-xs text-green-500">+12%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">Last Month</p>
                      <p className="text-sm text-muted-foreground">December 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₦1.34M</p>
                      <p className="text-xs text-green-500">+8%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">This Year</p>
                      <p className="text-sm text-muted-foreground">2024 YTD</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₦4.5M</p>
                      <p className="text-xs text-green-500">+15%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
