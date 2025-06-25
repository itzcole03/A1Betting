import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Grid,
  List,
  Layers2,
  DollarSign,
  Target,
  Brain,
  ToggleRight,
  ToggleLeft,
  Zap,
  Power,
  Minimize,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface ModuleMetrics {
  moneyMakingScore: number;
  predictionImpact: number;
  profitContribution: number;
  reliabilityScore: number;
  roi: number;
}

interface EnhancedModuleConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  priority: "critical" | "high" | "medium" | "low";
  dependencies: string[];
  computationLevel: "light" | "medium" | "heavy" | "extreme";
  isActive: boolean;
  description: string;
  metrics: ModuleMetrics;
}

interface EnhancedModuleManagementProps {
  modules: EnhancedModuleConfig[];
  activeModules: Set<string>;
  onToggleModule: (moduleId: string) => void;
  onBatchActivate: (moduleIds: string[]) => void;
}

export const EnhancedModuleManagement: React.FC<
  EnhancedModuleManagementProps
> = ({ modules, activeModules, onToggleModule, onBatchActivate }) => {
  const [moduleLayout, setModuleLayout] = useState<
    "grid" | "tabs" | "accordion"
  >("grid");

  // Calculate aggregate metrics for active modules
  const activeMetrics = useMemo(() => {
    const activeModuleConfigs = modules.filter((m) => activeModules.has(m.id));
    return {
      totalProfitContribution: activeModuleConfigs.reduce(
        (sum, m) => sum + m.metrics.profitContribution,
        0,
      ),
      avgPredictionAccuracy:
        activeModuleConfigs.length > 0
          ? activeModuleConfigs.reduce(
              (sum, m) => sum + m.metrics.predictionImpact,
              0,
            ) / activeModuleConfigs.length
          : 0,
      avgMoneyMakingScore:
        activeModuleConfigs.length > 0
          ? activeModuleConfigs.reduce(
              (sum, m) => sum + m.metrics.moneyMakingScore,
              0,
            ) / activeModuleConfigs.length
          : 0,
      totalROI: activeModuleConfigs.reduce((sum, m) => sum + m.metrics.roi, 0),
    };
  }, [modules, activeModules]);

  // Smart recommendations for module combinations
  const getSmartRecommendations = useCallback(() => {
    const profitOptimized = modules
      .filter((m) => m.metrics.moneyMakingScore >= 85)
      .sort(
        (a, b) => b.metrics.profitContribution - a.metrics.profitContribution,
      )
      .slice(0, 6)
      .map((m) => m.id);

    const accuracyOptimized = modules
      .filter((m) => m.metrics.predictionImpact >= 80)
      .sort((a, b) => b.metrics.predictionImpact - a.metrics.predictionImpact)
      .slice(0, 6)
      .map((m) => m.id);

    const balanced = modules
      .filter(
        (m) =>
          m.metrics.moneyMakingScore >= 70 && m.metrics.predictionImpact >= 70,
      )
      .sort(
        (a, b) =>
          b.metrics.moneyMakingScore +
          b.metrics.predictionImpact -
          (a.metrics.moneyMakingScore + a.metrics.predictionImpact),
      )
      .slice(0, 8)
      .map((m) => m.id);

    return { profitOptimized, accuracyOptimized, balanced };
  }, [modules]);

  const recommendations = getSmartRecommendations();

  return (
    <Card className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border border-slate-700/50 shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Intelligent Module Management
              </span>
              <p className="text-xs text-slate-400 font-normal">
                Optimize for maximum profitability
              </p>
            </div>
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={moduleLayout === "grid" ? "default" : "outline"}
              onClick={() => setModuleLayout("grid")}
              className="hover:scale-105 transition-transform"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={moduleLayout === "tabs" ? "default" : "outline"}
              onClick={() => setModuleLayout("tabs")}
              className="hover:scale-105 transition-transform"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant={moduleLayout === "accordion" ? "default" : "outline"}
              onClick={() => setModuleLayout("accordion")}
              className="hover:scale-105 transition-transform"
            >
              <Layers2 className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Performance Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-500/15 to-emerald-500/15 border-green-500/30 relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-300 uppercase tracking-wide font-semibold">
                    Total Profit Impact
                  </p>
                  <p className="text-2xl font-bold text-green-400">
                    ${activeMetrics.totalProfitContribution.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-300">
                    Active modules contribution
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent animate-pulse" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border-blue-500/30 relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-300 uppercase tracking-wide font-semibold">
                    Prediction Accuracy
                  </p>
                  <p className="text-2xl font-bold text-blue-400">
                    {activeMetrics.avgPredictionAccuracy.toFixed(1)}%
                  </p>
                  <p className="text-xs text-blue-300">Ensemble average</p>
                </div>
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent animate-pulse" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/15 to-pink-500/15 border-purple-500/30 relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-300 uppercase tracking-wide font-semibold">
                    Active Modules
                  </p>
                  <p className="text-2xl font-bold text-purple-400">
                    {activeModules.size}/{modules.length}
                  </p>
                  <p className="text-xs text-purple-300">
                    Optimal: 6-8 modules
                  </p>
                </div>
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent animate-pulse" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/15 to-yellow-500/15 border-orange-500/30 relative overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-300 uppercase tracking-wide font-semibold">
                    Total ROI
                  </p>
                  <p className="text-2xl font-bold text-orange-400">
                    {activeMetrics.totalROI.toFixed(1)}%
                  </p>
                  <p className="text-xs text-orange-300">
                    Return on investment
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-400" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent animate-pulse" />
            </CardContent>
          </Card>
        </div>

        {/* Smart Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={() => onBatchActivate(recommendations.profitOptimized)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Max Profit Setup
          </Button>
          <Button
            onClick={() => onBatchActivate(recommendations.accuracyOptimized)}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
          >
            <Target className="w-4 h-4 mr-2" />
            Max Accuracy Setup
          </Button>
          <Button
            onClick={() => onBatchActivate(recommendations.balanced)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Balanced Setup
          </Button>
        </div>

        {/* Enhanced Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules
            .sort(
              (a, b) => b.metrics.moneyMakingScore - a.metrics.moneyMakingScore,
            )
            .map((module) => {
              const isActive = activeModules.has(module.id);
              const {
                moneyMakingScore,
                predictionImpact,
                profitContribution,
                reliabilityScore,
                roi,
              } = module.metrics;

              return (
                <motion.div
                  key={module.id}
                  whileHover={{ scale: 1.02, rotateY: 1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                    isActive
                      ? "bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-blue-500/20 border-green-400/60 shadow-lg shadow-green-500/25"
                      : "bg-slate-800/40 border-slate-600/40 hover:border-slate-500/60 hover:bg-slate-700/30"
                  }`}
                  onClick={() => onToggleModule(module.id)}
                >
                  {/* Money-Making Score Badge */}
                  {moneyMakingScore >= 85 && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                      💰 {moneyMakingScore}%
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg transition-colors ${isActive ? "bg-green-500/25" : "bg-slate-600/25"}`}
                      >
                        {module.icon}
                      </div>
                      <div>
                        <span className="font-semibold text-sm block leading-tight">
                          {module.name}
                        </span>
                        <span className="text-xs text-slate-400 capitalize">
                          {module.category}
                        </span>
                      </div>
                    </div>
                    {isActive ? (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <ToggleRight className="w-5 h-5 text-green-400" />
                      </div>
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    {module.description}
                  </p>

                  {/* Performance Metrics */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Money Making
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              moneyMakingScore >= 90
                                ? "bg-gradient-to-r from-green-500 to-emerald-400"
                                : moneyMakingScore >= 75
                                  ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                                  : moneyMakingScore >= 60
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                                    : "bg-gradient-to-r from-red-500 to-pink-400"
                            }`}
                            style={{ width: `${moneyMakingScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-green-400">
                          {moneyMakingScore}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Prediction Boost
                      </span>
                      <span className="text-xs font-medium text-blue-400">
                        +{predictionImpact}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">ROI</span>
                      <span className="text-xs font-medium text-orange-400">
                        {roi}%
                      </span>
                    </div>

                    {profitContribution > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          24h Profit
                        </span>
                        <span className="text-xs font-medium text-green-400">
                          +${profitContribution.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          module.priority === "critical"
                            ? "border-red-400/60 text-red-300 bg-red-500/10"
                            : module.priority === "high"
                              ? "border-orange-400/60 text-orange-300 bg-orange-500/10"
                              : module.priority === "medium"
                                ? "border-yellow-400/60 text-yellow-300 bg-yellow-500/10"
                                : "border-green-400/60 text-green-300 bg-green-500/10"
                        }`}
                      >
                        {module.priority}
                      </Badge>
                      {reliabilityScore >= 90 && (
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 capitalize">
                        {module.computationLevel}
                      </span>
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          module.computationLevel === "light"
                            ? "bg-green-400"
                            : module.computationLevel === "medium"
                              ? "bg-yellow-400"
                              : module.computationLevel === "heavy"
                                ? "bg-orange-400"
                                : "bg-red-400"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Active indicator glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-blue-500/5 animate-pulse pointer-events-none"></div>
                  )}
                </motion.div>
              );
            })}
        </div>

        {/* Traditional Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={() => {
              const criticalModules = modules
                .filter((m) => m.priority === "critical")
                .map((m) => m.id);
              onBatchActivate(criticalModules);
              toast.success("Activated all critical modules");
            }}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <Zap className="w-4 h-4 mr-2" />
            Critical Only
          </Button>
          <Button
            onClick={() => {
              const allModules = modules.map((m) => m.id);
              onBatchActivate(allModules);
              toast.success("Activated all modules");
            }}
            variant="outline"
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          >
            <Power className="w-4 h-4 mr-2" />
            Full Power
          </Button>
          <Button
            onClick={() => {
              onBatchActivate([]);
              toast.success("Minimal mode activated");
            }}
            variant="outline"
            className="border-slate-500/30 text-slate-400 hover:bg-slate-500/10"
          >
            <Minimize className="w-4 h-4 mr-2" />
            Reset All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedModuleManagement;
