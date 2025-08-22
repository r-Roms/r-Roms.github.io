declare const logLevels: readonly ["TRACE", "DEBUG", "INFO", "WARN", "ERROR"];
type LogLevel = (typeof logLevels)[number];
/**
 * Enable:
 *   localStorage.logger = 'SelectField'
 *   localStorage.logger = 'SelectField:INFO'
 *   localStorage.logger = 'SelectField,Dialog'
 *   localStorage.logger = 'SelectField:INFO,Dialog'
 */
export declare class Logger {
    name: string;
    constructor(name: string);
    trace(...message: any[]): void;
    debug(...message: any[]): void;
    info(...message: any[]): void;
    warn(...message: any[]): void;
    error(...message: any[]): void;
    log(level: LogLevel, ...message: any): void;
}
export {};
//# sourceMappingURL=logger.d.ts.map