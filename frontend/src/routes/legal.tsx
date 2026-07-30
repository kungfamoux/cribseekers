import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Terms & privacy — CribSeekers" },
      {
        name: "description",
        content: "The terms of use and privacy practices that govern your CribSeekers account.",
      },
      { property: "og:title", content: "Terms & privacy — CribSeekers" },
      { property: "og:description", content: "Terms of use and privacy practices for CribSeekers." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 lg:py-24">
        <h1 className="font-display text-4xl font-semibold">Terms &amp; privacy</h1>
        <div className="mt-8 space-y-8 text-sm/relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Terms of use</h2>
            <p className="mt-3">
              By creating a CribSeekers account you agree to provide accurate information, to use the
              platform lawfully, and to honour commitments you make to other users — including
              scheduled inspections and agreed payments. Listings must describe real properties you
              own or are authorised to market.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Payments and escrow</h2>
            <p className="mt-3">
              Escrow funds are held by our licensed payment partner and released on mutual
              confirmation, on the terms of the transaction, or by an administrator's ruling where a
              dispute is raised. Fees applicable to a transaction are shown before you confirm it.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Privacy</h2>
            <p className="mt-3">
              We collect the information needed to verify identity, publish listings and process
              payments. We do not sell personal data. Verification documents are stored encrypted and
              are visible only to the reviewers who need them. You can request export or deletion of
              your data from your account settings at any time.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Contact</h2>
            <p className="mt-3">
              Questions about these terms can be sent to legal@cribseekers.com.
            </p>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
