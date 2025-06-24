/**
 * Development Backend Server
 * Provides a lightweight backend for development purposes
 */

import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const PORT = 8000;

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());

// Mock data
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
];

const mockArbitrageOpportunities = [
  {
    id: "arb_1",
    sport: "basketball",
    event: "Celtics vs Heat",
    bookmaker_a: "DraftKings",
    bookmaker_b: "FanDuel",
    odds_a: 2.1,
    odds_b: 1.95,
    profit_margin: 0.025,
    required_stake: 1000,
  },
];

const mockTransactions = [
  {
    id: "txn_1",
    type: "bet",
    amount: -100.0,
    description: "Lakers vs Warriors - Lakers ML",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: "txn_2",
    type: "win",
    amount: 180.0,
    description: "Lakers vs Warriors - Win",
    timestamp: "2024-01-15T22:45:00Z",
    status: "completed",
  },
];

const mockPredictions = [
  {
    id: "pred_1",
    sport: "basketball",
    event: "Lakers vs Warriors",
    prediction: "Lakers to win",
    confidence: 0.78,
    odds: 1.85,
    expected_value: 0.08,
    timestamp: new Date().toISOString(),
    model_version: "v2.1",
    features: {
      recent_form: 0.82,
      head_to_head: 0.65,
      injury_impact: 0.23,
      home_advantage: 0.15,
    },
  },
];

// Routes
app.get("/", (req, res) => {
  res.json({
    name: "A1Betting Development Backend",
    version: "1.0.0",
    status: "operational",
    timestamp: new Date().toISOString(),
    features: [
      "Betting Opportunities",
      "Arbitrage Detection",
      "Transaction Tracking",
      "ML Predictions",
      "Risk Management",
    ],
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptime: process.uptime(),
    services: {
      prediction_engine: "operational",
      betting_service: "operational",
      risk_management: "operational",
      arbitrage_detection: "operational",
    },
  });
});

// API Routes
app.get("/api/betting-opportunities", (req, res) => {
  const { sport, limit = 10 } = req.query;
  let opportunities = [...mockBettingOpportunities];

  if (sport) {
    opportunities = opportunities.filter((opp) => opp.sport === sport);
  }

  res.json(opportunities.slice(0, parseInt(limit)));
});

app.get("/api/arbitrage-opportunities", (req, res) => {
  const { limit = 5 } = req.query;
  res.json(mockArbitrageOpportunities.slice(0, parseInt(limit)));
});

app.get("/api/transactions", (req, res) => {
  res.json({
    transactions: mockTransactions,
    total_count: mockTransactions.length,
  });
});

app.get("/api/active-bets", (req, res) => {
  const activeBets = [
    {
      id: "bet_1",
      event: "Lakers vs Warriors",
      market: "Moneyline",
      selection: "Lakers",
      odds: 1.85,
      stake: 100.0,
      potential_return: 185.0,
      status: "active",
      placed_at: "2024-01-16T14:20:00Z",
    },
  ];

  res.json({
    active_bets: activeBets,
    total_count: activeBets.length,
  });
});

app.get("/api/risk-profiles", (req, res) => {
  const profiles = [
    {
      id: "conservative",
      name: "Conservative",
      description: "Low risk, steady returns",
      max_bet_percentage: 0.02,
      kelly_multiplier: 0.25,
      min_confidence: 0.8,
    },
    {
      id: "moderate",
      name: "Moderate",
      description: "Balanced risk and reward",
      max_bet_percentage: 0.05,
      kelly_multiplier: 0.5,
      min_confidence: 0.7,
    },
    {
      id: "aggressive",
      name: "Aggressive",
      description: "Higher risk, higher potential returns",
      max_bet_percentage: 0.1,
      kelly_multiplier: 1.0,
      min_confidence: 0.6,
    },
  ];

  res.json({ profiles });
});

app.get("/api/predictions", (req, res) => {
  const { sport, limit = 10 } = req.query;
  let predictions = [...mockPredictions];

  if (sport) {
    predictions = predictions.filter((pred) => pred.sport === sport);
  }

  res.json({
    predictions: predictions.slice(0, parseInt(limit)),
    total_count: predictions.length,
  });
});

// Ultra-accuracy endpoints
app.get("/api/ultra-accuracy/predictions", (req, res) => {
  res.json({
    predictions: mockPredictions.map((pred) => ({
      ...pred,
      accuracy_score: 0.92,
      shap_values: {
        recent_form: 0.35,
        matchup_history: 0.28,
        injury_report: -0.12,
        weather: 0.05,
      },
    })),
    model_performance: {
      accuracy: 0.92,
      precision: 0.89,
      recall: 0.94,
      f1_score: 0.91,
    },
  });
});

app.get("/api/ultra-accuracy/model-performance", (req, res) => {
  res.json({
    overall_accuracy: 0.92,
    recent_accuracy: 0.94,
    model_metrics: {
      precision: 0.89,
      recall: 0.94,
      f1_score: 0.91,
      auc_roc: 0.96,
    },
    performance_by_sport: {
      basketball: { accuracy: 0.94, games: 156 },
      football: { accuracy: 0.9, games: 98 },
      baseball: { accuracy: 0.91, games: 203 },
    },
  });
});

// Enhanced analytics endpoints
app.get("/api/analytics/advanced", (req, res) => {
  res.json({
    roi_analysis: {
      overall_roi: 12.5,
      monthly_roi: 8.3,
      win_rate: 0.64,
    },
    bankroll_metrics: {
      current_balance: 5420.5,
      total_wagered: 12800.0,
      profit_loss: 420.5,
      max_drawdown: -245.0,
    },
    performance_trends: [
      { date: "2024-01-01", cumulative_profit: 0 },
      { date: "2024-01-15", cumulative_profit: 420.5 },
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Create HTTP server
const server = http.createServer(app);

// WebSocket server for real-time updates
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  // Send initial data
  ws.send(
    JSON.stringify({
      type: "connection",
      data: { status: "connected", timestamp: new Date().toISOString() },
    }),
  );

  // Send periodic updates
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(
        JSON.stringify({
          type: "odds_update",
          data: {
            event: "Lakers vs Warriors",
            odds: 1.85 + (Math.random() - 0.5) * 0.1,
            timestamp: new Date().toISOString(),
          },
        }),
      );
    }
  }, 10000);

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    clearInterval(interval);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clearInterval(interval);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Development Backend Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`🔌 WebSocket server available at ws://localhost:${PORT}`);
  console.log(`💾 Health check: http://localhost:${PORT}/health`);
});

export default app;
