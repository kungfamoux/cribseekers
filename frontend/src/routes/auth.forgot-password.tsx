import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { SubmitButton } from "@/components/common/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api/auth";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validation/auth-schemas";
import { useCooldown } from "@/hooks/use-cooldown";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — CribSeekers" },
      { name: "description", content: "Enter your email and we'll send you a link to reset your CribSeekers password." },
      { property: "og:title", content: "Reset your password — CribSeekers" },
      { property: "og:description", content: "Get a password reset link by email." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const cooldown = useCooldown(60);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: ForgotPasswordValues) => authApi.forgotPassword(values),
    onSettled: () => cooldown.start(),
  });

  // The success panel shows regardless of whether the account exists.
  const submitted = mutation.isSuccess || mutation.isError;

  if (submitted) {
    return (
      <AuthLayout
        title="Check your inbox"
        subtitle={`If an account exists for ${form.getValues("email")}, we've sent a password reset link.`}
        footer={
          <p>
            <Link to="/auth/login" className="font-medium text-primary underline underline-offset-4">
              Back to log in
            </Link>
          </p>
        }
      >
        <div className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
          <span className="mx-auto inline-flex rounded-full bg-primary-soft p-3 text-primary">
            <MailCheck className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-4 text-sm text-muted-foreground">
            The link expires in 30 minutes. Check your spam folder if it hasn't arrived.
          </p>
          <SubmitButton
            type="button"
            variant="outline"
            className="mt-5"
            disabled={cooldown.active}
            onClick={() => mutation.mutate(form.getValues())}
            pending={mutation.isPending}
          >
            {cooldown.active ? `Resend in ${cooldown.remaining}s` : "Resend email"}
          </SubmitButton>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter the email on your account and we'll send you a reset link."
      footer={
        <p>
          Remembered it?{" "}
          <Link to="/auth/login" className="font-medium text-primary underline underline-offset-4">
            Back to log in
          </Link>
        </p>
      }
    >
      <form className="space-y-5" noValidate onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
        <SubmitButton pending={mutation.isPending} className="w-full" size="lg">
          {mutation.isPending ? "Sending…" : "Send reset link"}
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}
