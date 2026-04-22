/**
 * Lightweight structured logger for consistent error tracking.
 * Replace console calls with this for structured, searchable logs.
 * Can be swapped for Sentry/Datadog/etc. by changing the implementation here.
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  email?: string;
  action?: string;
  [key: string]: unknown;
}

function log(level: LogLevel, message: string, context?: LogContext, error?: unknown) {
  const entry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...context,
    ...(error instanceof Error && {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    }),
  };

  switch (level) {
    case 'error':
      console.error(JSON.stringify(entry));
      break;
    case 'warn':
      console.warn(JSON.stringify(entry));
      break;
    default:
      console.log(JSON.stringify(entry));
  }
}

export const logger = {
  info: (message: string, context?: LogContext) => log('info', message, context),
  warn: (message: string, context?: LogContext) => log('warn', message, context),
  error: (message: string, context?: LogContext, error?: unknown) =>
    log('error', message, context, error),
};
