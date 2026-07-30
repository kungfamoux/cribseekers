import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, LifeBuoy, ShieldCheck, Wallet } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help centre — CribSeekers" },
      {
        name: "description",
        content: "Guides for getting started, verifying a property, booking inspections and using your wallet.",
      },
      { property: "og:title", content: "CribSeekers help centre" },
      { property: "og:description", content: "Guides for accounts, listings, inspections and payments." },
    ],
  }),
  component: HelpPage,
});

const TOPICS = [
  {
    icon: BookOpen,
    title: "Getting started",
    body: "Create an account, pick your role and complete email and phone verification.",
    to: "/auth/role" as const,
    cta: "Create an account",
  },
  {
    icon: ShieldCheck,
    title: "Verification",
    body: "What documents we ask for, how long review takes and what happens if a listing is rejected.",
    to: "/faq" as const,
    cta: "Read the FAQ",
  },
  {
    icon: Wallet,
    title: "Wallet & escrow",
    body: "Funding, withdrawals, escrow releases and how disputes are resolved.",
    to: "/faq" as const,
    cta: "Read the FAQ",
  },
  {
    icon: LifeBuoy,
    title: "Still stuck?",
    body: "Our support team responds within one business day.",
    to: "/contact" as const,
    cta: "Contact support",
  },
];

function HelpPage() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6 lg:py-24">
        <h1 className="font-display text-4xl font-semibold">Help centre</h1>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          Short guides for the things people ask us about most.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {TOPICS.map((topic) => (
            <Card key={topic.title} className="p-6 shadow-card">
              <span className="inline-flex rounded-xl bg-primary-soft p-2.5 text-primary">
                <topic.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">{topic.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{topic.body}</p>
              <Link
                to={topic.to}
                className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4"
              >
                {topic.cta}
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
