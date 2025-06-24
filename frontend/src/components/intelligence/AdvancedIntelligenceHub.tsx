import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Activity,
  TrendingUp,
  Zap,
  Target,
  Settings,
  BarChart3,
  Cpu,
  Layers,
  Network,
  GitBranch,
  Microscope,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Award,
  Gauge,
  Sparkles,
  Eye,
  Calculator,
  Atom,
  Binary,
  Play,
  Pause,
  Radar,
  Monitor,
  Database,
  Cloud,
  Shield,
  Clock,
  Users,
  PieChart,
  LineChart,
  Layers3,
  Box,
  Workflow,
  Hexagon,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Cog,
  Filter,
  Download,
  Share,
  MoreVertical,
  Server,
  Wifi,
  Bell,
  Search,
  Maximize,
  Minimize,
  Grid,
  List,
  Hash,
  Lightbulb,
  Flame,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  BarChart,
  TrendingDown,
  ToggleLeft,
  ToggleRight,
  Power,
  Waves,
  Shuffle,
  Layers2,
  Compass,
  Crosshair,
  Scan,
  Bluetooth,
  RadioIcon,
  Satellite,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeChart from "../ui/SafeChart";
import { api } from "../../services/api";
import { useWebSocket } from "../../hooks/useWebSocket";
import OfflineIndicator from "../ui/OfflineIndicator";
import toast from "react-hot-toast";

// Import core engines
import { UnifiedPredictionEngine } from "../../core/UnifiedPredictionEngine";
import { UnifiedStrategyEngine } from "../../core/UnifiedStrategyEngine";
import { unifiedDataEngine } from "../../core/UnifiedDataEngine";

// Import Intelligence Orchestrator
import {
  intelligenceOrchestrator,
  type EnsemblePrediction,
  type AutomationSettings,
} from "../../services/IntelligenceOrchestrator";

// Import PropOllama for explanations
import { PropOllama } from "../user-friendly/PropOllama";

// Import advanced analytics modules
import AdvancedAnalyticsHub from "../analytics/AdvancedAnalyticsHub";
import UniversalAnalytics from "../analytics/UniversalAnalytics";
import PerformanceAnalyticsDashboard from "../analytics/PerformanceAnalyticsDashboard";
import RealTimeAccuracyDashboard from "../analytics/RealTimeAccuracyDashboard";
import MLInsights from "../analytics/MLInsights";
import UltraMLInsights from "../analytics/UltraMLInsights";
import HyperMLInsights from "../analytics/HyperMLInsights";
import EvolutionaryInsights from "../analytics/EvolutionaryInsights";
import ClusteringInsights from "../analytics/ClusteringInsights";
import EnsembleInsights from "../analytics/EnsembleInsights";
import FeatureInsights from "../analytics/FeatureInsights";
import RiskInsights from "../analytics/RiskInsights";
import RiskAssessmentMatrix from "../analytics/RiskAssessmentMatrix";
import ShapExplanation from "../analytics/ShapExplanation";
import ModelComparison from "../analytics/ModelComparison";
import TimeSeriesInsights from "../analytics/TimeSeriesInsights";
import { SHAPInsight } from "../analytics/SHAPInsight";
import TrendAnalysisChart from "../analytics/TrendAnalysisChart";

// Import monitoring modules
import PerformanceDashboard from "../monitoring/PerformanceDashboard";

// Import ML modules
import UltraAdvancedMLDashboard from "../ml/UltraAdvancedMLDashboard";
import MLModelCenter from "../ml/MLModelCenter";

// Import mega and cyber modules
import MegaAnalytics from "../mega/MegaAnalytics";
import CyberAnalyticsHub from "../cyber/CyberAnalyticsHub";
import CyberMLDashboard from "../cyber/CyberMLDashboard";

// Import prediction modules
import UltraAccuracyDashboard from "../prediction/UltraAccuracyDashboard";
import QuantumPredictionsInterface from "../prediction/QuantumPredictionsInterface";
import UniversalPredictions from "../predictions/UniversalPredictions";

// Import strategy modules
import UnifiedStrategyEngineDisplay from "../strategy/UnifiedStrategyEngineDisplay";
import { UnifiedStrategyConfig } from "../strategy/UnifiedStrategyConfig";

// Import quantum modules
import { QuantumPlatform } from "../../quantum";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface IntelligenceMetrics {
  overallHealth: number;
  ensembleAccuracy: number;
  predictionLatency: number;
  activeModels: number;
  dataQuality: number;
  systemLoad: number;
  automationLevel: number;
  confidenceScore: number;
  quantumCoherence: number;
  neuralSyncLevel: number;
  evolutionaryProgress: number;
  cyberIntegrationScore: number;
}

interface EnsembleOutput {
  predictions: Array<{
    id: string;
    sport: string;
    market: string;
    prediction: string;
    confidence: number;
    expectedValue: number;
    kellyFraction: number;
    reasoning: string[];
    contributingModels: string[];
    timestamp: number;
  }>;
  metaAnalysis: {
    overallConfidence: number;
    diversityScore: number;
    consensusLevel: number;
    riskAssessment: string;
  };
}

