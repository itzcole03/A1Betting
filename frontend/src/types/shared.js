/**
 * Shared type definitions used across multiple modules.
 * This file contains types that are used by multiple modules but not core to the application.
 */
// Common enums
export var ErrorCategory;
(function (ErrorCategory) {
    ErrorCategory["SYSTEM"] = "SYSTEM";
    ErrorCategory["NETWORK"] = "NETWORK";
    ErrorCategory["VALIDATION"] = "VALIDATION";
    ErrorCategory["AUTHENTICATION"] = "AUTHENTICATION";
    ErrorCategory["AUTHORIZATION"] = "AUTHORIZATION";
    ErrorCategory["BUSINESS"] = "BUSINESS";
    ErrorCategory["UNKNOWN"] = "UNKNOWN";
})(ErrorCategory || (ErrorCategory = {}));
export var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["FATAL"] = "FATAL";
})(LogLevel || (LogLevel = {}));
export var CacheStrategy;
(function (CacheStrategy) {
    CacheStrategy["LRU"] = "LRU";
    CacheStrategy["FIFO"] = "FIFO";
    CacheStrategy["LFU"] = "LFU";
})(CacheStrategy || (CacheStrategy = {}));
// Common constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_CACHE_TTL = 3600; // 1 hour in seconds
export const DEFAULT_RETRY_ATTEMPTS = 3;
export const DEFAULT_RETRY_DELAY = 1000; // 1 second in milliseconds
