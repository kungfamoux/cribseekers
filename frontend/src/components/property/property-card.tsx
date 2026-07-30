import { Link } from "@tanstack/react-router";
import { BadgeCheck, Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/lib/api/types";

export function PropertyCard({
  property,
  saved,
  onToggleSave,
}: {
  property: Property;
  saved?: boolean;
  onToggleSave?: (id: string) => void;
}) {
  const image = property.images?.[0];
  const location = [property.city, property.state].filter(Boolean).join(", ");

  return (
    <Card className="group relative gap-0 overflow-hidden p-0 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={property.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No photo yet
          </div>
        )}
        {property.verification === "verified" ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs font-medium text-success-foreground">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Verified
          </span>
        ) : null}
        {onToggleSave ? (
          <button
            type="button"
            onClick={() => onToggleSave(property.id)}
            aria-label={saved ? "Remove from saved" : "Save property"}
            aria-pressed={saved}
            className="absolute top-3 right-3 rounded-full bg-card/90 p-2 text-foreground transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-accent text-accent")} />
          </button>
        ) : null}
      </div>

      <div className="p-5">
        <p className="font-display text-lg font-semibold text-foreground">
          {formatPrice(property.price)}
          {property.purpose?.toLowerCase().includes("rent") ? (
            <span className="text-sm font-normal text-muted-foreground"> /year</span>
          ) : null}
        </p>
        <h3 className="mt-1 line-clamp-1 text-base font-medium text-foreground">
          <Link to="/property/$id" params={{ id: property.id }} className="after:absolute after:inset-0">
            {property.title}
          </Link>
        </h3>
        {location ? (
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            <span className="line-clamp-1">{location}</span>
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          {property.bedrooms != null ? (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" aria-hidden /> {property.bedrooms} bed
            </span>
          ) : null}
          {property.bathrooms != null ? (
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-4 w-4" aria-hidden /> {property.bathrooms} bath
            </span>
          ) : null}
          {property.areaSqm != null ? (
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-4 w-4" aria-hidden /> {property.areaSqm} m²
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function PropertyCardSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden p-0 shadow-card">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
  );
}
