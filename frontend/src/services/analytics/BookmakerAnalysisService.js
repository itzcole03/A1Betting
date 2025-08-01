import { Observable } from 'rxjs';
import { apiClient } from '@/services/api/client';
class BookmakerAnalysisService {
    constructor() {
        this.patterns = new Map();
        this.recentTags = [];
        this.patternUpdateInterval = null;
        this.initializeService();
    }
    async initializeService() {
        try {
            // Load historical patterns
            const historicalData = await this.loadHistoricalPatterns();
            this.patterns = new Map(historicalData.map(pattern => [`${pattern.tag}`, pattern]));
            // Start pattern analysis update interval
            this.startPatternAnalysis();
            // Load recent tags
            this.recentTags = await this.loadRecentTags();
        }
        catch (error) {
            console.error('Failed to initialize BookmakerAnalysisService:', error);
        }
    }
    async loadHistoricalPatterns() {
        try {
            const response = await apiClient.get('/analytics/bookmaker/patterns');
            return response.data;
        }
        catch (error) {
            console.error('Failed to load historical patterns:', error);
            return [];
        }
    }
    async loadRecentTags() {
        try {
            const response = await apiClient.get('/analytics/bookmaker/recent-tags');
            return response.data;
        }
        catch (error) {
            console.error('Failed to load recent tags:', error);
            return [];
        }
    }
    startPatternAnalysis() {
        if (this.patternUpdateInterval) {
            clearInterval(this.patternUpdateInterval);
        }
        this.patternUpdateInterval = setInterval(async () => {
            await this.updatePatternAnalysis();
        }, 6 * 60 * 60 * 1000); // Update every 6 hours
    }
    async updatePatternAnalysis() {
        const now = Date.now();
        const recentTags = this.recentTags.filter(tag => now - tag.timestamp < BookmakerAnalysisService.PATTERN_EXPIRY);
        for (const tagType of ['demon', 'goblin', 'normal']) {
            const tagsOfType = recentTags.filter(tag => tag.type === tagType);
            if (tagsOfType.length < BookmakerAnalysisService.MIN_SAMPLE_SIZE) {
                continue;
            }
            const successCount = tagsOfType.filter(tag => tag.success).length;
            const successRate = successCount / tagsOfType.length;
            const deviations = tagsOfType.map(tag => Math.abs(tag.projectedValue - tag.actualValue));
            const averageDeviation = deviations.reduce((a, b) => a + b, 0) / deviations.length;
            const pattern = {
                tag: tagType,
                successRate,
                averageDeviation,
                confidence: this.calculateConfidence(tagsOfType.length),
                lastUpdated: now,
                sampleSize: tagsOfType.length,
            };
            this.patterns.set(tagType, pattern);
        }
        // Persist updated patterns
        await this.savePatterns();
    }
    calculateConfidence(sampleSize) {
        // Using a simplified confidence calculation
        // Could be enhanced with more sophisticated statistical methods
        const baseConfidence = Math.min(sampleSize / BookmakerAnalysisService.MIN_SAMPLE_SIZE, 1);
        return Math.pow(baseConfidence, 0.5); // Square root to smooth the confidence curve
    }
    async savePatterns() {
        try {
            await apiClient.post('/analytics/bookmaker/patterns', Array.from(this.patterns.values()));
        }
        catch (error) {
            console.error('Failed to save patterns:', error);
        }
    }
    async analyzeProp(propData) {
        const pattern = this.patterns.get(propData.tag);
        const warnings = [];
        // Calculate raw statistical probability
        const rawStatisticalProbability = this.calculateRawProbability(propData.projectedValue, propData.historicalAverage);
        // Analyze bookmaker intent
        const bookmakerIntent = await this.analyzeBookmakerIntent(propData, pattern);
        // Calculate risk score
        const riskScore = this.calculateRiskScore(rawStatisticalProbability, bookmakerIntent, propData);
        // Generate warnings
        if (this.isSuspiciouslyFavorable(rawStatisticalProbability, bookmakerIntent)) {
            warnings.push('This prop appears suspiciously favorable. Exercise caution.');
        }
        if (pattern && pattern.successRate < 0.4) {
            warnings.push(`Historical success rate for ${propData.tag} props is unusually low (${Math.round(pattern.successRate * 100)}%)`);
        }
        // Calculate adjusted probability
        const adjustedProbability = this.calculateAdjustedProbability(rawStatisticalProbability, bookmakerIntent, pattern);
        return {
            rawStatisticalProbability,
            bookmakerIntent,
            adjustedProbability,
            riskScore,
            warnings,
        };
    }
    calculateRawProbability(projectedValue, historicalAverage) {
        // Simple probability calculation based on historical average
        // Could be enhanced with more sophisticated statistical methods
        const deviation = Math.abs(projectedValue - historicalAverage);
        const maxDeviation = historicalAverage * 0.5; // 50% of historical average
        return Math.max(0, 1 - deviation / maxDeviation);
    }
    async analyzeBookmakerIntent(propData, pattern) {
        const suspiciousLevel = this.calculateSuspiciousLevel(propData, pattern);
        const historicalAccuracy = pattern ? pattern.successRate : 0.5;
        const marketTrend = await this.analyzeMarketTrend(propData);
        const confidence = pattern ? pattern.confidence : 0.5;
        let warning;
        if (suspiciousLevel > BookmakerAnalysisService.SUSPICIOUS_THRESHOLD) {
            warning = 'Unusual pattern detected in bookmaker behavior';
        }
        return {
            suspiciousLevel,
            historicalAccuracy,
            marketTrend,
            confidence,
            warning,
        };
    }
    calculateSuspiciousLevel(propData, pattern) {
        let suspiciousLevel = 0;
        // Factor 1: Deviation from historical average
        const deviation = Math.abs(propData.projectedValue - propData.historicalAverage);
        const deviationScore = Math.min(deviation / propData.historicalAverage, 1);
        suspiciousLevel += deviationScore * 0.3;
        // Factor 2: Tag type analysis
        if (pattern) {
            const tagScore = 1 - pattern.successRate;
            suspiciousLevel += tagScore * 0.3;
        }
        // Factor 3: Odds analysis
        const oddsScore = Math.abs(0.5 - propData.currentOdds);
        suspiciousLevel += oddsScore * 0.4;
        return Math.min(suspiciousLevel, 1);
    }
    async analyzeMarketTrend(propData) {
        try {
            const response = await apiClient.get(`/analytics/market-trend/${propData.tag}`);
            return response.data.trend;
        }
        catch (error) {
            console.error('Failed to analyze market trend:', error);
            return 'stable';
        }
    }
    calculateRiskScore(rawProbability, bookmakerIntent, propData) {
        const weights = {
            rawProbability: 0.4,
            suspiciousLevel: 0.3,
            historicalAccuracy: 0.2,
            marketTrend: 0.1,
        };
        let riskScore = 0;
        // Raw probability contribution
        riskScore += (1 - rawProbability) * weights.rawProbability;
        // Suspicious level contribution
        riskScore += bookmakerIntent.suspiciousLevel * weights.suspiciousLevel;
        // Historical accuracy contribution
        riskScore += (1 - bookmakerIntent.historicalAccuracy) * weights.historicalAccuracy;
        // Market trend contribution
        const marketTrendScore = bookmakerIntent.marketTrend === 'stable'
            ? 0.5
            : bookmakerIntent.marketTrend === 'increasing'
                ? 0.7
                : 0.3;
        riskScore += marketTrendScore * weights.marketTrend;
        return Math.min(Math.max(riskScore, 0), 1);
    }
    calculateAdjustedProbability(rawProbability, bookmakerIntent, pattern) {
        const weights = {
            rawProbability: 0.5,
            bookmakerIntent: 0.3,
            patternHistory: 0.2,
        };
        let adjustedProbability = rawProbability * weights.rawProbability;
        // Adjust based on bookmaker intent
        const bookmakerFactor = 1 - bookmakerIntent.suspiciousLevel;
        adjustedProbability += bookmakerFactor * weights.bookmakerIntent;
        // Adjust based on pattern history
        if (pattern) {
            adjustedProbability += pattern.successRate * weights.patternHistory;
        }
        else {
            adjustedProbability += 0.5 * weights.patternHistory;
        }
        return Math.min(Math.max(adjustedProbability, 0), 1);
    }
    isSuspiciouslyFavorable(rawProbability, bookmakerIntent) {
        return (rawProbability > 0.8 &&
            bookmakerIntent.suspiciousLevel > BookmakerAnalysisService.SUSPICIOUS_THRESHOLD);
    }
    getPatternUpdateStream() {
        return new Observable(subscriber => {
            const interval = setInterval(() => {
                subscriber.next(this.patterns);
            }, 60000); // Update every minute
            return () => clearInterval(interval);
        });
    }
}
BookmakerAnalysisService.SUSPICIOUS_THRESHOLD = 0.85;
BookmakerAnalysisService.PATTERN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
BookmakerAnalysisService.MIN_SAMPLE_SIZE = 30;
export const bookmakerAnalysisService = new BookmakerAnalysisService();
