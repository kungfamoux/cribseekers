import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AuthLayout } from "@/components/layout/auth-layout";
import { SubmitButton } from "@/components/common/submit-button";
import { PasswordInput } from "@/components/forms/password-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi, type RegistrationRole } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/auth-context";
import { ROLE_COPY, isSignupRole, type SignupRole } from "@/lib/auth/roles";
import {
  buyerRegistrationSchema,
  tenantRegistrationSchema,
  landlordRegistrationSchema,
  agentRegistrationSchema,
  developerRegistrationSchema,
  type BuyerRegistrationValues,
  type TenantRegistrationValues,
  type LandlordRegistrationValues,
  type AgentRegistrationValues,
  type DeveloperRegistrationValues,
} from "@/lib/validation/auth-schemas";

export const Route = createFileRoute("/auth/signup/$role")({
  beforeLoad: ({ params }) => {
    if (!isSignupRole(params.role.toUpperCase())) throw notFound();
  },
  head: ({ params }) => {
    const role = isSignupRole(params.role) ? ROLE_COPY[params.role.toUpperCase() as SignupRole].title : "Account";
    return {
      meta: [
        { title: `${role} sign up — CribSeekers` },
        {
          name: "description",
          content: `Create your CribSeekers ${role.toLowerCase()} account and get verified access to the platform.`,
        },
        { property: "og:title", content: `${role} sign up — CribSeekers` },
        { property: "og:description", content: `Create your CribSeekers ${role.toLowerCase()} account.` },
      ],
    };
  },
  component: SignupPage,
  notFoundComponent: () => (
    <AuthLayout title="Unknown role" subtitle="That signup link isn't valid.">
      <Link to="/auth/role" className="font-medium text-primary underline underline-offset-4">
        Choose a role
      </Link>
    </AuthLayout>
  ),
});

