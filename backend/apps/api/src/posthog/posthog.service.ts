import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PostHog } from 'posthog-node';

@Injectable()
export class PostHogService implements OnModuleDestroy {
  private readonly client: PostHog | null = null;

  constructor() {
    const apiKey = process.env.POSTHOG_API_KEY;

    if (!apiKey) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'POSTHOG_API_KEY variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once POSTHOG_API_KEY is configured'
        );
      }
      return;
    }

    this.client = new PostHog(apiKey, {
      host: process.env.POSTHOG_HOST ?? 'https://us.i.posthog.com',
      flushAt: 1,
      flushInterval: 0,
      enableExceptionAutocapture: true,
    });
  }

  getClient(): PostHog | null {
    return this.client;
  }

  async capture(params: {
    distinctId: string;
    event: string;
    properties?: Record<string, any>;
  }): Promise<void> {
    if (!this.client) return;
    this.client.capture(params);
    await this.client.flush();
  }

  async identify(params: { distinctId: string; properties?: Record<string, any> }): Promise<void> {
    if (!this.client) return;
    this.client.identify(params);
    await this.client.flush();
  }

  async captureException(error: unknown, distinctId: string): Promise<void> {
    if (!this.client) return;
    this.client.captureException(error as Error, distinctId);
    await this.client.flush();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.shutdown();
    }
  }
}
