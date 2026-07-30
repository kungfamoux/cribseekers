import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, MoreVertical, Phone } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/tenant/messages")({
  component: TenantMessages,
});

function TenantMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [message, setMessage] = useState("");

  // Mock data - replace with API call
  const conversations = [
    {
      id: "1",
      name: "Emeka Okafor",
      avatar: "",
      role: "Landlord",
      lastMessage: "The maintenance request has been scheduled for tomorrow",
      time: "2m ago",
      unread: 1,
      online: true,
    },
    {
      id: "2",
      name: "Chioma Nwosu",
      avatar: "",
      role: "Landlord",
      lastMessage: "Thank you for the rent payment",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "CribSeekers Support",
      avatar: "",
      role: "Support",
      lastMessage: "Your wallet has been successfully funded",
      time: "3h ago",
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: "1",
      sender: "them",
      text: "Hello! I received your maintenance request about the leaking faucet.",
      time: "10:30 AM",
    },
    {
      id: "2",
      sender: "me",
      text: "Yes, it's been leaking for 2 days now.",
      time: "10:32 AM",
    },
    {
      id: "3",
      sender: "them",
      text: "The maintenance request has been scheduled for tomorrow between 9 AM and 12 PM.",
      time: "10:35 AM",
    },
    {
      id: "4",
      sender: "them",
      text: "Please make sure someone is available to let the plumber in.",
      time: "10:36 AM",
    },
  ];

  const selectedChat = conversations.find((c) => c.id === selectedConversation);

  return (
    <DashboardLayout role="TENANT" userName="Jane Doe">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Communicate with landlords and support</p>
        </div>

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
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
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
                    <p className="text-muted-foreground">Select a conversation to start chatting</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
