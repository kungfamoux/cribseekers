import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Conversation with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class MessageNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Message with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class ConversationBlockedException extends HttpException {
  constructor(conversationId: string) {
    super(`Conversation with ID ${conversationId} is blocked`, HttpStatus.FORBIDDEN);
  }
}

export class DuplicateConversationException extends HttpException {
  constructor(participants: string[]) {
    super(`Conversation already exists between users: ${participants.join(', ')}`, HttpStatus.CONFLICT);
  }
}

export class DuplicateReactionException extends HttpException {
  constructor(messageId: string, userId: string) {
    super(`User ${userId} has already reacted to message ${messageId}`, HttpStatus.CONFLICT);
  }
}

export class MessageAlreadyDeletedException extends HttpException {
  constructor(id: string) {
    super(`Message with ID ${id} is already deleted`, HttpStatus.BAD_REQUEST);
  }
}

export class AttachmentNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Attachment with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class UnauthorizedConversationAccessException extends HttpException {
  constructor(conversationId: string, userId: string) {
    super(`User ${userId} is not authorized to access conversation ${conversationId}`, HttpStatus.FORBIDDEN);
  }
}

export class TypingExpiredException extends HttpException {
  constructor(conversationId: string, userId: string) {
    super(`Typing indicator expired for user ${userId} in conversation ${conversationId}`, HttpStatus.BAD_REQUEST);
  }
}

export class ReadReceiptException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidConversationTypeException extends HttpException {
  constructor(type: string) {
    super(`Invalid conversation type: ${type}`, HttpStatus.BAD_REQUEST);
  }
}

export class MessageLengthExceededException extends HttpException {
  constructor(length: number, maxLength: number) {
    super(`Message length ${length} exceeds maximum allowed length of ${maxLength}`, HttpStatus.BAD_REQUEST);
  }
}

export class AttachmentCountExceededException extends HttpException {
  constructor(count: number, maxCount: number) {
    super(`Attachment count ${count} exceeds maximum allowed count of ${maxCount}`, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidAttachmentException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
