import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { PublicLayout } from "@/components/layout/public-layout";
import { SubmitButton } from "@/components/common/submit-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactValues } from "@/lib/validation/auth-schemas";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CribSeekers" },
      {
        name: "description",
        content: "Get in touch with the CribSeekers team about listings, verification, escrow or partnerships.",
      },
      { property: "og:title", content: "Contact CribSeekers" },
      { property: "og:description", content: "Questions about listings, escrow or partnerships? Talk to us." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  return (
    <PublicLayout>
      <div className="mx-auto grid w-full max-w-5xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-[1fr_1.2fr] lg:py-24">
        <div>
          <h1 className="font-display text-4xl font-semibold">Talk to us</h1>
          <p className="mt-4 text-sm/relaxed text-muted-foreground">
            Questions about a listing, verification, escrow or partnering with CribSeekers? Send us a
            note and we'll respond within one business day.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" aria-hidden /> hello@cribseekers.com
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" aria-hidden /> +234 800 000 0000
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" aria-hidden /> Lagos, Nigeria
            </li>
          </ul>
        </div>

        <Card className="p-6 shadow-card">
          {sent ? (
            <div className="py-10 text-center">
              <span className="mx-auto inline-flex rounded-full bg-success/10 p-3 text-success">
                <CheckCircle2 className="h-6 w-6" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">Message sent</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Thanks for reaching out — we'll be in touch shortly.
              </p>
            </div>
          ) : (
            <form className="space-y-5" noValidate onSubmit={form.handleSubmit(() => setSent(true))}>
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name ? (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...form.register("email")} />
                {form.formState.errors.email ? (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" {...form.register("subject")} />
                {form.formState.errors.subject ? (
                  <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} {...form.register("message")} />
                {form.formState.errors.message ? (
                  <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                ) : null}
              </div>
              <SubmitButton className="w-full" size="lg">
                Send message
              </SubmitButton>
            </form>
          )}
        </Card>
      </div>
    </PublicLayout>
  );
}
