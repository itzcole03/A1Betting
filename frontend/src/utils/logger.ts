export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    context?: string;
    data?: unknown;
}

export class Logger {
    private context: string;
    private logLevel: LogLevel;
    private entries: LogEntry[] = [];
    private maxEntries = 1000;

    constructor(context: string, logLevel: LogLevel = 'info') {
        this.context = context;
        this.logLevel = logLevel;
    }

    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }

    private log(level: LogLevel, message: string, data?: unknown): void {
        if (!this.shouldLog(level)) return;

        const entry: LogEntry = {
            level,
            message,
            timestamp: new Date().toISOString(),
            context: this.context,
            data
        };

        this.entries.push(entry);

        // Keep only the last maxEntries
        if (this.entries.length > this.maxEntries) {
            this.entries = this.entries.slice(-this.maxEntries);
        }

        // Output to console
        const logMethod = level === 'error' ? 'error' :
            level === 'warn' ? 'warn' :
                level === 'debug' ? 'debug' : 'log';

        const prefix = `[${entry.timestamp}] [${level.toUpperCase()}] [${this.context}]`;

        if (data) {
            console[logMethod](prefix, message, data);
        } else {
            console[logMethod](prefix, message);
        }
    }

    debug(message: string, data?: unknown): void {
        this.log('debug', message, data);
    }

    info(message: string, data?: unknown): void {
        this.log('info', message, data);
    }

    warn(message: string, data?: unknown): void {
        this.log('warn', message, data);
    }

    error(message: string, error?: Error | unknown): void {
        this.log('error', message, error);
    }

    setLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    getEntries(level?: LogLevel): LogEntry[] {
        if (level) {
            return this.entries.filter(entry => entry.level === level);
        }
        return [...this.entries];
    }

    clear(): void {
        this.entries = [];
    }
}

export default Logger;
