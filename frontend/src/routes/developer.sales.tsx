import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Building, Layers, Calendar, TrendingUp, CheckCircle, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { developerApi } from "@/lib/api/developer";

export const Route = createFileRoute("/developer/sales")({
  component: DeveloperSales,
});

function DeveloperSales() {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSales() {
      try {
        setLoading(true);
        setError(null);
        const result = await developerApi.sales();
        setSales(result);
      } catch (err) {
        setError("Failed to load sales. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSales();
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
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge className="bg-orange-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const completedSales = sales.filter((s) => s.status === "completed");

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
          <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
          <p className="text-muted-foreground">Track unit sales and revenue</p>
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
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(completedSales.reduce((sum, s) => sum + s.saleAmount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedSales.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(
                      completedSales
                        .filter((s) => new Date(s.saleDate).getMonth() === new Date().getMonth())
                        .reduce((sum, s) => sum + s.saleAmount, 0)
                    )}
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
                    {sales.filter((s) => s.status === "pending").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sales List */}
            <Card>
              <CardHeader>
                <CardTitle>All Sales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sales.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No sales yet</p>
                ) : (
                  sales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          {sale.status === "completed" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">{sale.buyerName}</p>
                          <p className="text-sm text-muted-foreground">{sale.unit.project.name} - Unit {sale.unit.unitNumber}</p>
                          <p className="text-sm text-muted-foreground">Sold: {formatDate(sale.saleDate)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatAmount(sale.saleAmount)}</p>
                        {getStatusBadge(sale.status)}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {sales.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No sales yet</h3>
                  <p className="text-muted-foreground text-center">
                    Your sales will appear here when units are sold
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