import { ChatMetrics } from '../types/analytics-result.type';

export class ChatMetricsEntity implements ChatMetrics {
  messagesSent: number;
  activeConversations: number;
  averageResponseTime: number;
  unreadMessages: number;
  conversationGrowth: Array<{ date: Date; count: number }>;

  constructor(data?: Partial<ChatMetrics>) {
    Object.assign(this, data);
  }
}
