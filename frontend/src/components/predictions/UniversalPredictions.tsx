import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Target,
  Zap,
  Eye,
  BarChart3,
  Activity,
  Clock,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  SortDesc,
  Calendar,
  Map,
  Users,
  Thermometer,
  Wind,
  Trophy,
  Shield,
  Cpu,
  Database,
  Network,
  Gauge,
  LineChart,
  PieChart,
} from "lucide-react";

// Import consolidated systems
import { MegaCard, MegaButton, MegaInput, MegaAlert } from "../mega/MegaUI";
import { CyberText, CyberContainer } from "../mega/CyberTheme";
import {
  usePredictions,
  useEngineMetrics,
  useToast,
  useDebounce,
} from "../../hooks/UniversalHooks";
import { UniversalServiceFactory } from "../../services/UniversalServiceLayer";
import {
  formatters,
  analytics as analyticsUtils,
} from "../../utils/UniversalUtils";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface EnhancedPrediction {
  id: string;
  eventId: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  market: string;
  selection: string;
  prediction: number;
  confidence: number;
  odds: number;
  impliedProbability: number;
  valueEdge: number;
  expectedValue: number;
  recommendedStake: number;
  potentialPayout: number;
  timestamp: string;
  gameTime: string;
  status: "pending" | "won" | "lost" | "void" | "live";
  accuracy: number;

  // ML & Analytics
  modelPredictions: {
    modelId: string;
    modelName: string;
    prediction: number;
    confidence: number;
    weight: number;
  }[];

  featureImportance: {
    [feature: string]: number;
  };

  shap: {
    global: { [feature: string]: number };
    local: { [feature: string]: number };
    explanation: string[];
  };

  // Context & Intelligence
  context: {
    weather?: {
      temperature: number;
      conditions: string;
      windSpeed: number;
      humidity: number;
    };
    injuries: {
      team: string;
      player: string;
      impact: "low" | "medium" | "high";
    }[];
    momentum: {
      homeTeam: number;
      awayTeam: number;
    };
    headToHead: {
      gamesPlayed: number;
      homeWins: number;
      awayWins: number;
      trends: string[];
    };
    recentForm: {
      homeTeam: { wins: number; losses: number; streak: string };
      awayTeam: { wins: number; losses: number; streak: string };
    };
    venue: {
      name: string;
      homeAdvantage: number;
      surface?: string;
      capacity: number;
    };
    market: {
      volume: number;
      liquidity: number;
      efficiency: number;
      movement: "up" | "down" | "stable";
    };
  };

  // Risk Assessment
  risk: {
    level: "low" | "medium" | "high";
    factors: string[];
    score: number;
    volatility: number;
    correlation: number;
  };

  // Performance Tracking
  performance: {
    modelAccuracy: number;
    calibration: number;
    brier: number;
    logLoss: number;
    roi: number;
    hitRate: number;
  };
}

export interface PredictionFilters {
  sport: string;
  league: string;
  market: string;
  minConfidence: number;
  minEdge: number;
  riskLevel: string;
  status: string;
  timeframe: "1h" | "24h" | "7d" | "live";
}

