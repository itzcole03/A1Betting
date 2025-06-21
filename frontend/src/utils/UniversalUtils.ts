// ============================================================================
// UNIVERSAL UTILITIES SYSTEM
// Consolidates 150+ utility functions into organized, reusable modules
// ============================================================================

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface FormatOptions {
  currency?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface CacheOptions {
  ttl?: number;
  maxSize?: number;
}

export interface ValidationRule {
  type: "required" | "email" | "number" | "min" | "max" | "pattern";
  value?: any;
  message: string;
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export const formatters = {
  /**
   * Format currency values
   */
  currency: (value: number, options: FormatOptions = {}): string => {
    const { currency = "USD", decimals = 2 } = options;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  },

  /**
   * Format percentages
   */
  percentage: (value: number, decimals = 1): string => {
    return `${value.toFixed(decimals)}%`;
  },

  /**
   * Format large numbers with suffixes (K, M, B)
   */
  compactNumber: (value: number): string => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
    return value.toString();
  },

  /**
   * Format odds to American format
   */
  odds: (decimal: number): string => {
    if (decimal >= 2) {
      return `+${Math.round((decimal - 1) * 100)}`;
    }
    return `-${Math.round(100 / (decimal - 1))}`;
  },

  /**
   * Format date/time
   */
  date: (
    date: Date | string,
    format: "short" | "long" | "time" = "short",
  ): string => {
    const d = new Date(date);

    switch (format) {
      case "long":
        return d.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "time":
        return d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      default:
        return d.toLocaleDateString();
    }
  },

  /**
   * Format confidence scores
   */
  confidence: (value: number): string => {
    if (value >= 0.9) return "Very High";
    if (value >= 0.7) return "High";
    if (value >= 0.5) return "Medium";
    if (value >= 0.3) return "Low";
    return "Very Low";
  },
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export const validators = {
  /**
   * Email validation
   */
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Password strength validation
   */
  password: (
    password: string,
  ): { isValid: boolean; strength: string; issues: string[] } => {
    const issues: string[] = [];
    let strength = "Weak";

    if (password.length < 8) issues.push("At least 8 characters required");
    if (!/[A-Z]/.test(password))
      issues.push("At least one uppercase letter required");
    if (!/[a-z]/.test(password))
      issues.push("At least one lowercase letter required");
    if (!/\d/.test(password)) issues.push("At least one number required");
    if (!/[!@#$%^&*]/.test(password))
      issues.push("At least one special character required");

    if (issues.length === 0) strength = "Strong";
    else if (issues.length <= 2) strength = "Medium";

    return {
      isValid: issues.length === 0,
      strength,
      issues,
    };
  },

  /**
   * Betting amount validation
   */
  betAmount: (
    amount: number,
    balance: number,
    minBet = 1,
    maxBet?: number,
  ): boolean => {
    if (amount < minBet) return false;
    if (amount > balance) return false;
    if (maxBet && amount > maxBet) return false;
    return true;
  },

  /**
   * Form validation with rules
   */
  validateField: (value: any, rules: ValidationRule[]): string[] => {
    const errors: string[] = [];

    rules.forEach((rule) => {
      switch (rule.type) {
        case "required":
          if (!value || (typeof value === "string" && !value.trim())) {
            errors.push(rule.message);
          }
          break;
        case "email":
          if (value && !validators.email(value)) {
            errors.push(rule.message);
          }
          break;
        case "number":
          if (value && isNaN(Number(value))) {
            errors.push(rule.message);
          }
          break;
        case "min":
          if (value && Number(value) < rule.value) {
            errors.push(rule.message);
          }
          break;
        case "max":
          if (value && Number(value) > rule.value) {
            errors.push(rule.message);
          }
          break;
        case "pattern":
          if (value && !rule.value.test(value)) {
            errors.push(rule.message);
          }
          break;
      }
    });

    return errors;
  },
};

// ============================================================================
// ARRAY & OBJECT UTILITIES
// ============================================================================

export const collections = {
  /**
   * Group array items by a key
   */
  groupBy: <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
    return array.reduce(
      (groups, item) => {
        const groupKey = String(item[key]);
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(item);
        return groups;
      },
      {} as Record<string, T[]>,
    );
  },

  /**
   * Sort array of objects by multiple criteria
   */
  sortBy: <T>(array: T[], ...keys: (keyof T)[]): T[] => {
    return [...array].sort((a, b) => {
      for (const key of keys) {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
      }
      return 0;
    });
  },

  /**
   * Get unique items from array
   */
  unique: <T>(array: T[], key?: keyof T): T[] => {
    if (key) {
      const seen = new Set();
      return array.filter((item) => {
        const value = item[key];
        if (seen.has(value)) return false;
        seen.add(value);
        return true;
      });
    }
    return [...new Set(array)];
  },

  /**
   * Chunk array into smaller arrays
   */
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Deep clone object
   */
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as any;
    if (obj instanceof Array)
      return obj.map((item) => collections.deepClone(item)) as any;

    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = collections.deepClone(obj[key]);
      }
    }
    return clonedObj;
  },

  /**
   * Merge objects deeply
   */
  deepMerge: <T extends Record<string, any>>(
    target: T,
    source: Partial<T>,
  ): T => {
    const result = { ...target };

    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (
          typeof source[key] === "object" &&
          source[key] !== null &&
          !Array.isArray(source[key]) &&
          typeof target[key] === "object" &&
          target[key] !== null &&
          !Array.isArray(target[key])
        ) {
          result[key] = collections.deepMerge(target[key], source[key]!);
        } else {
          result[key] = source[key]!;
        }
      }
    }

    return result;
  },
};

