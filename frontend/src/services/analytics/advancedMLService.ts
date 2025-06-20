// Unified ML Service - Wrapper for legacy compatibility
import { mlService } from "./mlService";
import { UnifiedPredictionService } from "../unified/UnifiedPredictionService";

export class AdvancedMLService {
  private static instance: AdvancedMLService;
  private predictionService: UnifiedPredictionService;

  private constructor() {
    this.predictionService = UnifiedPredictionService.getInstance();
  }

  static getInstance(): AdvancedMLService {
    if (!AdvancedMLService.instance) {
      AdvancedMLService.instance = new AdvancedMLService();
    }
    return AdvancedMLService.instance;
  }

  // Legacy compatibility methods
  async predict(features: Record<string, number>) {
    try {
      return await this.predictionService.generatePrediction({
        eventId: "legacy-prediction",
        features,
        modelType: "advanced-ml",
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn(
        "Advanced ML prediction failed, falling back to basic ML service",
      );
      return mlService.predict(features);
    }
  }

  async analyzeMarket(marketData: any) {
    try {
      return await this.predictionService.analyzeMarket(marketData);
    } catch (error) {
      console.warn("Market analysis failed, returning default response");
      return {
        analysis: "Market analysis unavailable",
        confidence: 0.5,
        recommendations: [],
      };
    }
  }

  async generateFeatures(rawData: any) {
    try {
      return await this.predictionService.extractFeatures(rawData);
    } catch (error) {
      console.warn("Feature generation failed, returning empty features");
      return {};
    }
  }
}

// Export default instance for legacy compatibility
export const advancedMLService = AdvancedMLService.getInstance();

// Default export for ES6 compatibility
export default AdvancedMLService;
