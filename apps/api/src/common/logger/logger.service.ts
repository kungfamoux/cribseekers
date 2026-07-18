import { Injectable, LoggerService as NestLoggerService, Inject } from '@nestjs/common';
import pino from 'pino';
import { ConfigService } from '../../config/config.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerService implements NestLoggerService {
  private logger: pino.Logger;
  private context?: string;

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    this.logger = this.createLogger();
  }

  private createLogger(): pino.Logger {
    const logLevel = process.env.LOG_LEVEL || 'info';
    const logToFile = process.env.LOG_TO_FILE === 'true';
    const logDir = process.env.LOG_DIR || './logs';

    // Ensure log directory exists
    if (logToFile) {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
    }

    const streams: any[] = [];

    // Console stream - use simple JSON format instead of pino-pretty
    streams.push({
      level: logLevel,
      stream: process.stdout,
    });

    // File stream with daily rotation
    if (logToFile) {
      const date = new Date().toISOString().split('T')[0];
      const logFile = path.join(logDir, `app-${date}.log`);
      const errorLogFile = path.join(logDir, `error-${date}.log`);

      streams.push(
        {
          level: logLevel,
          stream: fs.createWriteStream(logFile, { flags: 'a' }),
        },
        {
          level: 'error',
          stream: fs.createWriteStream(errorLogFile, { flags: 'a' }),
        },
      );
    }

    return pino(
      {
      level: logLevel,
      formatters: {
        level: (label) => {
          return { level: label };
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
      serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
      },
      base: {
        env: this.configService.nodeEnv,
        app: 'cribseekers-api',
      },
    },
    pino.multistream(streams),
    );
  }

  setContext(context: string): void {
    this.context = context;
  }

  log(message: any, context?: string): void {
    this.logger.info(
      {
        context: context || this.context,
        ...(typeof message === 'object' ? message : { message }),
      },
      typeof message === 'string' ? message : undefined,
    );
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error(
      {
        context: context || this.context,
        trace,
        ...(typeof message === 'object' ? message : { message }),
      },
      typeof message === 'string' ? message : undefined,
    );
  }

  warn(message: any, context?: string): void {
    this.logger.warn(
      {
        context: context || this.context,
        ...(typeof message === 'object' ? message : { message }),
      },
      typeof message === 'string' ? message : undefined,
    );
  }

  debug(message: any, context?: string): void {
    this.logger.debug(
      {
        context: context || this.context,
        ...(typeof message === 'object' ? message : { message }),
      },
      typeof message === 'string' ? message : undefined,
    );
  }

  verbose(message: any, context?: string): void {
    this.logger.trace(
      {
        context: context || this.context,
        ...(typeof message === 'object' ? message : { message }),
      },
      typeof message === 'string' ? message : undefined,
    );
  }

  // Additional methods for structured logging
  logWithContext(data: any, context?: string): void {
    this.logger.info({
      context: context || this.context,
      ...data,
    });
  }

  errorWithContext(data: any, context?: string): void {
    this.logger.error({
      context: context || this.context,
      ...data,
    });
  }

  warnWithContext(data: any, context?: string): void {
    this.logger.warn({
      context: context || this.context,
      ...data,
    });
  }

  debugWithContext(data: any, context?: string): void {
    this.logger.debug({
      context: context || this.context,
      ...data,
    });
  }

  // Performance logging
  logPerformance(operation: string, duration: number, context?: string): void {
    this.logger.info({
      context: context || this.context,
      type: 'performance',
      operation,
      duration,
      unit: 'ms',
    });
  }

  // Audit logging
  logAudit(action: string, userId: string, details: any, context?: string): void {
    this.logger.info({
      context: context || this.context,
      type: 'audit',
      action,
      userId,
      details,
      timestamp: new Date().toISOString(),
    });
  }
}
