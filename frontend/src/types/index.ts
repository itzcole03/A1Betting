/**
 * Represents the structure of data coming from a "Poe-like" source,
 * which might be an internal aggregation or a specific external API
 * that mirrors some of Poe App Creator's data structures.
 */

export interface PoeDataContext {
  // Contextual information about the data, e.g., user session, app state
  userId?: string;
  sessionId?: string;
  appVersion?: string;
}

export interface PoeDataBlock {
  id: string; // Unique identifier for the data block
  type: string; // Type of content, e.g., 'prop_card', 'news_feed', 'user_stat'
  title?: string;
  content: unknown; // The actual data payload, structure varies by type
  metadata?: Record<string, unknown>; // Additional metadata, e.g., source, timestamp, relevance score
  style?: Record<string, unknown>; // Styling hints if Poe source provides them
}

export interface PoeApiResponse {
  requestId: string;
  timestamp: string;
  dataBlocks: PoeDataBlock[];
  nextPageToken?: string; // For pagination
  errors?: Array<{ code: string; message: string }>;
}

// Example specific PoeDataBlock content types

export interface PoePropCardContent {
  playerId: string;
  playerName: string;
  playerImage?: string;
  statType: string;
  line: number;
  overOdds?: number;
  underOdds?: number;
  winProbability?: number; // AI-generated win probability
  sentimentScore?: number; // Social sentiment
  newsSnippets?: Array<{ source: string; headline: string; url: string }>;
  lastUpdated: string;
}

export interface UserStats {
  totalBets: number;
  winRate: number;
  totalWinnings: number;
  avgOdds: number;
  bestStreak: number;
  currentStreak: number;
  totalVolume: number;
  roi: number;
}

export interface PerformanceData {
  date: string;
  winRate: number;
  profit: number;
  volume: number;
  betsPlaced: number;
}

export interface Headline {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  sentiment?: "positive" | "negative" | "neutral";
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  duration?: number;
  timestamp: number;
}

export interface BettingState {
  activeBets: any[];
  placeBet: (bet: any) => void;
  updateActiveBet: (betId: string, updates: any) => void;
  clearOpportunities: () => void;
  opportunities: any[];
}

export interface MLState {
  models: any[];
  predictions: any[];
  metrics: any;
  isLoading: boolean;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
}

export interface DriftAlert {
  id: string;
  modelId: string;
  type: "data" | "concept" | "prediction";
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: number;
}

export interface RootState {
  betting: BettingState;
  ml: MLState;
  ui: any;
  websocket: any;
}

export interface PoeNewsFeedContent {
  articles: Array<{
    id: string;
    title: string;
    source: string; // e.g., 'ESPN', 'Twitter'
    snippet: string;
    url: string;
    imageUrl?: string;
    publishedAt: string;
  }>;
}

export interface PoeUserStatContent {
  statName: string; // e.g., 'Win Rate', 'Total Profit', 'ROI'
  value: string | number;
  trend?: "up" | "down" | "neutral";
  period?: string; // e.g., 'Last 7 Days'
}

// This file would be expanded based on the exact nature of the "Poe" data source
// and how it's used by the poeToApiAdapter.ts

// --- Unified Betting Types Re-exports ---
export type { PlayerProp, Opportunity, OddsUpdate } from "./core.js";
export type { Sport, PropType } from "./common.js";
// If you need the OddsUpdate from webSocket.ts instead, add:
// export type { OddsUpdate as WebSocketOddsUpdate } from './webSocket';