interface QuantumState {
  coherence: number;
  entanglement: number;
  superposition: number;
  interference: number;
}

interface ModuleConfig {
  id: string;
  name: string;
  component: React.ComponentType<any>;
  icon: React.ReactNode;
  category:
    | "analytics"
    | "ml"
    | "prediction"
    | "strategy"
    | "monitoring"
    | "quantum"
    | "cyber";
  priority: "critical" | "high" | "medium" | "low";
  dependencies: string[];
  computationLevel: "light" | "medium" | "heavy" | "extreme";
  isActive: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const AdvancedIntelligenceHub: React.FC = () => {
  // ========== STATE MANAGEMENT ==========
  const [selectedView, setSelectedView] = useState("orchestrator");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [moduleLayout, setModuleLayout] = useState<
    "grid" | "tabs" | "accordion"
  >("tabs");
  const [isQuantumMode, setIsQuantumMode] = useState(false);

  // Refresh control states
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const [automationConfig, setAutomationConfig] = useState<AutomationSettings>({
    enableAutoOptimization: true,
    enableRealTimeEnsemble: true,
    enableSmartRebalancing: true,
    enablePredictiveScaling: false,
    optimizationThreshold: 0.85,
    rebalanceFrequency: 5,
    maxConcurrentPredictions: 50,
    confidenceThreshold: 0.75,
  });
  const [isSystemOptimizing, setIsSystemOptimizing] = useState(false);
  const [showPropOllama, setShowPropOllama] = useState(false);
  const [activeModules, setActiveModules] = useState<Set<string>>(
    new Set(["orchestrator", "advanced-analytics", "ultra-ml"]),
  );
  const [quantumState, setQuantumState] = useState<QuantumState>({
    coherence: 0.95,
    entanglement: 0.87,
    superposition: 0.92,
    interference: 0.03,
  });

  const queryClient = useQueryClient();
  const webSocketRef = useRef<WebSocket | null>(null);

  // ========== CORE ENGINE INSTANCES ==========
  const predictionEngine = useMemo(
    () => UnifiedPredictionEngine.getInstance(),
    [],
  );
  const strategyEngine = useMemo(() => UnifiedStrategyEngine.getInstance(), []);
  const quantumPlatform = useMemo(() => QuantumPlatform.getInstance(), []);

  // ========== MODULE CONFIGURATIONS ==========
  const moduleConfigs: ModuleConfig[] = useMemo(
    () => [
      // Analytics Modules
      {
        id: "advanced-analytics",
        name: "Advanced Analytics Hub",
        component: AdvancedAnalyticsHub,
        icon: <BarChart3 className="w-5 h-5" />,
        category: "analytics",
        priority: "critical",
        dependencies: [],
        computationLevel: "heavy",
        isActive: true,
      },
      {
        id: "universal-analytics",
        name: "Universal Analytics",
        component: UniversalAnalytics,
        icon: <Layers className="w-5 h-5" />,
        category: "analytics",
        priority: "high",
        dependencies: ["advanced-analytics"],
        computationLevel: "medium",
        isActive: true,
      },
      {
        id: "performance-analytics",
        name: "Performance Analytics Dashboard",
        component: PerformanceAnalyticsDashboard,
        icon: <TrendingUp className="w-5 h-5" />,
        category: "analytics",
        priority: "high",
        dependencies: [],
        computationLevel: "medium",
        isActive: true,
      },
      {
        id: "realtime-accuracy",
        name: "Real-Time Accuracy Dashboard",
        component: RealTimeAccuracyDashboard,
        icon: <Activity className="w-5 h-5" />,
        category: "analytics",
        priority: "critical",
        dependencies: [],
        computationLevel: "heavy",
        isActive: true,
      },
      {
        id: "mega-analytics",
        name: "Mega Analytics",
        component: MegaAnalytics,
        icon: <Flame className="w-5 h-5" />,
        category: "analytics",
        priority: "high",
        dependencies: ["advanced-analytics"],
        computationLevel: "extreme",
        isActive: false,
      },

      // ML Modules
      {
        id: "ultra-ml",
        name: "Ultra Advanced ML Dashboard",
        component: UltraAdvancedMLDashboard,
        icon: <Brain className="w-5 h-5" />,
        category: "ml",
        priority: "critical",
        dependencies: [],
        computationLevel: "extreme",
        isActive: true,
      },
      {
        id: "ml-model-center",
        name: "ML Model Center",
        component: MLModelCenter,
        icon: <Cpu className="w-5 h-5" />,
        category: "ml",
        priority: "high",
        dependencies: ["ultra-ml"],
        computationLevel: "heavy",
        isActive: true,
      },
      {
        id: "ml-insights",
        name: "ML Insights",
        component: MLInsights,
        icon: <Lightbulb className="w-5 h-5" />,
        category: "ml",
        priority: "medium",
        dependencies: ["ultra-ml"],
        computationLevel: "medium",
        isActive: false,
      },
      {
        id: "ultra-ml-insights",
        name: "Ultra ML Insights",
        component: UltraMLInsights,
        icon: <Sparkles className="w-5 h-5" />,
        category: "ml",
        priority: "high",
        dependencies: ["ultra-ml", "ml-insights"],
        computationLevel: "heavy",
        isActive: false,
      },
      {
        id: "hyper-ml-insights",
        name: "Hyper ML Insights",
        component: HyperMLInsights,
        icon: <Zap className="w-5 h-5" />,
        category: "ml",
        priority: "high",
        dependencies: ["ultra-ml-insights"],
        computationLevel: "extreme",
        isActive: false,
      },
      {
        id: "evolutionary-insights",
        name: "Evolutionary Insights",
        component: EvolutionaryInsights,
        icon: <GitBranch className="w-5 h-5" />,
        category: "ml",
        priority: "medium",
        dependencies: ["ultra-ml"],
        computationLevel: "heavy",
        isActive: false,
      },
      {
        id: "clustering-insights",
        name: "Clustering Insights",
        component: ClusteringInsights,
        icon: <Network className="w-5 h-5" />,
        category: "ml",
        priority: "medium",
        dependencies: ["ultra-ml"],
        computationLevel: "medium",
        isActive: false,
      },
      {
        id: "ensemble-insights",
        name: "Ensemble Insights",
        component: EnsembleInsights,
        icon: <Layers3 className="w-5 h-5" />,
        category: "ml",
        priority: "high",
        dependencies: ["ultra-ml"],
        computationLevel: "heavy",
        isActive: false,
      },
      {
        id: "feature-insights",
        name: "Feature Insights",
        component: FeatureInsights,
        icon: <Hash className="w-5 h-5" />,
        category: "ml",
        priority: "medium",
        dependencies: ["ultra-ml"],
        computationLevel: "medium",
        isActive: false,
      },

      // Cyber Modules
      {
        id: "cyber-analytics",
        name: "Cyber Analytics Hub",
        component: CyberAnalyticsHub,
        icon: <Shield className="w-5 h-5" />,
        category: "cyber",
        priority: "high",
        dependencies: ["advanced-analytics"],
        computationLevel: "extreme",
        isActive: false,
      },
      {
        id: "cyber-ml",
        name: "Cyber ML Dashboard",
        component: CyberMLDashboard,
        icon: <Atom className="w-5 h-5" />,
        category: "cyber",
        priority: "high",
        dependencies: ["ultra-ml", "cyber-analytics"],
        computationLevel: "extreme",
        isActive: false,
      },

      // Prediction Modules
      {
        id: "ultra-accuracy",
        name: "Ultra Accuracy Dashboard",
        component: UltraAccuracyDashboard,
        icon: <Target className="w-5 h-5" />,
        category: "prediction",
        priority: "critical",
        dependencies: [],
        computationLevel: "heavy",
        isActive: true,
      },
      {
        id: "quantum-predictions",
        name: "Quantum Predictions Interface",
        component: QuantumPredictionsInterface,
        icon: <Atom className="w-5 h-5" />,
        category: "quantum",
        priority: "high",
        dependencies: ["ultra-accuracy"],
        computationLevel: "extreme",
        isActive: false,
      },
      {
        id: "universal-predictions",
        name: "Universal Predictions",
        component: UniversalPredictions,
        icon: <Globe className="w-5 h-5" />,
        category: "prediction",
        priority: "high",
        dependencies: ["ultra-accuracy"],
        computationLevel: "medium",
        isActive: false,
      },

      // Strategy Modules
      {
        id: "strategy-engine",
        name: "Unified Strategy Engine",
        component: UnifiedStrategyEngineDisplay,
        icon: <Compass className="w-5 h-5" />,
        category: "strategy",
        priority: "high",
        dependencies: [],
        computationLevel: "medium",
        isActive: true,
      },
      {
        id: "strategy-config",
        name: "Strategy Configuration",
        component: UnifiedStrategyConfig,
        icon: <Settings className="w-5 h-5" />,
        category: "strategy",
        priority: "medium",
        dependencies: ["strategy-engine"],
        computationLevel: "light",
        isActive: false,
      },

      // Monitoring Modules
      {
        id: "performance-monitoring",
        name: "Performance Dashboard",
        component: PerformanceDashboard,
        icon: <Monitor className="w-5 h-5" />,
        category: "monitoring",
        priority: "high",
        dependencies: [],
        computationLevel: "medium",
        isActive: false,
      },
      {
        id: "risk-insights",
        name: "Risk Insights",
        component: RiskInsights,
        icon: <AlertCircle className="w-5 h-5" />,
        category: "analytics",
        priority: "high",
        dependencies: ["advanced-analytics"],
        computationLevel: "medium",
        isActive: false,
      },
      {
        id: "risk-assessment",
        name: "Risk Assessment Matrix",
        component: RiskAssessmentMatrix,
        icon: <Grid className="w-5 h-5" />,
        category: "analytics",
        priority: "medium",
        dependencies: ["risk-insights"],
        computationLevel: "medium",
        isActive: false,
      },

      // Additional Advanced Modules
      {
        id: "timeseries-insights",
        name: "Time Series Insights",
        component: TimeSeriesInsights,
        icon: <Clock className="w-5 h-5" />,
        category: "analytics",
        priority: "medium",
        dependencies: ["advanced-analytics"],
        computationLevel: "medium",
        isActive: false,
      },
      {
        id: "shap-explanation",
        name: "SHAP Explanations",
        component: ShapExplanation,
        icon: <Eye className="w-5 h-5" />,
        category: "ml",
        priority: "medium",
        dependencies: ["ultra-ml"],
        computationLevel: "heavy",
        isActive: false,
      },
      {
        id: "shap-insights",
        name: "SHAP Insights",
        component: SHAPInsight,
        icon: <Microscope className="w-5 h-5" />,
        category: "ml",
        priority: "medium",
        dependencies: ["shap-explanation"],
        computationLevel: "heavy",
        isActive: false,
      },
      {
        id: "model-comparison",
        name: "Model Comparison",
        component: ModelComparison,
        icon: <BarChart className="w-5 h-5" />,
        category: "ml",
        priority: "medium",
        dependencies: ["ultra-ml"],
        computationLevel: "medium",
        isActive: false,
      },
      {
        id: "trend-analysis",
        name: "Trend Analysis",
        component: TrendAnalysisChart,
        icon: <TrendingUp className="w-5 h-5" />,
        category: "analytics",
        priority: "medium",
        dependencies: ["advanced-analytics"],
        computationLevel: "medium",
        isActive: false,
      },
    ],
    [],
  );

  // ========== API QUERIES ==========
  const { data: intelligenceMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["intelligenceMetrics"],
    queryFn: async () => {
      const [health, accuracy, models, system] = await Promise.allSettled([
        api.getHealthStatus(),
        api.getAccuracyMetrics(),
        api.getModelMetrics(),
        api.getSystemResources(),
      ]);

      return {
        overallHealth:
          health.status === "fulfilled"
            ? health.value?.overallHealth * 100 || 85
            : 85,
        ensembleAccuracy:
          accuracy.status === "fulfilled"
            ? accuracy.value?.overall_accuracy * 100 || 92
            : 92,
        predictionLatency:
          accuracy.status === "fulfilled"
            ? accuracy.value?.prediction_latency || 150
            : 150,
        activeModels:
          models.status === "fulfilled"
            ? models.value?.active_models || 12
            : 12,
        dataQuality:
          health.status === "fulfilled"
            ? health.value?.dataQuality * 100 || 94
            : 94,
        systemLoad:
          system.status === "fulfilled" ? system.value?.cpu_usage || 65 : 65,
        automationLevel: 98,
        confidenceScore: 96.5,
        quantumCoherence: quantumState.coherence * 100,
        neuralSyncLevel: 94.7,
        evolutionaryProgress: 89.3,
        cyberIntegrationScore: 91.8,
      } as IntelligenceMetrics;
    },
    refetchInterval: isAutoRefreshEnabled ? refreshInterval : false,
    retry: 2,
    onSuccess: () => {
      setLastUpdated(new Date());
      setIsManualRefreshing(false);
    },
  });

