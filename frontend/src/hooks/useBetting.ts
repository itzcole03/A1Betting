/**
 * Custom hooks for betting-related functionality
 * Provides data fetching, caching, and state management for betting features
 */

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/integrationService";

// Define types locally since they're not exported from integrationService
interface ValueBet {
  id: string;
  sport: string;
  event: string;
  market: string;
  odds: number;
  probability: number;
  expected_value: number;
  confidence: number;
  recommendation: string;
}

interface ArbitrageOpportunity {
  id: string;
  sport: string;
  event: string;
  bookmaker_a: string;
  bookmaker_b: string;
  odds_a: number;
  odds_b: number;
  profit_margin: number;
}
import toast from "react-hot-toast";

// Hook for value bets
export const useValueBets = (filters?: {
  sport?: string;
  minEdge?: number;
  bookmaker?: string;
}) => {
  const {
    data: valueBets = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["valueBets", filters],
    queryFn: () =>
      api.getBettingOpportunities(filters?.sport, filters?.limit || 10),
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 10000, // Data is fresh for 10 seconds
    retry: false, // Don't retry on error
  });

  // Filter value bets based on criteria
  const filteredValueBets = useMemo(() => {
    if (!filters) return valueBets;

    return valueBets.filter((bet: ValueBet) => {
      if (filters.sport && bet.sport !== filters.sport) return false;
      if (filters.minEdge && bet.edge < filters.minEdge) return false;
      if (filters.bookmaker && bet.bookmaker !== filters.bookmaker)
        return false;
      return true;
    });
  }, [valueBets, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEdge = filteredValueBets.reduce(
      (sum: number, bet: ValueBet) => sum + bet.edge,
      0,
    );
    const avgEdge =
      filteredValueBets.length > 0 ? totalEdge / filteredValueBets.length : 0;
    const maxEdge = filteredValueBets.reduce(
      (max: number, bet: ValueBet) => Math.max(max, bet.edge),
      0,
    );

    return {
      count: filteredValueBets.length,
      averageEdge: avgEdge,
      maximumEdge: maxEdge,
      totalValue: totalEdge,
    };
  }, [filteredValueBets]);

  return {
    valueBets: filteredValueBets,
    stats,
    isLoading,
    error,
    refetch,
  };
};

// Hook for arbitrage opportunities
export const useArbitrageOpportunities = (filters?: {
  sport?: string;
  minProfit?: number;
  maxStake?: number;
}) => {
  const {
    data: arbitrageOpportunities = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["arbitrageOpportunities", filters],
    queryFn: () => api.getArbitrageOpportunities(),
    refetchInterval: 15000, // Refetch every 15 seconds (arbitrage is time-sensitive)
    staleTime: 5000, // Data is fresh for 5 seconds
    retry: false, // Don't retry on error
  });

  // Filter arbitrage opportunities
  const filteredOpportunities = useMemo(() => {
    if (!filters) return arbitrageOpportunities;

    return arbitrageOpportunities.filter((opp: ArbitrageOpportunity) => {
      if (filters.sport && opp.sport !== filters.sport) return false;
      if (filters.minProfit && opp.profit_percent < filters.minProfit)
        return false;
      if (filters.maxStake) {
        const totalStake = Object.values(opp.stakes).reduce(
          (sum, stake) => sum + stake,
          0,
        );
        if (totalStake > filters.maxStake) return false;
      }
      return true;
    });
  }, [arbitrageOpportunities, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalProfit = filteredOpportunities.reduce(
      (sum: number, opp: ArbitrageOpportunity) => sum + opp.guaranteed_profit,
      0,
    );
    const avgProfitPercent =
      filteredOpportunities.length > 0
        ? filteredOpportunities.reduce(
            (sum: number, opp: ArbitrageOpportunity) =>
              sum + opp.profit_percent,
            0,
          ) / filteredOpportunities.length
        : 0;

    return {
      count: filteredOpportunities.length,
      totalGuaranteedProfit: totalProfit,
      averageProfitPercent: avgProfitPercent,
    };
  }, [filteredOpportunities]);

  return {
    arbitrageOpportunities: filteredOpportunities,
    stats,
    isLoading,
    error,
    refetch,
  };
};

