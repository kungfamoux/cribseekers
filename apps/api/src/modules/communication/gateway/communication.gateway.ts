import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { COMMUNICATION_CONSTANTS } from '../constants/communication.constants';
import { SocketEventData, SocketUser } from '../types/socket-event.type';
import { TypingService } from '../service/typing.service';
import { MessageService } from '../service/message.service';

@WebSocketGateway({
  cors: {
    origin: process.env.SOCKET_CORS_ORIGIN || '*',
  },
  namespace: '/communication',
})
export class CommunicationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(CommunicationGateway.name);
  private readonly connectedUsers = new Map<string, SocketUser>();

  constructor(
    private readonly typingService: TypingService,
    private readonly messageService: MessageService,
  ) {}

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    // Extract user ID from handshake (should be validated by JWT guard)
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.connectedUsers.set(client.id, { userId, socketId: client.id });
      client.join(`user:${userId}`);
      this.logger.log(`User ${userId} connected with socket ${client.id}`);
    }
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const user = this.connectedUsers.get(client.id);
    if (user) {
      this.connectedUsers.delete(client.id);
      this.logger.log(`User ${user.userId} disconnected`);
    }
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.JOIN_CONVERSATION)
  async handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    client.join(`conversation:${data.conversationId}`);
    this.logger.log(`User ${user.userId} joined conversation ${data.conversationId}`);

    // Notify other participants
    client.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.USER_JOINED,
      {
        userId: user.userId,
        conversationId: data.conversationId,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.LEAVE_CONVERSATION)
  async handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    client.leave(`conversation:${data.conversationId}`);
    this.logger.log(`User ${user.userId} left conversation ${data.conversationId}`);

    // Notify other participants
    client.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.USER_LEFT,
      {
        userId: user.userId,
        conversationId: data.conversationId,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.TYPING_START)
  async handleTypingStart(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    await this.typingService.startTyping(
      { conversationId: data.conversationId, isTyping: true },
      user.userId,
    );

    // Notify other participants in the conversation
    client.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.TYPING_START,
      {
        userId: user.userId,
        conversationId: data.conversationId,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.TYPING_STOP)
  async handleTypingStop(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    await this.typingService.stopTyping(
      { conversationId: data.conversationId, isTyping: false },
      user.userId,
    );

    // Notify other participants in the conversation
    client.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.TYPING_STOP,
      {
        userId: user.userId,
        conversationId: data.conversationId,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.MESSAGE_SENT)
  async handleMessageSent(
    @MessageBody() data: { conversationId: string; messageId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    // Broadcast to all participants in the conversation
    this.server.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.MESSAGE_SENT,
      {
        messageId: data.messageId,
        conversationId: data.conversationId,
        senderId: user.userId,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.MESSAGE_READ)
  async handleMessageRead(
    @MessageBody() data: { conversationId: string; messageId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    await this.messageService.markAsRead(data.messageId, user.userId);

    // Notify sender that their message was read
    this.server.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.MESSAGE_READ,
      {
        messageId: data.messageId,
        conversationId: data.conversationId,
        readBy: user.userId,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.REACTION_ADDED)
  async handleReactionAdded(
    @MessageBody() data: { conversationId: string; messageId: string; reaction: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    // Broadcast to all participants in the conversation
    this.server.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.REACTION_ADDED,
      {
        messageId: data.messageId,
        conversationId: data.conversationId,
        userId: user.userId,
        reaction: data.reaction,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.REACTION_REMOVED)
  async handleReactionRemoved(
    @MessageBody() data: { conversationId: string; messageId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    // Broadcast to all participants in the conversation
    this.server.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.REACTION_REMOVED,
      {
        messageId: data.messageId,
        conversationId: data.conversationId,
        userId: user.userId,
      },
    );
  }

  @SubscribeMessage(COMMUNICATION_CONSTANTS.SOCKET_EVENTS.CONVERSATION_BLOCKED)
  async handleConversationBlocked(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.connectedUsers.get(client.id);
    if (!user) return;

    // Notify all participants in the conversation
    this.server.to(`conversation:${data.conversationId}`).emit(
      COMMUNICATION_CONSTANTS.SOCKET_EVENTS.CONVERSATION_BLOCKED,
      {
        conversationId: data.conversationId,
        blockedBy: user.userId,
      },
    );
  }

  // Helper method to send notification to a specific user
  sendToUser(userId: string, event: string, data: SocketEventData) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  // Helper method to send to conversation participants
  sendToConversation(conversationId: string, event: string, data: SocketEventData) {
    this.server.to(`conversation:${conversationId}`).emit(event, data);
  }
}
