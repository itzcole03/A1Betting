import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Brain,
  Zap,
  Trophy,
  Star,
  Clock,
  Eye,
  ArrowRight,
  PlayCircle,
  BarChart3,
} from "lucide-react";

interface LiveStats {
  totalProfit: number;
  winRate: number;
  activeGames: number;
  aiAccuracy: number;
  todaysPicks: number;
  liveAlerts: number;
}

interface LiveGame {
  id: string;
  teams: string;
  time: string;
  aiPick: string;
  confidence: number;
  status: "live" | "upcoming" | "final";
}

export const UserFriendlyDashboard: React.FC<{
  onNavigate: (page: string) => void;
}> = ({ onNavigate }) => {
  const [liveStats, setLiveStats] = useState<LiveStats>({
    totalProfit: 47756,
    winRate: 94.7,
    activeGames: 23,
    aiAccuracy: 97.3,
    todaysPicks: 12,
    liveAlerts: 8,
  });

  const [liveGames] = useState<LiveGame[]>([
    {
      id: "1",
      teams: "Lakers vs Warriors",
      time: "Live - Q3 2:47",
      aiPick: "LeBron Over 25.5 Points ✅",
      confidence: 94.7,
      status: "live",
    },
    {
      id: "2",
      teams: "Chiefs vs Bills",
      time: "Live - Q2 8:23",
      aiPick: "Mahomes Over 275.5 Yards",
      confidence: 91.2,
      status: "live",
    },
    {
      id: "3",
      teams: "Celtics vs Heat",
      time: "Tonight 8:00 PM",
      aiPick: "Tatum Over 27.5 Points",
      confidence: 89.8,
      status: "upcoming",
    },
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        ...prev,
        totalProfit: prev.totalProfit + Math.floor(Math.random() * 500 + 100),
        winRate: Math.min(99.9, prev.winRate + (Math.random() - 0.5) * 0.1),
        aiAccuracy: Math.min(
          99.9,
          prev.aiAccuracy + (Math.random() - 0.5) * 0.05,
        ),
        activeGames: Math.max(
          15,
          prev.activeGames + Math.floor(Math.random() * 3 - 1),
        ),
        liveAlerts: Math.max(
          5,
          prev.liveAlerts + Math.floor(Math.random() * 2 - 1),
        ),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="text-8xl mb-6 animate-float">💰</div>
          <h1 className="holographic text-6xl font-black mb-6">
            A1BETTING INTELLIGENCE
          </h1>
          <div className="text-6xl font-black text-electric-500 mb-6 animate-cyber-pulse">
            $∞
          </div>
          <p className="text-2xl text-gray-300 mb-8">
            Real-time AI-powered sports analysis with quantum enhancement
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-green-400 font-semibold drop-shadow-lg">
                All Systems Online
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-blue-500/10 rounded-lg border border-blue-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
              <span className="text-blue-400 font-semibold drop-shadow-lg">
                {liveStats.activeGames} Live Games
              </span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
              <span className="text-purple-400 font-semibold drop-shadow-lg">
                Quantum Processing Active
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105">
          <div className="text-3xl mb-3 text-electric-400">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse">
            ${liveStats.totalProfit.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm mb-2">Total Profit (Today)</div>
          <div className="flex items-center justify-center text-xs text-green-400">
            <i className="fas fa-arrow-up mr-1"></i>
            +$1.2K (1h)
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105">
          <div className="text-3xl mb-3 text-electric-400">
            <i className="fas fa-target"></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse">
            {liveStats.winRate.toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm mb-2">AI Win Rate</div>
          <div className="flex items-center justify-center text-xs text-green-400">
            <i className="fas fa-arrow-up mr-1"></i>
            +0.3% (24h)
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105">
          <div className="text-3xl mb-3 text-electric-400">
            <i className="fas fa-brain"></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse">
            {liveStats.aiAccuracy.toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm mb-2">Real-Time Accuracy</div>
          <div className="flex items-center justify-center text-xs text-green-400">
            <i className="fas fa-arrow-up mr-1"></i>
            +0.2% (1h)
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105">
          <div className="text-3xl mb-3 text-electric-400">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse">
            {liveStats.liveAlerts}
          </div>
          <div className="text-gray-400 text-sm mb-2">Live Alerts</div>
          <div className="flex items-center justify-center text-xs text-green-400">
            <i className="fas fa-arrow-up mr-1"></i>
            +3 new
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Money Maker Pro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() => onNavigate("money-maker")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-green-400 animate-float">💰</div>
          <h3 className="text-xl font-bold mb-2 text-green-400">
            Money Maker Pro
          </h3>
          <p className="text-gray-300 mb-4 text-sm">
            AI-powered profit generation with quantum enhancement
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300">
            <div className="flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* PrizePicks Pro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() => onNavigate("prizepicks")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-blue-400 animate-float">🏆</div>
          <h3 className="text-xl font-bold mb-2 text-blue-400">
            PrizePicks Pro
          </h3>
          <p className="text-gray-300 mb-4 text-sm">
            Enhanced player prop analysis with AI recommendations
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300">
            <div className="flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* PropOllama Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() => onNavigate("propgpt")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-purple-400 animate-float">🤖</div>
          <h3 className="text-xl font-bold mb-2 text-purple-400">
            propOllama&nbsp;Chat
          </h3>
          <p className="text-gray-300 mb-4 text-sm">
            Discuss all things sports with a real-time AI expert
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300">
            <div className="flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* Live Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() => onNavigate("analytics")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-orange-400 animate-float">📊</div>
          <h3 className="text-xl font-bold mb-2 text-orange-400">
            Live Analytics
          </h3>
          <p className="text-gray-300 mb-4 text-sm">
            Real-time data analysis and performance tracking
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300">
            <div className="flex items-center justify-center space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Live Games Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="glass-card rounded-2xl p-8 shadow-neon">
          <h3 className="text-2xl font-bold text-electric-400 mb-6 text-center">
            🔴 Live Games Analysis
          </h3>
          <div className="space-y-4">
            {liveGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${
                  game.status === "live"
                    ? "bg-green-500/10 border-green-500/30"
                    : game.status === "upcoming"
                      ? "bg-blue-500/10 border-blue-500/30"
                      : "bg-gray-500/10 border-gray-500/30"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        game.status === "live"
                          ? "bg-green-400 animate-pulse shadow-lg shadow-green-400/50"
                          : game.status === "upcoming"
                            ? "bg-blue-400"
                            : "bg-gray-400"
                      }`}
                    />
                    <div>
                      <h4 className="font-bold text-white">{game.teams}</h4>
                      <p className="text-gray-400 text-sm">{game.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-electric-400 font-semibold">
                      {game.aiPick}
                    </div>
                    <div className="text-sm text-green-400">
                      {game.confidence}% confidence
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-electric-400 mb-6 text-center">
            🧠 AI Processing Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-electric-500/10 rounded-lg">
              <div className="w-2 h-2 bg-electric-400 rounded-full animate-pulse shadow-lg shadow-electric-400/50" />
              <span className="text-electric-300 text-sm">
                Neural Network processed 1,247 data points (12ms)
              </span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-purple-500/10 rounded-lg">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
              <span className="text-purple-300 text-sm">
                Quantum processor generated new prediction
              </span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-blue-500/10 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
              <span className="text-blue-300 text-sm">
                Ensemble model accuracy increased to 97.3%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserFriendlyDashboard;
