import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/tenant/messages")({
  component: TenantMessages,
});

function TenantMessages() {
  return (
    <DashboardLayout role="TENANT" userName="Jane Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with landlords and support</p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-24">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Our messaging feature is currently under development. You'll be able to communicate with landlords and support staff here soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
