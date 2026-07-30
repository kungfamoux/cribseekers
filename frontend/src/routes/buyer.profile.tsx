import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Calendar, Camera, Save } from "lucide-react";

export const Route = createFileRoute("/buyer/profile")({
  component: BuyerProfile,
});

function BuyerProfile() {
  // Data will be populated from API calls
  const user: any = null;

  return (
    <DashboardLayout role="BUYER" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
          <p className="text-muted-foreground">Manage your personal information</p>
        </div>

        {!user ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Loading profile data...
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Profile Card */}
              <Card className="md:col-span-1">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-2xl">{user.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="ghost" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background border">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-xl font-semibold">{user.name || 'User'}</h3>
                    {user.verified && (
                      <Badge className="mt-2 bg-green-500">Verified Buyer</Badge>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{user.email || ''}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      Member since {user.memberSince || 'N/A'}
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
                        <Input id="firstName" defaultValue={user.firstName || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user.lastName || ''} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" defaultValue={user.email || ''} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="phone" type="tel" defaultValue={user.phone || ''} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="location" defaultValue={user.location || ''} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    defaultValue={user.bio || ''}
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

        {/* Account Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{user.savedProperties || 0}</p>
                <p className="text-sm text-muted-foreground">Saved Properties</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.inspections || 0}</p>
                <p className="text-sm text-muted-foreground">Inspections</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.escrowTransactions || 0}</p>
                <p className="text-sm text-muted-foreground">Escrow Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{user.totalSpent || '₦0'}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Email Verified</p>
                    <p className="text-sm text-muted-foreground">{user.email || 'Not provided'}</p>
                  </div>
                </div>
                <Badge className={user.emailVerified ? "bg-green-500" : "bg-orange-500"}>
                  {user.emailVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Phone Verified</p>
                    <p className="text-sm text-muted-foreground">{user.phone || 'Not provided'}</p>
                  </div>
                </div>
                <Badge className={user.phoneVerified ? "bg-green-500" : "bg-orange-500"}>
                  {user.phoneVerified ? "Verified" : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Identity Verification</p>
                    <p className="text-sm text-muted-foreground">Upload government ID</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Verify Now
                </Button>
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
