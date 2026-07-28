import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Check if PostHog is enabled
const POSTHOG_ENABLED = process.env.NEXT_PUBLIC_POSTHOG_ENABLED === 'true';
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

// Initialize PostHog
if (typeof window !== 'undefined' && POSTHOG_ENABLED && POSTHOG_KEY) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // We'll capture pageviews manually
    capture_pageleave: true,
    persistence: 'localStorage',
    autocapture: false, // Disable autocapture for beta
    disable_session_recording: true, // Disable session recording for beta
    loaded: (ph) => {
      // Identify user if they have an ID
      if (window.localStorage.getItem('userId')) {
        ph.identify(window.localStorage.getItem('userId')!);
      }
    },
  });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  if (!POSTHOG_ENABLED || !POSTHOG_KEY) {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export { posthog };
