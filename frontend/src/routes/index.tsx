import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, CalendarCheck, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-home.jpg";
import { PublicLayout } from "@/components/layout/public-layout";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { propertiesApi } from "@/lib/api/properties";
import { ROLE_COPY, SIGNUP_ROLES } from "@/lib/auth/roles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CribSeekers — Verified homes, land and rentals in Nigeria" },
      {
        name: "description",
        content:
          "Search verified properties across Nigeria, book inspections you can trust and pay through escrow. Built for buyers, tenants, landlords, agents and developers.",
      },
      { property: "og:title", content: "CribSeekers — Verified property in Nigeria" },
      {
        property: "og:description",
        content: "Verified listings, tracked inspections and escrow-protected payments.",
      },
    ],
  }),
  component: HomePage,
});

const TRUST = [
  { icon: BadgeCheck, title: "Verified listings", body: "Every published property passes document and ownership checks before it goes live." },
  { icon: CalendarCheck, title: "Real inspections", body: "Book a slot, get a code, and have the visit logged — no more ghost viewings." },
  { icon: ShieldCheck, title: "Escrow payments", body: "Funds are held until both sides confirm, so deposits never disappear." },
];

const STEPS = [
  { step: "01", title: "Search with confidence", body: "Filter by city, budget, bedrooms and purpose across verified listings." },
  { step: "02", title: "Inspect before you commit", body: "Schedule an inspection, confirm it in-app and leave feedback afterwards." },
  { step: "03", title: "Pay through escrow", body: "Fund your wallet, transact in escrow and release only when you're satisfied." },
];

function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const featured = useQuery({
    queryKey: ["properties", "featured"],
    queryFn: () => propertiesApi.featured(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-hero-gradient text-primary-foreground">
        <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-4 py-20 md:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Verified property marketplace
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
              Property in Nigeria, without the guesswork.
            </h1>
            <p className="mt-5 max-w-xl text-base/relaxed opacity-90">
              Search verified homes, land and rentals. Book inspections that actually happen. Move
              your money through escrow instead of hope.
            </p>

            <form
              className="mt-8 flex flex-col gap-3 rounded-2xl bg-card p-3 shadow-elevated sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                navigate({ to: "/search", search: { q: query || undefined } });
              }}
            >
              <label htmlFor="hero-search" className="sr-only">
                Search properties
              </label>
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Input
                  id="hero-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try “3 bedroom flat in Lekki”"
                  className="h-12 border-0 pl-9 text-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <Button type="submit" size="lg" className="h-12">
                Search properties
              </Button>
            </form>

            <p className="mt-4 text-sm opacity-80">
              Landlord, agent or developer?{" "}
              <Link to="/auth/role" className="font-medium underline underline-offset-4">
                Create your account
              </Link>
            </p>
          </div>

          <div className="relative hidden lg:block">
            <img
              src={heroImage}
              alt="Modern Nigerian duplex at golden hour"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-elevated"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {TRUST.map((item) => (
            <Card key={item.title} className="p-6 shadow-card">
              <span className="inline-flex rounded-xl bg-primary-soft p-2.5 text-primary">
                <item.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {featured.isLoading || (featured.data && featured.data.length > 0) ? (
        <section className="mx-auto w-full max-w-screen-2xl px-4 pb-16 md:px-6 lg:px-8 lg:pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold">Featured properties</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hand-picked, verified listings from across the country.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/search">Browse all</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.isLoading
              ? Array.from({ length: 6 }).map((_, index) => <PropertyCardSkeleton key={index} />)
              : featured.data?.slice(0, 6).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
          </div>
        </section>
      ) : null}

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <h2 className="font-display text-3xl font-semibold">How CribSeekers works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.step}>
                <span className="font-display text-4xl font-semibold text-accent">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
        <h2 className="font-display text-3xl font-semibold">Built for every side of the deal</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Pick your role and get a workspace designed around what you actually do.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SIGNUP_ROLES.map((role) => (
            <Link
              key={role}
              to="/auth/signup/$role"
              params={{ role: role.toLowerCase() }}
              search={undefined}
              className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">{ROLE_COPY[role].title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{ROLE_COPY[role].description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">
                Get started →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
