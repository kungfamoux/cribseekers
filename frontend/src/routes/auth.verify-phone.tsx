import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/auth-layout";
import { SubmitButton } from "@/components/common/submit-button";
import { OtpField } from "@/components/forms/otp-field";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { roleHome } from "@/lib/auth/roles";
import { useCooldown } from "@/hooks/use-cooldown";

export const Route = createFileRoute("/auth/verify-phone")({
  validateSearch: (search: Record<string, unknown>) => ({
    phone: typeof search.phone === "string" ? search.phone : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Verify your phone — CribSeekers" },
      { name: "description", content: "Enter the 6-digit code we texted you to finish setting up your CribSeekers account." },
      { property: "og:title", content: "Verify your phone — CribSeekers" },
      { property: "og:description", content: "Enter the 6-digit code we texted you." },
    ],
  }),
  component: VerifyPhonePage,
});

function VerifyPhonePage() {
  const { phone } = Route.useSearch();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [code, setCode] = useState("");
  const cooldown = useCooldown(60);
  const target = phone ?? user?.phone ?? "";

  const verify = useMutation({
    mutationFn: () => authApi.verifyPhone({ phone: target, code }),
    onSuccess: async () => {
      toast.success("Phone verified. You're all set.");
      await refreshUser().catch(() => {});
      const primaryRole = user?.roles?.[0] as any;
      navigate({ to: user ? roleHome(primaryRole) : "/auth/login" });
    },
    onError: (error) => {
      setCode("");
      toast.error(error instanceof ApiError ? error.message : "That code didn't work. Try again.");
    },
  });

  const resend = useMutation({
    mutationFn: () => authApi.resendPhoneCode({ phone: target }),
    onSuccess: () => {
      cooldown.start();
      toast.success("We've sent a new code.");
    },
    onError: () => toast.error("We couldn't resend the code just now."),
  });

  return (
    <AuthLayout
      title="Verify your phone"
      subtitle={target ? `Enter the 6-digit code we sent to ${target}.` : "Enter the 6-digit code we sent by SMS."}
      footer={
        <p>
          Need to change it?{" "}
          <Link to="/auth/role" className="font-medium text-primary underline underline-offset-4">
            Start over
          </Link>
        </p>
      }
    >
      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          if (code.length === 6) verify.mutate();
        }}
      >
        <div className="flex justify-center">
          <OtpField value={code} onChange={setCode} onComplete={() => verify.mutate()} disabled={verify.isPending} />
        </div>

        <SubmitButton pending={verify.isPending} disabled={code.length !== 6} className="w-full" size="lg">
          {verify.isPending ? "Verifying…" : "Verify phone"}
        </SubmitButton>

        <div className="text-center text-sm text-muted-foreground">
          Didn't get it?{" "}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0"
            disabled={cooldown.active || resend.isPending}
            onClick={() => resend.mutate()}
          >
            {cooldown.active ? `Resend in ${cooldown.remaining}s` : "Resend code"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
