import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import type { ReactNode } from "react";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between bg-hero-gradient p-12 text-primary-foreground lg:flex">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-semibold">
          <Home className="h-5 w-5" aria-hidden />
          CribSeekers
        </Link>
        <div className="max-w-md">
          <h2 className="font-display text-4xl leading-tight font-semibold">
            Property in Nigeria, without the guesswork.
          </h2>
          <p className="mt-4 text-sm/relaxed opacity-85">
            Verified listings, real inspections and escrow-protected payments — for buyers, tenants,
            landlords, agents and developers.
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="opacity-75">Listings</dt>
            <dd className="font-display text-2xl font-semibold">Verified</dd>
          </div>
          <div>
            <dt className="opacity-75">Payments</dt>
            <dd className="font-display text-2xl font-semibold">Escrowed</dd>
          </div>
          <div>
            <dt className="opacity-75">Inspections</dt>
            <dd className="font-display text-2xl font-semibold">Tracked</dd>
          </div>
        </dl>
      </aside>

      <main className="flex flex-col justify-center px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md animate-rise">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 font-display text-base font-semibold text-foreground lg:hidden"
          >
            <Home className="h-5 w-5 text-primary" aria-hidden />
            CribSeekers
          </Link>
          <h1 className="font-display text-3xl font-semibold text-foreground">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p> : null}
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-8 text-sm text-muted-foreground">{footer}</div> : null}
        </div>
      </main>
    </div>
  );
}
