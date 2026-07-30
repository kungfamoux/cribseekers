import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Maximize, Trash2, Eye, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { buyerApi } from "@/lib/api/buyer";

export const Route = createFileRoute("/buyer/saved")({
  component: BuyerSaved,
});

function BuyerSaved() {
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSavedProperties() {
      try {
        setLoading(true);
        setError(null);
        const result = await buyerApi.savedProperties();
        setSavedProperties(result);
      } catch (err) {
        setError("Failed to load saved properties. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSavedProperties();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await buyerApi.removeSavedProperty(id);
      setSavedProperties(savedProperties.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to remove property:", err);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <DashboardLayout role="buyer" userName="John Doe">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="buyer" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Saved Properties</h2>
          <p className="text-muted-foreground">Properties you've saved for later</p>
        </div>

        {error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        )}

        {!error && savedProperties.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Heart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No saved properties yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Start exploring and save properties you're interested in
              </p>
              <Button>Start Searching</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {savedProperties.length} properties saved
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {savedProperties.map((saved) => (
                <Card key={saved.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={saved.property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"}
                      alt={saved.property.title}
                      className="h-48 w-full object-cover"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemove(saved.id)}
                      className="absolute right-2 top-2 h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{saved.property.title}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {saved.property.city && saved.property.state ? `${saved.property.city}, ${saved.property.state}` : "Location not specified"}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 text-2xl font-bold text-primary">
                      {formatPrice(saved.property.price)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>Saved on {formatDate(saved.savedAt)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRemove(saved.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
