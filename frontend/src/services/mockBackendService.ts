/**
 * Mock Backend Service for Cloud Preview Environment
 * Provides realistic mock data when real backend is not accessible
 */

import type {
  BettingOpportunity,
  ArbitrageOpportunity,
  Transaction,
  ActiveBet,
  RiskProfile,
  Prediction,
  HealthStatus,
  ModelPerformance,
  AdvancedAnalytics,
} from "./backendApi";

class MockBackendService {
  private mockDelay = 200; // Simulate network delay

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Mock Health Status - Always healthy in demo
  public async getHealth(): Promise<HealthStatus> {
    await this.delay(this.mockDelay);
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0-demo",
      uptime: 86400, // 24 hours
      services: {
        prediction_engine: "healthy",
        ultra_accuracy: "healthy",
        data_pipeline: "healthy",
        api_gateway: "healthy",
      },
    };
  }

  // Mock Betting Opportunities with realistic data
  public async getBettingOpportunities(
    sport?: string,
    limit: number = 10,
  ): Promise<BettingOpportunity[]> {
    await this.delay(this.mockDelay);

    const opportunities: BettingOpportunity[] = [
      {
        id: "bet_001",
        sport: "basketball",
        event: "Lakers vs Warriors",
        market: "Point Total Over",
        odds: 1.85,
        probability: 0.67,
        expected_value: 0.24,
        kelly_fraction: 0.15,
        confidence: 0.89,
        risk_level: "medium",
        recommendation: "strong_buy",
      },
      {
        id: "bet_002",
        sport: "football",
        event: "Chiefs vs Bills",
        market: "Spread",
        odds: 2.1,
        probability: 0.72,
        expected_value: 0.51,
        kelly_fraction: 0.22,
        confidence: 0.94,
        risk_level: "low",
        recommendation: "buy",
      },
      {
        id: "bet_003",
        sport: "baseball",
        event: "Yankees vs Red Sox",
        market: "Moneyline",
        odds: 1.75,
        probability: 0.61,
        expected_value: 0.07,
        kelly_fraction: 0.05,
        confidence: 0.76,
        risk_level: "high",
        recommendation: "hold",
      },
    ];

    return sport
      ? opportunities.filter((o) => o.sport === sport)
      : opportunities.slice(0, limit);
  }

  // Mock Arbitrage Opportunities
  public async getArbitrageOpportunities(
    limit: number = 5,
  ): Promise<ArbitrageOpportunity[]> {
    await this.delay(this.mockDelay);
    return [
      {
        id: "arb_001",
        sport: "basketball",
        event: "Celtics vs Heat",
        bookmaker_a: "DraftKings",
        bookmaker_b: "FanDuel",
        odds_a: 2.15,
        odds_b: 1.95,
        profit_margin: 3.2,
        required_stake: 1000,
      },
      {
        id: "arb_002",
        sport: "football",
        event: "Cowboys vs Eagles",
        bookmaker_a: "BetMGM",
        bookmaker_b: "Caesars",
        odds_a: 1.87,
        odds_b: 2.05,
        profit_margin: 2.8,
        required_stake: 750,
      },
    ].slice(0, limit);
  }

  // Mock Transactions
  public async getTransactions(): Promise<{
    transactions: Transaction[];
    total_count: number;
  }> {
    await this.delay(this.mockDelay);
    const transactions: Transaction[] = [
      {
        id: "tx_001",
        type: "win",
        amount: 150,
        description: "Lakers Over 215.5 - Win",
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        status: "completed",
      },
      {
        id: "tx_002",
        type: "bet",
        amount: -100,
        description: "Chiefs -3.5 Spread",
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        status: "pending",
      },
      {
        id: "tx_003",
        type: "win",
        amount: 85,
        description: "Yankees ML - Win",
        timestamp: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
        status: "completed",
      },
    ];

    return { transactions, total_count: transactions.length };
  }

  // Mock Active Bets
  public async getActiveBets(): Promise<{
    active_bets: ActiveBet[];
    total_count: number;
  }> {
    await this.delay(this.mockDelay);
    const active_bets: ActiveBet[] = [
      {
        id: "active_001",
        event: "Warriors vs Nuggets",
        market: "Point Total",
        selection: "Over 225.5",
        odds: 1.91,
        stake: 100,
        potential_return: 191,
        status: "active",
        placed_at: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
      },
      {
        id: "active_002",
        event: "Bills vs Dolphins",
        market: "Spread",
        selection: "Bills -7.5",
        odds: 1.87,
        stake: 150,
        potential_return: 280.5,
        status: "active",
        placed_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
    ];

    return { active_bets, total_count: active_bets.length };
  }

  // Mock Risk Profiles
  public async getRiskProfiles(): Promise<{ profiles: RiskProfile[] }> {
    await this.delay(this.mockDelay);
    const profiles: RiskProfile[] = [
      {
        id: "conservative",
        name: "Conservative",
        description: "Low risk, steady returns",
        max_bet_percentage: 2,
        kelly_multiplier: 0.5,
        min_confidence: 0.8,
      },
      {
        id: "moderate",
        name: "Moderate",
        description: "Balanced risk and reward",
        max_bet_percentage: 5,
        kelly_multiplier: 0.75,
        min_confidence: 0.7,
      },
      {
        id: "aggressive",
        name: "Aggressive",
        description: "High risk, high reward",
        max_bet_percentage: 10,
        kelly_multiplier: 1.0,
        min_confidence: 0.6,
      },
    ];

    return { profiles };
  }

  // Mock Predictions
  public async getPredictions(
    sport?: string,
    limit: number = 10,
  ): Promise<{ predictions: Prediction[]; total_count: number }> {
    await this.delay(this.mockDelay);
    const predictions: Prediction[] = [
      {
        id: "pred_001",
        sport: "basketball",
        event: "Lakers vs Warriors",
        prediction: "Lakers +3.5",
        confidence: 0.89,
        odds: 1.85,
        expected_value: 0.24,
        timestamp: new Date().toISOString(),
        model_version: "xgboost_v2.1",
        features: {
          home_advantage: 0.15,
          recent_form: 0.72,
          head_to_head: 0.68,
        },
      },
      {
        id: "pred_002",
        sport: "football",
        event: "Chiefs vs Bills",
        prediction: "Under 47.5",
        confidence: 0.94,
        odds: 2.1,
        expected_value: 0.51,
        timestamp: new Date().toISOString(),
        model_version: "xgboost_v2.1",
        features: {
          weather_factor: 0.23,
          defense_rating: 0.85,
          pace_factor: 0.42,
        },
      },
    ];

    return {
      predictions: sport
        ? predictions.filter((p) => p.sport === sport)
        : predictions.slice(0, limit),
      total_count: predictions.length,
    };
  }

  // Mock Model Performance - Using actual backend accuracy from logs (96.5%)
  public async getModelPerformance(): Promise<ModelPerformance> {
    await this.delay(this.mockDelay);
    return {
      overall_accuracy: 0.965, // Real accuracy from user's backend logs!
      recent_accuracy: 0.972,
      model_metrics: {
        precision: 0.94,
        recall: 0.96,
        f1_score: 0.95,
        auc_roc: 0.98,
      },
      performance_by_sport: {
        basketball: { accuracy: 0.965, games: 150 },
        football: { accuracy: 0.968, games: 120 },
        baseball: { accuracy: 0.961, games: 180 },
        hockey: { accuracy: 0.959, games: 95 },
      },
    };
  }

  // Mock Advanced Analytics
  public async getAdvancedAnalytics(): Promise<AdvancedAnalytics> {
    await this.delay(this.mockDelay);
    return {
      roi_analysis: {
        overall_roi: 12.8,
        monthly_roi: 8.5,
        win_rate: 0.67,
      },
      bankroll_metrics: {
        current_balance: 3250,
        total_wagered: 18500,
        profit_loss: 1150,
        max_drawdown: -85,
      },
      performance_trends: [
        { date: "2024-01-01", cumulative_profit: 0 },
        { date: "2024-01-15", cumulative_profit: 250 },
        { date: "2024-02-01", cumulative_profit: 580 },
        { date: "2024-02-15", cumulative_profit: 925 },
        { date: "2024-03-01", cumulative_profit: 1150 },
      ],
    };
  }

  // Mock Ultra Accuracy Predictions
  public async getUltraAccuracyPredictions(): Promise<any> {
    await this.delay(this.mockDelay);
    return {
      enhanced_predictions: [
        {
          id: "ultra_001",
          event: "Lakers vs Warriors",
          ultra_confidence: 0.965,
          prediction_strength: "very_high",
          recommendation: "strong_bet",
          enhancement_factors: {
            ml_ensemble: 0.89,
            pattern_recognition: 0.94,
            sentiment_analysis: 0.78,
            weather_impact: 0.12,
          },
        },
      ],
      system_status: {
        ultra_accuracy_active: true,
        model_sync_status: "synchronized",
        last_update: new Date().toISOString(),
      },
    };
  }
}

// Create singleton instance
export const mockBackendService = new MockBackendService();
export default mockBackendService;
