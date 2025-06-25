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

  constructor() {
    // Determine if we should use mock data based on environment
    this.baseURL = this.determineBackendURL();

    // If we're in production without a proper backend, use mock data
    if (this.isProductionWithoutBackend()) {
      this.useMockData = true;
      console.log(
        "🎭 Production environment without backend detected - Using mock data",
      );
    }

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Response interceptor with intelligent fallback
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If we get HTML instead of JSON, we're hitting the frontend server
        // Check for 404 errors or HTML responses (hitting frontend server)
        if (
          error.response?.status === 404 ||
          (error.response?.data &&
            typeof error.response.data === "string" &&
            error.response.data.includes("<!doctype html>"))
        ) {
          console.warn("⚠️ Backend API not available - Using mock data");
          this.useMockData = true;
        }

        // Return mock data for common endpoints
        const endpoint = error.config?.url || "";
        if (endpoint.includes("value-bets")) {
          return { data: await cloudMockService.getValueBets() };
        }
        if (endpoint.includes("betting-opportunities")) {
          return { data: await cloudMockService.getBettingOpportunities() };
        }
        if (endpoint.includes("arbitrage-opportunities")) {
          return { data: await cloudMockService.getArbitrageOpportunities() };
        }

        throw error;
      },
    );
  }

  private determineBackendURL(): string {
    // Environment variables for backend URL
    if (import.meta.env.VITE_BACKEND_URL) {
      return import.meta.env.VITE_BACKEND_URL;
    }
    if (import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }

    // Local development
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      return "http://localhost:8000";
    }

    // Production fallback - this will trigger mock data usage
    return window.location.origin;
  }

  private isProductionWithoutBackend(): boolean {
    // Check if we're in production environment (not localhost)
    const isProduction =
      !window.location.hostname.includes("localhost") &&
      !window.location.hostname.includes("127.0.0.1");

    // Check if backend URL points to the same origin as frontend (no separate backend)
    const backendSameAsOrigin = this.baseURL === window.location.origin;

    return isProduction && backendSameAsOrigin;
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
      this.useMockData = true;
      return await cloudMockService.getHealth();
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
      this.useMockData = true;
      return await cloudMockService.getValueBets();
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
      this.useMockData = true;
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
      this.useMockData = true;
      return await cloudMockService.getArbitrageOpportunities();
    }
  }

  // Predictions
  public async getPredictions(params?: any) {
    if (this.useMockData) {
      return await cloudMockService.getPredictions();
    }

    try {
      const response = await this.api.get("/api/predictions", { params });
      return Array.isArray(response.data)
        ? response.data
        : response.data?.predictions || [];
    } catch (error) {
      console.warn("Failed to fetch predictions, using mock data");
      this.useMockData = true;
      return await cloudMockService.getPredictions();
    }
  }

  // Transactions
  public async getTransactions(): Promise<Transaction[]> {
    if (this.useMockData) {
      return await cloudMockService.getTransactions();
    }

    try {
      const response = await this.api.get("/api/transactions");
      return Array.isArray(response.data)
        ? response.data
        : response.data?.transactions || [];
    } catch (error) {
      console.warn("Failed to fetch transactions, using mock data");
      this.useMockData = true;
      return await cloudMockService.getTransactions();
    }
  }

  // Active bets
  public async getActiveBets(): Promise<ActiveBet[]> {
    if (this.useMockData) {
      return await cloudMockService.getActiveBets();
    }

    try {
      const response = await this.api.get("/api/active-bets");
      return Array.isArray(response.data)
        ? response.data
        : response.data?.active_bets || [];
    } catch (error) {
      console.warn("Failed to fetch active bets, using mock data");
      this.useMockData = true;
      return await cloudMockService.getActiveBets();
    }
  }

  // Advanced analytics
  public async getAdvancedAnalytics() {
    if (this.useMockData) {
      return await cloudMockService.getAdvancedAnalytics();
    }

    try {
      const response = await this.api.get("/api/analytics/advanced");
      return response.data;
    } catch (error) {
      console.warn("Failed to fetch analytics, using mock data");
      this.useMockData = true;
      return await cloudMockService.getAdvancedAnalytics();
    }
  }
}

// Create singleton instance
export const backendApi = new BackendApi();
export default backendApi;
