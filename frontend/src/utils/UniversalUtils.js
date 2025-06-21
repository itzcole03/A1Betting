// ============================================================================
// UNIVERSAL UTILITIES SYSTEM
// Consolidates 150+ utility functions into organized, reusable modules
// ============================================================================
// ============================================================================
// FORMATTING UTILITIES
// ============================================================================
export const formatters = {
    /**
     * Format currency values
     */
    currency: (value, options = {}) => {
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
    percentage: (value, decimals = 1) => {
        return `${value.toFixed(decimals)}%`;
    },
    /**
     * Format large numbers with suffixes (K, M, B)
     */
    compactNumber: (value) => {
        if (value >= 1e9)
            return `${(value / 1e9).toFixed(1)}B`;
        if (value >= 1e6)
            return `${(value / 1e6).toFixed(1)}M`;
        if (value >= 1e3)
            return `${(value / 1e3).toFixed(1)}K`;
        return value.toString();
    },
    /**
     * Format odds to American format
     */
    odds: (decimal) => {
        if (decimal >= 2) {
            return `+${Math.round((decimal - 1) * 100)}`;
        }
        return `-${Math.round(100 / (decimal - 1))}`;
    },
    /**
     * Format date/time
     */
    date: (date, format = "short") => {
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
    confidence: (value) => {
        if (value >= 0.9)
            return "Very High";
        if (value >= 0.7)
            return "High";
        if (value >= 0.5)
            return "Medium";
        if (value >= 0.3)
            return "Low";
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
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    /**
     * Password strength validation
     */
    password: (password) => {
        const issues = [];
        let strength = "Weak";
        if (password.length < 8)
            issues.push("At least 8 characters required");
        if (!/[A-Z]/.test(password))
            issues.push("At least one uppercase letter required");
        if (!/[a-z]/.test(password))
            issues.push("At least one lowercase letter required");
        if (!/\d/.test(password))
            issues.push("At least one number required");
        if (!/[!@#$%^&*]/.test(password))
            issues.push("At least one special character required");
        if (issues.length === 0)
            strength = "Strong";
        else if (issues.length <= 2)
            strength = "Medium";
        return {
            isValid: issues.length === 0,
            strength,
            issues,
        };
    },
    /**
     * Betting amount validation
     */
    betAmount: (amount, balance, minBet = 1, maxBet) => {
        if (amount < minBet)
            return false;
        if (amount > balance)
            return false;
        if (maxBet && amount > maxBet)
            return false;
        return true;
    },
    /**
     * Form validation with rules
     */
    validateField: (value, rules) => {
        const errors = [];
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
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const groupKey = String(item[key]);
            groups[groupKey] = groups[groupKey] || [];
            groups[groupKey].push(item);
            return groups;
        }, {});
    },
    /**
     * Sort array of objects by multiple criteria
     */
    sortBy: (array, ...keys) => {
        return [...array].sort((a, b) => {
            for (const key of keys) {
                const aVal = a[key];
                const bVal = b[key];
                if (aVal < bVal)
                    return -1;
                if (aVal > bVal)
                    return 1;
            }
            return 0;
        });
    },
    /**
     * Get unique items from array
     */
    unique: (array, key) => {
        if (key) {
            const seen = new Set();
            return array.filter((item) => {
                const value = item[key];
                if (seen.has(value))
                    return false;
                seen.add(value);
                return true;
            });
        }
        return [...new Set(array)];
    },
    /**
     * Chunk array into smaller arrays
     */
    chunk: (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    /**
     * Deep clone object
     */
    deepClone: (obj) => {
        if (obj === null || typeof obj !== "object")
            return obj;
        if (obj instanceof Date)
            return new Date(obj.getTime());
        if (obj instanceof Array)
            return obj.map((item) => collections.deepClone(item));
        const clonedObj = {};
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
    deepMerge: (target, source) => {
        const result = { ...target };
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === "object" &&
                    source[key] !== null &&
                    !Array.isArray(source[key]) &&
                    typeof target[key] === "object" &&
                    target[key] !== null &&
                    !Array.isArray(target[key])) {
                    result[key] = collections.deepMerge(target[key], source[key]);
                }
                else {
                    result[key] = source[key];
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
    debounce: (func, delay, options = {}) => {
        let timeoutId;
        let lastCallTime;
        const { leading = false, trailing = true } = options;
        return (...args) => {
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
                timeoutId = undefined;
            }, delay);
            lastCallTime = now;
        };
    },
    /**
     * Throttle function calls
     */
    throttle: (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastExecTime > delay) {
                func(...args);
                lastExecTime = now;
            }
            else if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    func(...args);
                    lastExecTime = Date.now();
                    timeoutId = null;
                }, delay - (now - lastExecTime));
            }
        };
    },
    /**
     * Memoize expensive function calls
     */
    memoize: (func, getKey) => {
        const cache = new Map();
        return ((...args) => {
            const key = getKey ? getKey(...args) : JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = func(...args);
            cache.set(key, result);
            return result;
        });
    },
    /**
     * Measure function execution time
     */
    measureTime: async (func) => {
        const start = performance.now();
        const result = await func();
        const time = performance.now() - start;
        return { result, time };
    },
};
// ============================================================================
// CACHING UTILITIES
// ============================================================================
export class UniversalCache {
    constructor(options = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize || 1000;
        this.defaultTTL = options.ttl || 300000; // 5 minutes default
    }
    set(key, value, ttl) {
        // Remove oldest entries if cache is full
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        const expiry = Date.now() + (ttl || this.defaultTTL);
        this.cache.set(key, { value, expiry });
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return null;
        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    has(key) {
        return this.get(key) !== null;
    }
    delete(key) {
        return this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    size() {
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
    safeAsync: async (operation, fallback) => {
        try {
            const data = await operation();
            return { data, error: null };
        }
        catch (error) {
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
    retry: async (operation, maxAttempts = 3, baseDelay = 1000) => {
        let lastError;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                if (attempt === maxAttempts) {
                    throw lastError;
                }
                const delay = baseDelay * Math.pow(2, attempt - 1);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
        throw lastError;
    },
    /**
     * Create error logger with context
     */
    createLogger: (context) => ({
        info: (message, data) => {
            console.log(`[${context}] ${message}`, data || "");
        },
        warn: (message, data) => {
            console.warn(`[${context}] ${message}`, data || "");
        },
        error: (message, error) => {
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
    calculatePayout: (odds, stake, format = "decimal") => {
        if (format === "american") {
            if (odds > 0) {
                return stake * (odds / 100);
            }
            else {
                return stake / (Math.abs(odds) / 100);
            }
        }
        return stake * odds;
    },
    /**
     * Convert between odds formats
     */
    convertOdds: {
        decimalToAmerican: (decimal) => {
            if (decimal >= 2) {
                return Math.round((decimal - 1) * 100);
            }
            return Math.round(-100 / (decimal - 1));
        },
        americanToDecimal: (american) => {
            if (american > 0) {
                return american / 100 + 1;
            }
            return 100 / Math.abs(american) + 1;
        },
    },
    /**
     * Calculate Kelly Criterion for optimal bet sizing
     */
    kellyCriterion: (probability, odds) => {
        const q = 1 - probability;
        const b = odds - 1;
        return (probability * b - q) / b;
    },
    /**
     * Calculate expected value of a bet
     */
    expectedValue: (probability, odds, stake) => {
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
    movingAverage: (data, window) => {
        const result = [];
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
    standardDeviation: (data) => {
        const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
        const squaredDiffs = data.map((val) => Math.pow(val - mean, 2));
        const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / data.length;
        return Math.sqrt(avgSquaredDiff);
    },
    /**
     * Calculate correlation coefficient
     */
    correlation: (x, y) => {
        const n = Math.min(x.length, y.length);
        const sumX = x.slice(0, n).reduce((sum, val) => sum + val, 0);
        const sumY = y.slice(0, n).reduce((sum, val) => sum + val, 0);
        const sumXY = x.slice(0, n).reduce((sum, val, i) => sum + val * y[i], 0);
        const sumXX = x.slice(0, n).reduce((sum, val) => sum + val * val, 0);
        const sumYY = y.slice(0, n).reduce((sum, val) => sum + val * val, 0);
        const numerator = n * sumXY - sumX * sumY;
        const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
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
