/**
 * Shared type definitions used across multiple modules.
 * This file contains types that are used by multiple modules but not core to the application.
 */
import type { ModelPerformance, ShapExplanation } from './core.js';
export interface TimestampedData {
    timestamp: number;
    value: number;
    metadata?: Record<string, unknown>;
}
export interface MarketState {
    line: number;
    volume: number;
    movement: 'up' | 'down' | 'stable';
    volatility: number;
    liquidity: number;
}
export interface PredictionFactor {
    name: string;
    weight: number;
    impact: number;
    source: string;
    confidence: number;
}
export interface ModelWeight {
    modelId: string;
    weight: number;
    lastUpdate: number;
    performance: ModelPerformance;
}
export interface ModelEnsemble {
    id: string;
    name: string;
    weight: number;
    type: 'time_series' | 'market_analysis' | 'performance_analysis';
    context: {
        conditions: Record<string, unknown>;
        performance: ModelPerformance;
    };
}
export interface ModelExplanation {
    modelId: string;
    prediction: number;
    confidence: number;
    factors: Array<{
        name: string;
        weight: number;
        impact: number;
        source: string;
        confidence: number;
    }>;
    shapValues: ShapExplanation[];
}
export interface FeatureImpact {
    feature: string;
    value: number;
    importance: number;
    metadata?: Record<string, unknown>;
}
export interface AdvancedPrediction {
    predictionId: string;
    propId: string;
    predictedValue: number;
    confidence: number;
    timestamp: number;
    factors: PredictionFactor[];
    uncertaintyBounds: {
        lower: number;
        upper: number;
    };
    metadata: {
        processingTime: number;
        dataFreshness: number;
        signalQuality: number;
        modelVersion: string;
    };
    shapValues: ShapExplanation[];
    ensembleWeights: Record<string, number>;
    expectedValue: number;
    riskAdjustedScore: number;
    lineMovements: Array<{
        timestamp: number;
        newValue: number;
        velocity: number;
    }>;
    context: {
        temporal: Record<string, unknown>;
        opponent: Record<string, unknown>;
        momentum: Record<string, unknown>;
        market: Record<string, unknown>;
    };
}
export type { ModelPerformance, RiskProfile, ShapExplanation } from './core';
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResult<T> = Promise<T>;
export type Result<T, E = Error> = {
    success: true;
    data: T;
} | {
    success: false;
    error: E;
};
export interface BaseEntity {
    id: string;
    createdAt: number;
    updatedAt: number;
    metadata?: Record<string, unknown>;
}
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}
export interface TimeRange {
    start: number;
    end: number;
}
export interface FilterCriteria {
    field: string;
    operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith';
    value: any;
}
export interface SortCriteria {
    field: string;
    order: 'asc' | 'desc';
}
export interface QueryOptions {
    filters?: FilterCriteria[];
    sort?: SortCriteria[];
    pagination?: PaginationParams;
    include?: string[];
    select?: string[];
}
export declare enum ErrorCategory {
    SYSTEM = "SYSTEM",
    NETWORK = "NETWORK",
    VALIDATION = "VALIDATION",
    AUTHENTICATION = "AUTHENTICATION",
    AUTHORIZATION = "AUTHORIZATION",
    BUSINESS = "BUSINESS",
    UNKNOWN = "UNKNOWN"
}
export declare enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL"
}
export declare enum CacheStrategy {
    LRU = "LRU",
    FIFO = "FIFO",
    LFU = "LFU"
}
export declare const DEFAULT_PAGE_SIZE = 20;
export declare const MAX_PAGE_SIZE = 100;
export declare const DEFAULT_CACHE_TTL = 3600;
export declare const DEFAULT_RETRY_ATTEMPTS = 3;
export declare const DEFAULT_RETRY_DELAY = 1000;
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type NonNullableFields<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
export type RequiredFields<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type AsyncFunction<T, R> = (arg: T) => Promise<R>;
export type SyncFunction<T, R> = (arg: T) => R;
export type ErrorHandler = (error: Error) => void;
export type SuccessHandler<T> = (result: T) => void;
export type ProgressHandler = (progress: number) => void;
