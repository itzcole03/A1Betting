export interface MoneyMakerStrategy {
  id: string;
  name: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  expectedROI: number;
  timeframe: string;
  requirements: string[];
  active: boolean;
}

export interface MoneyMakerOpportunity {
  id: string;
  strategy: string;
  title: string;
  description: string;
  expectedValue: number;
  confidence: number;
  timeRemaining: number;
  requiredStake: number;
  potentialReturn: number;
  riskLevel: "low" | "medium" | "high";
  sport: string;
  market: string;
}

export interface MoneyMakerResult {
  opportunityId: string;
  strategy: string;
  stake: number;
  outcome: "win" | "loss" | "pending";
  actualReturn: number;
  expectedReturn: number;
  timestamp: number;
}

export interface MoneyMakerStats {
  totalOpportunities: number;
  winRate: number;
  totalProfit: number;
  totalStaked: number;
  roi: number;
  averageStake: number;
  averageReturn: number;
  bestStrategy: string;
}
