import type { ConfidenceBand, WinProbability } from './confidence';
export interface UserBetHistoryEntry {
    betId: string;
    eventId: string;
    date: string;
    betType: string;
    stake: number;
    odds: number;
    payout: number;
    result: 'win' | 'loss' | 'push';
    prediction: number;
    actual: number;
    confidenceBand: ConfidenceBand;
    winProbability: WinProbability;
}
export interface UserPerformanceHistory {
    userId: string;
    entries: UserBetHistoryEntry[];
}
export interface ModelPerformanceHistory {
    model: string;
    market: string;
    entries: Array<{
        date: string;
        prediction: number;
        actual: number;
        won: boolean;
        payout: number;
        confidenceBand: ConfidenceBand;
        winProbability: WinProbability;
    }>;
}
