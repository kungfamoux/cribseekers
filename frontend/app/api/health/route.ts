import { NextResponse } from 'next/server';

export async function GET() {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    services: {
      frontend: 'healthy',
      api: process.env.NEXT_PUBLIC_API_BASE_URL || 'not configured',
      socket: process.env.NEXT_PUBLIC_SOCKET_URL || 'not configured',
    },
    integrations: {
      sentry: process.env.NEXT_PUBLIC_SENTRY_DSN ? 'configured' : 'not configured',
      posthog: process.env.NEXT_PUBLIC_POSTHOG_ENABLED === 'true' ? 'enabled' : 'disabled',
    },
  };

  return NextResponse.json(healthCheck, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json',
    },
  });
}
