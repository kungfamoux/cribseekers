import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';

// Controllers
import { ConversationController } from './controller/conversation.controller';
import { MessageController } from './controller/message.controller';
import { TypingController } from './controller/typing.controller';
import { BlockedConversationController } from './controller/blocked-conversation.controller';

// Services
import { ConversationService } from './service/conversation.service';
import { MessageService } from './service/message.service';
import { TypingService } from './service/typing.service';
import { BlockedConversationService } from './service/blocked-conversation.service';

// Repositories
import { ConversationRepository } from './repository/conversation.repository';
import { MessageRepository } from './repository/message.repository';
import { MessageAttachmentRepository } from './repository/message-attachment.repository';
import { MessageReactionRepository } from './repository/message-reaction.repository';
import { TypingRepository } from './repository/typing.repository';
import { ReadReceiptRepository } from './repository/read-receipt.repository';
import { BlockedConversationRepository } from './repository/blocked-conversation.repository';

// Gateway
import { CommunicationGateway } from './gateway/communication.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [
    ConversationController,
    MessageController,
    TypingController,
    BlockedConversationController,
  ],
  providers: [
    // Services
    ConversationService,
    MessageService,
    TypingService,
    BlockedConversationService,
    // Repositories
    ConversationRepository,
    MessageRepository,
    MessageAttachmentRepository,
    MessageReactionRepository,
    TypingRepository,
    ReadReceiptRepository,
    BlockedConversationRepository,
    // Gateway
    CommunicationGateway,
  ],
  exports: [
    ConversationService,
    MessageService,
    TypingService,
    BlockedConversationService,
    ConversationRepository,
    MessageRepository,
    MessageAttachmentRepository,
    MessageReactionRepository,
    TypingRepository,
    ReadReceiptRepository,
    BlockedConversationRepository,
  ],
})
export class CommunicationModule {}
