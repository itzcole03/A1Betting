// Unified ML Service - Wrapper for legacy compatibility
import { UnifiedPredictionService } from "../unified/UnifiedPredictionService";

export class HyperAdvancedMLService {
  private static instance: HyperAdvancedMLService;
  private predictionService: UnifiedPredictionService;

  private constructor() {
    this.predictionService = UnifiedPredictionService.getInstance();
  }

  static getInstance(): HyperAdvancedMLService {
    if (!HyperAdvancedMLService.instance) {
      HyperAdvancedMLService.instance = new HyperAdvancedMLService();
    }
    return HyperAdvancedMLService.instance;
  }

  // Legacy compatibility methods
  async hyperPredict(features: Record<string, number>) {
    try {
      return await this.predictionService.generatePrediction({
        eventId: "hyper-prediction",
        features,
        modelType: "hyper-advanced-ml",
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn("Hyper ML prediction failed");
      return {
        prediction: 0.5,
        confidence: 0.5,
        features: features,
      };
    }
  }

  async analyzeComplexPatterns(data: any) {
    try {
      return await this.predictionService.analyzePatterns(data);
    } catch (error) {
      console.warn("Complex pattern analysis failed");
      return {
        patterns: [],
        complexity: 0.5,
        insights: [],
      };
    }
  }
}

// Export default instance for legacy compatibility
export const hyperAdvancedMLService = HyperAdvancedMLService.getInstance();

// Default export for ES6 compatibility
export default HyperAdvancedMLService;
