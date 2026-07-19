import { ConversationType } from '@prisma/client';

export interface ConversationFilter {
  type?: ConversationType;
  propertyId?: string;
  inspectionId?: string;
  status?: string;
  userId?: string;
  archived?: boolean;
  blocked?: boolean;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
