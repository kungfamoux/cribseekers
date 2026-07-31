import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, MoreVertical, Phone, Video, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { landlordApi } from "@/lib/api/landlord";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/landlord/messages")({
  beforeLoad: createAuthGuard({ requiredRole: "LANDLORD" }),
  component: LandlordMessages,
});

function LandlordMessages() {
  const { user, role } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        setLoading(true);
        setError(null);
        const data = await landlordApi.messages();
        setConversations(data);
        if (data.length > 0) {
          setSelectedConversation(data[0].id);
        }
      } catch (err) {
        setError("Failed to load messages. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const selectedChat = conversations.find((c) => c.id === selectedConversation);

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
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with tenants, agents, and support</p>
        </div>

        {error && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </CardContent>
          </Card>
        )}

        {!error && (
          <Card className="h-[600px]">
            <CardContent className="p-0 h-full">
              <div className="flex h-full">
                {/* Conversations List */}
                <div className="w-full md:w-80 border-r">
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search messages..." className="pl-10" />
                    </div>
                  </div>
                  <div className="overflow-y-auto h-[calc(600px-73px)]">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`p-4 cursor-pointer border-b hover:bg-accent transition-colors ${
                          selectedConversation === conversation.id ? "bg-accent" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={conversation.avatar} alt={conversation.name} />
                              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {conversation.online && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold truncate">{conversation.name}</p>
                              <span className="text-xs text-muted-foreground">{conversation.time}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {conversation.role}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate mt-1">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unread > 0 && (
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                              {conversation.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="hidden md:flex flex-1 flex-col">
                  {selectedChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                            <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{selectedChat.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedChat.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex items-center justify-center h-full">
                          <p className="text-muted-foreground">Select a conversation to view messages</p>
                        </div>
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                // Handle send message
                              }
                            }}
                          />
                          <Button size="icon">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-muted-foreground">Select a conversation to start messaging</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}