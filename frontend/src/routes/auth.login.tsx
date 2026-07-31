import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/auth-layout";
import { SubmitButton } from "@/components/common/submit-button";
import { PasswordInput } from "@/components/forms/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { roleHome } from "@/lib/auth/roles";
import { loginSchema, type LoginValues } from "@/lib/validation/auth-schemas";

export const Route = createFileRoute("/auth/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Log in — CribSeekers" },
      { name: "description", content: "Log in to your CribSeekers account to manage your property activity." },
      { property: "og:title", content: "Log in — CribSeekers" },
      { property: "og:description", content: "Access your CribSeekers dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const { setUser } = useAuth();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const mutation = useMutation({
    mutationFn: (values: LoginValues) => authApi.login(values),
    onSuccess: (response) => {
      // Backend sets httpOnly cookies automatically
      // Store user data for immediate UI use
      const { setUser } = useAuth();
      setUser(response.user);
      
      toast.success(`Welcome back${response.user?.firstName ? `, ${response.user.firstName}` : ""}.`);
      if (redirect) {
        navigate({ to: redirect });
        return;
      }
      const primaryRole = response.user?.roles?.[0] as any;
      navigate({ to: roleHome(primaryRole) });
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 403) {
        toast.info("Please verify your account to continue.");
        navigate({ to: "/auth/verify-email", search: { email: form.getValues("email") } });
      }
    },
  });

  const errorMessage =
    mutation.error instanceof ApiError
      ? mutation.error.status === 401
        ? "Incorrect email or password."
        : mutation.error.message
      : mutation.error
        ? "We couldn't log you in. Please try again."
        : null;

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where you left off."
      footer={
        <p>
          New to CribSeekers?{" "}
          <Link to="/auth/role" className="font-medium text-primary underline underline-offset-4">
            Create an account
          </Link>
        </p>
      }
    >
      <form
        className="space-y-5"
        noValidate
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        {errorMessage ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
          >
            {errorMessage}
          </p>
        ) : null}

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
          {form.formState.errors.email ? (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-medium text-primary underline underline-offset-4"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput id="password" autoComplete="current-password" {...form.register("password")} />
          {form.formState.errors.password ? (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="rememberMe"
            checked={form.watch("rememberMe") ?? false}
            onCheckedChange={(checked) => form.setValue("rememberMe", checked === true)}
          />
          <Label htmlFor="rememberMe" className="text-sm font-normal">
            Keep me logged in
          </Label>
        </div>

        <SubmitButton pending={mutation.isPending} className="w-full" size="lg">
          {mutation.isPending ? "Logging in…" : "Log in"}
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}