function SignupPage() {
  const { role } = Route.useParams();
  const signupRole = role.toUpperCase() as RegistrationRole;
  const navigate = useNavigate();
  const { setUser } = useAuth();

  // Select the appropriate schema based on role
  const getSchema = () => {
    switch (signupRole) {
      case "BUYER":
        return buyerRegistrationSchema;
      case "TENANT":
        return tenantRegistrationSchema;
      case "LANDLORD":
        return landlordRegistrationSchema;
      case "AGENT":
        return agentRegistrationSchema;
      case "DEVELOPER":
        return developerRegistrationSchema;
      default:
        return buyerRegistrationSchema;
    }
  };

  const getDefaults = () => {
    const base = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      role: signupRole,
    };

    switch (signupRole) {
      case "BUYER":
        return { ...base, businessName: "" };
      case "TENANT":
        return { ...base, businessName: "" };
      case "LANDLORD":
        return { ...base, businessName: "", taxNumber: "" };
      case "AGENT":
        return { ...base, agencyName: "", licenseNumber: "", officeAddress: "", commissionRate: "" };
      case "DEVELOPER":
        return { ...base, companyName: "", cacNumber: "", website: "", officeAddress: "" };
      default:
        return base;
    }
  };

  const form = useForm<any>({
    resolver: zodResolver(getSchema() as any),
    mode: "onBlur",
    defaultValues: getDefaults(),
  });

  const password = form.watch("password");

  const mutation = useMutation({
    mutationFn: (values: any) => authApi.register(values as any),
    onSuccess: (response) => {
      // Backend sets httpOnly cookies automatically
      // Store user data for immediate UI use
      if (response?.user) setUser(response.user);
      toast.success("Account created. Let's verify your email.");
      navigate({ to: "/auth/verify-email", search: { email: form.getValues("email") } });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.errors) {
          for (const [field, messages] of Object.entries(error.errors)) {
            form.setError(field as any, { message: messages[0] });
          }
        }
        if (error.status === 409) {
          form.setError("email", { message: "This email is already registered" });
        }
        toast.error(error.message);
        return;
      }
      toast.error("We couldn't create your account. Please try again.");
    },
  });

  return (
    <AuthLayout
      title={`Create your ${ROLE_COPY[role.toUpperCase() as SignupRole].title.toLowerCase()} account`}
      subtitle={ROLE_COPY[role.toUpperCase() as SignupRole].description}
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/auth/login" search={undefined} className="font-medium text-primary underline underline-offset-4">
            Log in
          </Link>
          {" · "}
          <Link to="/auth/role" search={undefined} className="font-medium text-primary underline underline-offset-4">
            Change role
          </Link>
        </p>
      }
    >
      <form
        className="space-y-5"
        noValidate
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" error={String(form.formState.errors.firstName?.message || "")} htmlFor="firstName">
            <Input id="firstName" autoComplete="given-name" {...form.register("firstName")} />
          </Field>
          <Field label="Last name" error={String(form.formState.errors.lastName?.message || "")} htmlFor="lastName">
            <Input id="lastName" autoComplete="family-name" {...form.register("lastName")} />
          </Field>
        </div>

        <Field label="Email" error={String(form.formState.errors.email?.message || "")} htmlFor="email">
          <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
        </Field>

        <Field
          label="Phone number (optional)"
          error={String(form.formState.errors.phoneNumber?.message || "")}
          htmlFor="phoneNumber"
          hint="International format, e.g. +2348012345678"
        >
          <Input id="phoneNumber" type="tel" autoComplete="tel" {...form.register("phoneNumber")} />
        </Field>

        {signupRole === "AGENT" && (
          <>
            <Field
              label="Agency name"
              error={String(form.formState.errors.agencyName?.message || "")}
              htmlFor="agencyName"
            >
              <Input id="agencyName" {...form.register("agencyName")} />
            </Field>
            <Field
              label="License number (optional)"
              error={String(form.formState.errors.licenseNumber?.message || "")}
              htmlFor="licenseNumber"
            >
              <Input id="licenseNumber" {...form.register("licenseNumber")} />
            </Field>
            <Field
              label="Office address"
              error={String(form.formState.errors.officeAddress?.message || "")}
              htmlFor="officeAddress"
            >
              <Input id="officeAddress" {...form.register("officeAddress")} />
            </Field>
            <Field
              label="Commission rate (optional)"
              error={String(form.formState.errors.commissionRate?.message || "")}
              htmlFor="commissionRate"
              hint="e.g. 5%"
            >
              <Input id="commissionRate" {...form.register("commissionRate")} />
            </Field>
          </>
        )}

        {signupRole === "DEVELOPER" && (
          <>
            <Field
              label="Company name"
              error={String(form.formState.errors.companyName?.message || "")}
              htmlFor="companyName"
            >
              <Input id="companyName" {...form.register("companyName")} />
            </Field>
            <Field
              label="CAC number (optional)"
              error={String(form.formState.errors.cacNumber?.message || "")}
              htmlFor="cacNumber"
            >
              <Input id="cacNumber" {...form.register("cacNumber")} />
            </Field>
            <Field
              label="Website (optional)"
              error={String(form.formState.errors.website?.message || "")}
              htmlFor="website"
            >
              <Input id="website" type="url" {...form.register("website")} />
            </Field>
            <Field
              label="Office address"
              error={String(form.formState.errors.officeAddress?.message || "")}
              htmlFor="officeAddress"
            >
              <Input id="officeAddress" {...form.register("officeAddress")} />
            </Field>
          </>
        )}

        {signupRole === "LANDLORD" && (
          <>
            <Field
              label="Business name (optional)"
              error={String(form.formState.errors.businessName?.message || "")}
              htmlFor="businessName"
            >
              <Input id="businessName" {...form.register("businessName")} />
            </Field>
            <Field
              label="Tax number (optional)"
              error={String(form.formState.errors.taxNumber?.message || "")}
              htmlFor="taxNumber"
            >
              <Input id="taxNumber" {...form.register("taxNumber")} />
            </Field>
          </>
        )}

        {(signupRole === "BUYER" || signupRole === "TENANT") && (
          <Field
            label="Business name (optional)"
            error={String(form.formState.errors.businessName?.message || "")}
            htmlFor="businessName"
          >
            <Input id="businessName" {...form.register("businessName")} />
          </Field>
        )}

        <Field label="Password" error={String(form.formState.errors.password?.message || "")} htmlFor="password">
          <PasswordInput
            id="password"
            autoComplete="new-password"
            strengthValue={password}
            {...form.register("password")}
          />
        </Field>

        <SubmitButton pending={mutation.isPending} className="w-full" size="lg">
          {mutation.isPending ? "Creating account…" : "Create account"}
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
