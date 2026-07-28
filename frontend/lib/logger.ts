// Structured logging utility for beta testing

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  userId?: string;
  route?: string;
  userAgent?: string;
  timestamp?: string;
  [key: string]: any;
}

class Logger {
  private isDebugEnabled: boolean;

  constructor() {
    this.isDebugEnabled = process.env.NEXT_PUBLIC_DEBUG_LOGGING === 'true';
  }

  private formatMessage(level: LogLevel, message: string, context: LogContext = {}) {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      ...context,
    };
  }

  private log(level: LogLevel, message: string, context: LogContext = {}) {
    const logEntry = this.formatMessage(level, message, context);

    if (level === 'error') {
      console.error(JSON.stringify(logEntry));
    } else if (level === 'warn') {
      console.warn(JSON.stringify(logEntry));
    } else if (level === 'debug' && this.isDebugEnabled) {
      console.debug(JSON.stringify(logEntry));
    } else if (level === 'info') {
      console.log(JSON.stringify(logEntry));
    }

    // Send to Sentry if error
    if (level === 'error' && typeof window !== 'undefined') {
      // Sentry will capture this automatically
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context?: LogContext) {
    const errorContext = {
      ...context,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : undefined,
    };
    this.log('error', message, errorContext);
  }

  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  // Track user actions for analytics
  track(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture(event, properties);
    }
    this.debug(`Event tracked: ${event}`, properties);
  }

  // Track page views
  pageView(path: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.posthog) {
      window.posthog.capture('$pageview', {
        $current_url: window.location.href,
        path,
        ...properties,
      });
    }
    this.debug(`Page view: ${path}`, properties);
  }
}

export const logger = new Logger();