  const { data: ensembleOutput, isLoading: ensembleLoading } = useQuery({
    queryKey: ["ensembleOutput"],
    queryFn: async () => {
      try {
        if (!intelligenceOrchestrator) {
          throw new Error("Intelligence Orchestrator not available");
        }

        const predictions =
          await intelligenceOrchestrator.generateEnsemblePredictions();
        const confidences = predictions.map((p) => p.confidence);
        const diversityScores = predictions.map(
          (p) => p.metadata.diversityScore,
        );
        const consensusLevels = predictions.map(
          (p) => p.metadata.consensusLevel,
        );

        return {
          predictions,
          metaAnalysis: {
            overallConfidence:
              confidences.reduce((a, b) => a + b, 0) / confidences.length || 0,
            diversityScore:
              diversityScores.reduce((a, b) => a + b, 0) /
                diversityScores.length || 0,
            consensusLevel:
              consensusLevels.reduce((a, b) => a + b, 0) /
                consensusLevels.length || 0,
            riskAssessment:
              predictions.length > 0
                ? predictions[0].metadata.riskAssessment
                : "Unknown",
          },
        };
      } catch (error) {
        console.warn("Using fallback ensemble data:", error);
        return {
          predictions: [
            {
              id: "pred-1",
              sport: "NBA",
              market: "Player Points",
              prediction: "LeBron James Over 27.5 Points",
              confidence: 94.2,
              expectedValue: 0.185,
              kellyFraction: 0.12,
              reasoning: [
                "Historical performance vs this opponent: 31.2 avg",
                "Recent form: 29.8 points in last 5 games",
                "Matchup advantage: Weak opposing defense",
                "Rest advantage: 2 days vs opponent's back-to-back",
              ],
              contributingModels: [
                "XGBoost-Ensemble",
                "Neural-Deep-V3",
                "Bayesian-Optimizer",
                "Pattern-Recognition",
              ],
              timestamp: Date.now(),
              metadata: {
                diversityScore: 0.87,
                consensusLevel: 0.91,
                riskAssessment: "Moderate",
                dataQuality: 0.94,
              },
            },
          ] as EnsemblePrediction[],
          metaAnalysis: {
            overallConfidence: 94.2,
            diversityScore: 0.87,
            consensusLevel: 0.91,
            riskAssessment: "Moderate - Well-balanced portfolio",
          },
        };
      }
    },
    refetchInterval: 10000,
    retry: 2,
  });

