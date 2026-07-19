import { ApiProperty } from '@nestjs/swagger';

export class ChatReportDto {
  @ApiProperty({ description: 'Messages sent count' })
  messagesSent: number;

  @ApiProperty({ description: 'Active conversations count' })
  activeConversations: number;

  @ApiProperty({ description: 'Average response time in minutes' })
  averageResponseTime: number;

  @ApiProperty({ description: 'Unread messages count' })
  unreadMessages: number;

  @ApiProperty({ description: 'Conversation growth data' })
  conversationGrowth: GrowthDataDto[];
}

export class GrowthDataDto {
  @ApiProperty({ description: 'Date' })
  date: Date;

  @ApiProperty({ description: 'Count' })
  count: number;
}
