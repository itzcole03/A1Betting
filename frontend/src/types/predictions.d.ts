export interface LineupBuilderStrategy {
    name: string;
    description: string;
}
export interface LineupBuilderOutput {
    id: string;
    strategy: LineupBuilderStrategy;
    legs: Array<{
        eventId: string;
        market: string;
        selection: string;
        odds: number;
        prediction: {
            probability: number;
            confidence: number;
            edge: number;
        };
    }>;
    metrics: {
        confidence: number;
        expectedValue: number;
        risk: number;
        correlation: number;
    };
    createdAt: string;
}
