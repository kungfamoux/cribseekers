import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, Search, Heart, ClipboardCheck, Wallet, Shield, MessageSquare, Bell, User, Settings, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { type ReactNode, useState } from "react";

const buyerNavItems = [
  { to: "/buyer/dashboard" as any, icon: Home, label: "Dashboard" },
  { to: "/buyer/search" as any, icon: Search, label: "Search Properties" },
  { to: "/buyer/saved" as any, icon: Heart, label: "Saved Properties" },
  { to: "/buyer/inspections" as any, icon: ClipboardCheck, label: "Inspections" },
  { to: "/buyer/wallet" as any, icon: Wallet, label: "Wallet" },
  { to: "/buyer/escrow" as any, icon: Shield, label: "Escrow" },
  { to: "/buyer/messages" as any, icon: MessageSquare, label: "Messages" },
  { to: "/buyer/notifications" as any, icon: Bell, label: "Notifications" },
  { to: "/buyer/profile" as any, icon: User, label: "Profile" },
  { to: "/buyer/settings" as any, icon: Settings, label: "Settings" },
];

interface DashboardLayoutProps {
  role: "BUYER" | "TENANT" | "LANDLORD" | "AGENT" | "DEVELOPER" | "ADMIN";
  userName?: string;
  userAvatar?: string;
  children?: ReactNode;
}

export function DashboardLayout({ role, userName = "User", userAvatar }: DashboardLayoutProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = buyerNavItems; // Will be dynamic based on role

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <Home className="h-5 w-5 text-primary" />
            CribSeekers
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.to)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <Link
            to="/auth/login"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex flex-1 flex-col lg:hidden">
        <header className="flex h-16 items-center justify-between border-b px-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center border-b px-6">
                <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
                  <Home className="h-5 w-5 text-primary" />
                  CribSeekers
                </Link>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.to)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t p-4">
                <Link
                  to="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
            <Home className="h-5 w-5 text-primary" />
            CribSeekers
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/buyer/profile" search={undefined}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/buyer/settings" search={undefined}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/auth/login" search={undefined} className="text-destructive">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Desktop Main Content */}
      <div className="hidden flex-1 flex-col lg:flex">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-xl font-semibold capitalize">{role} Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/buyer/profile" search={undefined}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/buyer/settings" search={undefined}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/auth/login" search={undefined} className="text-destructive">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