// Hook for placing bets
export const usePlaceBet = () => {
  const queryClient = useQueryClient();

  const placeBetMutation = useMutation({
    mutationFn: (betData: {
      event: string;
      outcome: string;
      bookmaker: string;
      odds: number;
      stake: number;
    }) => api.placeBet(betData),
    onSuccess: (data) => {
      toast.success("Bet placed successfully!");
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["valueBets"] });
      queryClient.invalidateQueries({ queryKey: ["userAnalytics"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Failed to place bet");
    },
  });

  return {
    placeBet: placeBetMutation.mutate,
    isPlacingBet: placeBetMutation.isPending,
    error: placeBetMutation.error,
  };
};

// Hook for user analytics
export const useUserAnalytics = (userId: string) => {
  const {
    data: analytics,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userAnalytics", userId],
    queryFn: () => api.getUserAnalytics(userId),
    enabled: !!userId,
    staleTime: 60000, // Data is fresh for 1 minute
  });

  return {
    analytics,
    isLoading,
    error,
    refetch,
  };
};

// Hook for bankroll management
export const useBankroll = (userId: string) => {
  const [bankrollSettings, setBankrollSettings] = useState({
    totalBankroll: 1000,
    maxBetPercentage: 5,
    riskTolerance: "medium" as "low" | "medium" | "high",
  });

  // Calculate recommended bet sizes using Kelly Criterion
  const calculateKellyBetSize = useCallback(
    (edge: number, odds: number) => {
      const { totalBankroll, maxBetPercentage } = bankrollSettings;
      const kellyFraction = edge / (odds - 1);

      // Apply risk tolerance modifier
      const riskModifier = {
        low: 0.25,
        medium: 0.5,
        high: 1.0,
      }[bankrollSettings.riskTolerance];

      const adjustedKelly = kellyFraction * riskModifier;
      const maxBetAmount = (totalBankroll * maxBetPercentage) / 100;

      // Use smaller of Kelly calculation or max bet amount
      const recommendedBet = Math.min(
        totalBankroll * Math.max(0, adjustedKelly),
        maxBetAmount,
      );

      return Math.round(recommendedBet * 100) / 100; // Round to 2 decimal places
    },
    [bankrollSettings],
  );

  return {
    bankrollSettings,
    setBankrollSettings,
    calculateKellyBetSize,
  };
};

// Hook for bet tracking and history
export const useBetHistory = (userId: string) => {
  const [betHistory, setBetHistory] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    sport: "",
    outcome: "",
    dateRange: { start: "", end: "" },
  });

  // This would typically fetch from an API
  useEffect(() => {
    // Simulate bet history data
    const mockHistory = [
      {
        id: "1",
        event: "Lakers vs Warriors",
        outcome: "Lakers Win",
        odds: 2.5,
        stake: 50,
        result: "won",
        profit: 75,
        date: new Date().toISOString(),
      },
      // Add more mock data as needed
    ];
    setBetHistory(mockHistory);
  }, [userId]);

  const filteredHistory = useMemo(() => {
    return betHistory.filter((bet) => {
      if (
        filters.sport &&
        !bet.event.toLowerCase().includes(filters.sport.toLowerCase())
      ) {
        return false;
      }
      if (filters.outcome && bet.outcome !== filters.outcome) {
        return false;
      }
      // Add date filtering logic here
      return true;
    });
  }, [betHistory, filters]);

  const stats = useMemo(() => {
    const totalBets = filteredHistory.length;
    const wonBets = filteredHistory.filter(
      (bet) => bet.result === "won",
    ).length;
    const totalProfit = filteredHistory.reduce(
      (sum, bet) => sum + (bet.profit || 0),
      0,
    );
    const totalStaked = filteredHistory.reduce(
      (sum, bet) => sum + bet.stake,
      0,
    );
    const roi = totalStaked > 0 ? (totalProfit / totalStaked) * 100 : 0;

    return {
      totalBets,
      wonBets,
      winRate: totalBets > 0 ? (wonBets / totalBets) * 100 : 0,
      totalProfit,
      totalStaked,
      roi,
    };
  }, [filteredHistory]);

  return {
    betHistory: filteredHistory,
    stats,
    filters,
    setFilters,
  };
};

// Export all hooks
export default {
  useValueBets,
  useArbitrageOpportunities,
  usePlaceBet,
  useUserAnalytics,
  useBankroll,
  useBetHistory,
};
