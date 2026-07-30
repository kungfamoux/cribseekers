import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Bath, BedDouble, MapPin, MessageSquare, Ruler } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/public-layout";
import { ErrorState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { propertiesApi } from "@/lib/api/properties";
import { formatPrice } from "@/lib/format";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/property/$id")({
  head: () => ({
    meta: [
      { title: "Property details — CribSeekers" },
      {
        name: "description",
        content: "View photos, price, features and verification status, then book an inspection.",
      },
      { property: "og:title", content: "Property details — CribSeekers" },
      {
        property: "og:description",
        content: "Photos, price, features and verification status for this CribSeekers listing.",
      },
    ],
  }),
  component: PropertyDetailPage,
});

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const { status } = useAuth();
  const [activeImage, setActiveImage] = useState(0);

  const property = useQuery({
    queryKey: ["properties", "detail", id],
    queryFn: () => propertiesApi.detail(id),
  });

  const requireAuth = (action: string) => {
    if (status !== "authenticated") {
      toast.info(`Log in to ${action}.`);
      router.navigate({ to: "/auth/login", search: { redirect: `/property/${id}` } });
      return false;
    }
    return true;
  };

  if (property.isLoading) {
    return (
      <PublicLayout>
        <div className="mx-auto w-full max-w-screen-2xl space-y-6 px-4 py-10 md:px-6 lg:px-8">
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-40 w-full" />
        </div>
      </PublicLayout>
    );
  }

  if (property.isError || !property.data) {
    return (
      <PublicLayout>
        <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6">
          <ErrorState
            title="We couldn't load this property"
            description={(property.error as Error | undefined)?.message ?? "It may have been removed."}
            onRetry={() => property.refetch()}
          />
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link to="/search">Browse properties</Link>
            </Button>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const data = property.data;
  const images = data.images?.length ? data.images : [];
  const location = [data.address, data.city, data.state].filter(Boolean).join(", ");

  return (
    <PublicLayout>
      <article className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-muted">
          {images[activeImage] ? (
            <img
              src={images[activeImage]}
              alt={data.title}
              className="aspect-[16/9] w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center text-sm text-muted-foreground">
              No photos available for this listing
            </div>
          )}
        </div>

        {images.length > 1 ? (
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View photo ${index + 1}`}
                aria-current={index === activeImage}
                className="h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none aria-[current=true]:ring-2 aria-[current=true]:ring-primary"
              >
                <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-semibold">{data.title}</h1>
              {data.verification === "verified" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Verified listing
                </span>
              ) : null}
            </div>
            {location ? (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden /> {location}
              </p>
            ) : null}

            <p className="mt-4 font-display text-3xl font-semibold text-primary">
              {formatPrice(data.price)}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Bedrooms", value: data.bedrooms, icon: BedDouble },
                { label: "Bathrooms", value: data.bathrooms, icon: Bath },
                { label: "Area", value: data.areaSqm ? `${data.areaSqm} m²` : undefined, icon: Ruler },
                { label: "Type", value: data.type, icon: undefined },
              ]
                .filter((item) => item.value !== undefined && item.value !== null)
                .map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-card p-4">
                    <dt className="text-xs text-muted-foreground">{item.label}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold">{String(item.value)}</dd>
                  </div>
                ))}
            </dl>

            {data.description ? (
              <section className="mt-10">
                <h2 className="font-display text-xl font-semibold">About this property</h2>
                <p className="mt-3 text-sm/relaxed whitespace-pre-line text-muted-foreground">
                  {data.description}
                </p>
              </section>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold">Interested in this property?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Book an inspection and message the lister. Payments are protected by CribSeekers escrow.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Button
                  onClick={() => {
                    if (requireAuth("book an inspection")) toast.success("Inspection booking opens with your dashboard.");
                  }}
                >
                  Book inspection
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (requireAuth("message the lister")) toast.success("Messaging opens with your dashboard.");
                  }}
                >
                  <MessageSquare className="h-4 w-4" aria-hidden /> Message lister
                </Button>
              </div>
              {data.agent?.name ? (
                <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
                  Listed by <span className="font-medium text-foreground">{data.agent.name}</span>
                </p>
              ) : null}
            </Card>
          </aside>
        </div>
      </article>
    </PublicLayout>
  );
}
