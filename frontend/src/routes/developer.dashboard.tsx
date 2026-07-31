import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Users, DollarSign, TrendingUp, Calendar, HardHat, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { developerApi } from "@/lib/api/developer";

export const Route = createFileRoute("/developer/dashboard")({
  component: DeveloperDashboard,
});

function DeveloperDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);
        const [projectsData, salesData, reservationsData] = await Promise.all([
          developerApi.projects(),
          developerApi.sales(),
          developerApi.reservations(),
        ]);
        setProjects(projectsData);
        setSales(salesData);
        setReservations(reservationsData);
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

  const activeProjects = projects.filter((p) => p.status === "construction" || p.status === "launched");
  const pendingReservations = reservations.filter((r) => r.status === "pending");

  if (loading) {
    return (
      <DashboardLayout role="DEVELOPER" userName="Chike Nwosu">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="DEVELOPER" userName="Chike Nwosu">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Chike!</h2>
          <p className="text-muted-foreground">Here's what's happening with your development projects.</p>
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
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeProjects.length}</div>
                  <p className="text-xs text-muted-foreground">{projects.length} total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Units</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projects.reduce((sum, p) => sum + p.totalUnits, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Across all projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(sales.reduce((sum, s) => sum + s.saleAmount, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">Total sales</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reservations</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingReservations.length}</div>
                  <p className="text-xs text-muted-foreground">Pending confirmation</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-primary" />
                    New Project
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start a new development project
                  </p>
                  <Button className="w-full">Create Project</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Manage Units
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update unit inventory and pricing
                  </p>
                  <Button className="w-full" variant="outline">View Units</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardHat className="h-5 w-5 text-primary" />
                    Construction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track construction progress
                  </p>
                  <Button className="w-full" variant="outline">View Progress</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Sales Report
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    View sales analytics
                  </p>
                  <Button className="w-full" variant="outline">View Reports</Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Building className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{project.name}</p>
                        <p className="text-xs text-muted-foreground">{project.city}, {project.state}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {project.totalUnits} units • {project.availableUnits} available
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Reservations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingReservations.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No pending reservations</p>
                  ) : (
                    pendingReservations.slice(0, 3).map((reservation) => (
                      <div key={reservation.id} className="flex items-start gap-3">
                        <div className="rounded-full bg-orange-500/10 p-2">
                          <Calendar className="h-4 w-4 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{reservation.buyerName}</p>
                          <p className="text-xs text-muted-foreground">{reservation.unit.project.name} - Unit {reservation.unit.unitNumber}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Deposit: {formatAmount(reservation.depositAmount)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Sales */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Recent Sales</CardTitle>
                <Button size="sm" variant="outline">View All</Button>
              </CardHeader>
              <CardContent>
                {sales.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No sales yet</p>
                ) : (
                  <div className="space-y-4">
                    {sales.slice(0, 3).map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-green-500/10 p-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium">{sale.buyerName}</p>
                            <p className="text-sm text-muted-foreground">{sale.unit.project.name} - Unit {sale.unit.unitNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatAmount(sale.saleAmount)}</p>
                          <p className="text-sm text-muted-foreground">{new Date(sale.saleDate).toLocaleDateString("en-NG")}</p>
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