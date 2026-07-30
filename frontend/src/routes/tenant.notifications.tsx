import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, Calendar, Wrench, Wallet, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/tenant/notifications")({
  component: TenantNotifications,
});

function TenantNotifications() {
  // Mock data - replace with API call
  const notifications = [
    {
      id: "1",
      type: "payment",
      title: "Rent Payment Reminder",
      message: "Your rent payment of ₦125,000 is due in 5 days",
      time: "2 hours ago",
      read: false,
      icon: Calendar,
    },
    {
      id: "2",
      type: "maintenance",
      title: "Maintenance Update",
      message: "Your maintenance request has been scheduled for tomorrow",
      time: "5 hours ago",
      read: false,
      icon: Wrench,
    },
    {
      id: "3",
      type: "wallet",
      title: "Wallet Funded",
      message: "Your wallet has been credited with ₦100,000",
      time: "1 day ago",
      read: true,
      icon: Wallet,
    },
    {
      id: "4",
      type: "message",
      title: "New Message",
      message: "You have a new message from Emeka Okafor",
      time: "2 days ago",
      read: true,
      icon: MessageSquare,
    },
  ];

  const getNotificationIcon = (icon: any) => {
    const Icon = icon;
    return <Icon className="h-5 w-5" />;
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-orange-500/10 text-orange-500";
      case "maintenance":
        return "bg-blue-500/10 text-blue-500";
      case "wallet":
        return "bg-green-500/10 text-green-500";
      case "message":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout role="tenant" userName="Jane Doe">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
            <p className="text-muted-foreground">Stay updated on your rental activities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Mark All as Read
            </Button>
            <Button variant="outline" size="sm">
              Clear All
            </Button>
          </div>
        </div>

        {/* Unread Notifications */}
        {notifications.filter((n) => !n.read).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Unread ({notifications.filter((n) => !n.read).length})</h3>
            <div className="space-y-3">
              {notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <Card key={notification.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.icon)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{notification.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              New
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Read Notifications */}
        {notifications.filter((n) => n.read).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Earlier</h3>
            <div className="space-y-3">
              {notifications
                .filter((n) => n.read)
                .map((notification) => (
                  <Card key={notification.id} className="opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.icon)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground text-center">
                You're all caught up! Check back later for updates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