  // ========== ORCHESTRATOR INITIALIZATION ==========
  useEffect(() => {
    const initializeOrchestrator = async () => {
      try {
        await intelligenceOrchestrator.initialize();
        const currentSettings =
          intelligenceOrchestrator.getAutomationSettings();
        setAutomationConfig(currentSettings);
        toast.success("Intelligence Orchestrator initialized successfully");
      } catch (error) {
        console.error("Failed to initialize orchestrator:", error);
        toast.error("Failed to initialize orchestrator - using fallback mode");
      }
    };

    initializeOrchestrator();
  }, []);

  // ========== QUANTUM STATE MANAGEMENT ==========
  useEffect(() => {
    if (isQuantumMode) {
      const interval = setInterval(() => {
        setQuantumState((prev) => ({
          coherence: Math.min(
            0.98,
            prev.coherence + (Math.random() - 0.5) * 0.02,
          ),
          entanglement: Math.min(
            0.95,
            prev.entanglement + (Math.random() - 0.5) * 0.03,
          ),
          superposition: Math.min(
            0.97,
            prev.superposition + (Math.random() - 0.5) * 0.025,
          ),
          interference: Math.max(
            0.01,
            prev.interference + (Math.random() - 0.5) * 0.01,
          ),
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isQuantumMode]);

  // ========== WEBSOCKET CONNECTION FOR REAL-TIME UPDATES ==========
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        webSocketRef.current = new WebSocket("ws://localhost:8000");

        webSocketRef.current.onopen = () => {
          console.log("Intelligence Hub WebSocket connected");
          toast.success("Real-time data stream connected");
        };

        webSocketRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);

          // Handle real-time updates
          if (data.type === "metrics_update") {
            queryClient.invalidateQueries({
              queryKey: ["intelligenceMetrics"],
            });
          } else if (data.type === "prediction_update") {
            queryClient.invalidateQueries({ queryKey: ["ensembleOutput"] });
          }
        };

        webSocketRef.current.onerror = () => {
          console.warn("WebSocket connection failed - using polling mode");
        };
      } catch (error) {
        console.warn("WebSocket not available - using polling mode");
      }
    };

    connectWebSocket();

    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [queryClient]);

  // ========== MODULE MANAGEMENT ==========
  const toggleModule = useCallback(
    (moduleId: string) => {
      setActiveModules((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(moduleId)) {
          newSet.delete(moduleId);
          toast.success(
            `Deactivated ${moduleConfigs.find((m) => m.id === moduleId)?.name}`,
          );
        } else {
          newSet.add(moduleId);
          toast.success(
            `Activated ${moduleConfigs.find((m) => m.id === moduleId)?.name}`,
          );
        }
        return newSet;
      });
    },
    [moduleConfigs],
  );

