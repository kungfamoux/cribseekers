import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, MoreVertical, Phone, Video, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { agentApi } from "@/lib/api/agent";
import { createAuthGuard } from "@/lib/auth/route-guards";
import { useAuth } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/agent/messages")({
  beforeLoad: createAuthGuard({ requiredRole: "AGENT" }),
  component: AgentMessages,
});

function AgentMessages() {
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
        const data = await agentApi.messages();
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
  const messages = selectedChat?.messages || [];

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
          <p className="text-muted-foreground">Communicate with buyers, landlords, and developers</p>
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
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.sender === "me" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.sender === "me"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p
                              className={`text-xs mt-1 ${
                                msg.sender === "me"
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && message.trim()) {
                              // Handle send message
                              setMessage("");
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