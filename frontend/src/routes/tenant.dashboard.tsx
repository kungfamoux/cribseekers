import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calendar, Wallet, Shield, MessageSquare, Bell, Wrench, FileText, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { tenantApi } from "@/lib/api/tenant";

export const Route = createFileRoute("/tenant/dashboard")({
  component: TenantDashboard,
});

function TenantDashboard() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);
        const [rentalsData, paymentsData, maintenanceData] = await Promise.all([
          tenantApi.rentals(),
          tenantApi.payments(),
          tenantApi.maintenanceRequests(),
        ]);
        setRentals(rentalsData);
        setPayments(paymentsData);
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

  const activeRentals = rentals.filter((r) => r.status === "active");
  const pendingPayments = payments.filter((p) => p.status === "pending" || p.status === "overdue");
  const pendingMaintenance = maintenance.filter((m) => m.status === "pending");

  if (loading) {
    return (
      <DashboardLayout role="TENANT" userName="Jane Doe">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="TENANT" userName="Jane Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Jane!</h2>
          <p className="text-muted-foreground">Here's what's happening with your rentals.</p>
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
                  <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeRentals.length}</div>
                  <p className="text-xs text-muted-foreground">Current properties</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rent Due</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {pendingPayments.length > 0 ? formatAmount(pendingPayments[0].amount) : "₦0"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {pendingPayments.length > 0 ? `${pendingPayments.length} pending` : "All paid"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₦150,000</div>
                  <p className="text-xs text-muted-foreground">Available for rent</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingMaintenance.length}</div>
                  <p className="text-xs text-muted-foreground">Pending request</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Pay Rent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pay your rent securely through escrow
                  </p>
                  <Button className="w-full">Pay Now</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    Request Repair
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Submit maintenance requests
                  </p>
                  <Button className="w-full" variant="outline">Request</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    View Lease
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access your lease agreements
                  </p>
                  <Button className="w-full" variant="outline">View</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    Fund Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add funds for rent payments
                  </p>
                  <Button className="w-full" variant="outline">Add Funds</Button>
                </CardContent>
              </Card>
            </div>

            {/* Active Rentals */}
            <Card>
              <CardHeader>
                <CardTitle>Active Rentals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeRentals.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No active rentals</p>
                ) : (
                  activeRentals.map((rental) => (
                    <div key={rental.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                        <Home className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{rental.property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {rental.property.city}, {rental.property.state}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-muted-foreground">Rent: {formatAmount(rental.rent)}/month</span>
                          <span className="text-green-500">Active</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rent payment completed</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-500/10 p-2">
                      <Wrench className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Maintenance request resolved</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-500/10 p-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Lease agreement renewed</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Payments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingPayments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No pending payments</p>
                  ) : (
                    pendingPayments.slice(0, 2).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div>
                          <p className="font-medium">Payment Due</p>
                          <p className="text-sm text-muted-foreground">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatAmount(payment.amount)}</p>
                          <Button size="sm" className="mt-1">Pay</Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
