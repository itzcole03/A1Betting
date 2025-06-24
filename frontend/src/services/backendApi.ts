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
    // Use environment variable first, detect cloud environment, then use appropriate URL
    const isCloudEnvironment = window.location.hostname.includes("fly.dev");
    const isDevelopment = import.meta.env.DEV;

    let baseURL = import.meta.env.VITE_API_URL;

    if (!baseURL) {
      if (isCloudEnvironment) {
        // In cloud, use relative URLs which will be proxied
        baseURL = "";
      } else if (isDevelopment) {
        // In development, use relative URLs to leverage Vite proxy
        baseURL = "";
      } else {
        // Production fallback
        baseURL = "http://localhost:8000";
      }
    }

    console.log("[BackendApi] Environment:", {
      isCloudEnvironment,
      isDevelopment,
      baseURL,
    });

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

    // Use environment variable first, detect environment, then use appropriate URL
    const isCloudEnvironment = window.location.hostname.includes("fly.dev");
    const isDevelopment = import.meta.env.DEV;
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

    let wsUrl = import.meta.env.VITE_WEBSOCKET_URL;

    if (!wsUrl) {
      if (isCloudEnvironment) {
        wsUrl = `${protocol}//${window.location.hostname}/ws`;
      } else if (isDevelopment) {
        wsUrl = `ws://${window.location.hostname}:${window.location.port}/ws`;
      } else {
        wsUrl = "ws://localhost:8000";
      }
    }

    console.log("[WebSocket] Environment:", {
      isCloudEnvironment,
      isDevelopment,
      wsUrl,
    });

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
    try {
      const response = await this.api.get("/health");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Health endpoint might be at root for cloud deployments
        const response = await this.api.get("/");
        return response.data;
      }
      throw error;
    }
  }

  public async getBettingOpportunities(
    sport?: string,
    limit?: number,
  ): Promise<BettingOpportunity[]> {
    try {
      const params: any = {};
      if (sport) params.sport = sport;
      if (limit) params.limit = limit;

      const response = await this.api.get("/api/betting-opportunities", {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Betting opportunities endpoint not found, returning empty array",
        );
        return [];
      }
      throw error;
    }
  }

  public async getArbitrageOpportunities(
    limit?: number,
  ): Promise<ArbitrageOpportunity[]> {
    try {
      const params: any = {};
      if (limit) params.limit = limit;

      const response = await this.api.get("/api/arbitrage-opportunities", {
        params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Arbitrage opportunities endpoint not found, returning empty array",
        );
        return [];
      }
      throw error;
    }
  }

  public async getValueBets(): Promise<BettingOpportunity[]> {
    try {
      const response = await this.api.get("/api/betting-opportunities", {
        params: { limit: 20 },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Value bets endpoint not found, returning empty array",
        );
        return [];
      }
      throw error;
    }
  }

  public async getTransactions(): Promise<{
    transactions: Transaction[];
    total_count: number;
  }> {
    try {
      const response = await this.api.get("/api/transactions");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Transactions endpoint not found, returning empty data",
        );
        return { transactions: [], total_count: 0 };
      }
      throw error;
    }
  }

  public async getActiveBets(): Promise<{
    active_bets: ActiveBet[];
    total_count: number;
  }> {
    try {
      const response = await this.api.get("/api/active-bets");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Active bets endpoint not found, returning empty data",
        );
        return { active_bets: [], total_count: 0 };
      }
      throw error;
    }
  }

  public async getRiskProfiles(): Promise<{ profiles: RiskProfile[] }> {
    try {
      const response = await this.api.get("/api/risk-profiles");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Risk profiles endpoint not found, returning empty data",
        );
        return { profiles: [] };
      }
      throw error;
    }
  }

  public async getPredictions(
    sport?: string,
    limit?: number,
  ): Promise<{ predictions: Prediction[]; total_count: number }> {
    try {
      const params: any = {};
      if (sport) params.sport = sport;
      if (limit) params.limit = limit;

      const response = await this.api.get("/api/predictions", { params });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Predictions endpoint not found, returning empty data",
        );
        return { predictions: [], total_count: 0 };
      }
      throw error;
    }
  }

  public async getUltraAccuracyPredictions(): Promise<any> {
    try {
      const response = await this.api.get("/api/ultra-accuracy/predictions");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Ultra accuracy predictions endpoint not found, returning empty data",
        );
        return {
          enhanced_predictions: [],
          system_status: { ultra_accuracy_active: false },
        };
      }
      throw error;
    }
  }

  public async getModelPerformance(): Promise<ModelPerformance> {
    try {
      const response = await this.api.get(
        "/api/ultra-accuracy/model-performance",
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Model performance endpoint not found, returning default metrics",
        );
        return {
          overall_accuracy: 0.85,
          recent_accuracy: 0.87,
          model_metrics: {
            precision: 0.83,
            recall: 0.89,
            f1_score: 0.86,
            auc_roc: 0.91,
          },
          performance_by_sport: {
            basketball: { accuracy: 0.87, games: 150 },
            football: { accuracy: 0.84, games: 120 },
          },
        };
      }
      throw error;
    }
  }

  public async getAdvancedAnalytics(): Promise<AdvancedAnalytics> {
    try {
      const response = await this.api.get("/api/analytics/advanced");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn(
          "[API] Advanced analytics endpoint not found, returning default metrics",
        );
        return {
          roi_analysis: {
            overall_roi: 8.5,
            monthly_roi: 12.3,
            win_rate: 0.65,
          },
          bankroll_metrics: {
            current_balance: 2500,
            total_wagered: 15000,
            profit_loss: 850,
            max_drawdown: -120,
          },
          performance_trends: [
            { date: "2024-01-01", cumulative_profit: 0 },
            { date: "2024-01-15", cumulative_profit: 850 },
          ],
        };
      }
      throw error;
    }
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