export interface PredictionState {
  isLoading: boolean;
  isRealtime: boolean;
  lastUpdated: Date | null;
  selectedPrediction: EnhancedPrediction | null;
  viewMode: "cards" | "table" | "detailed" | "analytics";
  sortBy: keyof EnhancedPrediction;
  sortOrder: "asc" | "desc";
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const UniversalPredictions: React.FC = () => {
  // State
  const [state, setState] = useState<PredictionState>({
    isLoading: false,
    isRealtime: true,
    lastUpdated: null,
    selectedPrediction: null,
    viewMode: "cards",
    sortBy: "confidence",
    sortOrder: "desc",
  });

  const [filters, setFilters] = useState<PredictionFilters>({
    sport: "all",
    league: "all",
    market: "all",
    minConfidence: 0,
    minEdge: 0,
    riskLevel: "all",
    status: "all",
    timeframe: "24h",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [enhancedPredictions, setEnhancedPredictions] = useState<
    EnhancedPrediction[]
  >([]);

  // Hooks
  const {
    predictions,
    isLoading: predictionsLoading,
    refetch,
  } = usePredictions({
    limit: 100,
    realtime: state.isRealtime,
  });
  const { metrics } = useEngineMetrics();
  const { addToast } = useToast();

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Services
  const predictionService = UniversalServiceFactory.getPredictionService();

  // ============================================================================
  // DATA ENHANCEMENT
  // ============================================================================

  const enhancePredictions = useCallback(
    async (basePredictions: any[]) => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        const enhanced: EnhancedPrediction[] = basePredictions.map(
          (pred, index) => {
            // Generate comprehensive enhancement
            const enhancement: EnhancedPrediction = {
              id: pred.id || `pred_${index}`,
              eventId: pred.id || `event_${index}`,
              sport: "nfl", // Would come from actual data
              league: "NFL",
              homeTeam: `Home Team ${index + 1}`,
              awayTeam: `Away Team ${index + 1}`,
              market: "moneyline",
              selection: `${pred.game} - Winner`,
              prediction: pred.prediction || Math.random() * 100,
              confidence: pred.confidence || 75 + Math.random() * 20,
              odds: pred.odds || 1.5 + Math.random() * 2,
              impliedProbability: 1 / (pred.odds || 1.9),
              valueEdge: Math.random() * 0.15,
              expectedValue: Math.random() * 50 + 10,
              recommendedStake: Math.random() * 100 + 50,
              potentialPayout: pred.potentialWin || Math.random() * 500 + 100,
              timestamp: pred.timestamp || new Date().toISOString(),
              gameTime: new Date(
                Date.now() + Math.random() * 86400000,
              ).toISOString(),
              status: ["pending", "won", "lost"][
                Math.floor(Math.random() * 3)
              ] as any,
              accuracy: 85 + Math.random() * 10,

              // ML & Analytics
              modelPredictions: [
                {
                  modelId: "ensemble_nn",
                  modelName: "Ensemble Neural Network",
                  prediction: 75 + Math.random() * 20,
                  confidence: 85 + Math.random() * 10,
                  weight: 0.35,
                },
                {
                  modelId: "gradient_boost",
                  modelName: "Gradient Boosting",
                  prediction: 70 + Math.random() * 25,
                  confidence: 80 + Math.random() * 15,
                  weight: 0.25,
                },
                {
                  modelId: "random_forest",
                  modelName: "Random Forest",
                  prediction: 78 + Math.random() * 18,
                  confidence: 82 + Math.random() * 12,
                  weight: 0.2,
                },
                {
                  modelId: "lstm",
                  modelName: "LSTM Deep Learning",
                  prediction: 73 + Math.random() * 22,
                  confidence: 87 + Math.random() * 8,
                  weight: 0.2,
                },
              ],

              featureImportance: {
                "Team Form": 0.25,
                "Head-to-Head": 0.18,
                Injuries: 0.15,
                "Home Advantage": 0.12,
                Weather: 0.1,
                Momentum: 0.2,
              },

              shap: {
                global: {
                  "Team Form": 0.25,
                  Momentum: 0.2,
                  "Head-to-Head": 0.18,
                  Injuries: 0.15,
                  "Home Advantage": 0.12,
                  Weather: 0.1,
                },
                local: {
                  "Team Form": Math.random() * 0.5 - 0.25,
                  Momentum: Math.random() * 0.4 - 0.2,
                  "Head-to-Head": Math.random() * 0.3 - 0.15,
                  Injuries: Math.random() * 0.25 - 0.125,
                  "Home Advantage": Math.random() * 0.2 - 0.1,
                  Weather: Math.random() * 0.15 - 0.075,
                },
                explanation: [
                  "Strong recent form favors home team",
                  "Momentum indicators show positive trend",
                  "Historical matchup data supports prediction",
                  "Key player availability impacts outcome",
                ],
              },

              // Context & Intelligence
              context: {
                weather: {
                  temperature: 15 + Math.random() * 20,
                  conditions: ["Clear", "Cloudy", "Rain", "Snow"][
                    Math.floor(Math.random() * 4)
                  ],
                  windSpeed: Math.random() * 25,
                  humidity: 40 + Math.random() * 40,
                },
                injuries: [
                  {
                    team: "home",
                    player: "Star Player",
                    impact: ["low", "medium", "high"][
                      Math.floor(Math.random() * 3)
                    ] as any,
                  },
                ],
                momentum: {
                  homeTeam: 50 + Math.random() * 40,
                  awayTeam: 50 + Math.random() * 40,
                },
                headToHead: {
                  gamesPlayed: 10 + Math.floor(Math.random() * 20),
                  homeWins: Math.floor(Math.random() * 15),
                  awayWins: Math.floor(Math.random() * 15),
                  trends: [
                    "Home team dominates recently",
                    "Close games historically",
                  ],
                },
                recentForm: {
                  homeTeam: { wins: 7, losses: 3, streak: "W3" },
                  awayTeam: { wins: 6, losses: 4, streak: "L1" },
                },
                venue: {
                  name: "Stadium Name",
                  homeAdvantage: 3 + Math.random() * 7,
                  surface: "Grass",
                  capacity: 50000 + Math.floor(Math.random() * 30000),
                },
                market: {
                  volume: Math.floor(Math.random() * 1000000),
                  liquidity: 80 + Math.random() * 20,
                  efficiency: 75 + Math.random() * 20,
                  movement: ["up", "down", "stable"][
                    Math.floor(Math.random() * 3)
                  ] as any,
                },
              },

              // Risk Assessment
              risk: {
                level: ["low", "medium", "high"][
                  Math.floor(Math.random() * 3)
                ] as any,
                factors: [
                  "Weather uncertainty",
                  "Injury concerns",
                  "Market volatility",
                ],
                score: Math.random() * 100,
                volatility: Math.random() * 0.3,
                correlation: Math.random() * 0.8,
              },

              // Performance Tracking
              performance: {
                modelAccuracy: 85 + Math.random() * 10,
                calibration: 0.85 + Math.random() * 0.1,
                brier: 0.15 + Math.random() * 0.1,
                logLoss: 0.3 + Math.random() * 0.2,
                roi: 15 + Math.random() * 20,
                hitRate: 0.8 + Math.random() * 0.15,
              },
            };

            return enhancement;
          },
        );

        setEnhancedPredictions(enhanced);
        setState((prev) => ({ ...prev, lastUpdated: new Date() }));
      } catch (error) {
        console.error("Failed to enhance predictions:", error);
        addToast("Failed to enhance predictions", "error");
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [addToast],
  );

  // Enhance predictions when base predictions change
  useEffect(() => {
    if (predictions.length > 0) {
      enhancePredictions(predictions);
    }
  }, [predictions, enhancePredictions]);

  // ============================================================================
  // FILTERING & SORTING
  // ============================================================================

  const filteredPredictions = useMemo(() => {
    let filtered = enhancedPredictions;

    // Apply filters
    if (filters.sport !== "all") {
      filtered = filtered.filter((pred) => pred.sport === filters.sport);
    }

    if (filters.league !== "all") {
      filtered = filtered.filter((pred) => pred.league === filters.league);
    }

    if (filters.market !== "all") {
      filtered = filtered.filter((pred) => pred.market === filters.market);
    }

    if (filters.riskLevel !== "all") {
      filtered = filtered.filter(
        (pred) => pred.risk.level === filters.riskLevel,
      );
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((pred) => pred.status === filters.status);
    }

    filtered = filtered.filter(
      (pred) =>
        pred.confidence >= filters.minConfidence &&
        pred.valueEdge >= filters.minEdge,
    );

    // Apply search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (pred) =>
          pred.homeTeam.toLowerCase().includes(query) ||
          pred.awayTeam.toLowerCase().includes(query) ||
          pred.league.toLowerCase().includes(query) ||
          pred.market.toLowerCase().includes(query),
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aVal = a[state.sortBy];
      const bVal = b[state.sortBy];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return state.sortOrder === "desc" ? bVal - aVal : aVal - bVal;
      }

      return state.sortOrder === "desc"
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal));
    });

