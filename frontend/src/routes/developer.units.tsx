import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Layers, MapPin, Bed, Bath, Maximize, Edit, Eye, Plus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { developerApi } from "@/lib/api/developer";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/developer/units")({
  beforeLoad: createAuthGuard({ requiredRole: "DEVELOPER" }),
  component: DeveloperUnits,
});

function DeveloperUnits() {
  const { user, role } = useAuth();
  const [units, setUnits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUnits() {
      try {
        setLoading(true);
        setError(null);
        const result = await developerApi.units();
        setUnits(result);
      } catch (err) {
        setError("Failed to load units. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUnits();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "reserved":
        return <Badge className="bg-orange-500">Reserved</Badge>;
      case "sold":
        return <Badge className="bg-blue-500">Sold</Badge>;
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Unit Inventory</h2>
            <p className="text-muted-foreground">Manage unit pricing and availability</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Unit
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
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Units</CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{units.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {units.filter((u) => u.status === "available").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reserved</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {units.filter((u) => u.status === "reserved").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sold</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {units.filter((u) => u.status === "sold").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Units Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Units</CardTitle>
              </CardHeader>
              <CardContent>
                {units.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No units yet</p>
                ) : (
                  <div className="space-y-4">
                    {units.map((unit) => (
                      <div key={unit.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-muted p-2">
                            <Layers className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{unit.project.name} - Unit {unit.unitNumber}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{unit.type}</span>
                              <span>Floor {unit.floor}</span>
                              <span>{unit.bedrooms} Beds</span>
                              <span>{unit.bathrooms} Baths</span>
                              <span>{unit.size}m²</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(unit.price)}</p>
                          {getStatusBadge(unit.status)}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm">View</Button>
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