// ============================================================================
// PERFORMANCE UTILITIES
// ============================================================================

export const performance = {
  /**
   * Debounce function calls
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    options: DebounceOptions = {},
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    let lastCallTime: number;
    const { leading = false, trailing = true } = options;

    return (...args: Parameters<T>) => {
      const now = Date.now();
      const shouldCallLeading = leading && !timeoutId;

      clearTimeout(timeoutId);

      if (shouldCallLeading) {
        func(...args);
      }

      timeoutId = setTimeout(() => {
        if (trailing && (!leading || now - lastCallTime >= delay)) {
          func(...args);
        }
        timeoutId = undefined as any;
      }, delay);

      lastCallTime = now;
    };
  },

  /**
   * Throttle function calls
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    delay: number,
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null;
    let lastExecTime = 0;

    return (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastExecTime > delay) {
        func(...args);
        lastExecTime = now;
      } else if (!timeoutId) {
        timeoutId = setTimeout(
          () => {
            func(...args);
            lastExecTime = Date.now();
            timeoutId = null;
          },
          delay - (now - lastExecTime),
        );
      }
    };
  },

  /**
   * Memoize expensive function calls
   */
  memoize: <T extends (...args: any[]) => any>(
    func: T,
    getKey?: (...args: Parameters<T>) => string,
  ): T => {
    const cache = new Map();

    return ((...args: Parameters<T>) => {
      const key = getKey ? getKey(...args) : JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = func(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },

  /**
   * Measure function execution time
   */
  measureTime: async <T>(
    func: () => Promise<T> | T,
  ): Promise<{ result: T; time: number }> => {
    const start = performance.now();
    const result = await func();
    const time = performance.now() - start;
    return { result, time };
  },
};

// ============================================================================
// CACHING UTILITIES
// ============================================================================

export class UniversalCache<T = any> {
  private cache = new Map<string, { value: T; expiry: number }>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 1000;
    this.defaultTTL = options.ttl || 300000; // 5 minutes default
  }

  set(key: string, value: T, ttl?: number): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expiry });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// ============================================================================
// ERROR HANDLING UTILITIES
// ============================================================================

export const errorHandling = {
  /**
   * Safely execute async operations with error handling
   */
  safeAsync: async <T>(
    operation: () => Promise<T>,
    fallback?: T,
  ): Promise<{ data: T | null; error: Error | null }> => {
    try {
      const data = await operation();
      return { data, error: null };
    } catch (error) {
      console.error("Safe async operation failed:", error);
      return {
        data: fallback || null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  },

  /**
   * Retry operation with exponential backoff
   */
  retry: async <T>(
    operation: () => Promise<T>,
    maxAttempts = 3,
    baseDelay = 1000,
  ): Promise<T> => {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        if (attempt === maxAttempts) {
          throw lastError;
        }

        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  },

  /**
   * Create error logger with context
   */
  createLogger: (context: string) => ({
    info: (message: string, data?: any) => {
      console.log(`[${context}] ${message}`, data || "");
    },
    warn: (message: string, data?: any) => {
      console.warn(`[${context}] ${message}`, data || "");
    },
    error: (message: string, error?: any) => {
      console.error(`[${context}] ${message}`, error || "");
    },
  }),
};

// ============================================================================
// BETTING SPECIFIC UTILITIES
// ============================================================================

export const betting = {
  /**
   * Calculate potential payout from odds and stake
   */
  calculatePayout: (
    odds: number,
    stake: number,
    format: "american" | "decimal" = "decimal",
  ): number => {
    if (format === "american") {
      if (odds > 0) {
        return stake * (odds / 100);
      } else {
        return stake / (Math.abs(odds) / 100);
      }
    }
    return stake * odds;
  },

  /**
   * Convert between odds formats
   */
  convertOdds: {
    decimalToAmerican: (decimal: number): number => {
      if (decimal >= 2) {
        return Math.round((decimal - 1) * 100);
      }
      return Math.round(-100 / (decimal - 1));
    },

    americanToDecimal: (american: number): number => {
      if (american > 0) {
        return american / 100 + 1;
      }
      return 100 / Math.abs(american) + 1;
    },
  },

  /**
   * Calculate Kelly Criterion for optimal bet sizing
   */
  kellyCriterion: (probability: number, odds: number): number => {
    const q = 1 - probability;
    const b = odds - 1;
    return (probability * b - q) / b;
  },

  /**
   * Calculate expected value of a bet
   */
  expectedValue: (probability: number, odds: number, stake: number): number => {
    const winAmount = betting.calculatePayout(odds, stake) - stake;
    const loseAmount = -stake;
    return probability * winAmount + (1 - probability) * loseAmount;
  },
};

// ============================================================================
// ANALYTICS UTILITIES
// ============================================================================

export const analytics = {
  /**
   * Calculate moving average
   */
  movingAverage: (data: number[], window: number): number[] => {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      const start = Math.max(0, i - window + 1);
      const values = data.slice(start, i + 1);
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      result.push(average);
    }
    return result;
  },

  /**
   * Calculate standard deviation
   */
  standardDeviation: (data: number[]): number => {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const squaredDiffs = data.map((val) => Math.pow(val - mean, 2));
    const avgSquaredDiff =
      squaredDiffs.reduce((sum, val) => sum + val, 0) / data.length;
    return Math.sqrt(avgSquaredDiff);
  },

  /**
   * Calculate correlation coefficient
   */
  correlation: (x: number[], y: number[]): number => {
    const n = Math.min(x.length, y.length);
    const sumX = x.slice(0, n).reduce((sum, val) => sum + val, 0);
    const sumY = y.slice(0, n).reduce((sum, val) => sum + val, 0);
    const sumXY = x.slice(0, n).reduce((sum, val, i) => sum + val * y[i], 0);
    const sumXX = x.slice(0, n).reduce((sum, val) => sum + val * val, 0);
    const sumYY = y.slice(0, n).reduce((sum, val) => sum + val * val, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt(
      (n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY),
    );

    return denominator === 0 ? 0 : numerator / denominator;
  },
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  formatters,
  validators,
  collections,
  performance,
  UniversalCache,
  errorHandling,
  betting,
  analytics,
};

// Individual exports for tree shaking
export {
  formatters,
  validators,
  collections,
  performance,
  errorHandling,
  betting,
  analytics,
};
