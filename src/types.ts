/**
 * Core type definitions for the activity logger package.
 */

/**
 * Represents a single activity log entry.
 */
export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  username: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  success: boolean;
  errorMessage?: string;
}

/**
 * Framework-agnostic user context, replacing SvelteKit's App.Locals.
 * Consumers map their framework-specific user object to this interface.
 */
export interface UserContext {
  user?: {
    id: string;
    username?: string;
    email?: string;
  };
}