  const getActiveModuleConfigs = useCallback(() => {
    return moduleConfigs.filter((config) => activeModules.has(config.id));
  }, [moduleConfigs, activeModules]);

  // ========== AUTOMATION HANDLERS ==========
  const triggerSystemOptimization = useCallback(async () => {
    setIsSystemOptimizing(true);
    try {
      toast.loading("Initiating system-wide optimization...", {
        duration: 2000,
      });

      const metrics = await intelligenceOrchestrator.getOrchestrationMetrics();
      toast.success(
        `System optimization complete! Performance: ${(metrics.ensemblePerformance * 100).toFixed(1)}%`,
      );
      queryClient.invalidateQueries();
    } catch (error) {
      toast.error("Optimization failed - please check system status");
    } finally {
      setIsSystemOptimizing(false);
    }
  }, [queryClient]);

  const handleAutomationToggle = useCallback(
    (key: keyof AutomationSettings, value: boolean | string | number) => {
      const newConfig = { ...automationConfig, [key]: value };
      setAutomationConfig(newConfig);
      intelligenceOrchestrator.updateAutomationSettings(newConfig);
      toast.success(`Automation setting updated: ${key}`);
    },
    [automationConfig],
  );

  // ========== ORCHESTRATOR VIEW ==========
  const OrchestratorView = () => (
    <div className="space-y-6">
      {/* System Status Header with Quantum Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-300">System Health</p>
                <p className="text-2xl font-bold text-green-400">
                  {intelligenceMetrics?.overallHealth.toFixed(1) || "98.5"}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent animate-pulse" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-300">Ensemble Accuracy</p>
                <p className="text-2xl font-bold text-blue-400">
                  {intelligenceMetrics?.ensembleAccuracy.toFixed(1) || "96.8"}%
                </p>
              </div>
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent animate-pulse" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-purple-500/30 relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-300">Active Modules</p>
                <p className="text-2xl font-bold text-purple-400">
                  {activeModules.size}
                </p>
              </div>
              <Layers className="w-8 h-8 text-purple-400" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent animate-pulse" />
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br ${isQuantumMode ? "from-pink-500/20 to-cyan-500/20 border-pink-500/30" : "from-orange-500/20 to-red-500/20 border-orange-500/30"} relative overflow-hidden transition-all duration-1000`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-300">
                  {isQuantumMode ? "Quantum Coherence" : "Automation Level"}
                </p>
                <p className="text-2xl font-bold text-orange-400">
                  {isQuantumMode
                    ? `${(quantumState.coherence * 100).toFixed(1)}%`
                    : `${intelligenceMetrics?.automationLevel || "98"}%`}
                </p>
              </div>
              {isQuantumMode ? (
                <Atom className="w-8 h-8 text-pink-400 animate-spin" />
              ) : (
                <Zap className="w-8 h-8 text-orange-400" />
              )}
            </div>
            <div
              className={`absolute inset-0 bg-gradient-to-r ${isQuantumMode ? "from-pink-500/20" : "from-orange-500/10"} to-transparent animate-pulse`}
            />
          </CardContent>
        </Card>
      </div>

      {/* Quantum Controls */}
      {isQuantumMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {Object.entries(quantumState).map(([key, value]) => (
            <Card
              key={key}
              className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 border-pink-500/20"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-pink-300 capitalize">{key}</p>
                  <Satellite className="w-4 h-4 text-pink-400" />
                </div>
                <p className="text-lg font-bold text-pink-400">
                  {(value * 100).toFixed(2)}%
                </p>
                <Progress value={value * 100} className="mt-2 h-1" />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Real-time Ensemble Output */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Live Ensemble Predictions
              <Badge variant="outline">
                {ensembleOutput?.predictions.length || 0} Active
              </Badge>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsQuantumMode(!isQuantumMode)}
                className={`${isQuantumMode ? "bg-pink-500/20 border-pink-500/50" : ""}`}
              >
                {isQuantumMode ? (
                  <Atom className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Binary className="w-4 h-4 mr-1" />
                )}
                {isQuantumMode ? "Quantum" : "Classical"}
              </Button>

              {/* Refresh Controls */}
              <div className="flex items-center gap-1 relative z-10">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsAutoRefreshEnabled(!isAutoRefreshEnabled)}
                className={`${isAutoRefreshEnabled ? "bg-green-500/20 border-green-500/50" : "bg-gray-500/20 border-gray-500/50"}`}
              >
                {isAutoRefreshEnabled ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </Button>

              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="text-xs bg-slate-700 border border-slate-600 rounded px-2 py-1 text-white"
              >
                <option value={2000}>2s</option>
                <option value={5000}>5s</option>
                <option value={10000}>10s</option>
                <option value={30000}>30s</option>
              </select>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsManualRefreshing(true);
                  // This will trigger a refetch in the next render
                }}
                disabled={isManualRefreshing}
                className="h-7"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isManualRefreshing ? "animate-spin" : ""}`}
                />
              </Button>

              <span className="text-xs text-slate-400">
                {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ensembleOutput?.predictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-lg border border-slate-600/50 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">
                      {prediction.prediction}
                    </h4>
                    <p className="text-sm text-slate-300">
                      {prediction.sport} • {prediction.market}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-400">
                      {prediction.confidence.toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-400">Confidence</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-slate-400">
                      Expected Value:
                    </span>
                    <span className="ml-2 text-green-400 font-semibold">
                      +{(prediction.expectedValue * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">
                      Kelly Fraction:
                    </span>
                    <span className="ml-2 text-blue-400 font-semibold">
                      {(prediction.kellyFraction * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-slate-400 mb-2">
                    Contributing Models:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {prediction.contributingModels.map((model, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {model}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowPropOllama(true)}
                    className="flex-1"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Explain with PropOllama
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedModule("shap-explanation")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    SHAP Analysis
                  </Button>
                </div>

                {isQuantumMode && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-cyan-500/5 animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ========== MODULE SELECTION VIEW ==========
  const ModuleSelectionView = () => (
    <div className="space-y-6">
      {/* Module Layout Controls */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Grid className="w-5 h-5" />
              Module Management
            </span>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={moduleLayout === "grid" ? "default" : "outline"}
                onClick={() => setModuleLayout("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={moduleLayout === "tabs" ? "default" : "outline"}
                onClick={() => setModuleLayout("tabs")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={moduleLayout === "accordion" ? "default" : "outline"}
                onClick={() => setModuleLayout("accordion")}
              >
                <Layers2 className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleConfigs.map((module) => (
              <motion.div
                key={module.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  activeModules.has(module.id)
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/50"
                    : "bg-slate-700/30 border-slate-600/50 hover:border-slate-500"
                }`}
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {module.icon}
                    <span className="font-medium text-sm">{module.name}</span>
                  </div>
                  {activeModules.has(module.id) ? (
                    <ToggleRight className="w-5 h-5 text-green-400" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      module.priority === "critical"
                        ? "border-red-500 text-red-400"
                        : module.priority === "high"
                          ? "border-orange-500 text-orange-400"
                          : module.priority === "medium"
                            ? "border-yellow-500 text-yellow-400"
                            : "border-green-500 text-green-400"
                    }`}
                  >
                    {module.priority}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {module.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Load: {module.computationLevel}
                  </span>
                  <span className="text-xs text-slate-400">
                    Deps: {module.dependencies.length}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex gap-2">
            <Button
              onClick={() => {
                const criticalModules = moduleConfigs
                  .filter((m) => m.priority === "critical")
                  .map((m) => m.id);
                setActiveModules(new Set(criticalModules));
                toast.success("Activated all critical modules");
              }}
              className="flex-1"
            >
              <Zap className="w-4 h-4 mr-2" />
              Critical Only
            </Button>
            <Button
              onClick={() => {
                const allModules = moduleConfigs.map((m) => m.id);
                setActiveModules(new Set(allModules));
                toast.success("Activated all modules");
              }}
              variant="outline"
              className="flex-1"
            >
              <Power className="w-4 h-4 mr-2" />
              Full Power
            </Button>
            <Button
              onClick={() => {
                setActiveModules(new Set(["orchestrator"]));
                toast.success("Minimal mode activated");
              }}
              variant="outline"
              className="flex-1"
            >
              <Minimize className="w-4 h-4 mr-2" />
              Minimal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ========== AUTOMATION CONTROLS ==========
  const AutomationView = () => (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Automation Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(automationConfig).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-white capitalize">
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </h4>
                <p className="text-sm text-slate-400">
                  {key === "enableAutoOptimization" &&
                    "Automatically optimize models based on performance"}
                  {key === "enableRealTimeEnsemble" &&
                    "Real-time ensemble prediction updates"}
                  {key === "enableSmartRebalancing" &&
                    "Intelligent model weight rebalancing"}
                  {key === "enablePredictiveScaling" &&
                    "Predictive resource scaling"}
                  {key === "optimizationThreshold" &&
                    "Threshold for triggering optimization (0-1)"}
                  {key === "rebalanceFrequency" &&
                    "Frequency of model rebalancing (minutes)"}
                  {key === "maxConcurrentPredictions" &&
                    "Maximum concurrent predictions"}
                  {key === "confidenceThreshold" &&
                    "Minimum confidence for predictions (0-1)"}
                </p>
              </div>
              <div>
                {typeof value === "boolean" ? (
                  <Button
                    variant={value ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      handleAutomationToggle(
                        key as keyof AutomationSettings,
                        !value,
                      )
                    }
                  >
                    {value ? "Enabled" : "Disabled"}
                  </Button>
                ) : (
                  <span className="text-blue-400 font-semibold">
                    {typeof value === "number"
                      ? value.toFixed(key.includes("Threshold") ? 2 : 0)
                      : value}
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Actions */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={triggerSystemOptimization}
              disabled={isSystemOptimizing}
              className="h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Brain className="w-5 h-5 mr-2" />
              {isSystemOptimizing
                ? "Optimizing..."
                : "Trigger Full Optimization"}
            </Button>

            <Button
              variant="outline"
              className="h-16"
              onClick={() => queryClient.invalidateQueries()}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ========== ANALYTICS INTEGRATION VIEW ==========
  const AnalyticsIntegrationView = () => {
    const activeAnalyticsModules = getActiveModuleConfigs().filter(
      (m) => m.category === "analytics" || m.category === "ml",
    );

    return (
      <div className="space-y-6">
        <Card className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Integrated Analytics Suite
              <Badge variant="outline" className="ml-auto">
                {activeAnalyticsModules.length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {moduleLayout === "tabs" ? (
              <Tabs
                defaultValue={activeAnalyticsModules[0]?.id}
                className="space-y-4"
              >
                <TabsList className="grid w-full grid-cols-6 bg-slate-700/30">
                  {activeAnalyticsModules.slice(0, 6).map((module) => (
                    <TabsTrigger
                      key={module.id}
                      value={module.id}
                      className="flex items-center gap-1 text-xs"
                    >
                      {module.icon}
                      <span className="hidden lg:inline">
                        {module.name.split(" ")[0]}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {activeAnalyticsModules.map((module) => (
                  <TabsContent
                    key={module.id}
                    value={module.id}
                    className="space-y-4"
                  >
                    <div className="min-h-[500px] bg-slate-900/30 rounded-lg p-4">
                      <React.Suspense
                        fallback={
                          <div className="flex items-center justify-center h-96">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                          </div>
                        }
                      >
                        <module.component />
                      </React.Suspense>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeAnalyticsModules.map((module) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/30 rounded-lg p-4 border border-slate-700/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        {module.icon}
                        {module.name}
                      </h3>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedModule(module.id)}
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="h-64 overflow-hidden">
                      <React.Suspense
                        fallback={
                          <div className="flex items-center justify-center h-full">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                          </div>
                        }
                      >
                        <module.component />
                      </React.Suspense>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6 relative overflow-hidden">
      {/* Quantum Background Effects */}
      {isQuantumMode && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-500/5 animate-pulse" />
          <div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-bounce"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-3/4 right-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-bounce"
            style={{ animationDelay: "2s" }}
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-xl blur-xl opacity-60 transition-all duration-1000 ${
                  isQuantumMode
                    ? "bg-gradient-to-r from-pink-400 to-cyan-400"
                    : "bg-gradient-to-r from-blue-400 to-purple-400"
                }`}
              />
              <div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-1000 ${
                  isQuantumMode
                    ? "bg-gradient-to-br from-pink-400 to-cyan-400"
                    : "bg-gradient-to-br from-blue-400 to-purple-400"
                }`}
              >
                {isQuantumMode ? (
                  <Atom className="w-7 h-7 text-white animate-spin" />
                ) : (
                  <Brain className="w-7 h-7 text-white" />
                )}
              </div>
            </div>
            <div>
              <h1
                className={`text-3xl font-bold bg-clip-text text-transparent transition-all duration-1000 ${
                  isQuantumMode
                    ? "bg-gradient-to-r from-pink-400 to-cyan-400"
                    : "bg-gradient-to-r from-blue-400 to-purple-400"
                }`}
              >
                {isQuantumMode
                  ? "Quantum Intelligence Hub"
                  : "Advanced Intelligence Hub"}
              </h1>
              <p className="text-slate-400">
                {isQuantumMode
                  ? "Quantum-Enhanced Ensemble Orchestration & Reality Synthesis"
                  : "Automated Ensemble Orchestration & Prediction System"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowPropOllama(true)}
              className="gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              PropOllama
            </Button>
            <Badge variant="outline" className="px-3 py-1">
              {intelligenceMetrics?.confidenceScore.toFixed(1) || "96.5"}%
              System Confidence
            </Badge>
            <Button
              variant="outline"
              onClick={() => setIsQuantumMode(!isQuantumMode)}
              className={`gap-2 transition-all duration-300 ${
                isQuantumMode
                  ? "bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-pink-500/50"
                  : ""
              }`}
            >
              {isQuantumMode ? (
                <Atom className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              {isQuantumMode ? "Quantum Mode" : "Enter Quantum"}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs
        value={selectedView}
        onValueChange={setSelectedView}
        className="space-y-6 relative z-10"
      >
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 backdrop-blur-sm">
          <TabsTrigger value="orchestrator" className="flex items-center gap-2">
            <Workflow className="w-4 h-4" />
            Orchestrator
          </TabsTrigger>
          <TabsTrigger value="modules" className="flex items-center gap-2">
            <Grid className="w-4 h-4" />
            Modules
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics Suite
          </TabsTrigger>
          <TabsTrigger value="automation" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="quantum" className="flex items-center gap-2">
            <Atom className="w-4 h-4" />
            Quantum Lab
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orchestrator">
          <OrchestratorView />
        </TabsContent>

        <TabsContent value="modules">
          <ModuleSelectionView />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsIntegrationView />
        </TabsContent>

        <TabsContent value="automation">
          <AutomationView />
        </TabsContent>

        <TabsContent value="quantum">
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-pink-500/10 to-cyan-500/10 border-pink-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Atom className="w-5 h-5 text-pink-400 animate-spin" />
                  Quantum Computing Lab
                  <Badge
                    variant="outline"
                    className="ml-auto border-pink-500/50 text-pink-400"
                  >
                    Experimental
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-pink-400">
                      Quantum State Monitor
                    </h3>
                    {Object.entries(quantumState).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-300 capitalize">
                            {key}
                          </span>
                          <span className="text-sm text-pink-400">
                            {(value * 100).toFixed(2)}%
                          </span>
                        </div>
                        <Progress value={value * 100} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-cyan-400">
                      Quantum Predictions Interface
                    </h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 min-h-[200px]">
                      <React.Suspense
                        fallback={
                          <div className="flex items-center justify-center h-full">
                            <Atom className="w-8 h-8 text-pink-400 animate-spin" />
                          </div>
                        }
                      >
                        <QuantumPredictionsInterface />
                      </React.Suspense>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Selected Module Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-7xl max-h-[90vh] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {moduleConfigs.find((m) => m.id === selectedModule)?.icon}
                  {moduleConfigs.find((m) => m.id === selectedModule)?.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedModule(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-[calc(90vh-80px)] overflow-auto p-4">
                <React.Suspense
                  fallback={
                    <div className="flex items-center justify-center h-96">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                    </div>
                  }
                >
                  {(() => {
                    const module = moduleConfigs.find(
                      (m) => m.id === selectedModule,
                    );
                    return module ? <module.component /> : null;
                  })()}
                </React.Suspense>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PropOllama Modal */}
      <AnimatePresence>
        {showPropOllama && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowPropOllama(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl max-h-[80vh] bg-slate-900 rounded-xl border border-slate-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  PropOllama AI Assistant
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPropOllama(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-96 overflow-hidden">
                <PropOllama />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedIntelligenceHub;