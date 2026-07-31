import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, Building, Briefcase, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { developerApi } from "@/lib/api/developer";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/developer/profile")({
  beforeLoad: createAuthGuard({ requiredRole: "DEVELOPER" }),
  component: DeveloperProfile,
});

function DeveloperProfile() {
  const { user, role } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);
        const result = await developerApi.profile();
        setProfile(result);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role={role} userName={user?.firstName || "User"}>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role} userName={user?.firstName || "User"}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        {error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        )}

        {!error && profile && (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={profile.avatar} alt={profile.name} />
                        <AvatarFallback className="text-2xl">{profile.name?.charAt(0) || "C"}</AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="ghost" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    {profile.verified && (
                      <Badge className="mt-2 bg-green-500">Verified Developer</Badge>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{profile.email}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      Member since {new Date(profile.createdAt).toLocaleDateString("en-NG", { month: "long", year: "numeric" })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={profile.firstName} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={profile.lastName} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="email" type="email" defaultValue={profile.email} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="phone" type="tel" defaultValue={profile.phone} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="location" defaultValue={profile.location} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                    defaultValue={profile.bio}
                        rows={4}
                      />
                    </div>
                    <Button className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="companyName" defaultValue={profile.companyName} className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rcNumber">RC Number</Label>
                      <Input id="rcNumber" defaultValue={profile.rcNumber} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="officeAddress">Office Address</Label>
                    <Input id="officeAddress" defaultValue={profile.officeAddress} />
                  </div>
                  <Button>Update Company Info</Button>
                </form>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{profile.totalProjects || 0}</p>
                    <p className="text-sm text-muted-foreground">Total Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.totalUnits || 0}</p>
                    <p className="text-sm text-muted-foreground">Total Units</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{user.unitsSold || 0}</p>
                    <p className="text-sm text-muted-foreground">Units Sold</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">₦{(user.totalRevenue || 0).toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}