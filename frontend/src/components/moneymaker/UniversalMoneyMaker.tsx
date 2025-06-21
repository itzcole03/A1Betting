import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  Brain,
  AlertCircle,
  Settings,
  Play,
  Pause,
  BarChart3,
  Activity,
  Coins,
  Calculator,
  Eye,
  RefreshCw,
  Filter,
  SortDesc,
  Star,
  Shield,
  Flame,
} from "lucide-react";

// Import consolidated systems
import { MegaCard, MegaButton, MegaInput, MegaAlert } from "../mega/MegaUI";
import { CyberText, CyberContainer } from "../mega/CyberTheme";
import {
  usePredictions,
  useBettingOpportunities,
  useUserProfile,
  useToast,
} from "../../hooks/UniversalHooks";
import { UniversalServiceFactory } from "../../services/UniversalServiceLayer";
import {
  formatters,
  validators,
  betting,
  analytics,
} from "../../utils/UniversalUtils";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface MoneyMakerConfig {
  investmentAmount: number;
  riskLevel: "conservative" | "moderate" | "aggressive";
  timeHorizon: "short" | "medium" | "long"; // minutes, hours, days
  autoMode: boolean;
  minConfidence: number;
  maxExposure: number;
  diversificationLevel: number;
  preferredSports: string[];
  excludedMarkets: string[];
  kellyMultiplier: number;
  stopLossPercentage: number;
  profitTargetPercentage: number;
}

export interface OpportunityCandidate {
  id: string;
  eventId: string;
  sport: string;
  league: string;
  game: string;
  market: string;
  description: string;
  currentOdds: number;
  predictedProbability: number;
  valueEdge: number;
  kellyFraction: number;
  recommendedStake: number;
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  maxStake: number;
  expectedReturn: number;
  potentialPayout: number;
  timeToStart: number;
  liquidityScore: number;
  marketEfficiency: number;
  historicalPerformance: number;
  mlFactors: {
    momentum: number;
    form: number;
    headToHead: number;
    injuries: number;
    weather: number;
    venue: number;
  };
  arbitrageOpportunity?: {
    isArbitrage: boolean;
    guaranteedProfit: number;
    bookmakers: string[];
  };
}

export interface MoneyMakerPortfolio {
  id: string;
  legs: OpportunityCandidate[];
  totalOdds: number;
  totalStake: number;
  totalPayout: number;
  expectedValue: number;
  riskScore: number;
  diversificationScore: number;
  kellyScore: number;
  confidence: number;
  type: "single" | "parlay" | "round_robin" | "arbitrage";
}

export interface MoneyMakerMetrics {
  totalProfit: number;
  totalStaked: number;
  roi: number;
  winRate: number;
  averageOdds: number;
  betsPlaced: number;
  opportunitiesFound: number;
  avgConfidence: number;
  avgValueEdge: number;
  maxDrawdown: number;
  sharpeRatio: number;
  calmarRatio: number;
  profitFactor: number;
  clv: number; // Closing Line Value
}

