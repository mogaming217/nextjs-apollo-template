import { publicEnv } from 'env'

const LogLevel = {
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
} as const
type LogLevel = typeof LogLevel[keyof typeof LogLevel]

type Payload = {
  [key: string]: any
}

export class Logger {
  private static output(level: LogLevel, payload: Payload, error?: Error) {
    const entry: Payload = {
      ...payload,
      severity: level,
    }

    if (error) {
      entry.errorMessage = error.message
      entry.errorName = error.name
      entry.errorStacktrace = error.stack
    }

    console[level](JSON.stringify(entry))
  }

  static debug(payload: Payload, error?: Error) {
    if (publicEnv.env === 'local') {
      this.output('debug', payload, error)
    }
  }

  static info(payload: Payload, error?: Error) {
    this.output('info', payload, error)
  }

  static warn(payload: Payload, error?: Error) {
    this.output('warn', payload, error)
  }

  static error(payload: Payload, error?: Error) {
    this.output('error', payload, error)
  }
}
