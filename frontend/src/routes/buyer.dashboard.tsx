import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, Heart, ClipboardCheck, Wallet, Shield, MessageSquare, Bell, TrendingUp, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { buyerApi } from "@/lib/api/buyer";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/buyer/dashboard")({
  beforeLoad: createAuthGuard({ requiredRole: "BUYER" }),
  component: BuyerDashboard,
});

function BuyerDashboard() {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(true);
  const [savedCount, setSavedCount] = useState(0);
  const [inspectionsCount, setInspectionsCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [escrowCount, setEscrowCount] = useState(0);
  const [escrowTotal, setEscrowTotal] = useState(0);
  const [upcomingInspections, setUpcomingInspections] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [saved, inspections, wallet, escrow] = await Promise.all([
          buyerApi.savedProperties(),
          buyerApi.inspections(),
          buyerApi.wallet(),
          buyerApi.escrowTransactions(),
        ]);

        setSavedCount(saved.length);
        setInspectionsCount(inspections.length);
        setWalletBalance(wallet.balance);
        setEscrowCount(escrow.length);
        setEscrowTotal(escrow.reduce((sum, e) => sum + e.amount, 0));

        const upcoming = inspections
          .filter((i) => i.status === "scheduled")
          .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
          .slice(0, 2);
        setUpcomingInspections(upcoming);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
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
          <p className="text-muted-foreground">Here's what's happening with your property search.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{savedCount}</div>
              <p className="text-xs text-muted-foreground">Properties saved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inspections</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inspectionsCount}</div>
              <p className="text-xs text-muted-foreground">Total inspections</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatAmount(walletBalance)}</div>
              <p className="text-xs text-muted-foreground">Available for escrow</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Escrow</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{escrowCount}</div>
              <p className="text-xs text-muted-foreground">{formatAmount(escrowTotal)} protected</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search Properties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Find your dream property from our verified listings
              </p>
              <Button className="w-full">Start Searching</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Book Inspection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Schedule a physical inspection of any property
              </p>
              <Button className="w-full" variant="outline">Book Now</Button>
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
                Add funds to your wallet for secure payments
              </p>
              <Button className="w-full" variant="outline">Add Funds</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Heart className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Saved 3-bedroom apartment in Lekki</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-500/10 p-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Inspection completed for Victoria Island property</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-500/10 p-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Escrow initiated for land purchase</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Inspections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInspections.length > 0 ? (
                upcomingInspections.map((inspection) => (
                  <div key={inspection.id} className="flex items-start gap-3">
                    <div className="rounded-full bg-orange-500/10 p-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{inspection.property.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(inspection.scheduledDate).toLocaleString("en-NG", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming inspections</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Market Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">Lekki Phase 1</p>
                <p className="text-2xl font-bold">₦85M</p>
                <p className="text-xs text-green-500">+5.2% from last month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Ikeja GRA</p>
                <p className="text-2xl font-bold">₦65M</p>
                <p className="text-xs text-green-500">+3.8% from last month</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Victoria Island</p>
                <p className="text-2xl font-bold">₦120M</p>
                <p className="text-xs text-red-500">-1.2% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
