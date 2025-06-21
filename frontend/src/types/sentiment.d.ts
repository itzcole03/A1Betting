export interface SocialSentimentData {
    id: string;
    topic: string;
    score: number;
    positiveMentions: number;
    negativeMentions: number;
    neutralMentions: number;
    lastUpdated: string;
    source?: string;
    details?: Record<string, unknown>;
}
