import { Link } from "@tanstack/react-router";
import { Home, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth/auth-context";
import { roleHome } from "@/lib/auth/roles";

const NAV = [
  { to: "/search", label: "Search" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, status } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-semibold">
          <Home className="h-5 w-5 text-primary" aria-hidden />
          CribSeekers
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {status === "authenticated" && user ? (
            <Button asChild>
              <Link to={roleHome(user.role)}>Go to dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/auth/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/role">Get started</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="font-display">Menu</SheetTitle>
            <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-2">
              {status === "authenticated" && user ? (
                <Button asChild onClick={() => setOpen(false)}>
                  <Link to={roleHome(user.role)}>Go to dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" onClick={() => setOpen(false)}>
                    <Link to="/auth/login">Log in</Link>
                  </Button>
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link to="/auth/role">Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
