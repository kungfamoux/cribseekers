import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { DollarSign, TrendingUp, Users, Building, Download, Calendar, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { developerApi } from "@/lib/api/developer";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/developer/reports")({
  beforeLoad: createAuthGuard({ requiredRole: "DEVELOPER" }),
  component: DeveloperReports,
});

function DeveloperReports() {
  const { user, role } = useAuth();
  const [sales, setSales] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReportData() {
      try {
        setLoading(true);
        setError(null);
        const [salesData, projectsData] = await Promise.all([
          developerApi.sales(),
          developerApi.projects(),
        ]);
        setSales(salesData);
        setProjects(projectsData);
      } catch (err) {
        setError("Failed to load report data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReportData();
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = sales.reduce((sum, s) => sum + s.saleAmount, 0);
  const completedSales = sales.filter((s) => s.status === "completed");
  const thisMonthRevenue = completedSales
    .filter((s) => new Date(s.saleDate).getMonth() === new Date().getMonth())
    .reduce((sum, s) => sum + s.saleAmount, 0);

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
            <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
            <p className="text-muted-foreground">View your sales performance and insights</p>
          </div>
          <Button>
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
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatAmount(totalRevenue)}</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatAmount(thisMonthRevenue)}</div>
                  <p className="text-xs text-muted-foreground">Current month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedSales.length}</div>
                  <p className="text-xs text-muted-foreground">Total sold</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {projects.filter((p) => p.status === "construction" || p.status === "launched").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue by Project */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((p) => {
                    const projectRevenue = sales.filter((s) => s.unit.projectId === p.id).reduce((sum, s) => sum + s.saleAmount, 0);
                    const maxRevenue = Math.max(...projects.map((proj) => sales.filter((s) => s.unit.projectId === proj.id).reduce((sum, s) => sum + s.saleAmount, 0)), 1);
                    const percentage = (projectRevenue / maxRevenue) * 100;
                    return (
                      <div key={p.id}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{p.name}</span>
                          <span className="text-sm font-semibold">{formatAmount(projectRevenue)}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects
                    .map((p) => ({
                      ...p,
                      revenue: sales.filter((s) => s.unit.projectId === p.id).reduce((sum, s) => sum + s.saleAmount, 0),
                      unitsSold: sales.filter((s) => s.unit.projectId === p.id).length,
                    }))
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 5)
                    .map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <p className="font-semibold">{project.name}</p>
                          <p className="text-sm text-muted-foreground">{project.city}, {project.state}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatAmount(project.revenue)}</p>
                          <p className="text-sm text-muted-foreground">{project.unitsSold} units sold</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}