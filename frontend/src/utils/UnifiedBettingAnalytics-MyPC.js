import EventEmitter from 'eventemitter3';
import { UnifiedDataService, DataSource } from '../services/UnifiedDataService';
// Correct imports for UnifiedDataService and DataSource are now in use above.
export class UnifiedBettingAnalytics extends EventEmitter {
    constructor() {
        super();
        this.dataService = UnifiedDataService.getInstance();
        this.activeStrategies = new Map();
        this.predictionModels = new Map();
        this.initializeEventListeners();
    }
    static getInstance() {
        if (!UnifiedBettingAnalytics.instance) {
            UnifiedBettingAnalytics.instance = new UnifiedBettingAnalytics();
        }
        return UnifiedBettingAnalytics.instance;
    }
    initializeEventListeners() {
        // Listen for real-time odds updates
        this.dataService.on('ws:prizepicks:odds_update', data => {
            this.analyzeOddsMovement(data);
        });
        // Listen for model updates
        this.dataService.on('ws:odds_api:line_movement', data => {
            this.updatePredictions(data);
        });
    }
    calculateKellyCriterion(probability, odds) {
        const decimalOdds = odds;
        const q = 1 - probability;
        const b = decimalOdds - 1;
        const kelly = (probability * b - q) / b;
        return Math.max(0, Math.min(kelly, 0.1)); // Cap at 10% of bankroll
    }
    async analyzeBettingOpportunity(market, odds, stake) {
        try {
            // Fetch latest market data
            const marketData = await this.dataService.fetchData(DataSource.PRIZEPICKS, `/markets/${market}`);
            // Get prediction from model
            const prediction = await this.generatePrediction(market, marketData.data);
            // Calculate optimal stake using Kelly Criterion
            const recommendedStake = this.calculateKellyCriterion(prediction.probability, odds);
            // Assess risk factors
            const riskFactors = this.assessRiskFactors(marketData.data, prediction);
            // Find hedging opportunities
            const hedging = await this.findHedgingOpportunities(market, odds);
            const analysis = {
                predictionConfidence: prediction.probability,
                recommendedStake: recommendedStake * stake,
                expectedValue: (prediction.probability * odds - 1) * stake,
                riskAssessment: {
                    level: this.calculateRiskLevel(riskFactors),
                    factors: riskFactors,
                },
                hedgingOpportunities: hedging,
            };
            this.emit('analysis_complete', analysis);
            return analysis;
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    async generatePrediction(market, data) {
        try {
            // Use PredictionEngine for unified predictions
            const { PredictionEngine } = await import('./PredictionEngine');
            const predictionEngine = PredictionEngine.getInstance();
            // Construct a PlayerProp-like object if needed
            const prop = {
                player: { id: data.playerId || market },
                type: data.metric || market,
                ...data,
            };
            const predictionData = await predictionEngine.predict(prop);
            return {
                probability: predictionData.value,
                confidence: predictionData.confidence,
                uncertainty: predictionData.analysis?.meta_analysis?.prediction_stability,
                shap: predictionData.analysis?.shap_values,
                expectedValue: predictionData.analysis?.meta_analysis?.expected_value,
                modelMeta: predictionData.metadata,
            };
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
    assessRiskFactors(marketData, prediction) {
        const factors = [];
        // Market volatility check
        if ('volatility' in marketData && typeof marketData.volatility === 'number' && marketData.volatility > 0.5) {
            factors.push('High market volatility');
        }
        // Prediction confidence check
        if ('confidence' in prediction && typeof prediction.confidence === 'number' && prediction.confidence < 0.7) {
            factors.push('Low prediction confidence');
        }
        // Time to event check
        if ('timeToEvent' in marketData && typeof marketData.timeToEvent === 'number' && marketData.timeToEvent < 60) {
            factors.push('Close to event start');
        }
        return factors;
    }
    calculateRiskLevel(factors) {
        if (factors.length === 0)
            return 'low';
        if (factors.length <= 2)
            return 'medium';
        return 'high';
    }
    async findHedgingOpportunities(market, originalOdds) {
        try {
            const relatedMarkets = await this.dataService.fetchData(DataSource.ODDS_API, `/related-markets/${market}`);
            const markets = relatedMarkets.data;
            return markets
                .filter(m => m.odds < originalOdds)
                .map(m => ({
                market: m.id,
                odds: m.odds,
                recommendedStake: this.calculateHedgeStake(originalOdds, m.odds),
            }));
        }
        catch (error) {
            this.emit('error', error);
            return [];
        }
    }
    calculateHedgeStake(originalOdds, hedgeOdds) {
        // Kelly formula for hedging
        // f* = (bp - q)/b, b = hedgeOdds-1, p = 1/originalOdds, q = 1-p
        const b = hedgeOdds - 1;
        const p = 1 / originalOdds;
        const q = 1 - p;
        const kelly = (p * b - q) / b;
        return Math.max(0, Math.min(kelly, 0.2)); // Cap at 20% stake for safety
    }
    analyzeOddsMovement(data) {
        // Implement odds movement analysis
        this.emit('odds_movement', {
            market: data.market,
            movement: data.movement,
            significance: data.significance,
        });
    }
    updatePredictions(data) {
        // Update prediction models based on new data
        this.emit('predictions_updated', {
            market: data.market,
            updates: data.updates,
        });
    }
    // Strategy management methods
    addStrategy(strategy) {
        this.activeStrategies.set(strategy.id, strategy);
        this.emit('strategy_added', strategy);
    }
    removeStrategy(strategyId) {
        this.activeStrategies.delete(strategyId);
        this.emit('strategy_removed', strategyId);
    }
    // Prediction model management methods
    addPredictionModel(model) {
        this.predictionModels.set(model.id, model);
        this.emit('model_added', model);
    }
    removePredictionModel(modelId) {
        this.predictionModels.delete(modelId);
        this.emit('model_removed', modelId);
    }
}
