export interface ConfidenceBand {
    lower: number;
    upper: number;
    mean: number;
    confidenceLevel: number;
}
export interface WinProbability {
    probability: number;
    impliedOdds?: number;
    modelOdds?: number;
    updatedAt: string;
}
export interface PredictionWithConfidence {
    predictionId: string;
    eventId: string;
    predictedValue: number;
    confidenceBand: ConfidenceBand;
    winProbability: WinProbability;
    model: string;
    market: string;
    player?: string;
    team?: string;
    context?: string;
}
export interface HistoricalPerformance {
    date: string;
    prediction: number;
    actual: number;
    won: boolean;
    payout: number;
    confidenceBand: ConfidenceBand;
    winProbability: WinProbability;
}
export interface PerformanceHistory {
    eventId: string;
    history: HistoricalPerformance[];
}
export interface BetSimulationInput {
    stake: number;
    odds: number;
    confidenceBand: ConfidenceBand;
    winProbability: WinProbability;
}
export interface BetSimulationResult {
    expectedReturn: number;
    variance: number;
    winProbability: number;
    lossProbability: number;
    payout: number;
    breakEvenStake: number;
}
