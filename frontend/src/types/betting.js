// --- MISSING TYPES ADDED FOR INTEGRATION HEALTH ---
// Core betting types
export var BetType;
(function (BetType) {
    BetType["STRAIGHT"] = "straight";
    BetType["PARLAY"] = "parlay";
    BetType["TEASER"] = "teaser";
    BetType["ARBITRAGE"] = "arbitrage";
})(BetType || (BetType = {}));
export var RiskProfileType;
(function (RiskProfileType) {
    RiskProfileType["CONSERVATIVE"] = "CONSERVATIVE";
    RiskProfileType["MODERATE"] = "MODERATE";
    RiskProfileType["AGGRESSIVE"] = "AGGRESSIVE";
})(RiskProfileType || (RiskProfileType = {}));
export var BetClassification;
(function (BetClassification) {
    BetClassification["SAFE_BET"] = "Safe Bet";
    BetClassification["SURE_ODDS"] = "Sure Odds";
    BetClassification["AGGRESSIVE_EDGE"] = "Aggressive Edge";
})(BetClassification || (BetClassification = {}));
// Default risk profiles
export const DEFAULT_RISK_PROFILES = {
    [RiskProfileType.CONSERVATIVE]: {
        profile_type: RiskProfileType.CONSERVATIVE,
        max_stake_percentage: 0.02,
        min_confidence_threshold: 0.75,
        volatility_tolerance: 0.3,
        max_risk_score: 0.4,
        preferred_sports: ['NBA', 'NFL'],
        preferred_markets: ['moneyline', 'spread'],
        excluded_events: [],
        max_daily_loss: 0.05,
        max_concurrent_bets: 2,
        kelly_fraction: 0.3,
    },
    [RiskProfileType.MODERATE]: {
        profile_type: RiskProfileType.MODERATE,
        max_stake_percentage: 0.05,
        min_confidence_threshold: 0.6,
        volatility_tolerance: 0.5,
        max_risk_score: 0.6,
        preferred_sports: ['NBA', 'NFL', 'MLB'],
        preferred_markets: ['moneyline', 'spread', 'totals'],
        excluded_events: [],
        max_daily_loss: 0.1,
        max_concurrent_bets: 3,
        kelly_fraction: 0.5,
    },
    [RiskProfileType.AGGRESSIVE]: {
        profile_type: RiskProfileType.AGGRESSIVE,
        max_stake_percentage: 0.1,
        min_confidence_threshold: 0.5,
        volatility_tolerance: 0.7,
        max_risk_score: 0.8,
        preferred_sports: ['NBA', 'NFL', 'MLB', 'NHL'],
        preferred_markets: ['moneyline', 'spread', 'totals', 'props'],
        excluded_events: [],
        max_daily_loss: 0.15,
        max_concurrent_bets: 5,
        kelly_fraction: 0.7,
    },
};