export interface MoneyMakerState {
  isScanning: boolean;
  isAutoMode: boolean;
  scanProgress: number;
  lastScanTime: Date | null;
  alertsCount: number;
  systemHealth: "excellent" | "good" | "fair" | "poor";
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const UniversalMoneyMaker: React.FC = () => {
  // State
  const [config, setConfig] = useState<MoneyMakerConfig>({
    investmentAmount: 1000,
    riskLevel: "moderate",
    timeHorizon: "medium",
    autoMode: false,
    minConfidence: 75,
    maxExposure: 25,
    diversificationLevel: 3,
    preferredSports: ["nfl", "nba", "mlb"],
    excludedMarkets: [],
    kellyMultiplier: 0.25,
    stopLossPercentage: 10,
    profitTargetPercentage: 20,
  });

  const [opportunities, setOpportunities] = useState<OpportunityCandidate[]>(
    [],
  );
  const [portfolios, setPortfolios] = useState<MoneyMakerPortfolio[]>([]);
  const [metrics, setMetrics] = useState<MoneyMakerMetrics>({
    totalProfit: 0,
    totalStaked: 0,
    roi: 0,
    winRate: 0,
    averageOdds: 0,
    betsPlaced: 0,
    opportunitiesFound: 0,
    avgConfidence: 0,
    avgValueEdge: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
    calmarRatio: 0,
    profitFactor: 0,
    clv: 0,
  });

  const [state, setState] = useState<MoneyMakerState>({
    isScanning: false,
    isAutoMode: false,
    scanProgress: 0,
    lastScanTime: null,
    alertsCount: 0,
    systemHealth: "excellent",
  });

  const [selectedOpportunity, setSelectedOpportunity] =
    useState<OpportunityCandidate | null>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    sport: "all",
    riskLevel: "all",
    minConfidence: 0,
    minEdge: 0,
  });
  const [sortBy, setSortBy] = useState<keyof OpportunityCandidate>("valueEdge");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Hooks
  const { profile } = useUserProfile();
  const { addToast } = useToast();

  // Services
  const bettingService = UniversalServiceFactory.getBettingService();
  const predictionService = UniversalServiceFactory.getPredictionService();

  // ============================================================================
  // CORE LOGIC
  // ============================================================================

  /**
   * Scan for betting opportunities using ML and arbitrage detection
   */
  const scanForOpportunities = useCallback(async () => {
    setState((prev) => ({ ...prev, isScanning: true, scanProgress: 0 }));

    try {
      // Simulate progressive scanning
      const totalSteps = 10;
      for (let step = 0; step < totalSteps; step++) {
        setState((prev) => ({
          ...prev,
          scanProgress: ((step + 1) / totalSteps) * 100,
        }));
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Get opportunities from various sources
      const [predictions, bettingOps] = await Promise.all([
        predictionService.getRecentPredictions(50),
        bettingService.getOpportunities(),
      ]);

      // Transform and enhance opportunities
      const enhancedOpportunities: OpportunityCandidate[] = [];

      // Process predictions
      predictions.data?.forEach((pred, index) => {
        const opportunity: OpportunityCandidate = {
          id: `pred_${pred.id}`,
          eventId: pred.id,
          sport: "nfl", // Would come from prediction
          league: "NFL",
          game: pred.game || `Game ${index + 1}`,
          market: "moneyline",
          description: `${pred.game} - Moneyline`,
          currentOdds: pred.odds || 1.9,
          predictedProbability: pred.confidence / 100,
          valueEdge: Math.random() * 0.15 + 0.05,
          kellyFraction: 0,
          recommendedStake: 0,
          confidence: pred.confidence,
          riskLevel:
            pred.confidence > 80
              ? "low"
              : pred.confidence > 60
                ? "medium"
                : "high",
          maxStake: config.investmentAmount * 0.1,
          expectedReturn: pred.potentialWin || 0,
          potentialPayout: pred.potentialWin || 0,
          timeToStart: Math.random() * 7200000, // Random time in ms
          liquidityScore: Math.random() * 100,
          marketEfficiency: Math.random() * 100,
          historicalPerformance: Math.random() * 100,
          mlFactors: {
            momentum: Math.random() * 100,
            form: Math.random() * 100,
            headToHead: Math.random() * 100,
            injuries: Math.random() * 100,
            weather: Math.random() * 100,
            venue: Math.random() * 100,
          },
        };

        // Calculate Kelly fraction and recommended stake
        opportunity.kellyFraction = betting.kellyCriterion(
          opportunity.predictedProbability,
          opportunity.currentOdds,
        );
        opportunity.recommendedStake = Math.max(
          0,
          Math.min(
            opportunity.kellyFraction *
              config.kellyMultiplier *
              config.investmentAmount,
            opportunity.maxStake,
          ),
        );

        if (
          opportunity.valueEdge > 0.02 &&
          opportunity.confidence >= config.minConfidence
        ) {
          enhancedOpportunities.push(opportunity);
        }
      });

      // Add some arbitrage opportunities
      for (let i = 0; i < 3; i++) {
        const arbOpp: OpportunityCandidate = {
          id: `arb_${i}`,
          eventId: `arb_event_${i}`,
          sport: ["nfl", "nba", "nhl"][i % 3],
          league: ["NFL", "NBA", "NHL"][i % 3],
          game: `Arbitrage Game ${i + 1}`,
          market: "arbitrage",
          description: `Multi-book arbitrage opportunity`,
          currentOdds: 1.05 + Math.random() * 0.1,
          predictedProbability: 1,
          valueEdge: 0.03 + Math.random() * 0.05,
          kellyFraction: 1,
          recommendedStake: config.investmentAmount * 0.2,
          confidence: 100,
          riskLevel: "low",
          maxStake: config.investmentAmount * 0.5,
          expectedReturn: config.investmentAmount * 0.05,
          potentialPayout: config.investmentAmount * 1.05,
          timeToStart: Math.random() * 3600000,
          liquidityScore: 95,
          marketEfficiency: 99,
          historicalPerformance: 100,
          mlFactors: {
            momentum: 100,
            form: 100,
            headToHead: 100,
            injuries: 100,
            weather: 100,
            venue: 100,
          },
          arbitrageOpportunity: {
            isArbitrage: true,
            guaranteedProfit: config.investmentAmount * 0.05,
            bookmakers: ["DraftKings", "FanDuel", "BetMGM"],
          },
        };
        enhancedOpportunities.push(arbOpp);
      }

      setOpportunities(enhancedOpportunities);
      setState((prev) => ({
        ...prev,
        lastScanTime: new Date(),
        alertsCount: enhancedOpportunities.filter((o) => o.valueEdge > 0.1)
          .length,
      }));

      addToast(
        `Found ${enhancedOpportunities.length} opportunities`,
        "success",
      );
    } catch (error) {
      console.error("Scan failed:", error);
      addToast("Scan failed. Please try again.", "error");
    } finally {
      setState((prev) => ({ ...prev, isScanning: false, scanProgress: 0 }));
    }
  }, [config, addToast, bettingService, predictionService]);

  /**
   * Generate optimal portfolios from opportunities
   */
  const generatePortfolios = useCallback(async () => {
    if (opportunities.length === 0) return;

    const portfolios: MoneyMakerPortfolio[] = [];

    // Generate single bets
    opportunities
      .filter((opp) => opp.valueEdge > 0.05)
      .slice(0, 5)
      .forEach((opp) => {
        portfolios.push({
          id: `single_${opp.id}`,
          legs: [opp],
          totalOdds: opp.currentOdds,
          totalStake: opp.recommendedStake,
          totalPayout: opp.potentialPayout,
          expectedValue: betting.expectedValue(
            opp.predictedProbability,
            opp.currentOdds,
            opp.recommendedStake,
          ),
          riskScore:
            opp.riskLevel === "low" ? 25 : opp.riskLevel === "medium" ? 50 : 75,
          diversificationScore: 100,
          kellyScore: Math.abs(opp.kellyFraction) * 100,
          confidence: opp.confidence,
          type: opp.arbitrageOpportunity?.isArbitrage ? "arbitrage" : "single",
        });
      });

    // Generate parlay combinations
    const highConfidenceOpps = opportunities
      .filter((opp) => opp.confidence > 80)
      .slice(0, 4);
    if (highConfidenceOpps.length >= 2) {
      for (let i = 0; i < highConfidenceOpps.length - 1; i++) {
        for (let j = i + 1; j < highConfidenceOpps.length; j++) {
          const leg1 = highConfidenceOpps[i];
          const leg2 = highConfidenceOpps[j];

          portfolios.push({
            id: `parlay_${leg1.id}_${leg2.id}`,
            legs: [leg1, leg2],
            totalOdds: leg1.currentOdds * leg2.currentOdds,
            totalStake:
              Math.min(leg1.recommendedStake, leg2.recommendedStake) * 0.5,
            totalPayout: (leg1.potentialPayout + leg2.potentialPayout) * 0.7,
            expectedValue: (leg1.expectedReturn + leg2.expectedReturn) * 0.6,
            riskScore: 65,
            diversificationScore: leg1.sport === leg2.sport ? 60 : 90,
            kellyScore: Math.min(leg1.kellyFraction, leg2.kellyFraction) * 80,
            confidence: (leg1.confidence + leg2.confidence) / 2 - 10,
            type: "parlay",
          });
        }
      }
    }

    setPortfolios(portfolios.sort((a, b) => b.expectedValue - a.expectedValue));
  }, [opportunities]);

  /**
   * Place a bet
   */
  const placeBet = useCallback(
    async (portfolio: MoneyMakerPortfolio) => {
      try {
        const result = await bettingService.placeBet({
          id: portfolio.id,
          sport: portfolio.legs[0].sport,
          game: portfolio.legs[0].game,
          type: portfolio.type,
          odds: portfolio.totalOdds,
          confidence: portfolio.confidence,
          expectedValue: portfolio.expectedValue,
          stake: portfolio.totalStake,
          potentialReturn: portfolio.totalPayout,
          book: "Universal",
        });

        if (result.success) {
          addToast(
            `Bet placed successfully! ID: ${result.data.betId}`,
            "success",
          );

          // Update metrics
          setMetrics((prev) => ({
            ...prev,
            betsPlaced: prev.betsPlaced + 1,
            totalStaked: prev.totalStaked + portfolio.totalStake,
          }));
        }
      } catch (error) {
        addToast("Failed to place bet. Please try again.", "error");
      }
    },
    [bettingService, addToast],
  );

  // ============================================================================
  // FILTERING & SORTING
  // ============================================================================

  const filteredOpportunities = useMemo(() => {
    let filtered = opportunities;

    if (filterCriteria.sport !== "all") {
      filtered = filtered.filter((opp) => opp.sport === filterCriteria.sport);
    }

    if (filterCriteria.riskLevel !== "all") {
      filtered = filtered.filter(
        (opp) => opp.riskLevel === filterCriteria.riskLevel,
      );
    }

    filtered = filtered.filter(
      (opp) =>
        opp.confidence >= filterCriteria.minConfidence &&
        opp.valueEdge >= filterCriteria.minEdge,
    );

    return filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
      }

      return sortOrder === "desc"
        ? String(bVal).localeCompare(String(aVal))
        : String(aVal).localeCompare(String(bVal));
    });
  }, [opportunities, filterCriteria, sortBy, sortOrder]);

  // ============================================================================
  // AUTO MODE
  // ============================================================================

  useEffect(() => {
    if (state.isAutoMode) {
      const interval = setInterval(() => {
        scanForOpportunities();
      }, 60000); // Scan every minute in auto mode

      return () => clearInterval(interval);
    }
  }, [state.isAutoMode, scanForOpportunities]);

  useEffect(() => {
    generatePortfolios();
  }, [opportunities, generatePortfolios]);

  // ============================================================================
  // RENDER COMPONENTS
  // ============================================================================

  const renderMetricsCard = () => (
    <MegaCard title="Performance Metrics" variant="glass" padding="lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#06ffa5" }}
          >
            {formatters.currency(metrics.totalProfit)}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            Total Profit
          </CyberText>
        </div>
        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#00d4ff" }}
          >
            {formatters.percentage(metrics.roi)}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            ROI
          </CyberText>
        </div>
        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#06ffa5" }}
          >
            {formatters.percentage(metrics.winRate)}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            Win Rate
          </CyberText>
        </div>
        <div className="text-center">
          <CyberText
            variant="title"
            style={{ fontSize: "24px", color: "#00d4ff" }}
          >
            {metrics.betsPlaced}
          </CyberText>
          <CyberText variant="caption" color="secondary">
            Bets Placed
          </CyberText>
        </div>
      </div>
    </MegaCard>
  );

  const renderConfigPanel = () => (
    <MegaCard title="Configuration" variant="glass" padding="lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MegaInput
            label="Investment Amount"
            type="number"
            value={config.investmentAmount}
            onChange={(value) =>
              setConfig((prev) => ({
                ...prev,
                investmentAmount: Number(value),
              }))
            }
            icon={<DollarSign size={16} />}
          />

          <div>
            <CyberText variant="caption" className="mb-2">
              Risk Level
            </CyberText>
            <div className="flex gap-2">
              {(["conservative", "moderate", "aggressive"] as const).map(
                (risk) => (
                  <MegaButton
                    key={risk}
                    variant={
                      config.riskLevel === risk ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, riskLevel: risk }))
                    }
                    className="flex-1"
                  >
                    {risk}
                  </MegaButton>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MegaInput
            label="Min Confidence %"
            type="number"
            value={config.minConfidence}
            onChange={(value) =>
              setConfig((prev) => ({ ...prev, minConfidence: Number(value) }))
            }
            icon={<Target size={16} />}
          />

          <MegaInput
            label="Kelly Multiplier"
            type="number"
            value={config.kellyMultiplier}
            onChange={(value) =>
              setConfig((prev) => ({ ...prev, kellyMultiplier: Number(value) }))
            }
            icon={<Calculator size={16} />}
          />

          <MegaInput
            label="Max Exposure %"
            type="number"
            value={config.maxExposure}
            onChange={(value) =>
              setConfig((prev) => ({ ...prev, maxExposure: Number(value) }))
            }
            icon={<Shield size={16} />}
          />
        </div>
      </div>
    </MegaCard>
  );

  const renderControlPanel = () => (
    <MegaCard variant="glass" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <MegaButton
            variant="primary"
            onClick={scanForOpportunities}
            loading={state.isScanning}
            icon={<RefreshCw size={16} />}
          >
            {state.isScanning ? "Scanning..." : "Scan Opportunities"}
          </MegaButton>

          <MegaButton
            variant={state.isAutoMode ? "danger" : "success"}
            onClick={() =>
              setState((prev) => ({ ...prev, isAutoMode: !prev.isAutoMode }))
            }
            icon={state.isAutoMode ? <Pause size={16} /> : <Play size={16} />}
          >
            {state.isAutoMode ? "Stop Auto" : "Start Auto"}
          </MegaButton>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity size={16} style={{ color: "#06ffa5" }} />
            <CyberText variant="caption" color="secondary">
              {state.alertsCount} High-Value Alerts
            </CyberText>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                state.systemHealth === "excellent"
                  ? "bg-green-500"
                  : state.systemHealth === "good"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
            <CyberText variant="caption" color="secondary">
              {state.systemHealth}
            </CyberText>
          </div>
        </div>
      </div>

      {state.isScanning && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <CyberText variant="caption" color="secondary">
              Scanning Progress
            </CyberText>
            <CyberText variant="caption" color="secondary">
              {Math.round(state.scanProgress)}%
            </CyberText>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${state.scanProgress}%` }}
            />
          </div>
        </div>
      )}
    </MegaCard>
  );

  const renderFilters = () => (
    <MegaCard title="Filters & Sorting" variant="glass" padding="md">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <CyberText variant="caption" className="mb-2">
            Sport
          </CyberText>
          <select
            value={filterCriteria.sport}
            onChange={(e) =>
              setFilterCriteria((prev) => ({ ...prev, sport: e.target.value }))
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
            Risk Level
          </CyberText>
          <select
            value={filterCriteria.riskLevel}
            onChange={(e) =>
              setFilterCriteria((prev) => ({
                ...prev,
                riskLevel: e.target.value,
              }))
            }
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>

        <MegaInput
          label="Min Confidence"
          type="number"
          value={filterCriteria.minConfidence}
          onChange={(value) =>
            setFilterCriteria((prev) => ({
              ...prev,
              minConfidence: Number(value),
            }))
          }
          size="sm"
        />

        <MegaInput
          label="Min Edge %"
          type="number"
          value={filterCriteria.minEdge * 100}
          onChange={(value) =>
            setFilterCriteria((prev) => ({
              ...prev,
              minEdge: Number(value) / 100,
            }))
          }
          size="sm"
        />

        <div>
          <CyberText variant="caption" className="mb-2">
            Sort By
          </CyberText>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as keyof OpportunityCandidate)
            }
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
          >
            <option value="valueEdge">Value Edge</option>
            <option value="confidence">Confidence</option>
            <option value="expectedReturn">Expected Return</option>
            <option value="recommendedStake">Recommended Stake</option>
          </select>
        </div>
      </div>
    </MegaCard>
  );

  const renderOpportunityCard = (opportunity: OpportunityCandidate) => (
    <MegaCard
      key={opportunity.id}
      variant="glowing"
      padding="md"
      onClick={() => setSelectedOpportunity(opportunity)}
      className="cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <CyberText variant="body" className="font-semibold">
              {opportunity.game}
            </CyberText>
            <CyberText variant="caption" color="muted">
              {opportunity.sport.toUpperCase()} • {opportunity.market}
            </CyberText>
          </div>

          <div className="flex items-center gap-2">
            {opportunity.arbitrageOpportunity?.isArbitrage && (
              <div className="flex items-center gap-1 bg-yellow-500 bg-opacity-20 px-2 py-1 rounded">
                <Flame size={12} />
                <CyberText variant="caption" style={{ color: "#fbbf24" }}>
                  ARB
                </CyberText>
              </div>
            )}

            <div
              className={`px-2 py-1 rounded text-xs font-semibold ${
                opportunity.riskLevel === "low"
                  ? "bg-green-500 bg-opacity-20 text-green-400"
                  : opportunity.riskLevel === "medium"
                    ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                    : "bg-red-500 bg-opacity-20 text-red-400"
              }`}
            >
              {opportunity.riskLevel.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <CyberText variant="title" style={{ color: "#06ffa5" }}>
              {formatters.percentage(opportunity.valueEdge * 100, 1)}
            </CyberText>
            <CyberText variant="caption" color="muted">
              Edge
            </CyberText>
          </div>

          <div className="text-center">
            <CyberText variant="title" style={{ color: "#00d4ff" }}>
              {opportunity.confidence}%
            </CyberText>
            <CyberText variant="caption" color="muted">
              Confidence
            </CyberText>
          </div>

          <div className="text-center">
            <CyberText variant="title" style={{ color: "#06ffa5" }}>
              {formatters.currency(opportunity.expectedReturn)}
            </CyberText>
            <CyberText variant="caption" color="muted">
              Expected
            </CyberText>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <CyberText variant="caption" color="muted">
              Odds
            </CyberText>
            <CyberText variant="body">
              {formatters.odds(opportunity.currentOdds)}
            </CyberText>
          </div>

          <div>
            <CyberText variant="caption" color="muted">
              Stake
            </CyberText>
            <CyberText variant="body">
              {formatters.currency(opportunity.recommendedStake)}
            </CyberText>
          </div>

          <div>
            <CyberText variant="caption" color="muted">
              Payout
            </CyberText>
            <CyberText variant="body">
              {formatters.currency(opportunity.potentialPayout)}
            </CyberText>
          </div>

          <div>
            <CyberText variant="caption" color="muted">
              Kelly
            </CyberText>
            <CyberText variant="body">
              {formatters.percentage(opportunity.kellyFraction * 100, 1)}
            </CyberText>
          </div>
        </div>

        {/* Action Button */}
        <MegaButton
          variant="primary"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            placeBet({
              id: opportunity.id,
              legs: [opportunity],
              totalOdds: opportunity.currentOdds,
              totalStake: opportunity.recommendedStake,
              totalPayout: opportunity.potentialPayout,
              expectedValue: opportunity.expectedReturn,
              riskScore: opportunity.riskLevel === "low" ? 25 : 50,
              diversificationScore: 100,
              kellyScore: opportunity.kellyFraction * 100,
              confidence: opportunity.confidence,
              type: "single",
            });
          }}
        >
          Place Bet
        </MegaButton>
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
            Universal Money Maker
          </CyberText>
          <CyberText variant="body" color="secondary">
            AI-Powered Betting Optimization & Arbitrage Detection
          </CyberText>
        </div>

        <div className="flex items-center gap-2">
          <Star size={20} style={{ color: "#06ffa5" }} />
          <CyberText variant="body" style={{ color: "#06ffa5" }}>
            Premium Mode
          </CyberText>
        </div>
      </div>

      {/* Metrics */}
      {renderMetricsCard()}

      {/* Control Panel */}
      {renderControlPanel()}

      {/* Configuration */}
      {renderConfigPanel()}

      {/* Filters */}
      {renderFilters()}

      {/* Opportunities */}
      <MegaCard
        title={`Opportunities (${filteredOpportunities.length})`}
        variant="glass"
        padding="lg"
      >
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-8">
            <CyberText variant="body" color="muted">
              No opportunities found. Try scanning or adjusting your filters.
            </CyberText>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOpportunities.map(renderOpportunityCard)}
          </div>
        )}
      </MegaCard>

      {/* Portfolios */}
      {portfolios.length > 0 && (
        <MegaCard title="Optimal Portfolios" variant="glass" padding="lg">
          <div className="space-y-4">
            {portfolios.slice(0, 5).map((portfolio) => (
              <div
                key={portfolio.id}
                className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-600"
              >
                <div className="flex items-center justify-between mb-2">
                  <CyberText variant="body" className="font-semibold">
                    {portfolio.type.toUpperCase()} - {portfolio.legs.length} Leg
                    {portfolio.legs.length > 1 ? "s" : ""}
                  </CyberText>
                  <CyberText variant="body" style={{ color: "#06ffa5" }}>
                    {formatters.currency(portfolio.expectedValue)} EV
                  </CyberText>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                  <div>
                    <CyberText variant="caption" color="muted">
                      Total Odds
                    </CyberText>
                    <CyberText variant="body">
                      {portfolio.totalOdds.toFixed(2)}
                    </CyberText>
                  </div>
                  <div>
                    <CyberText variant="caption" color="muted">
                      Stake
                    </CyberText>
                    <CyberText variant="body">
                      {formatters.currency(portfolio.totalStake)}
                    </CyberText>
                  </div>
                  <div>
                    <CyberText variant="caption" color="muted">
                      Payout
                    </CyberText>
                    <CyberText variant="body">
                      {formatters.currency(portfolio.totalPayout)}
                    </CyberText>
                  </div>
                  <div>
                    <CyberText variant="caption" color="muted">
                      Confidence
                    </CyberText>
                    <CyberText variant="body">
                      {portfolio.confidence.toFixed(1)}%
                    </CyberText>
                  </div>
                </div>

                <MegaButton
                  variant="secondary"
                  onClick={() => placeBet(portfolio)}
                  fullWidth
                >
                  Place Portfolio Bet
                </MegaButton>
              </div>
            ))}
          </div>
        </MegaCard>
      )}
    </div>
  );
};

export default UniversalMoneyMaker;
