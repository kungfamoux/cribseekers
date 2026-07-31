import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, DollarSign, CheckCircle, Clock, AlertCircle, User, Phone, Mail, Loader2, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { developerApi } from "@/lib/api/developer";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/developer/reservations")({
  beforeLoad: createAuthGuard({ requiredRole: "DEVELOPER" }),
  component: DeveloperReservations,
});

function DeveloperReservations() {
  const { user, role } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReservations() {
      try {
        setLoading(true);
        setError(null);
        const result = await developerApi.reservations();
        setReservations(result);
      } catch (err) {
        setError("Failed to load reservations. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
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
      case "confirmed":
        return <Badge className="bg-blue-500">Confirmed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "converted":
        return <Badge className="bg-green-500">Converted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-orange-500" />;
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "converted":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const pendingReservations = reservations.filter((r) => r.status === "pending");
  const confirmedReservations = reservations.filter((r) => r.status === "confirmed");

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
          <h2 className="text-3xl font-bold tracking-tight">Reservations</h2>
          <p className="text-muted-foreground">Manage unit reservations and deposits</p>
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
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingReservations.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{confirmedReservations.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatAmount(reservations.reduce((sum, r) => sum + r.depositAmount, 0))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Converted</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {reservations.filter((r) => r.status === "converted").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Reservations */}
            {pendingReservations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Pending Reservations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-orange-500/10 p-2">
                          {getStatusIcon(reservation.status)}
                        </div>
                        <div>
                          <p className="font-semibold">{reservation.buyerName}</p>
                          <p className="text-sm text-muted-foreground">{reservation.unit.project.name} - Unit {reservation.unit.unitNumber}</p>
                          <p className="text-sm text-muted-foreground">Reserved: {formatDate(reservation.reservedDate)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatAmount(reservation.depositAmount)}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm">Confirm</Button>
                          <Button size="sm" variant="destructive">Decline</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* All Reservations */}
            <Card>
              <CardHeader>
                <CardTitle>All Reservations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No reservations yet</p>
                ) : (
                  reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
                          {getStatusIcon(reservation.status)}
                        </div>
                        <div>
                          <p className="font-semibold">{reservation.buyerName}</p>
                          <p className="text-sm text-muted-foreground">{reservation.unit.project.name} - Unit {reservation.unit.unitNumber}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {reservation.buyerEmail}
                            </div>
                            {reservation.buyerPhone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {reservation.buyerPhone}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatAmount(reservation.depositAmount)}</p>
                        {getStatusBadge(reservation.status)}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}