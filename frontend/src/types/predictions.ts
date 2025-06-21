export interface PredictionData {
  id: string;
  gameId: string;
  playerId?: string;
  playerName?: string;
  market: string;
  prediction: string;
  odds: number;
  confidence: number;
  expectedValue: number;
  timestamp: number;
  status: "active" | "completed" | "cancelled";
  sport: string;
  league: string;
}

export interface PredictionMetrics {
  accuracy: number;
  totalPredictions: number;
  correctPredictions: number;
  averageOdds: number;
  roi: number;
  winRate: number;
}

export interface PredictionModel {
  id: string;
  name: string;
  version: string;
  accuracy: number;
  lastTrained: Date;
  status: "active" | "inactive" | "training";
  features: string[];
}

export interface PredictionResult {
  prediction: PredictionData;
  confidence: number;
  reasoning: string[];
  alternativeOutcomes: Array<{
    outcome: string;
    probability: number;
  }>;
}