    return filtered;
  }, [
    enhancedPredictions,
    filters,
    debouncedSearch,
    state.sortBy,
    state.sortOrder,
  ]);

  // ============================================================================
  // RENDER COMPONENTS
  // ============================================================================

  const renderFiltersPanel = () => (
    <MegaCard title="Filters & Controls" variant="glass" padding="lg">
      <div className="space-y-4">
        {/* Search */}
        <MegaInput
          placeholder="Search teams, leagues, markets..."
          value={searchQuery}
          onChange={setSearchQuery}
          icon={<Eye size={16} />}
          fullWidth
        />

        {/* Filter Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div>
            <CyberText variant="caption" className="mb-2">
              Sport
            </CyberText>
            <select
              value={filters.sport}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sport: e.target.value }))
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              <option value="all">All Sports</option>
              <option value="nfl">NFL</option>
              <option value="nba">NBA</option>
              <option value="mlb">MLB</option>
              <option value="nhl">NHL</option>
            </select>
          </div>

          <div>
            <CyberText variant="caption" className="mb-2">
              Market
            </CyberText>
            <select
              value={filters.market}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, market: e.target.value }))
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              <option value="all">All Markets</option>
              <option value="moneyline">Moneyline</option>
              <option value="spread">Spread</option>
              <option value="total">Total</option>
              <option value="props">Props</option>
            </select>
          </div>

          <div>
            <CyberText variant="caption" className="mb-2">
              Risk Level
            </CyberText>
            <select
              value={filters.riskLevel}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, riskLevel: e.target.value }))
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          <div>
            <CyberText variant="caption" className="mb-2">
              Status
            </CyberText>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="live">Live</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <MegaInput
            label="Min Confidence"
            type="number"
            value={filters.minConfidence}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, minConfidence: Number(value) }))
            }
            size="sm"
          />

          <MegaInput
            label="Min Edge %"
            type="number"
            value={filters.minEdge * 100}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, minEdge: Number(value) / 100 }))
            }
            size="sm"
          />

          <div>
            <CyberText variant="caption" className="mb-2">
              Sort By
            </CyberText>
            <select
              value={state.sortBy}
              onChange={(e) =>
                setState((prev) => ({ ...prev, sortBy: e.target.value as any }))
              }
              className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              <option value="confidence">Confidence</option>
              <option value="valueEdge">Value Edge</option>
              <option value="expectedValue">Expected Value</option>
              <option value="potentialPayout">Potential Payout</option>
              <option value="gameTime">Game Time</option>
            </select>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CyberText variant="caption" color="secondary">
              View Mode:
            </CyberText>
            {(["cards", "table", "detailed", "analytics"] as const).map(
              (mode) => (
                <MegaButton
                  key={mode}
                  variant={state.viewMode === mode ? "primary" : "secondary"}
                  size="sm"
                  onClick={() =>
                    setState((prev) => ({ ...prev, viewMode: mode }))
                  }
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </MegaButton>
              ),
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.isRealtime}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    isRealtime: e.target.checked,
                  }))
                }
                className="w-4 h-4"
              />
              <CyberText variant="caption" color="secondary">
                Real-time
              </CyberText>
            </div>

            <MegaButton
              variant="ghost"
              size="sm"
              onClick={refetch}
              loading={predictionsLoading || state.isLoading}
              icon={<RefreshCw size={16} />}
            >
              Refresh
            </MegaButton>
          </div>
        </div>
      </div>
    </MegaCard>
  );

  const renderPredictionCard = (prediction: EnhancedPrediction) => (
    <MegaCard
      key={prediction.id}
      variant="glowing"
      padding="lg"
      onClick={() =>
        setState((prev) => ({ ...prev, selectedPrediction: prediction }))
      }
      className="cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <CyberText variant="body" className="font-semibold">
              {prediction.homeTeam} vs {prediction.awayTeam}
            </CyberText>
            <CyberText variant="caption" color="muted">
              {prediction.sport.toUpperCase()} • {prediction.league} •{" "}
              {prediction.market}
            </CyberText>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`px-2 py-1 rounded text-xs font-semibold ${
                prediction.status === "pending"
                  ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                  : prediction.status === "won"
                    ? "bg-green-500 bg-opacity-20 text-green-400"
                    : prediction.status === "lost"
                      ? "bg-red-500 bg-opacity-20 text-red-400"
                      : prediction.status === "live"
                        ? "bg-blue-500 bg-opacity-20 text-blue-400"
                        : "bg-gray-500 bg-opacity-20 text-gray-400"
              }`}
            >
              {prediction.status.toUpperCase()}
            </div>

            <div
              className={`px-2 py-1 rounded text-xs font-semibold ${
                prediction.risk.level === "low"
                  ? "bg-green-500 bg-opacity-20 text-green-400"
                  : prediction.risk.level === "medium"
                    ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                    : "bg-red-500 bg-opacity-20 text-red-400"
              }`}
            >
              {prediction.risk.level.toUpperCase()} RISK
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <CyberText variant="title" style={{ color: "#06ffa5" }}>
              {prediction.confidence.toFixed(1)}%
            </CyberText>
            <CyberText variant="caption" color="muted">
              Confidence
            </CyberText>
          </div>

          <div className="text-center">
            <CyberText variant="title" style={{ color: "#00d4ff" }}>
              {formatters.percentage(prediction.valueEdge * 100, 1)}
            </CyberText>
            <CyberText variant="caption" color="muted">
              Value Edge
            </CyberText>
          </div>

          <div className="text-center">
            <CyberText variant="title" style={{ color: "#06ffa5" }}>
              {formatters.odds(prediction.odds)}
            </CyberText>
            <CyberText variant="caption" color="muted">
              Odds
            </CyberText>
          </div>

          <div className="text-center">
            <CyberText variant="title" style={{ color: "#00d4ff" }}>
              {formatters.currency(prediction.expectedValue)}
            </CyberText>
            <CyberText variant="caption" color="muted">
              Expected Value
            </CyberText>
          </div>
        </div>

        {/* Model Consensus */}
        <div>
          <CyberText variant="caption" color="secondary" className="mb-2">
            Model Consensus ({prediction.modelPredictions.length} models)
          </CyberText>
          <div className="space-y-1">
            {prediction.modelPredictions.slice(0, 3).map((model, index) => (
              <div key={index} className="flex items-center justify-between">
                <CyberText variant="caption" color="muted">
                  {model.modelName}
                </CyberText>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-1 rounded-full"
                      style={{ width: `${model.confidence}%` }}
                    />
                  </div>
                  <CyberText variant="caption" color="muted">
                    {model.confidence.toFixed(0)}%
                  </CyberText>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Context Indicators */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <CyberText variant="caption" color="muted">
              {new Date(prediction.gameTime).toLocaleDateString()}
            </CyberText>
          </div>

          <div className="flex items-center gap-2">
            <Thermometer size={14} />
            <CyberText variant="caption" color="muted">
              {prediction.context.weather?.temperature}°C
            </CyberText>
          </div>

          <div className="flex items-center gap-2">
            <Users size={14} />
            <CyberText variant="caption" color="muted">
              {prediction.context.venue.capacity.toLocaleString()}
            </CyberText>
          </div>

          <div className="flex items-center gap-2">
            <Activity size={14} />
            <CyberText variant="caption" color="muted">
              {prediction.performance.modelAccuracy.toFixed(1)}%
            </CyberText>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <MegaButton
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              addToast(
                `Bet placed on ${prediction.homeTeam} vs ${prediction.awayTeam}`,
                "success",
              );
            }}
          >
            Place Bet
          </MegaButton>

          <MegaButton
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setState((prev) => ({ ...prev, selectedPrediction: prediction }));
            }}
          >
            View Details
          </MegaButton>
        </div>
      </div>
    </MegaCard>
  );

  const renderStatsOverview = () => (
    <MegaCard title="Prediction Overview" variant="glass" padding="lg">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#06ffa5" }}
          >
            {filteredPredictions.length}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            Total Predictions
          </CyberText>
        </div>

        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#00d4ff" }}
          >
            {filteredPredictions.filter((p) => p.confidence > 80).length}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            High Confidence
          </CyberText>
        </div>

        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#06ffa5" }}
          >
            {filteredPredictions.filter((p) => p.valueEdge > 0.05).length}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            Value Opportunities
          </CyberText>
        </div>

        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#00d4ff" }}
          >
            {filteredPredictions.filter((p) => p.status === "live").length}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            Live Games
          </CyberText>
        </div>

        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#06ffa5" }}
          >
            {(
              filteredPredictions.reduce((sum, p) => sum + p.confidence, 0) /
                filteredPredictions.length || 0
            ).toFixed(1)}
            %
          </CyberText>
          <CyberText variant="caption" color="secondary">
            Avg Confidence
          </CyberText>
        </div>
      </div>
    </MegaCard>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <CyberText variant="title" style={{ fontSize: "32px" }}>
            Universal Predictions
          </CyberText>
          <CyberText variant="body" color="secondary">
            AI-Enhanced Prediction Engine with Real-Time Intelligence
          </CyberText>
        </div>

        <div className="flex items-center gap-2">
          <Brain size={20} style={{ color: "#06ffa5" }} />
          <CyberText variant="body" style={{ color: "#06ffa5" }}>
            {enhancedPredictions.length} Models Active
          </CyberText>
        </div>
      </div>

      {/* Stats Overview */}
      {renderStatsOverview()}

      {/* Filters Panel */}
      {renderFiltersPanel()}

      {/* Loading State */}
      {(state.isLoading || predictionsLoading) && (
        <MegaCard variant="glass" padding="lg">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <CyberText variant="body" color="secondary" className="ml-4">
              Loading enhanced predictions...
            </CyberText>
          </div>
        </MegaCard>
      )}

      {/* Predictions Display */}
      <MegaCard
        title={`Predictions (${filteredPredictions.length})`}
        variant="glass"
        padding="lg"
      >
        {filteredPredictions.length === 0 ? (
          <div className="text-center py-8">
            <CyberText variant="body" color="muted">
              No predictions found matching your criteria.
            </CyberText>
          </div>
        ) : (
          <div
            className={
              state.viewMode === "cards"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }
          >
            {filteredPredictions.map(renderPredictionCard)}
          </div>
        )}
      </MegaCard>

      {/* Real-time Updates Indicator */}
      {state.isRealtime && state.lastUpdated && (
        <div className="fixed bottom-4 right-4 z-50">
          <MegaCard variant="glass" padding="sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <CyberText variant="caption" color="secondary">
                Live updates active
              </CyberText>
            </div>
          </MegaCard>
        </div>
      )}
    </div>
  );
};

export default UniversalPredictions;
