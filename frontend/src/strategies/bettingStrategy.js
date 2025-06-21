import { post } from "../api/index";
import { unifiedMonitor } from "../core/monitoring/unifiedMonitor";
import { APIError, AppError } from "../utils/errorHandling";

const BETTING_BACKEND_PREFIX =
  process.env.REACT_APP_BETTING_BACKEND_PREFIX || "/api/betting";

/**
 * Calculate betting strategy using backend service
 * @param {Object} request - Request object containing propositions, bankroll, and risk level
 * @returns {Promise<Object>} - Betting strategy response
 */
export const calculateBettingStrategy = async (request) => {
  const trace = unifiedMonitor.startTrace(
    "bettingStrategy.calculateBettingStrategy",
    "http.client",
  );
  try {
    const endpoint = `${BETTING_BACKEND_PREFIX}/calculate-strategy`;
    const backendRequestPayload = {
      available_propositions: request.propositions,
      bankroll: request.bankroll,
      risk_level: request.riskLevel,
    };

    // Backend returns List[BackendStrategyBet]
    const response = await post(endpoint, backendRequestPayload);

    if (trace) {
      trace.setHttpStatus(response.status);
      unifiedMonitor.endTrace(trace);
    }

    const mappedResponse = response.data.map((bet) => ({
      id: bet.bet_id,
      description: `Strategy bet for ${Array.isArray(bet.legs) ? bet.legs.length : 0} leg(s)`,
      expectedValue: bet.potential_payout - bet.stake,
      confidence: 0.75, // Mock confidence, backend doesn't provide this for now
      type:
        bet.type ||
        (Array.isArray(bet.legs) && bet.legs.length > 1 ? "parlay" : "single"),
      legs: (Array.isArray(bet.legs) ? bet.legs : []).map((leg) => ({
        propId: leg.prop_id,
        marketKey: leg.market_key,
        outcome: leg.outcome,
        odds: leg.odds,
        playerId: leg.player_id,
        gameId: leg.game_id,
        description: leg.description,
      })),
      stake: bet.stake,
      potentialPayout: bet.potential_payout,
    }));

    return {
      bets: mappedResponse,
      totalStake: mappedResponse.reduce((sum, bet) => sum + bet.stake, 0),
      totalPotentialPayout: mappedResponse.reduce(
        (sum, bet) => sum + bet.potentialPayout,
        0,
      ),
    };
  } catch (error) {
    const errContext = {
      function: "calculateBettingStrategy",
      request: request,
    };

    if (trace) {
      trace.setError(error);
      unifiedMonitor.endTrace(trace);
    }

    if (error instanceof APIError || error instanceof AppError) throw error;
    throw new AppError(
      "Failed to calculate betting strategy from backend.",
      undefined,
      errContext,
      error,
    );
  }
};

/**
 * Place bets using the backend service
 * @param {Object} request - Request object containing bets to place
 * @returns {Promise<Object>} - Bet placement response
 */
export const placeBets = async (request) => {
  const trace = unifiedMonitor.startTrace(
    "bettingStrategy.placeBets",
    "http.client",
  );
  try {
    const endpoint = `${BETTING_BACKEND_PREFIX}/place-bet`;

    // Backend expects List[BackendStrategyBet] as BetPlacementRequest
    const backendPayload = request.bets.map((opp) => ({
      bet_id: opp.id,
      legs: opp.legs.map((leg) => ({
        prop_id: leg.propId,
        market_key: leg.marketKey,
        outcome: leg.outcome,
        odds: leg.odds,
        player_id: leg.playerId,
        game_id: leg.gameId,
        description: leg.description,
      })),
      stake: opp.stake,
      potential_payout: opp.potentialPayout,
      type: opp.type,
    }));

    const response = await post(endpoint, { bets: backendPayload });

    if (trace) {
      trace.setHttpStatus(response.status);
      unifiedMonitor.endTrace(trace);
    }

    return {
      success: response.data.success,
      placedBets: response.data.placed_bets || [],
      totalStake: response.data.total_stake || 0,
      errors: response.data.errors || [],
    };
  } catch (error) {
    const errContext = {
      function: "placeBets",
      request: request,
    };

    if (trace) {
      trace.setError(error);
      unifiedMonitor.endTrace(trace);
    }

    if (error instanceof APIError || error instanceof AppError) throw error;
    throw new AppError(
      "Failed to place bets via backend.",
      undefined,
      errContext,
      error,
    );
  }
};

export const bettingStrategyService = {
  calculateBettingStrategy,
  placeBets,
};

export default bettingStrategyService;
