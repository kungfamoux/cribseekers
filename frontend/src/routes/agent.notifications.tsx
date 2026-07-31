import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Trash2, Calendar, DollarSign, Users, Briefcase, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/agent/notifications")({
  component: AgentNotifications,
});

function AgentNotifications() {
  // Mock data - replace with API call
  const notifications = [
    {
      id: "1",
      type: "lead",
      title: "New Lead",
      message: "Jane Doe has expressed interest in your Lekki property listing",
      time: "2 hours ago",
      read: false,
      icon: Users,
    },
    {
      id: "2",
      type: "commission",
      title: "Commission Available",
      message: "Your commission of ₦250,000 from the Lekki property sale is now available for withdrawal",
      time: "5 hours ago",
      read: false,
      icon: DollarSign,
    },
    {
      id: "3",
      type: "deal",
      title: "Deal Update",
      message: "The offer for the Ikeja property has been accepted by the buyer",
      time: "1 day ago",
      read: true,
      icon: Briefcase,
    },
    {
      id: "4",
      type: "appointment",
      title: "Appointment Reminder",
      message: "Property inspection with John Doe is scheduled for tomorrow at 2:00 PM",
      time: "2 days ago",
      read: true,
      icon: Calendar,
    },
    {
      id: "5",
      type: "message",
      title: "New Message",
      message: "You have a new message from developer Chioma Nwosu",
      time: "3 days ago",
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
      case "lead":
        return "bg-blue-500/10 text-blue-500";
      case "commission":
        return "bg-green-500/10 text-green-500";
      case "deal":
        return "bg-purple-500/10 text-purple-500";
      case "appointment":
        return "bg-orange-500/10 text-orange-500";
      case "message":
        return "bg-pink-500/10 text-pink-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout role="AGENT" userName="Tunde Adeyemi">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
            <p className="text-muted-foreground">Stay updated on your real estate activities</p>
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