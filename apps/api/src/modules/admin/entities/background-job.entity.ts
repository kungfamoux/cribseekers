import { JobStatus } from '@prisma/client';

export class BackgroundJob {
  id: string;
  name: string;
  queue: string;
  payload: any;
  status: JobStatus;
  priority: number;
  attempts: number;
  maxAttempts: number;
  error: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  failedAt: Date | null;
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
