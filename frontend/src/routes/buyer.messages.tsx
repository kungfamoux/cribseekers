import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const Route = createFileRoute("/buyer/messages")({
  component: BuyerMessages,
});

function BuyerMessages() {
  return (
    <DashboardLayout role="BUYER" userName="John Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with agents and sellers</p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-24">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Our messaging feature is currently under development. You'll be able to communicate with agents and sellers here soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
