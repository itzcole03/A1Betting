/**
 * Represents the structure of data coming from a "Poe-like" source,
 * which might be an internal aggregation or a specific external API
 * that mirrors some of Poe App Creator's data structures.
 */
export interface PoeDataContext {
    userId?: string;
    sessionId?: string;
    appVersion?: string;
}
export interface PoeDataBlock {
    id: string;
    type: string;
    title?: string;
    content: unknown;
    metadata?: Record<string, unknown>;
    style?: Record<string, unknown>;
}
export interface PoeApiResponse {
    requestId: string;
    timestamp: string;
    dataBlocks: PoeDataBlock[];
    nextPageToken?: string;
    errors?: Array<{
        code: string;
        message: string;
    }>;
}
export interface PoePropCardContent {
    playerId: string;
    playerName: string;
    playerImage?: string;
    statType: string;
    line: number;
    overOdds?: number;
    underOdds?: number;
    winProbability?: number;
    sentimentScore?: number;
    newsSnippets?: Array<{
        source: string;
        headline: string;
        url: string;
    }>;
    lastUpdated: string;
}
export interface PoeNewsFeedContent {
    articles: Array<{
        id: string;
        title: string;
        source: string;
        snippet: string;
        url: string;
        imageUrl?: string;
        publishedAt: string;
    }>;
}
export interface PoeUserStatContent {
    statName: string;
    value: string | number;
    trend?: 'up' | 'down' | 'neutral';
    period?: string;
}
export type { PlayerProp, Opportunity, OddsUpdate } from './core.js';
export type { Sport, PropType } from './common.js';
