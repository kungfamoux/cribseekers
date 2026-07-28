// Global error reporting utility
import * as Sentry from '@sentry/nextjs';
import { logger } from './logger';

interface ErrorContext {
  userId?: string;
  route?: string;
  userAgent?: string;
  [key: string]: any;
}

export class ErrorReporter {
  reportError(error: Error, context: ErrorContext = {}) {
    // Log to console
    logger.error(error.message, error, context);

    // Send to Sentry
    Sentry.captureException(error, {
      extra: context,
      tags: {
        route: context.route || 'unknown',
      },
    });
  }

  reportMessage(message: string, level: 'info' | 'warning' | 'error' = 'warning', context: ErrorContext = {}) {
    // Log to console
    if (level === 'error') {
      logger.error(message, undefined, context);
    } else if (level === 'warning') {
      logger.warn(message, context);
    } else {
      logger.info(message, context);
    }

    // Send to Sentry
    Sentry.captureMessage(message, {
      level,
      extra: context,
      tags: {
        route: context.route || 'unknown',
      },
    });
  }

  setUser(userId: string, email?: string) {
    Sentry.setUser({
      id: userId,
      email,
    });
    logger.info('User set in error reporting', { userId });
  }

  clearUser() {
    Sentry.setUser(null);
    logger.info('User cleared from error reporting');
  }

  addBreadcrumb(category: string, message: string, data?: Record<string, any>) {
    Sentry.addBreadcrumb({
      category,
      message,
      level: 'info',
      data,
    });
    logger.debug('Breadcrumb added', { category, message, data });
  }
}

export const errorReporter = new ErrorReporter();

// Global error handler for unhandled errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    errorReporter.reportError(event.error, {
      route: window.location.pathname,
      userAgent: navigator.userAgent,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    errorReporter.reportError(
      new Error(event.reason),
      {
        route: window.location.pathname,
        userAgent: navigator.userAgent,
        type: 'unhandledRejection',
      }
    );
  });
}
