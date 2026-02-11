/**
 * Dependency-injection configuration for the activity logger.
 *
 * Allows consumers to override baseDir, log sub-path, max log count,
 * and ID generation without touching the logger internals.
 */

export interface ActivityLoggerConfig {
  /** Base directory for log file resolution (replaces process.cwd()). */
  baseDir: string;
  /** Sub-path under baseDir for the log file. */
  logSubPath: string;
  /** Maximum number of log entries to retain. */
  maxLogs: number;
  /** ID generator function. */
  generateId: () => string;
}

const DEFAULT_LOG_SUB_PATH = 'content/auth/logs/admin-activity.json';
const DEFAULT_MAX_LOGS = 10000;

function createDefaultConfig(): ActivityLoggerConfig {
  return {
    baseDir: process.cwd(),
    logSubPath: DEFAULT_LOG_SUB_PATH,
    maxLogs: DEFAULT_MAX_LOGS,
    generateId: () => crypto.randomUUID(),
  };
}

let _config: ActivityLoggerConfig = createDefaultConfig();

/**
 * Merge partial configuration into the current config.
 * Only provided keys are overwritten; others retain their current values.
 */
export function configureActivityLogger(config: Partial<ActivityLoggerConfig>): void {
  _config = { ..._config, ...config };
}

/**
 * Return a frozen snapshot of the current configuration.
 */
export function getActivityLoggerConfig(): Readonly<ActivityLoggerConfig> {
  return { ..._config };
}

/**
 * Reset configuration to built-in defaults.
 */
export function resetActivityLoggerConfig(): void {
  _config = createDefaultConfig();
}
