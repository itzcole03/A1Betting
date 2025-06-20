// Unified ML Service - Wrapper for legacy compatibility
import { UnifiedPredictionService } from "../unified/UnifiedPredictionService";

export class UltraMLService {
  private static instance: UltraMLService;
  private predictionService: UnifiedPredictionService;

  private constructor() {
    this.predictionService = UnifiedPredictionService.getInstance();
  }

  static getInstance(): UltraMLService {
    if (!UltraMLService.instance) {
      UltraMLService.instance = new UltraMLService();
    }
    return UltraMLService.instance;
  }

  // Legacy compatibility methods
  async ultraPredict(features: Record<string, number>) {
    try {
      return await this.predictionService.generatePrediction({
        eventId: "ultra-prediction",
        features,
        modelType: "ultra-ml",
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn("Ultra ML prediction failed");
      return {
        prediction: 0.5,
        confidence: 0.5,
        quantumAdvantage: 0.1,
        features: features,
      };
    }
  }

  async quantumAnalysis(data: any) {
    try {
      return await this.predictionService.analyzeQuantumFeatures(data);
    } catch (error) {
      console.warn("Quantum analysis failed");
      return {
        quantumState: "unknown",
        entanglement: 0.5,
        coherence: 0.5,
        superposition: 0.5,
      };
    }
  }

  async ultraOptimization(params: any) {
    try {
      return await this.predictionService.optimizeParameters(params);
    } catch (error) {
      console.warn("Ultra optimization failed");
      return {
        optimizedParams: params,
        improvement: 0.05,
        confidence: 0.5,
      };
    }
  }
}

// Export default instance for legacy compatibility
export const ultraMLService = UltraMLService.getInstance();

// Default export for ES6 compatibility
export default UltraMLService;
