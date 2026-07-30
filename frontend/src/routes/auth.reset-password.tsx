import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/auth-layout";
import { SubmitButton } from "@/components/common/submit-button";
import { PasswordInput } from "@/components/forms/password-input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validation/auth-schemas";

export const Route = createFileRoute("/auth/reset-password")({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Set a new password — CribSeekers" },
      { name: "description", content: "Choose a new password for your CribSeekers account." },
      { property: "og:title", content: "Set a new password — CribSeekers" },
      { property: "og:description", content: "Choose a new password for your account." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: ResetPasswordValues) =>
      authApi.resetPassword({ token: token!, password: values.password, confirmPassword: values.confirmPassword }),
    onSuccess: () => {
      toast.success("Password updated. Log in with your new password.");
      navigate({ to: "/auth/login" });
    },
    onError: (error) => {
      toast.error(error instanceof ApiError ? error.message : "We couldn't reset your password.");
    },
  });

  if (!token) {
    return (
      <AuthLayout
        title="This reset link isn't valid"
        subtitle="The link is missing or has expired. Request a new one to continue."
      >
        <Link
          to="/auth/forgot-password"
          className="font-medium text-primary underline underline-offset-4"
        >
          Request a new reset link
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set a new password" subtitle="Choose a strong password you haven't used before.">
      <form className="space-y-5" noValidate onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            strengthValue={form.watch("password")}
            {...form.register("password")}
          />
          {form.formState.errors.password ? (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <PasswordInput id="confirmPassword" autoComplete="new-password" {...form.register("confirmPassword")} />
          {form.formState.errors.confirmPassword ? (
            <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
          ) : null}
        </div>
        <SubmitButton pending={mutation.isPending} className="w-full" size="lg">
          {mutation.isPending ? "Updating…" : "Update password"}
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}
