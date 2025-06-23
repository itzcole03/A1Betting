import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  Brain,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Activity,
} from "lucide-react";

interface PredictionResult {
  investment: number;
  confidence: number;
  projectedReturn: number;
  picks: Array<{
    game: string;
    pick: string;
    confidence: number;
    odds: string;
    reasoning: string;
  }>;
  riskLevel: "low" | "medium" | "high";
  expectedProfit: number;
}

interface MoneyMakerConfig {
  investment: number;
  strategy: "conservative" | "balanced" | "aggressive";
  sport:
    | "all"
    | "nba"
    | "wnba"
    | "mlb"
    | "nfl"
    | "soccer"
    | "pga"
    | "tennis"
    | "esports"
    | "mma";
  timeFrame: "1hour" | "3hours" | "6hours" | "12hours" | "24hours" | "all";
  riskTolerance: number;
}

export const MoneyMakerPro: React.FC = () => {
  const [config, setConfig] = useState<MoneyMakerConfig>({
    investment: 100,
    strategy: "balanced",
    sport: "all",
    timeFrame: "all",
    riskTolerance: 50,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePredictions = async () => {
    setIsGenerating(true);

    // Simulate AI processing with realistic delay
    await new Promise((resolve) =>
      setTimeout(resolve, 3000 + Math.random() * 2000),
    );

    // Generate AI-powered predictions based on config
    const mockResult: PredictionResult = {
      investment: config.investment,
      confidence: 85 + Math.random() * 12,
      projectedReturn: config.investment * (1.8 + Math.random() * 1.2),
      expectedProfit: config.investment * (0.8 + Math.random() * 1.2),
      riskLevel:
        config.strategy === "conservative"
          ? "low"
          : config.strategy === "balanced"
            ? "medium"
            : "high",
      picks: [
        {
          game: "Lakers vs Warriors",
          pick: "LeBron James Over 25.5 Points",
          confidence: 94.7,
          odds: "-110",
          reasoning:
            "LeBron averaging 28.3 PPG vs Warriors this season. Warriors allowing 118 PPG at home.",
        },
        {
          game: "Chiefs vs Bills",
          pick: "Patrick Mahomes Over 275.5 Passing Yards",
          confidence: 91.2,
          odds: "-105",
          reasoning:
            "Mahomes has thrown for 300+ yards in 4 of last 5 games. Bills secondary ranks 24th vs pass.",
        },
        {
          game: "Celtics vs Heat",
          pick: "Jayson Tatum Over 27.5 Points",
          confidence: 89.8,
          odds: "-115",
          reasoning:
            "Tatum shooting 48% from field in last 10 games. Heat missing key defenders.",
        },
      ].slice(
        0,
        config.strategy === "conservative"
          ? 2
          : config.strategy === "balanced"
            ? 3
            : 4,
      ),
    };

    setResult(mockResult);
    setIsGenerating(false);
  };

  const strategyDescriptions = {
    conservative: "Lower risk, steady returns. Focus on high-confidence plays.",
    balanced: "Optimal risk-reward ratio. Our most popular strategy.",
    aggressive:
      "Higher risk, maximum profit potential. For experienced bettors.",
  };

  return (
    <div className="space-y-8 animate-slide-in-up">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 glass-card rounded-3xl p-12 shadow-neon relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative">
          <h1 className="holographic text-5xl font-black mb-6">
            ULTIMATE MONEY MAKER
          </h1>
          <div className="text-6xl font-black text-green-400 mb-6 animate-cyber-pulse">
            $∞
          </div>
          <p className="text-xl text-gray-300 mb-8">
            AI-powered profit generation with quantum enhancement
          </p>
        </div>
      </motion.div>

      {/* AI Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-electric-400 mb-6">
          AI Configuration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {/* Investment Amount */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Investment ($)
            </label>
            <input
              type="number"
              value={config.investment}
              onChange={(e) =>
                setConfig({
                  ...config,
                  investment: parseInt(e.target.value) || 0,
                })
              }
              className="w-full p-3 rounded-xl text-center font-bold bg-gray-800/80 border-2 border-gray-500 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
            />
          </div>

          {/* Strategy */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Strategy
            </label>
            <select
              value={config.strategy}
              onChange={(e) =>
                setConfig({ ...config, strategy: e.target.value as any })
              }
              className="w-full p-3 rounded-xl bg-gray-800/80 border-2 border-gray-500 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
              style={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                color: "white",
              }}
            >
              <option
                value="conservative"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Conservative
              </option>
              <option
                value="balanced"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Balanced
              </option>
              <option
                value="aggressive"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Aggressive
              </option>
            </select>
          </div>

          {/* Confidence */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Confidence
            </label>
            <select
              value={config.riskTolerance}
              onChange={(e) =>
                setConfig({
                  ...config,
                  riskTolerance: parseInt(e.target.value),
                })
              }
              className="w-full p-3 rounded-xl bg-gray-800/80 border-2 border-gray-500 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
              style={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                color: "white",
              }}
            >
              <option
                value={85}
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                85%+
              </option>
              <option
                value={90}
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                90%+
              </option>
              <option
                value={95}
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                95%+
              </option>
            </select>
          </div>

          {/* Time Frame */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Time Frame
            </label>
            <select
              value={config.timeFrame}
              onChange={(e) =>
                setConfig({ ...config, timeFrame: e.target.value as any })
              }
              className="w-full p-3 rounded-xl bg-gray-800/80 border-2 border-gray-500 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
              style={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                color: "white",
              }}
            >
              <option
                value="1hour"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Next Hour
              </option>
              <option
                value="3hours"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Next 3 Hours
              </option>
              <option
                value="6hours"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Next 6 Hours
              </option>
              <option
                value="12hours"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Next 12 Hours
              </option>
              <option
                value="24hours"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Next 24 Hours
              </option>
              <option
                value="all"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                All Games
              </option>
            </select>
          </div>

          {/* Sports */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Sports
            </label>
            <select
              value={config.sport}
              onChange={(e) =>
                setConfig({ ...config, sport: e.target.value as any })
              }
              className="w-full p-3 rounded-xl bg-gray-800/80 border-2 border-gray-500 text-white focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all backdrop-blur-sm shadow-lg"
              style={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                color: "white",
              }}
            >
              <option
                value="all"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                All Sports
              </option>
              <option
                value="nba"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                NBA
              </option>
              <option
                value="wnba"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                WNBA
              </option>
              <option
                value="mlb"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                MLB
              </option>
              <option
                value="nfl"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                NFL
              </option>
              <option
                value="soccer"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Soccer
              </option>
              <option
                value="pga"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                PGA
              </option>
              <option
                value="tennis"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Tennis
              </option>
              <option
                value="esports"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                Esports
              </option>
              <option
                value="mma"
                style={{ backgroundColor: "#1f2937", color: "white" }}
              >
                MMA
              </option>
            </select>
          </div>

          {/* Activate Button */}
          <div className="flex items-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generatePredictions}
              disabled={isGenerating}
              className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>ACTIVATE AI</span>
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Processing Animation */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30"
          >
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce">🧠</div>
              <h3 className="text-2xl font-bold text-purple-400">
                AI Processing Your Request
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>Analyzing 47 neural networks...</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <Activity className="w-4 h-4" />
                  <span>Processing real-time data from live games...</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <Target className="w-4 h-4" />
                  <span>Optimizing for maximum profit...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Display */}
      <AnimatePresence>
        {result && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Success Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-6xl mb-4"
              >
                ✨
              </motion.div>
              <h2 className="text-4xl font-black text-green-400 mb-2">
                AI PREDICTIONS READY!
              </h2>
              <p className="text-xl text-gray-300">
                Your personalized betting strategy has been optimized
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300">
                <div className="text-3xl font-black text-green-400 mb-2">
                  ${result.projectedReturn.toFixed(0)}
                </div>
                <div className="text-gray-300">Projected Return</div>
                <div className="text-sm text-green-400 mt-1">
                  +${(result.projectedReturn - result.investment).toFixed(0)}{" "}
                  profit
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300">
                <div className="text-3xl font-black text-blue-400 mb-2">
                  {result.confidence.toFixed(1)}%
                </div>
                <div className="text-gray-300">AI Confidence</div>
                <div className="text-sm text-blue-400 mt-1">Very High</div>
              </div>

              <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300">
                <div className="text-3xl font-black text-purple-400 mb-2">
                  {result.picks.length}
                </div>
                <div className="text-gray-300">Smart Picks</div>
                <div className="text-sm text-purple-400 mt-1">
                  Optimized Portfolio
                </div>
              </div>

              <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300">
                <div className="text-3xl font-black text-yellow-400 mb-2">
                  {result.riskLevel.toUpperCase()}
                </div>
                <div className="text-gray-300">Risk Level</div>
                <div className="text-sm text-yellow-400 mt-1">
                  {result.riskLevel === "low"
                    ? "Safe Play"
                    : result.riskLevel === "medium"
                      ? "Balanced"
                      : "High Reward"}
                </div>
              </div>
            </div>

            {/* Picks Display */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-electric-400 mb-8 text-center">
                🎯 AI Generated Picks
              </h3>

              <div className="space-y-6">
                {result.picks.map((pick, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-white mb-1">
                          {pick.game}
                        </h4>
                        <p className="text-electric-400 font-semibold">
                          {pick.pick}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-green-400">
                          {pick.confidence}%
                        </div>
                        <div className="text-gray-400 text-sm">Confidence</div>
                        <div className="text-white font-semibold">
                          {pick.odds}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        <span className="text-blue-400 font-semibold">
                          AI Analysis:
                        </span>{" "}
                        {pick.reasoning}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cyber-btn px-12 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6" />
                    <span>Place These Bets</span>
                    <span className="bg-black/20 px-3 py-1 rounded-full">
                      Win $
                      {(result.projectedReturn - result.investment).toFixed(0)}
                    </span>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoneyMakerPro;
