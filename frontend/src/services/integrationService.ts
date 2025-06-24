/**
 * Comprehensive Integration Service
 * Provides unified backend integration for all frontend components
 */

import { backendApi } from "./backendApi";

// Re-export types for easier consumption
export * from "./backendApi";

// Enhanced service class that provides additional integration methods
export class IntegrationService {
  private static instance: IntegrationService;

  private constructor() {}

  public static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  // Health and Status Methods
  public async checkSystemHealth() {
    try {
      const health = await backendApi.getHealth();
      return {
        status: "online",
        data: health,
        error: null,
      };
    } catch (error: any) {
      return {
        status: "offline",
        data: null,
        error: error.message,
      };
    }
  }

  // User Profile Methods (mock for development)
  public async getUserProfile(userId: string) {
    // In development, return mock data that integrates with backend opportunities
    try {
      const opportunities = await backendApi.getBettingOpportunities();
      const analytics = await backendApi.getAdvancedAnalytics();

      return {
        id: userId,
        name: "Pro Bettor",
        email: "user@a1betting.com",
        tier: "Premium",
        balance: analytics.bankroll_metrics.current_balance,
        winRate: analytics.roi_analysis.win_rate,
        totalProfit: analytics.bankroll_metrics.profit_loss,
        settings: {
          notifications: true,
          autobet: false,
          riskLevel: "moderate",
        },
      };
    } catch (error) {
      // Fallback data
      return {
        id: userId,
        name: "User",
        email: "user@a1betting.com",
        tier: "Free",
        balance: 0,
        winRate: 0,
        totalProfit: 0,
        settings: {
          notifications: true,
          autobet: false,
          riskLevel: "moderate",
        },
      };
    }
  }

  // Analytics Methods
  public async getUserAnalytics(userId: string) {
    try {
      const analytics = await backendApi.getAdvancedAnalytics();
      const transactions = await backendApi.getTransactions();

      // Calculate daily data from transactions
      const daily: Record<string, number> = {};
      const today = new Date().toISOString().split("T")[0];

      transactions.transactions.forEach((tx) => {
        const date = tx.timestamp.split("T")[0];
        if (!daily[date]) daily[date] = 0;
        daily[date] += tx.amount;
      });

      return {
        current_balance: analytics.bankroll_metrics.current_balance,
        total_profit: analytics.bankroll_metrics.profit_loss,
        win_rate: analytics.roi_analysis.win_rate,
        roi: analytics.roi_analysis.overall_roi,
        daily,
        monthly_profit: analytics.roi_analysis.monthly_roi,
        total_wagered: analytics.bankroll_metrics.total_wagered,
        max_drawdown: analytics.bankroll_metrics.max_drawdown,
      };
    } catch (error) {
      return {
        current_balance: 0,
        total_profit: 0,
        win_rate: 0,
        roi: 0,
        daily: {},
        monthly_profit: 0,
        total_wagered: 0,
        max_drawdown: 0,
      };
    }
  }

  // Prediction Methods
  public async getAccuracyMetrics() {
    try {
      const performance = await backendApi.getModelPerformance();

      return {
        overall_accuracy: performance.overall_accuracy,
        recent_accuracy: performance.recent_accuracy,
        precision: performance.model_metrics.precision,
        recall: performance.model_metrics.recall,
        f1_score: performance.model_metrics.f1_score,
        auc_roc: performance.model_metrics.auc_roc,
        by_sport: performance.performance_by_sport,
      };
    } catch (error) {
      return {
        overall_accuracy: 0,
        recent_accuracy: 0,
        precision: 0,
        recall: 0,
        f1_score: 0,
        auc_roc: 0,
        by_sport: {},
      };
    }
  }

  public async getPredictions(
    options: { sport?: string; limit?: number } = {},
  ) {
    try {
      const predictions = await backendApi.getPredictions(
        options.sport,
        options.limit,
      );
      return predictions;
    } catch (error) {
      return {
        predictions: [],
        total_count: 0,
      };
    }
  }

  // Betting Methods
  public async getBettingOpportunities(sport?: string, limit: number = 10) {
    try {
      return await backendApi.getBettingOpportunities(sport, limit);
    } catch (error) {
      return [];
    }
  }

  public async getArbitrageOpportunities(limit: number = 5) {
    try {
      return await backendApi.getArbitrageOpportunities(limit);
    } catch (error) {
      return [];
    }
  }

  public async getActiveBets() {
    try {
      return await backendApi.getActiveBets();
    } catch (error) {
      return {
        active_bets: [],
        total_count: 0,
      };
    }
  }

  // Transaction Methods
  public async getTransactions() {
    try {
      return await backendApi.getTransactions();
    } catch (error) {
      return {
        transactions: [],
        total_count: 0,
      };
    }
  }

  // Risk Management Methods
  public async getRiskProfiles() {
    try {
      return await backendApi.getRiskProfiles();
    } catch (error) {
      return {
        profiles: [],
      };
    }
  }

  // System Status Methods
  public async getHealthStatus() {
    try {
      const health = await backendApi.getHealth();

      return {
        status: health.status === "healthy" ? "online" : "offline",
        services: health.services,
        uptime: health.uptime,
        version: health.version,
        metrics: {
          active_predictions: Object.keys(health.services).length,
          active_connections: 1, // Mock value
          api_calls_per_minute: 45, // Mock value
          average_response_time: 120, // Mock value
        },
      };
    } catch (error) {
      return {
        status: "offline",
        services: {},
        uptime: 0,
        version: "0.0.0",
        metrics: {
          active_predictions: 0,
          active_connections: 0,
          api_calls_per_minute: 0,
          average_response_time: 0,
        },
      };
    }
  }

  // WebSocket Methods
  public onRealtimeUpdate(callback: (data: any) => void) {
    backendApi.onWebSocketEvent("odds_update", callback);
    backendApi.onWebSocketEvent("prediction_update", callback);
    backendApi.onWebSocketEvent("bet_update", callback);
  }

  // Generic API access
  public get api() {
    return backendApi;
  }
}

// Create singleton instance
export const integrationService = IntegrationService.getInstance();

// Export for backward compatibility with existing API service usage
export const api = {
  getUserProfile: (userId: string) => integrationService.getUserProfile(userId),
  getUserAnalytics: (userId: string) =>
    integrationService.getUserAnalytics(userId),
  getHealthStatus: () => integrationService.getHealthStatus(),
  getAccuracyMetrics: () => integrationService.getAccuracyMetrics(),
  getPredictions: (options?: any) => integrationService.getPredictions(options),
  getBettingOpportunities: (sport?: string, limit?: number) =>
    integrationService.getBettingOpportunities(sport, limit),
  getArbitrageOpportunities: (limit?: number) =>
    integrationService.getArbitrageOpportunities(limit),
  getActiveBets: () => integrationService.getActiveBets(),
  getTransactions: () => integrationService.getTransactions(),
  getRiskProfiles: () => integrationService.getRiskProfiles(),

  // Generic methods
  get: (endpoint: string, params?: any) => backendApi.get(endpoint, params),
  post: (endpoint: string, data?: any) => backendApi.post(endpoint, data),
  put: (endpoint: string, data?: any) => backendApi.put(endpoint, data),
  delete: (endpoint: string) => backendApi.delete(endpoint),
};

export default integrationService;
