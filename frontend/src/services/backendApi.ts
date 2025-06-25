/**
 * Unified Backend API Service
 * Handles all communication with the A1Betting backend
 */

import axios, { AxiosInstance, AxiosResponse } from "axios";
import { cloudMockService } from "./cloudMockService";

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
  stake: number;
  potential_payout: number;
  status: "active" | "settled" | "voided";
  placed_at: string;
}

export interface RiskProfile {
  name: string;
  description: string;
  max_bet_percentage: number;
  max_exposure: number;
  risk_tolerance: number;
}

class BackendApi {
  private api: AxiosInstance;
  private baseURL: string;
  private useMockData: boolean = false;
  private isBackendAvailable: boolean = false;
  private isBackendAvailable: boolean = false;

  constructor() {
    // Determine the correct backend URL
    this.baseURL = this.determineBackendURL();

    // Check if we should use mock data immediately
    this.checkBackendAvailability();

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth headers if needed
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor with intelligent fallback
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If we get HTML instead of JSON, we're hitting the frontend server
        if (
          error.response?.data &&
          typeof error.response.data === "string" &&
          error.response.data.includes("<!doctype html>")
        ) {
          console.warn(
            "⚠️ Backend API not available - Frontend server returned HTML. Using mock data.",
          );
          this.useMockData = true;
        } else {
          console.warn(
            `API Error: ${error.message}. Falling back to mock data.`,
          );
        }

        // Enable mock data mode on any API failure
        this.useMockData = true;

        // Return mock data for common endpoints
        const endpoint = error.config?.url || "";

        if (endpoint.includes("health")) {
          return { data: await cloudMockService.getHealth() };
        }
        if (endpoint.includes("betting-opportunities")) {
          return { data: await cloudMockService.getBettingOpportunities() };
        }
        if (endpoint.includes("arbitrage-opportunities")) {
          return { data: await cloudMockService.getArbitrageOpportunities() };
        }
        if (endpoint.includes("predictions")) {
          return { data: await cloudMockService.getPredictions() };
        }
        if (endpoint.includes("analytics")) {
          return { data: await cloudMockService.getAdvancedAnalytics() };
        }
        if (endpoint.includes("value-bets")) {
          return { data: await cloudMockService.getValueBets() };
        }

        // For other endpoints, return empty/default data
        return { data: [] };
      },
    );
  }

  // Health check
  public async getHealth() {
    if (this.useMockData) {
      return await cloudMockService.getHealth();
    }

    try {
      const response = await this.api.get("/health");
      return response.data;
    } catch (error) {
      return await cloudMockService.getHealth();
    }
  }

  // Betting opportunities
  public async getBettingOpportunities(): Promise<BettingOpportunity[]> {
    if (this.useMockData) {
      return await cloudMockService.getBettingOpportunities();
    }

    try {
      const response = await this.api.get("/api/betting-opportunities");
      return Array.isArray(response.data)
        ? response.data
        : response.data?.opportunities || [];
    } catch (error) {
      console.warn("Failed to fetch betting opportunities, using mock data");
      return await cloudMockService.getBettingOpportunities();
    }
  }

  // Arbitrage opportunities
  public async getArbitrageOpportunities(): Promise<ArbitrageOpportunity[]> {
    if (this.useMockData) {
      return await cloudMockService.getArbitrageOpportunities();
    }

    try {
      const response = await this.api.get("/api/arbitrage-opportunities");
      return Array.isArray(response.data)
        ? response.data
        : response.data?.opportunities || [];
    } catch (error) {
      console.warn("Failed to fetch arbitrage opportunities, using mock data");
      return await cloudMockService.getArbitrageOpportunities();
    }
  }

  // Value bets - Fixed to handle 404 errors
  public async getValueBets() {
    if (this.useMockData) {
      return await cloudMockService.getValueBets();
    }

    try {
      const response = await this.api.get("/api/v4/betting/value-bets");
      return Array.isArray(response.data)
        ? response.data
        : response.data?.value_bets || [];
    } catch (error) {
      console.warn(
        "❌ getValueBets: " + error.message + " - Using fallback data",
      );
      return await cloudMockService.getValueBets();
    }
  }

  // Predictions
  public async getPredictions(params: any = {}) {
    if (this.useMockData) {
      return await cloudMockService.getPredictions();
    }

    try {
      const response = await this.api.get("/api/predictions", { params });
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch predictions, using mock data");
      return await cloudMockService.getPredictions();
    }
  }

  // Advanced analytics
  public async getAdvancedAnalytics() {
    if (this.useMockData) {
      return await cloudMockService.getAdvancedAnalytics();
    }

    try {
      const response = await this.api.get("/api/advanced-analytics");
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch analytics, using mock data");
      return await cloudMockService.getAdvancedAnalytics();
    }
  }

  // Active bets
  public async getActiveBets(): Promise<ActiveBet[]> {
    if (this.useMockData) {
      return [];
    }

    try {
      const response = await this.api.get("/api/active-bets");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.warn("Failed to fetch active bets");
      return [];
    }
  }

  // Transactions
  public async getTransactions(): Promise<Transaction[]> {
    if (this.useMockData) {
      return [];
    }

    try {
      const response = await this.api.get("/api/transactions");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.warn("Failed to fetch transactions");
      return [];
    }
  }

  // Risk profiles
  public async getRiskProfiles(): Promise<RiskProfile[]> {
    if (this.useMockData) {
      return [];
    }

    try {
      const response = await this.api.get("/api/risk-profiles");
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.warn("Failed to fetch risk profiles");
      return [];
    }
  }

  // Generic methods with error handling
  public async get(endpoint: string, params?: any) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.warn(`GET ${endpoint} failed:`, error);
      return null;
    }
  }

  public async post(endpoint: string, data?: any) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.warn(`POST ${endpoint} failed:`, error);
      return null;
    }
  }

  public async put(endpoint: string, data?: any) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.warn(`PUT ${endpoint} failed:`, error);
      return null;
    }
  }

  public async delete(endpoint: string) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.warn(`DELETE ${endpoint} failed:`, error);
      return null;
    }
  }
}

// Export singleton instance
export const backendApi = new BackendApi();
export default backendApi;
