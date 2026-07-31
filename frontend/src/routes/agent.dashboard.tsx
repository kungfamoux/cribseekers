import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Users, Briefcase, Calendar, DollarSign, TrendingUp, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { agentApi } from "@/lib/api/agent";

export const Route = createFileRoute("/agent/dashboard")({
  component: AgentDashboard,
});

function AgentDashboard() {
  const [listings, setListings] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);
        const [listingsData, leadsData, dealsData, appointmentsData] = await Promise.all([
          agentApi.listings(),
          agentApi.leads(),
          agentApi.deals(),
          agentApi.appointments(),
        ]);
        setListings(listingsData);
        setLeads(leadsData);
        setDeals(dealsData);
        setAppointments(appointmentsData);
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

  const activeListings = listings.filter((l) => l.status === "available");
  const newLeads = leads.filter((l) => l.status === "new");
  const activeDeals = deals.filter((d) => d.status === "active");
  const upcomingAppointments = appointments.filter((a) => a.status === "scheduled");

  if (loading) {
    return (
      <DashboardLayout role="AGENT" userName="Tunde Adeyemi">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="AGENT" userName="Tunde Adeyemi">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, Tunde!</h2>
          <p className="text-muted-foreground">Here's what's happening with your real estate business.</p>
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
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeListings.length}</div>
                  <p className="text-xs text-muted-foreground">{listings.length} total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{newLeads.length}</div>
                  <p className="text-xs text-muted-foreground">{leads.length} total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeDeals.length}</div>
                  <p className="text-xs text-muted-foreground">{deals.length} total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commission</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(activeDeals.reduce((sum, d) => sum + d.commission, 0))}
                  </div>
                  <p className="text-xs text-muted-foreground">Pending earnings</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    Add Listing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    List a new property for sale or rent
                  </p>
                  <Button className="w-full">Add Property</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    View Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your potential clients
                  </p>
                  <Button className="w-full" variant="outline">View Leads</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Schedule Visit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book property inspections
                  </p>
                  <Button className="w-full" variant="outline">Schedule</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    View Deals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Track your active transactions
                  </p>
                  <Button className="w-full" variant="outline">View Deals</Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No upcoming appointments</p>
                  ) : (
                    upcomingAppointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{appointment.client.name}</p>
                          <p className="text-xs text-muted-foreground">{appointment.property.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(appointment.scheduledDate).toLocaleDateString("en-NG", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Leads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {newLeads.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">No new leads</p>
                  ) : (
                    newLeads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="flex items-start gap-3">
                        <div className="rounded-full bg-green-500/10 p-2">
                          <Users className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lead.property.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(lead.createdAt).toLocaleDateString("en-NG", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Active Deals */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Active Deals</CardTitle>
                <Button size="sm" variant="outline">View All</Button>
              </CardHeader>
              <CardContent>
                {activeDeals.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No active deals</p>
                ) : (
                  <div className="space-y-4">
                    {activeDeals.slice(0, 3).map((deal) => (
                      <div key={deal.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-blue-500/10 p-2">
                            <Briefcase className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium">{deal.client.name}</p>
                            <p className="text-sm text-muted-foreground">{deal.property.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatAmount(deal.amount)}</p>
                          <p className="text-sm text-muted-foreground">Commission: {formatAmount(deal.commission)}</p>
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