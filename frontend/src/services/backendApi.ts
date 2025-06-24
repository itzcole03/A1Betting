/**
 * Unified Backend API Service
 * Handles all communication with the A1Betting backend
 */

import axios, { AxiosInstance, AxiosResponse } from "axios";

// Types
export interface BettingOpportunity {
  id: string;
  sport: string;
  event: string;
  market: string;
  odds: number;
  probability: number;
  expected_value: number;
  kelly_fraction: number;
  confidence: number;
  risk_level: string;
  recommendation: string;
}

export interface ArbitrageOpportunity {
  id: string;
  sport: string;
  event: string;
  bookmaker_a: string;
  bookmaker_b: string;
  odds_a: number;
  odds_b: number;
  profit_margin: number;
  required_stake: number;
}

export interface Transaction {
  id: string;
  type: "bet" | "win" | "loss" | "deposit" | "withdrawal";
  amount: number;
  description: string;
  timestamp: string;
  status: "pending" | "completed" | "failed";
}

export interface ActiveBet {
  id: string;
  event: string;
  market: string;
  selection: string;
  odds: number;
  stake: number;
  potential_return: number;
  status: "active" | "settled" | "cancelled";
  placed_at: string;
}

export interface RiskProfile {
  id: string;
  name: string;
  description: string;
  max_bet_percentage: number;
  kelly_multiplier: number;
  min_confidence: number;
}

export interface Prediction {
  id: string;
  sport: string;
  event: string;
  prediction: string;
  confidence: number;
  odds: number;
  expected_value: number;
  timestamp: string;
  model_version: string;
  features?: Record<string, number>;
}

export interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
  uptime: number;
  services: Record<string, string>;
}

export interface ModelPerformance {
  overall_accuracy: number;
  recent_accuracy: number;
  model_metrics: {
    precision: number;
    recall: number;
    f1_score: number;
    auc_roc: number;
  };
  performance_by_sport: Record<string, { accuracy: number; games: number }>;
}

export interface AdvancedAnalytics {
  roi_analysis: {
    overall_roi: number;
    monthly_roi: number;
    win_rate: number;
  };
  bankroll_metrics: {
    current_balance: number;
    total_wagered: number;
    profit_loss: number;
    max_drawdown: number;
  };
  performance_trends: Array<{
    date: string;
    cumulative_profit: number;
  }>;
}

class BackendApiService {
  private api: AxiosInstance;
  private wsConnection: WebSocket | null = null;
  private wsCallbacks: Map<string, Function[]> = new Map();

  constructor() {
    // In development, connect directly to the backend
    // In production, this will be set via environment variables
    const isDevelopment = import.meta.env.DEV;
    const baseURL =
      import.meta.env.VITE_API_URL ||
      (isDevelopment ? "http://localhost:8000" : "");

    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor for debugging
    this.api.interceptors.request.use((config) => {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("[API Error]:", {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        return Promise.reject(error);
      },
    );

    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    // In development, connect directly to backend WebSocket
    const isDevelopment = import.meta.env.DEV;
    const wsUrl =
      import.meta.env.VITE_WEBSOCKET_URL ||
      (isDevelopment
        ? "ws://localhost:8000"
        : `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/ws`);

    try {
      this.wsConnection = new WebSocket(wsUrl);

      this.wsConnection.onopen = () => {
        console.log("[WebSocket] Connected to backend");
        this.triggerCallbacks("connection", { status: "connected" });
      };

      this.wsConnection.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.triggerCallbacks(data.type, data.data);
        } catch (error) {
          console.error("[WebSocket] Failed to parse message:", error);
        }
      };

      this.wsConnection.onclose = () => {
        console.log("[WebSocket] Connection closed");
        this.triggerCallbacks("disconnection", { status: "disconnected" });

        // Reconnect after 5 seconds
        setTimeout(() => this.initializeWebSocket(), 5000);
      };

      this.wsConnection.onerror = (error) => {
        console.error("[WebSocket] Error:", error);
      };
    } catch (error) {
      console.error("[WebSocket] Failed to initialize:", error);
    }
  }

  private triggerCallbacks(event: string, data: any) {
    const callbacks = this.wsCallbacks.get(event) || [];
    callbacks.forEach((callback) => callback(data));
  }

  // WebSocket event subscription
  public onWebSocketEvent(event: string, callback: Function) {
    if (!this.wsCallbacks.has(event)) {
      this.wsCallbacks.set(event, []);
    }
    this.wsCallbacks.get(event)!.push(callback);
  }

  // API Methods
  public async getHealth(): Promise<HealthStatus> {
    const response = await this.api.get("/health");
    return response.data;
  }

  public async getBettingOpportunities(
    sport?: string,
    limit?: number,
  ): Promise<BettingOpportunity[]> {
    const params: any = {};
    if (sport) params.sport = sport;
    if (limit) params.limit = limit;

    const response = await this.api.get("/api/betting-opportunities", {
      params,
    });
    return response.data;
  }

  public async getArbitrageOpportunities(
    limit?: number,
  ): Promise<ArbitrageOpportunity[]> {
    const params: any = {};
    if (limit) params.limit = limit;

    const response = await this.api.get("/api/arbitrage-opportunities", {
      params,
    });
    return response.data;
  }

  public async getValueBets(): Promise<BettingOpportunity[]> {
    // Map to existing betting opportunities endpoint since value bets endpoint doesn't exist
    try {
      const response = await this.api.get("/api/betting-opportunities", {
        params: { limit: 20 },
      });
      return response.data;
    } catch (error) {
      console.warn("[API] getValueBets endpoint not available, using fallback");
      return [];
    }
  }

  public async getTransactions(): Promise<{
    transactions: Transaction[];
    total_count: number;
  }> {
    const response = await this.api.get("/api/transactions");
    return response.data;
  }

  public async getActiveBets(): Promise<{
    active_bets: ActiveBet[];
    total_count: number;
  }> {
    const response = await this.api.get("/api/active-bets");
    return response.data;
  }

  public async getRiskProfiles(): Promise<{ profiles: RiskProfile[] }> {
    const response = await this.api.get("/api/risk-profiles");
    return response.data;
  }

  public async getPredictions(
    sport?: string,
    limit?: number,
  ): Promise<{ predictions: Prediction[]; total_count: number }> {
    const params: any = {};
    if (sport) params.sport = sport;
    if (limit) params.limit = limit;

    const response = await this.api.get("/api/predictions", { params });
    return response.data;
  }

  public async getUltraAccuracyPredictions(): Promise<any> {
    const response = await this.api.get("/api/ultra-accuracy/predictions");
    return response.data;
  }

  public async getModelPerformance(): Promise<ModelPerformance> {
    const response = await this.api.get(
      "/api/ultra-accuracy/model-performance",
    );
    return response.data;
  }

  public async getAdvancedAnalytics(): Promise<AdvancedAnalytics> {
    const response = await this.api.get("/api/analytics/advanced");
    return response.data;
  }

  // Generic GET method for custom endpoints
  public async get<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<T> {
    const response = await this.api.get(endpoint, { params });
    return response.data;
  }

  // Generic POST method
  public async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  // Generic PUT method
  public async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  // Generic DELETE method
  public async delete<T>(endpoint: string): Promise<T> {
    const response = await this.api.delete(endpoint);
    return response.data;
  }
}

// Create singleton instance
export const backendApi = new BackendApiService();

// Export default
export default backendApi;
