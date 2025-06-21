/**
 * SHAP (SHapley Additive exPlanations) value vector for model explainability
 */
export interface ShapVector {
    [featureName: string]: number;
}
/**
 * Game context information for model predictions
 */
export interface GameContext {
    gameId?: string;
    venue?: string;
    homeTeam?: string;
    awayTeam?: string;
    date?: string;
    weather?: Record<string, unknown>;
    isPlayoffs?: boolean;
    gameType?: 'regular' | 'playoff' | 'preseason';
    seasonYear?: number;
    gameNumber?: number;
    metadata?: Record<string, unknown>;
}
/**
 * Player statistics interface
 */
export interface PlayerStats {
    playerId: string;
    name: string;
    position?: string;
    team?: string;
    stats: Record<string, number>;
    recentForm?: number[];
    injuryStatus?: 'healthy' | 'questionable' | 'doubtful' | 'out';
}
/**
 * Team information interface
 */
export interface TeamInfo {
    teamId: string;
    name: string;
    conference?: string;
    division?: string;
    record?: {
        wins: number;
        losses: number;
        ties?: number;
    };
    recentForm?: string;
}
