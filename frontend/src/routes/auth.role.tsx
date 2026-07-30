import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Building2, Home, KeyRound, Users } from "lucide-react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { ROLE_COPY, SIGNUP_ROLES, type SignupRole } from "@/lib/auth/roles";

export const Route = createFileRoute("/auth/role")({
  head: () => ({
    meta: [
      { title: "Choose your role — CribSeekers" },
      {
        name: "description",
        content: "Tell us how you use CribSeekers and we'll set up the right workspace for you.",
      },
      { property: "og:title", content: "Choose your role — CribSeekers" },
      { property: "og:description", content: "Buyer, tenant, landlord, agent or developer." },
    ],
  }),
  component: RoleSelectionPage,
});

const ICONS: Record<SignupRole, typeof Home> = {
  BUYER: Home,
  TENANT: KeyRound,
  LANDLORD: Building2,
  AGENT: Users,
  DEVELOPER: Briefcase,
};

function RoleSelectionPage() {
  return (
    <AuthLayout
      title="How will you use CribSeekers?"
      subtitle="Pick the role that fits you best. You can add more later."
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-primary underline underline-offset-4">
            Log in
          </Link>
        </p>
      }
    >
      <ul className="space-y-3">
        {SIGNUP_ROLES.map((role) => {
          const Icon = ICONS[role];
          return (
            <li key={role}>
              <Link
                to="/auth/signup/$role"
                params={{ role: role.toLowerCase() }}
                search={undefined}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="rounded-lg bg-primary-soft p-2.5 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-display font-semibold text-foreground">
                    {ROLE_COPY[role].title}
                  </span>
                  <span className="block text-sm text-muted-foreground">{ROLE_COPY[role].tagline}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </AuthLayout>
  );
}
