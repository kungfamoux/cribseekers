export const COMMUNICATION_CONSTANTS = {
  // Message limits
  MAX_MESSAGE_LENGTH: 10000,
  MAX_ATTACHMENTS_PER_MESSAGE: 10,
  
  // Attachment size limits (in bytes)
  MAX_ATTACHMENT_SIZE_IMAGE: 10 * 1024 * 1024, // 10MB
  MAX_ATTACHMENT_SIZE_VIDEO: 100 * 1024 * 1024, // 100MB
  MAX_ATTACHMENT_SIZE_DOCUMENT: 25 * 1024 * 1024, // 25MB
  MAX_ATTACHMENT_SIZE_AUDIO: 10 * 1024 * 1024, // 10MB
  
  // Typing indicator expiration (in milliseconds)
  TYPING_INDICATOR_EXPIRY: 5000, // 5 seconds
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // Socket events
  SOCKET_EVENTS: {
    // Conversation events
    CONVERSATION_CREATED: 'conversation.created',
    CONVERSATION_UPDATED: 'conversation.updated',
    CONVERSATION_ARCHIVED: 'conversation.archived',
    CONVERSATION_BLOCKED: 'conversation.blocked',
    CONVERSATION_UNBLOCKED: 'conversation.unblocked',
    
    // Message events
    MESSAGE_SENT: 'message.sent',
    MESSAGE_EDITED: 'message.edited',
    MESSAGE_DELETED: 'message.deleted',
    MESSAGE_READ: 'message.read',
    MESSAGE_REACTED: 'message.reacted',
    MESSAGE_PINNED: 'message.pinned',
    MESSAGE_UNPINNED: 'message.unpinned',
    REACTION_ADDED: 'reaction.added',
    REACTION_REMOVED: 'reaction.removed',
    
    // Typing events
    TYPING_START: 'typing.start',
    TYPING_STOP: 'typing.stop',
    
    // User presence events
    USER_ONLINE: 'user.online',
    USER_OFFLINE: 'user.offline',
    
    // Join/Leave events
    JOIN_CONVERSATION: 'join_conversation',
    LEAVE_CONVERSATION: 'leave_conversation',
    USER_JOINED: 'user_joined',
    USER_LEFT: 'user_left',
  },
  
  // Conversation statuses
  CONVERSATION_STATUS: {
    ACTIVE: 'ACTIVE',
    ARCHIVED: 'ARCHIVED',
    CLOSED: 'CLOSED',
  },
  
  // Message edit history limit
  MAX_EDIT_HISTORY: 10,
} as const;
