import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { to: "/search", label: "Search properties" },
      { to: "/about", label: "About CribSeekers" },
      { to: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Get started",
    links: [
      { to: "/auth/role", label: "Create an account" },
      { to: "/auth/login", label: "Log in" },
      { to: "/help", label: "Help centre" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/contact", label: "Contact" },
      { to: "/legal", label: "Legal" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-4 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)] md:px-6 lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-semibold">
            <Home className="h-5 w-5 text-primary" aria-hidden />
            CribSeekers
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Verified listings, tracked inspections and escrow-protected payments across Nigeria.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h2 className="font-display text-sm font-semibold text-foreground">{column.title}</h2>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} CribSeekers. All rights reserved.</p>
          <p>Lagos · Abuja · Port Harcourt</p>
        </div>
      </div>
    </footer>
  );
}
