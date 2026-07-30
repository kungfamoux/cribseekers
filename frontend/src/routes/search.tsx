import { createFileRoute, Link } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { EmptyState, ErrorState } from "@/components/common/states";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { propertiesApi } from "@/lib/api/properties";

type SearchFilters = {
  q?: string;
  city?: string;
  purpose?: string;
  bedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
};

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchFilters => ({
    q: typeof search.q === "string" && search.q ? search.q : undefined,
    city: typeof search.city === "string" && search.city ? search.city : undefined,
    purpose: typeof search.purpose === "string" && search.purpose ? search.purpose : undefined,
    bedrooms: Number(search.bedrooms) || undefined,
    minPrice: Number(search.minPrice) || undefined,
    maxPrice: Number(search.maxPrice) || undefined,
    sort: typeof search.sort === "string" && search.sort ? search.sort : undefined,
    page: Number(search.page) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search properties — CribSeekers" },
      {
        name: "description",
        content:
          "Filter verified homes, land and rentals across Nigeria by city, budget, bedrooms and purpose.",
      },
      { property: "og:title", content: "Search properties — CribSeekers" },
      {
        property: "og:description",
        content: "Filter verified Nigerian listings by city, budget, bedrooms and purpose.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const filters = Route.useSearch();
  const navigate = Route.useNavigate();
  const [term, setTerm] = useState(filters.q ?? "");

  useEffect(() => {
    setTerm(filters.q ?? "");
  }, [filters.q]);

  const page = filters.page ?? 1;

  const results = useQuery({
    queryKey: ["properties", "list", filters],
    queryFn: () => propertiesApi.search({ ...filters, page, limit: 12 }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const update = (patch: Partial<SearchFilters>) =>
    navigate({ search: (prev: SearchFilters) => ({ ...prev, ...patch, page: patch.page ?? 1 }) });

  const hasFilters = Boolean(
    filters.q || filters.city || filters.purpose || filters.bedrooms || filters.minPrice || filters.maxPrice,
  );

  const filterControls = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-1.5">
        <Label htmlFor="filter-city">City</Label>
        <Input
          id="filter-city"
          defaultValue={filters.city ?? ""}
          placeholder="Lagos, Abuja…"
          onBlur={(event) => update({ city: event.target.value || undefined })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="filter-purpose">Purpose</Label>
        <Select
          value={filters.purpose ?? "any"}
          onValueChange={(value) => update({ purpose: value === "any" ? undefined : value })}
        >
          <SelectTrigger id="filter-purpose">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any purpose</SelectItem>
            <SelectItem value="sale">For sale</SelectItem>
            <SelectItem value="rent">For rent</SelectItem>
            <SelectItem value="shortlet">Shortlet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="filter-bedrooms">Bedrooms</Label>
        <Select
          value={filters.bedrooms ? String(filters.bedrooms) : "any"}
          onValueChange={(value) => update({ bedrooms: value === "any" ? undefined : Number(value) })}
        >
          <SelectTrigger id="filter-bedrooms">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {[1, 2, 3, 4, 5].map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}+ bedrooms
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="filter-min">Min price</Label>
          <Input
            id="filter-min"
            inputMode="numeric"
            defaultValue={filters.minPrice ?? ""}
            onBlur={(event) => update({ minPrice: Number(event.target.value) || undefined })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="filter-max">Max price</Label>
          <Input
            id="filter-max"
            inputMode="numeric"
            defaultValue={filters.maxPrice ?? ""}
            onBlur={(event) => update({ maxPrice: Number(event.target.value) || undefined })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-semibold">Search properties</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Verified listings across Nigeria. Filters are saved in the page address, so you can share
          this exact search.
        </p>

        <form
          className="mt-6 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            update({ q: term || undefined });
          }}
        >
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search by location, title or keyword"
              aria-label="Search properties"
              className="h-11 pl-9"
            />
          </div>
          <Button type="submit" className="h-11">
            Search
          </Button>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button type="button" variant="outline" size="icon" className="h-11 w-11" aria-label="Filters">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto p-6">
              <SheetTitle className="font-display">Filters</SheetTitle>
              <div className="mt-6">{filterControls}</div>
            </SheetContent>
          </Sheet>
        </form>

        <div className="mt-6 hidden rounded-xl border border-border bg-card p-5 shadow-card lg:block">
          {filterControls}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {results.isLoading
              ? "Searching…"
              : `${results.data?.total ?? 0} propert${(results.data?.total ?? 0) === 1 ? "y" : "ies"} found`}
          </p>
          <Select value={filters.sort ?? "newest"} onValueChange={(value) => update({ sort: value })}>
            <SelectTrigger className="w-44" aria-label="Sort results">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price_asc">Price: low to high</SelectItem>
              <SelectItem value="price_desc">Price: high to low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          {results.isError ? (
            <ErrorState
              title="We couldn't load these results"
              description={(results.error as Error).message}
              onRetry={() => results.refetch()}
            />
          ) : results.isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (results.data?.items.length ?? 0) === 0 ? (
            <EmptyState
              icon={SearchIcon}
              title="No properties match these filters"
              description="Try widening your budget, removing a filter or searching a nearby city."
              action={
                hasFilters ? (
                  <Button variant="outline" onClick={() => navigate({ search: {} })}>
                    Clear all filters
                  </Button>
                ) : (
                  <Button asChild>
                    <Link to="/">Back to home</Link>
                  </Button>
                )
              }
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.data?.items.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {(results.data?.totalPages ?? 1) > 1 ? (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => update({ page: page - 1 })}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} of {results.data?.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page >= (results.data?.totalPages ?? 1)}
                    onClick={() => update({ page: page + 1 })}
                  >
                    Next
                  </Button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
