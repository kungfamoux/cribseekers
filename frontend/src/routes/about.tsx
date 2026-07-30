import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CribSeekers — the trust layer for Nigerian property" },
      {
        name: "description",
        content:
          "CribSeekers verifies listings, tracks inspections and protects payments with escrow so property in Nigeria stops being a gamble.",
      },
      { property: "og:title", content: "About CribSeekers" },
      { property: "og:description", content: "Why we built a verified property marketplace for Nigeria." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 lg:py-24">
        <h1 className="font-display text-4xl font-semibold">About CribSeekers</h1>
        <div className="mt-8 space-y-6 text-base/relaxed text-muted-foreground">
          <p>
            Finding property in Nigeria is rarely about supply. It's about trust — whether the
            listing is real, whether the inspection will happen, and whether your money is safe once
            it leaves your account.
          </p>
          <p>
            CribSeekers exists to remove that uncertainty. Every published listing passes document
            and ownership checks. Every inspection is scheduled, confirmed and logged in the app.
            Every payment can move through escrow, so funds only release when both sides agree.
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground">Who we build for</h2>
          <p>
            Buyers and tenants get honest discovery and protected payments. Landlords, agents and
            developers get a real operations console — properties, tenants, leads, rent collection,
            analytics and commissions — instead of a listing form and a phone full of missed calls.
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground">Where we operate</h2>
          <p>
            We're live across Lagos, Abuja and Port Harcourt, with coverage expanding to every state
            as verification partners come online.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/auth/role">Create an account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/search">Browse properties</Link>
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
