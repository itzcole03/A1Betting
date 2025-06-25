import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Trophy,
  TrendingUp,
  Target,
  Star,
  CheckCircle,
  DollarSign,
  Activity,
  Brain,
  Zap,
  Award,
  HelpCircle,
  X,
  Users,
  RefreshCw,
} from "lucide-react";
import {
  realDataManager,
  RealPlayerProp,
} from "../../services/RealDataManager";
import { api } from "../../services/api";
import { getPrizePicksRecommendations } from "../../services/enhancedIntegrationBridge";
import OfflineIndicator from "../ui/OfflineIndicator";
import toast from "react-hot-toast";

interface SelectedPick {
  propId: string;
  choice: "over" | "under";
  player: string;
  stat: string;
  line: number;
  confidence: number;
  pickType?: "normal" | "demon" | "goblin";
}

interface LineupEntry {
  id: string;
  picks: SelectedPick[];
  entry_fee: number;
  potential_payout: number;
  multiplier: number;
  status: "draft" | "submitted" | "live" | "completed";
}

// Demons & Goblins Rules Modal Component
const DemonsGoblinsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto border border-purple-500/30"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            Demons &amp; Goblins
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Pick Types</h3>

            <div className="space-y-3">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="font-semibold text-green-400">
                    Normal Picks
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  Standard player props with solid value and moderate
                  confidence.
                </p>
              </div>

              <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="font-semibold text-orange-400">Goblins</span>
                </div>
                <p className="text-sm text-gray-300">
                  Higher risk picks with significant upside potential. Good edge
                  detected.
                </p>
              </div>

              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="font-semibold text-red-400">Demons</span>
                </div>
                <p className="text-sm text-gray-300">
                  Maximum confidence plays with exceptional value. Rare
                  opportunities.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-700/50 pt-6">
            <h3 className="text-lg font-semibold text-white">Lineup Rules</h3>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Pick between{" "}
                  <strong className="text-purple-400">
                    2 and 6 projections
                  </strong>{" "}
                  to create a valid lineup.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Must have picks from{" "}
                  <strong className="text-purple-400">
                    at least 2 different teams
                  </strong>
                  .
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Cannot have the{" "}
                  <strong className="text-purple-400">same player twice</strong>{" "}
                  in your lineup.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  All picks must be submitted{" "}
                  <strong className="text-purple-400">before game start</strong>
                  .
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="w-full cyber-btn py-3 px-4 rounded-lg transition-colors"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const PrizePicksPro: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedPicks, setSelectedPicks] = useState<SelectedPick[]>([]);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [currentLineup, setCurrentLineup] = useState<LineupEntry | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>("all");

  // Real data fetching with React Query
  const {
    data: playerProps = [],
    isLoading: propsLoading,
    refetch: refetchProps,
    error: propsError,
  } = useQuery({
    queryKey: ["playerProps"],
    queryFn: () => realDataManager.getPlayerProps(),
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: false,
  });

  // Ultra Accuracy enhanced props
  const {
    data: enhancedProps = [],
    isLoading: enhancedLoading,
    error: enhancedError,
  } = useQuery({
    queryKey: ["enhancedProps", selectedSport],
    queryFn: () =>
      getPrizePicksRecommendations(
        selectedSport === "all" ? undefined : selectedSport,
      ),
    refetchInterval: 45000, // Refresh every 45 seconds
    retry: false,
  });

  const {
    data: sportsData,
    isLoading: sportsLoading,
    error: sportsError,
  } = useQuery({
    queryKey: ["sportsData"],
    queryFn: () => realDataManager.getComprehensiveSportsData(),
    refetchInterval: 60000, // Refresh every minute
    retry: false,
  });

  // Health status check
  const { data: healthStatus, error: healthError } = useQuery({
    queryKey: ["healthStatus"],
    queryFn: () => api.getHealthStatus(),
    refetchInterval: 30000,
    retry: false,
  });

  // Check if backend is offline
  const isOffline =
    propsError ||
    sportsError ||
    healthError ||
    enhancedError ||
    (healthStatus && healthStatus.status === "offline") ||
    (playerProps.length === 0 &&
      enhancedProps.length === 0 &&
      !propsLoading &&
      !enhancedLoading);

  // Handle retry functionality
  const handleRetry = () => {
    queryClient.invalidateQueries();
    refetchProps();
    toast.success("Reconnecting to PrizePicks API...");
  };

  // Filter props for display
  const displayProps = playerProps.slice(0, 9); // Show 9 props in 3x3 grid

  const handlePickToggle = (prop: RealPlayerProp, choice: "over" | "under") => {
    const pickId = `${prop.id}_${choice}`;
    const existingPickIndex = selectedPicks.findIndex(
      (p) => p.propId === pickId,
    );

    if (existingPickIndex >= 0) {
      // Remove existing pick
      setSelectedPicks((prev) =>
        prev.filter((_, index) => index !== existingPickIndex),
      );
    } else {
      // Check if we already have a pick for this player
      const existingPlayerPick = selectedPicks.find(
        (p) => p.player === prop.playerName,
      );
      if (existingPlayerPick) {
        toast.error("You already have a pick for this player!");
        return;
      }

      // Check lineup size limit
      if (selectedPicks.length >= 6) {
        toast.error("Maximum 6 picks per lineup!");
        return;
      }

      // Add new pick
      const newPick: SelectedPick = {
        propId: pickId,
        choice,
        player: prop.playerName,
        stat: prop.stat,
        line: prop.line,
        confidence: prop.confidence,
        pickType: prop.pickType,
      };

      setSelectedPicks((prev) => [...prev, newPick]);
    }
  };

  const isPickSelected = (
    prop: RealPlayerProp,
    choice: "over" | "under",
  ): boolean => {
    const pickId = `${prop.id}_${choice}`;
    return selectedPicks.some((p) => p.propId === pickId);
  };

  const calculateMultiplier = (): number => {
    if (selectedPicks.length < 2) return 0;

    // Base multipliers by pick count
    const baseMultipliers = {
      2: 3,
      3: 5,
      4: 10,
      5: 25,
      6: 100,
    };

    let multiplier =
      baseMultipliers[selectedPicks.length as keyof typeof baseMultipliers] ||
      0;

    // Bonus for demon/goblin picks
    const demonCount = selectedPicks.filter(
      (p) => p.pickType === "demon",
    ).length;
    const goblinCount = selectedPicks.filter(
      (p) => p.pickType === "goblin",
    ).length;

    multiplier *= 1 + demonCount * 0.5 + goblinCount * 0.25;

    return Math.round(multiplier * 100) / 100;
  };

  const submitLineup = async () => {
    if (selectedPicks.length < 2) {
      toast.error("You need at least 2 picks to submit a lineup!");
      return;
    }

    // Validate team diversity
    const teams = new Set(
      displayProps
        .filter((prop) =>
          selectedPicks.some((pick) => pick.player === prop.playerName),
        )
        .map((prop) => prop.team),
    );

    if (teams.size < 2) {
      toast.error("You need picks from at least 2 different teams!");
      return;
    }

    try {
      const entryFee = 5; // Base entry fee
      const multiplier = calculateMultiplier();
      const potentialPayout = entryFee * multiplier;

      const newLineup: LineupEntry = {
        id: `lineup_${Date.now()}`,
        picks: [...selectedPicks],
        entry_fee: entryFee,
        potential_payout: potentialPayout,
        multiplier,
        status: "submitted",
      };

      setCurrentLineup(newLineup);
      toast.success(`Lineup submitted! Potential payout: $${potentialPayout}`);

      // Clear selections
      setSelectedPicks([]);
    } catch (error: any) {
      toast.error(`Failed to submit lineup: ${error.message}`);
    }
  };

  const getPickTypeColor = (pickType?: string) => {
    switch (pickType) {
      case "demon":
        return "border-red-500 bg-red-500/10";
      case "goblin":
        return "border-orange-500 bg-orange-500/10";
      default:
        return "border-green-500 bg-green-500/10";
    }
  };

  const getPickTypeIcon = (pickType?: string) => {
    switch (pickType) {
      case "demon":
        return "😈";
      case "goblin":
        return "👺";
      default:
        return "⭐";
    }
  };

  if (propsLoading || sportsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-purple-400" />
          <p className="text-white">Loading real-time prop data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-in-up">
      {/* Offline Indicator */}
      <OfflineIndicator
        show={!!isOffline}
        service="PrizePicks API"
        onRetry={handleRetry}
      />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 glass-card rounded-3xl p-12 shadow-neon relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative">
          <div className="text-8xl mb-6 animate-float">🏆</div>
          <h1 className="holographic text-5xl font-black mb-6">
            PRIZEPICKS PRO
          </h1>
          <div className="text-6xl font-black text-purple-400 mb-6 animate-cyber-pulse">
            {calculateMultiplier()}x
          </div>
          <p className="text-xl text-gray-300 mb-8">
            Real-time player props with AI analysis and multiplier boosts
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setIsRulesModalOpen(true)}
              className="cyber-btn px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Rules & Demons/Goblins
            </button>
            <button
              onClick={() => refetchProps()}
              className="cyber-btn px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Props
            </button>
          </div>
        </div>
      </motion.div>

      {/* Sport Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-4 border border-cyan-500/20"
      >
        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">Filter by Sport:</span>
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="px-4 py-3 bg-gradient-to-r from-slate-800/90 via-purple-700/80 to-slate-800/90 border border-purple-500/30 rounded-lg text-white font-medium focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 hover:border-purple-400 backdrop-blur-sm shadow-lg shadow-purple-500/20 appearance-none cursor-pointer"
          >
            <option value="all" className="bg-slate-800 text-white py-2 px-4">
              All Sports
            </option>
            <option value="nba" className="bg-slate-800 text-white py-2 px-4">
              NBA
            </option>
            <option value="wnba" className="bg-slate-800 text-white py-2 px-4">
              WNBA
            </option>
            <option value="nfl" className="bg-slate-800 text-white py-2 px-4">
              NFL
            </option>
            <option value="mlb" className="bg-slate-800 text-white py-2 px-4">
              MLB
            </option>
            <option
              value="soccer"
              className="bg-slate-800 text-white py-2 px-4"
            >
              Soccer
            </option>
            <option value="pga" className="bg-slate-800 text-white py-2 px-4">
              PGA
            </option>
            <option
              value="tennis"
              className="bg-slate-800 text-white py-2 px-4"
            >
              Tennis
            </option>
            <option
              value="esports"
              className="bg-slate-800 text-white py-2 px-4"
            >
              Esports
            </option>
            <option value="mma" className="bg-slate-800 text-white py-2 px-4">
              MMA
            </option>
            <option value="nhl">NHL</option>
            <option value="soccer">Soccer</option>
          </select>
        </div>
      </motion.div>

      {/* Current Lineup Display */}
      {selectedPicks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 border border-purple-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-400" />
            Current Lineup ({selectedPicks.length}/6)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedPicks.map((pick, index) => (
              <div key={pick.propId} className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">
                    {pick.player}
                  </span>
                  <span className="text-xs px-2 py-1 bg-purple-500/20 rounded text-purple-400">
                    {getPickTypeIcon(pick.pickType)} {pick.pickType}
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  {pick.stat} {pick.choice} {pick.line}
                </div>
                <div className="text-xs text-green-400">
                  {pick.confidence.toFixed(1)}% confidence
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-white">
              Multiplier:{" "}
              <span className="text-purple-400">{calculateMultiplier()}x</span>
            </div>
            <button
              onClick={submitLineup}
              disabled={selectedPicks.length < 2}
              className="cyber-btn px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Lineup
            </button>
          </div>
        </motion.div>
      )}

      {/* Player Props Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProps.map((prop) => (
          <motion.div
            key={prop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card rounded-2xl p-6 border ${getPickTypeColor(prop.pickType)} hover:shadow-neon transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white">{prop.playerName}</h3>
                <p className="text-sm text-gray-400">
                  {prop.team} vs {prop.opponent}
                </p>
              </div>
              <div className="text-2xl">{getPickTypeIcon(prop.pickType)}</div>
            </div>

            {/* Stat Line */}
            <div className="text-center mb-6">
              <div className="text-lg font-semibold text-gray-300 capitalize">
                {prop.stat}
              </div>
              <div className="text-3xl font-black text-white mb-2">
                {prop.line}
              </div>
              <div className="text-sm text-gray-400">
                {prop.confidence.toFixed(1)}% confidence • {prop.trend} trend
              </div>
            </div>

            {/* Pick Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handlePickToggle(prop, "over")}
                className={`p-3 rounded-lg transition-all font-semibold ${
                  isPickSelected(prop, "over")
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-700/50 text-gray-300 hover:bg-green-500/20 hover:text-green-400"
                }`}
              >
                <div className="text-sm">OVER</div>
                <div className="text-xs">
                  {prop.overOdds > 0 ? "+" : ""}
                  {prop.overOdds}
                </div>
              </button>
              <button
                onClick={() => handlePickToggle(prop, "under")}
                className={`p-3 rounded-lg transition-all font-semibold ${
                  isPickSelected(prop, "under")
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-gray-700/50 text-gray-300 hover:bg-red-500/20 hover:text-red-400"
                }`}
              >
                <div className="text-sm">UNDER</div>
                <div className="text-xs">
                  {prop.underOdds > 0 ? "+" : ""}
                  {prop.underOdds}
                </div>
              </button>
            </div>

            {/* Reasoning */}
            <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
              <p className="text-xs text-gray-400">{prop.reasoning}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current Lineup Result */}
      {currentLineup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 border border-green-500/30"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            Lineup Submitted Successfully!
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                ${currentLineup.entry_fee}
              </div>
              <div className="text-sm text-gray-400">Entry Fee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {currentLineup.multiplier}x
              </div>
              <div className="text-sm text-gray-400">Multiplier</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                ${currentLineup.potential_payout}
              </div>
              <div className="text-sm text-gray-400">Potential Payout</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Rules Modal */}
      <DemonsGoblinsModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </div>
  );
};

export default PrizePicksPro;
