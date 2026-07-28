// Feature flags for beta testing
// These flags allow us to enable/disable features during beta testing

export const featureFlags = {
  // Analytics
  analyticsEnabled: process.env.NEXT_PUBLIC_POSTHOG_ENABLED === 'true',
  errorReportingEnabled: process.env.NEXT_PUBLIC_SENTRY_DSN !== undefined,
  performanceMonitoringEnabled: process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING === 'true',

  // Debug
  debugMode: process.env.NEXT_PUBLIC_DEBUG === 'true',
  debugLogging: process.env.NEXT_PUBLIC_DEBUG_LOGGING === 'true',

  // Beta-specific features
  betaMode: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BETA_MODE === 'true',
  
  // Feature toggles (can be enabled/disabled during beta)
  enablePropertyComparison: true,
  enableVirtualInspections: true,
  enableSelfTours: true,
  enableEscrow: true,
  enableWallet: true,
  enableMessaging: true,
  enableNotifications: true,
  
  // New features (disabled during beta)
  enableAdvancedSearch: false,
  enableAIRecommendations: false,
  enableSocialSharing: false,
  enablePropertyAlerts: false,
};

export function isFeatureEnabled(feature: keyof typeof featureFlags): boolean {
  return featureFlags[feature];
}

export function setFeatureEnabled(feature: keyof typeof featureFlags, enabled: boolean): void {
  // Only allow runtime changes for certain features
  const mutableFeatures = [
    'enablePropertyComparison',
    'enableVirtualInspections',
    'enableSelfTours',
    'enableAdvancedSearch',
    'enableAIRecommendations',
    'enableSocialSharing',
    'enablePropertyAlerts',
  ] as const;

  if (mutableFeatures.includes(feature as any)) {
    (featureFlags as any)[feature] = enabled;
  }
}

// Hook for React components
export function useFeatureFlag(feature: keyof typeof featureFlags): boolean {
  return isFeatureEnabled(feature);
}
