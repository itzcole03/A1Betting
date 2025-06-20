import { LineupBuilderOutput } from './predictions';
export interface LineupLeg {
    propType: string;
    line: string;
    odds: number;
}
export interface LineupPerformance {
    expectedValue: number;
    winProbability: number;
    riskScore: number;
}
export interface Lineup {
    id: string;
    strategy: {
        name: string;
        description: string;
    };
    legs: {
        eventId: string;
        market: string;
        selection: string;
        odds: number;
        prediction: {
            probability: number;
            confidence: number;
            edge: number;
        };
    }[];
    metrics: {
        confidence: number;
        expectedValue: number;
        risk: number;
        correlation: number;
    };
    createdAt: string;
}
export declare function isLineupLeg(value: any): value is LineupLeg;
export declare function isLineupPerformance(value: any): value is LineupPerformance;
export declare function isLineup(obj: any): obj is Lineup;
export declare function convertToLineup(output: LineupBuilderOutput): Lineup;
