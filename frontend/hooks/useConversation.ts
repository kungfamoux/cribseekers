import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

// Conversation Types
export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  };
  unreadCount: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  attachments?: string[];
  createdAt: string;
  readAt?: string;
}

export interface CreateConversationData {
  participantId: string;
  propertyId?: string;
  initialMessage?: string;
}

// Get all conversations
export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CONVERSATIONS);
      return response.data;
    },
  });
}

// Get conversation by ID
export function useConversation(id: string) {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CONVERSATION_BY_ID(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Get conversation summary
export function useConversationSummary(id: string) {
  return useQuery({
    queryKey: ['conversation', id, 'summary'],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CONVERSATION_SUMMARY(id));
      return response.data;
    },
    enabled: !!id,
  });
}

// Search conversations
export function useSearchConversations(query: string) {
  return useQuery({
    queryKey: ['conversations', 'search', query],
    queryFn: async () => {
      const response = await apiClient.get(API_ENDPOINTS.CONVERSATION_SEARCH, { params: { query } });
      return response.data;
    },
    enabled: !!query && query.length > 2,
  });
}

// Create conversation
export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateConversationData) => {
      const response = await apiClient.post(API_ENDPOINTS.CONVERSATIONS, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      toast.success('Conversation started successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to start conversation', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Archive conversation
export function useArchiveConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.CONVERSATION_ARCHIVE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      toast.success('Conversation archived successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to archive conversation', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}

// Unarchive conversation
export function useUnarchiveConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.post(API_ENDPOINTS.CONVERSATION_UNARCHIVE(id));
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      toast.success('Conversation unarchived successfully');
    },
    onError: (error: unknown) => {
      toast.error('Failed to unarchive conversation', {
        description: error instanceof Error ? error.message : 'Something went wrong',
      });
    },
  });
}
