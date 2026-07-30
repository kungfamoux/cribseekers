import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Bed, Bath, Maximize, Heart, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { propertiesApi } from "@/lib/api/properties";
import type { Property } from "@/lib/api/types";

export const Route = createFileRoute("/buyer/search")({
  component: BuyerSearch,
});

function BuyerSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);
        const params: any = {
          q: searchQuery || undefined,
          type: propertyType || undefined,
          bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
          purpose: "sale",
        };

        // Parse price range
        if (priceRange && priceRange !== "any") {
          const [min, max] = priceRange.split("-").map(Number);
          if (min) params.minPrice = min;
          if (max && max < 999999999) params.maxPrice = max;
        }

        const result = await propertiesApi.search(params);
        setProperties(result.items);
      } catch (err) {
        setError("Failed to load properties. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [searchQuery, priceRange, propertyType, bedrooms]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DashboardLayout role="buyer" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Search Properties</h2>
          <p className="text-muted-foreground">Find your perfect property from our verified listings</p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by location, property name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="terrace">Terrace</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Price</SelectItem>
                  <SelectItem value="0-50000000">Under ₦50M</SelectItem>
                  <SelectItem value="50000000-100000000">₦50M - ₦100M</SelectItem>
                  <SelectItem value="100000000-150000000">₦100M - ₦150M</SelectItem>
                  <SelectItem value="150000000-999999999">₦150M+</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full md:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `Showing ${properties.length} properties`}
          </p>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        )}

        {/* Property Grid */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property: Property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"}
                    alt={property.title}
                    className="h-48 w-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 h-8 w-8 bg-background/50 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  {property.verification === "verified" && (
                    <Badge className="absolute left-2 top-2 bg-green-500">Verified</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {property.city && property.state ? `${property.city}, ${property.state}` : property.address || "Location not specified"}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-2xl font-bold text-primary">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {property.bedrooms || 0} Beds
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {property.bathrooms || 0} Baths
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      {property.areaSqm || 0}m²
                    </div>
                  </div>
                  <Button className="mt-4 w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && properties.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground text-center">
                Try adjusting your search filters to find more properties
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
