export * from './api.types';
export * from './auth.types';
export * from './property.types';
export * from './inspection.types';
export * from './common.types';
export * from './wallet.types';
export * from './escrow.types';
export * from './webhook.types';

// Re-export types from hooks for backward compatibility
export type { PropertyFormData } from '@/hooks/useProperty';
export type { UpdateProfileData } from '@/hooks/useUser';
export type { CreateInspectionData, RescheduleInspectionData } from '@/hooks/useInspection';
export type { Conversation, Message, CreateConversationData } from '@/hooks/useConversation';
export type { SearchFilters, SearchResult } from '@/hooks/useSearch';
export type { UploadFileData, StorageFile } from '@/hooks/useStorage';
