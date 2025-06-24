/**
 * Vite Plugin to embed backend routes directly in development server
 * This ensures the backend works in cloud preview environments
 */

export function backendPlugin() {
  return {
    name: "backend-plugin",
    configureServer(server) {
      // Mock data for cloud preview
      const mockBettingOpportunities = [
        {
          id: "opp_1",
          sport: "basketball",
          event: "Lakers vs Warriors",
          market: "Moneyline",
          odds: 1.85,
          probability: 0.65,
          expected_value: 0.08,
          kelly_fraction: 0.04,
          confidence: 0.78,
          risk_level: "medium",
          recommendation: "BUY",
        },
        {
          id: "opp_2",
          sport: "football",
          event: "Chiefs vs Bills",
          market: "Over/Under 47.5",
          odds: 1.91,
          probability: 0.58,
          expected_value: 0.06,
          kelly_fraction: 0.03,
          confidence: 0.72,
          risk_level: "low",
          recommendation: "STRONG_BUY",
        },
        {
          id: "opp_3",
          sport: "baseball",
          event: "Yankees vs Red Sox",
          market: "Moneyline",
          odds: 1.75,
          probability: 0.61,
          expected_value: 0.07,
          kelly_fraction: 0.05,
          confidence: 0.76,
          risk_level: "high",
          recommendation: "HOLD",
        },
      ];

      const mockArbitrageOpportunities = [
        {
          id: "arb_1",
          sport: "basketball",
          event: "Celtics vs Heat",
          bookmaker_a: "DraftKings",
          bookmaker_b: "FanDuel",
          odds_a: 2.15,
          odds_b: 1.95,
          profit_margin: 3.2,
          required_stake: 1000,
          guaranteed_profit: 32,
          profit_percent: 3.2,
          stakes: { DraftKings: 465, FanDuel: 535 },
        },
        {
          id: "arb_2",
          sport: "football",
          event: "Cowboys vs Eagles",
          bookmaker_a: "BetMGM",
          bookmaker_b: "Caesars",
          odds_a: 1.87,
          odds_b: 2.05,
          profit_margin: 2.8,
          required_stake: 750,
          guaranteed_profit: 21,
          profit_percent: 2.8,
          stakes: { BetMGM: 370, Caesars: 380 },
        },
      ];

      const mockTransactions = [
        {
          id: "tx_001",
          type: "win",
          amount: 150,
          description: "Lakers Over 215.5 - Win",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: "completed",
        },
        {
          id: "tx_002",
          type: "bet",
          amount: -100,
          description: "Chiefs -3.5 Spread",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: "pending",
        },
      ];

      const mockPredictions = [
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

      // Health endpoint
      server.middlewares.use("/health", (req, res, next) => {
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              status: "healthy",
              timestamp: new Date().toISOString(),
              version: "1.0.0-cloud",
              uptime: process.uptime(),
              services: {
                prediction_engine: "operational",
                betting_service: "operational",
                risk_management: "operational",
                arbitrage_detection: "operational",
              },
            }),
          );
        } else {
          next();
        }
      });

      // API endpoints
      server.middlewares.use("/api/betting-opportunities", (req, res, next) => {
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(mockBettingOpportunities));
        } else {
          next();
        }
      });

      server.middlewares.use(
        "/api/arbitrage-opportunities",
        (req, res, next) => {
          if (req.method === "GET") {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(mockArbitrageOpportunities));
          } else {
            next();
          }
        },
      );

      server.middlewares.use("/api/predictions", (req, res, next) => {
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              predictions: mockPredictions,
              total_count: mockPredictions.length,
            }),
          );
        } else {
          next();
        }
      });

      server.middlewares.use("/api/transactions", (req, res, next) => {
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              transactions: mockTransactions,
              total_count: mockTransactions.length,
            }),
          );
        } else {
          next();
        }
      });

      server.middlewares.use("/api/active-bets", (req, res, next) => {
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              active_bets: [
                {
                  id: "bet_1",
                  event: "Warriors vs Nuggets",
                  market: "Point Total",
                  selection: "Over 225.5",
                  odds: 1.91,
                  stake: 100,
                  potential_return: 191,
                  status: "active",
                  placed_at: new Date(Date.now() - 1800000).toISOString(),
                },
              ],
              total_count: 1,
            }),
          );
        } else {
          next();
        }
      });

      server.middlewares.use("/api/risk-profiles", (req, res, next) => {
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              profiles: [
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
              ],
            }),
          );
        } else {
          next();
        }
      });

      server.middlewares.use(
        "/api/ultra-accuracy/model-performance",
        (req, res, next) => {
          if (req.method === "GET") {
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                overall_accuracy: 0.965,
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
                },
                models_active: 3,
                prediction_latency: 45,
              }),
            );
          } else {
            next();
          }
        },
      );

      server.middlewares.use("/api/analytics/advanced", (req, res, next) => {
        if (req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
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
              daily: {
                [new Date().toISOString().split("T")[0]]: 125,
              },
              yearly: {
                [new Date().getFullYear()]: 1150,
              },
            }),
          );
        } else {
          next();
        }
      });

      server.middlewares.use(
        "/api/ultra-accuracy/predictions",
        (req, res, next) => {
          if (req.method === "GET") {
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
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
              }),
            );
          } else {
            next();
          }
        },
      );

      console.log(
        "🚀 Backend API endpoints embedded in Vite server for cloud preview",
      );
    },
  };
}
