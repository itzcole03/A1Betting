import { EventBus } from '../core/EventBus';
import { PerformanceMonitor } from '../core/PerformanceMonitor';
export class ProjectionAnalyzer {
    constructor(confidenceThreshold = 0.7) {
        this.id = 'projection-analyzer';
        this.type = 'sports-projections';
        this.name = 'Projection Analyzer';
        this.description = 'Analyzes player projections for fantasy sports.';
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
        this.confidenceThreshold = confidenceThreshold;
    }
    async analyze(data) {
        const traceId = this.performanceMonitor.startTrace('projection-analysis', {
            analyzer: this.id,
            projectionCount: data.projections.length
        });
        try {
            const analyses = [];
            for (const projection of data.projections) {
                const spanId = this.performanceMonitor.startSpan(traceId, 'player-analysis', {
                    player: projection.name,
                    team: projection.team
                });
                try {
                    const analysis = this.analyzePlayerProjection(projection);
                    if (analysis.confidence >= this.confidenceThreshold) {
                        analyses.push(analysis);
                    }
                    this.performanceMonitor.endSpan(spanId);
                }
                catch (error) {
                    this.performanceMonitor.endSpan(spanId, error);
                    console.error(`Error analyzing projection for ${projection.name}:`, error);
                }
            }
            this.performanceMonitor.endTrace(traceId);
            return analyses;
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    async confidence(data) {
        if (!data.projections.length)
            return 0;
        const validProjections = data.projections.filter(p => this.isValidProjection(p));
        return validProjections.length / data.projections.length;
    }
    analyzePlayerProjection(projection) {
        const baseConfidence = this.calculateBaseConfidence(projection);
        const analysis = {
            player: projection.name,
            predictions: {
                points: this.calculateMetrics(projection.pts, baseConfidence, 'points'),
                rebounds: this.calculateMetrics(projection.reb, baseConfidence, 'rebounds'),
                assists: this.calculateMetrics(projection.ast, baseConfidence, 'assists'),
                steals: this.calculateMetrics(projection.stl, baseConfidence, 'steals'),
                blocks: this.calculateMetrics(projection.blk, baseConfidence, 'blocks'),
                threes: this.calculateMetrics(projection.three_pt, baseConfidence, 'threes'),
                minutes: this.calculateMetrics(projection.min, baseConfidence, 'minutes')
            },
            confidence: baseConfidence,
            metadata: {
                team: projection.team,
                position: projection.position,
                opponent: projection.opp_team,
                isHome: projection.is_home
            }
        };
        // Publish detailed analysis event
        this.eventBus.publish({
            type: 'projection:analyzed',
            payload: {
                player: projection.name,
                confidence: baseConfidence,
                predictions: Object.entries(analysis.predictions).map(([stat, metrics]) => ({
                    stat,
                    predicted: metrics.predicted,
                    confidence: metrics.confidence
                }))
            }
        });
        return analysis;
    }
    calculateBaseConfidence(projection) {
        let confidence = 1.0;
        // Reduce confidence for missing or invalid data
        if (!this.isValidProjection(projection)) {
            confidence *= 0.5;
        }
        // Reduce confidence for extreme minute projections
        if (projection.min < 10 || projection.min > 48) {
            confidence *= 0.7;
        }
        // Reduce confidence for unrealistic stat projections
        if (projection.pts > 60 || projection.reb > 30 || projection.ast > 20) {
            confidence *= 0.8;
        }
        return confidence;
    }
    calculateMetrics(value, baseConfidence, statType) {
        const variance = this.calculateVariance(value, statType);
        return {
            predicted: value,
            confidence: baseConfidence * this.getStatTypeConfidence(statType),
            range: {
                min: Math.max(0, value - variance),
                max: value + variance
            }
        };
    }
    calculateVariance(value, statType) {
        // Different stats have different natural variances
        const varianceFactors = {
            points: 0.2,
            rebounds: 0.25,
            assists: 0.3,
            steals: 0.4,
            blocks: 0.4,
            threes: 0.35,
            minutes: 0.15
        };
        return value * (varianceFactors[statType] || 0.25);
    }
    getStatTypeConfidence(statType) {
        // Some stats are more predictable than others
        const confidenceFactors = {
            points: 0.9,
            rebounds: 0.85,
            assists: 0.8,
            steals: 0.7,
            blocks: 0.7,
            threes: 0.75,
            minutes: 0.95
        };
        return confidenceFactors[statType] || 0.8;
    }
    isValidProjection(projection) {
        return (typeof projection.pts === 'number' &&
            typeof projection.reb === 'number' &&
            typeof projection.ast === 'number' &&
            typeof projection.min === 'number' &&
            projection.min > 0);
    }
    validate(data) {
        return Array.isArray(data.projections);
    }
    getMetrics() {
        return { accuracy: 1, latency: 0, errorRate: 0 };
    }
}
