// A simple logging utility for consistent logging across the application.
// In a production environment, this could be extended to send logs to a service like Sentry or LogRocket.

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  timestamp: string;
}

class Logger {
  private static instance: Logger;
  private isProduction: boolean;

  private constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatLog(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };
  }

  private print(entry: LogEntry) {
    // In production, we might want to suppress debug/info logs or send them to a service
    if (this.isProduction && entry.level === 'debug') {
      return;
    }

    const { level, message, context, timestamp } = entry;
    const formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

    switch (level) {
      case 'info':
        console.info(formattedMessage, context || '');
        break;
      case 'warn':
        console.warn(formattedMessage, context || '');
        break;
      case 'error':
        console.error(formattedMessage, context || '');
        break;
      case 'debug':
        console.debug(formattedMessage, context || '');
        break;
    }
  }

  public info(message: string, context?: Record<string, any>) {
    this.print(this.formatLog('info', message, context));
  }

  public warn(message: string, context?: Record<string, any>) {
    this.print(this.formatLog('warn', message, context));
  }

  public error(message: string, context?: Record<string, any>) {
    this.print(this.formatLog('error', message, context));
  }

  public debug(message: string, context?: Record<string, any>) {
    this.print(this.formatLog('debug', message, context));
  }
}

export const logger = Logger.getInstance();
