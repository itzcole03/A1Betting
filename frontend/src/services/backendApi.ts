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
    // Use environment variable first, then fallback to localhost for development
    const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

    console.log("[BackendApi] Connecting to backend:", baseURL);

    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    // Request interceptor for debugging
    this.api.interceptors.request.use(
      (config) => {
        const debugInfo = `[API Request] ${(config.method || "unknown").toUpperCase()} ${baseURL}${config.url}`;
        if (import.meta.env.DEV) {
          console.log(debugInfo);
        }
        return config;
      },
      (error) => {
        console.error("[API Request Error]:", error.message || error);
        return Promise.reject(error);
      },
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Create a more detailed error object with proper serialization
        const errorDetails = {
          url: error.config?.url || "unknown",
          method: (error.config?.method || "unknown").toUpperCase(),
          status: error.response?.status || "no status",
          statusText: error.response?.statusText || "unknown",
          message: error.message || "no message",
          responseData: error.response?.data || "no response data",
          timeout: error.code === "ECONNABORTED" ? "Request timeout" : null,
          network: !error.response
            ? "Network error - backend may be offline"
            : null,
        };

        if (error.response?.status === 404) {
          console.warn(
            `[API] 404 Not Found: ${errorDetails.method} ${errorDetails.url}`,
          );
        } else if (!error.response) {
          console.error(
            `[API] Network Error: ${errorDetails.method} ${errorDetails.url} - ${errorDetails.network}`,
          );
        } else {
          console.error(
            `[API] ${errorDetails.status} Error: ${errorDetails.method} ${errorDetails.url}`,
            {
              status: errorDetails.status,
              statusText: errorDetails.statusText,
              message: errorDetails.message,
              responseData: errorDetails.responseData,
            },
          );
        }

        return Promise.reject(error);
      },
    );

    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    // Skip WebSocket in production deployments where it may not be available
    if (typeof window === "undefined") return;

    // Use environment variable first, then fallback to local network IP
    const wsUrl =
      import.meta.env.VITE_WEBSOCKET_URL || "ws://192.168.1.125:8000";

    console.log("[WebSocket] Connecting to:", wsUrl);

    try {
      // Always try to connect to WebSocket when we have a specific URL
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

        // Only attempt reconnection in development or if not on a deployment platform
        const isDevelopment = import.meta.env.DEV;
        const isDeployment =
          window.location.hostname.includes("fly.dev") ||
          window.location.hostname.includes("herokuapp.com");

        if (isDevelopment && !isDeployment) {
          setTimeout(() => this.initializeWebSocket(), 5000);
        }
      };

      this.wsConnection.onerror = (error) => {
        console.error(
          "[WebSocket] Connection error. WebSocket may not be available in production deployment.",
        );
        // Don't log the full error object as it's not serializable
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
    const response = await this.api.get("/api/betting-opportunities", {
      params: { limit: 20 },
    });
    return response.data;
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

  // Debug method to test connection and get backend status
  public async getConnectionStatus(): Promise<{
    isConnected: boolean;
    baseURL: string;
    error?: string;
    endpoints: { [key: string]: boolean };
  }> {
    const status = {
      isConnected: false,
      baseURL: this.api.defaults.baseURL || "not set",
      endpoints: {} as { [key: string]: boolean },
      error: undefined as string | undefined,
    };

    // Test basic health endpoint
    try {
      await this.getHealth();
      status.isConnected = true;
      status.endpoints["/health"] = true;
    } catch (error: any) {
      status.error = error.message || "Unknown connection error";
      status.endpoints["/health"] = false;
    }

    // Test other key endpoints
    const testEndpoints = [
      {
        name: "/api/betting-opportunities",
        fn: () => this.getBettingOpportunities(),
      },
      {
        name: "/api/arbitrage-opportunities",
        fn: () => this.getArbitrageOpportunities(),
      },
      {
        name: "/api/analytics/advanced",
        fn: () => this.getAdvancedAnalytics(),
      },
    ];

    for (const endpoint of testEndpoints) {
      try {
        await endpoint.fn();
        status.endpoints[endpoint.name] = true;
      } catch (error) {
        status.endpoints[endpoint.name] = false;
      }
    }

    return status;
  }
}

// Create singleton instance
export const backendApi = new BackendApiService();

// Export default
export default backendApi;
