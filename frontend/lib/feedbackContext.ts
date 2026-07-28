// Utility to capture context for feedback submissions
export interface FeedbackContext {
  browser: string;
  os: string;
  device: string;
  appVersion: string;
  route: string;
  userAgent: string;
  screenResolution: string;
  consoleErrors: string[];
  timestamp: string;
}

export function getFeedbackContext(): FeedbackContext {
  const consoleErrors: string[] = [];
  
  // Capture console errors if available
  if (typeof window !== 'undefined') {
    // Try to get recent console errors (limited by browser security)
    // Note: This is a simplified version - in production you'd want to track errors as they occur
  }

  // Detect browser
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';

  // Detect OS
  let os = 'Unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';

  // Detect device type
  let device = 'Desktop';
  if (/Mobile|Android|iPhone|iPad/i.test(userAgent)) {
    device = /iPad/i.test(userAgent) ? 'Tablet' : 'Mobile';
  }

  // Get app version from package.json
  const appVersion = process.env.npm_package_version || '1.0.0';

  // Get current route
  const route = typeof window !== 'undefined' ? window.location.pathname : '/';

  // Get screen resolution
  const screenResolution = typeof window !== 'undefined' 
    ? `${window.screen.width}x${window.screen.height}`
    : 'Unknown';

  return {
    browser,
    os,
    device,
    appVersion,
    route,
    userAgent,
    screenResolution,
    consoleErrors,
    timestamp: new Date().toISOString(),
  };
}

export function formatFeedbackContext(context: FeedbackContext): string {
  return `
**Browser:** ${context.browser}
**OS:** ${context.os}
**Device:** ${context.device}
**App Version:** ${context.appVersion}
**Route:** ${context.route}
**Screen Resolution:** ${context.screenResolution}
**User Agent:** ${context.userAgent}
**Timestamp:** ${context.timestamp}
${context.consoleErrors.length > 0 ? `**Console Errors:**\n${context.consoleErrors.join('\n')}` : ''}
  `.trim();
}
