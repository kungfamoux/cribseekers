import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/public-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently asked questions — CribSeekers" },
      {
        name: "description",
        content: "How verification, inspections, escrow and payments work on CribSeekers.",
      },
      { property: "og:title", content: "CribSeekers FAQ" },
      { property: "og:description", content: "Verification, inspections, escrow and payments explained." },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  {
    q: "What does a verified listing mean?",
    a: "Before a property is published we check ownership or authorisation documents, confirm the address and review the photos. Only listings that pass appear publicly with the verified badge.",
  },
  {
    q: "How do inspections work?",
    a: "You pick a slot from the lister's availability, they confirm it, and you receive a code for the visit. The inspection is logged in your dashboard and you can leave feedback afterwards.",
  },
  {
    q: "What is escrow and when should I use it?",
    a: "Escrow holds your payment until both sides confirm the deal is done. Use it for deposits, rent to a new landlord, and any purchase payment. Funds only release on mutual confirmation or an admin ruling on a dispute.",
  },
  {
    q: "Is CribSeekers free to use?",
    a: "Searching, saving properties and booking inspections are free for buyers and tenants. Listers pay for listing and transaction services; the fee is always shown before you commit.",
  },
  {
    q: "How do I get my property verified?",
    a: "Create a landlord, agent or developer account, add the property with its documents, and submit it for verification. Most reviews complete within 48 hours.",
  },
  {
    q: "How do I withdraw from my wallet?",
    a: "Add a bank account in your name and verify your phone number. Withdrawals are then processed to that account, usually within one business day.",
  },
];

function FaqPage() {
  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 lg:py-24">
        <h1 className="font-display text-4xl font-semibold">Frequently asked questions</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Everything about verification, inspections and how money moves on CribSeekers.
        </p>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger className="text-left font-display text-base font-medium">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm/relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PublicLayout>
  );
}
