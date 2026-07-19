export interface SocketEventData {
  conversationId?: string;
  messageId?: string;
  userId?: string;
  data?: any;
}

export interface SocketUser {
  userId: string;
  socketId: string;
}
