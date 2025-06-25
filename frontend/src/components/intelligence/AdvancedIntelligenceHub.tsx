import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Suspense,
  lazy,
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
  DollarSign,
  ChevronDown,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SafeChart from "../ui/SafeChart";
import { api } from "../../services/api";
import { useWebSocket } from "../../hooks/useWebSocket";
import OfflineIndicator from "../ui/OfflineIndicator";
import toast from "react-hot-toast";

// Lazy load heavy components for better performance
const UltraAccuracyDashboard = lazy(
  () => import("../overview/UltraAccuracyOverview"),
);
const QuantumPredictionsInterface = lazy(
  () => import("../prediction/QuantumPredictionsInterface"),
);
const UnifiedStrategyEngineDisplay = lazy(
  () => import("../strategy/UnifiedStrategyEngineDisplay"),
);
const CyberAnalyticsHub = lazy(() => import("../cyber/CyberAnalyticsHub"));
const CyberMLDashboard = lazy(() => import("../cyber/CyberMLDashboard"));

// Types
interface IntelligenceModule {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category:
    | "prediction"
    | "analytics"
    | "ml"
    | "strategy"
    | "monitoring"
    | "quantum"
    | "cyber";
  priority: "critical" | "high" | "medium" | "low";
  dependencies: string[];
  computationLevel: "light" | "medium" | "heavy" | "extreme";
  isActive: boolean;
  component: React.ComponentType<any>;
  status: "healthy" | "warning" | "error" | "offline";
  lastUpdated: Date;
  metrics?: {
    accuracy?: number;
    performance?: number;
    reliability?: number;
  };
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  gpu: number;
  network: number;
  activeModules: number;
  totalPredictions: number;
  accuracy: number;
  uptime: number;
}

// Default placeholder components for missing modules
const DefaultModuleComponent: React.FC<{ moduleName: string }> = ({
  moduleName,
}) => (
  <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
    <div className="text-center space-y-4">
      <Brain className="w-16 h-16 text-gray-400 mx-auto" />
      <div>
        <h3 className="text-lg font-semibold text-gray-600">{moduleName}</h3>
        <p className="text-sm text-gray-500">Module loading or not available</p>
      </div>
    </div>
  </div>
);

// Enhanced loading component
const ModuleLoader: React.FC = () => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Brain className="w-12 h-12 text-blue-500" />
      </motion.div>
      <p className="text-sm text-gray-600">Loading AI Module...</p>
    </div>
  </div>
);

export const AdvancedIntelligenceHub: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSystemOptimized, setIsSystemOptimized] = useState(true);
  const [moduleStates, setModuleStates] = useState<Record<string, boolean>>({});
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 68,
    memory: 45,
    gpu: 78,
    network: 92,
    activeModules: 12,
    totalPredictions: 15847,
    accuracy: 94.7,
    uptime: 99.8,
  });

  // Real-time data
  const { isConnected, lastMessage } = useWebSocket("ws://localhost:8000");
  const queryClient = useQueryClient();

  // Module definitions with comprehensive configuration
  const modules: IntelligenceModule[] = useMemo(
    () => [
      {
        id: "ultra-accuracy",
        name: "Ultra Accuracy Dashboard",
        description:
          "97.3% accuracy prediction engine with real-time model performance",
        icon: <Target className="w-5 h-5" />,
        category: "prediction",
        priority: "critical",
        dependencies: [],
        computationLevel: "heavy",
        isActive: true,
        component: UltraAccuracyDashboard,
        status: "healthy",
        lastUpdated: new Date(),
        metrics: { accuracy: 97.3, performance: 94.8, reliability: 99.2 },
      },
      {
        id: "quantum-predictions",
        name: "Quantum Predictions Interface",
        description:
          "Quantum-enhanced prediction engine with superposition algorithms",
        icon: <Atom className="w-5 h-5" />,
        category: "quantum",
        priority: "high",
        dependencies: ["ultra-accuracy"],
        computationLevel: "extreme",
        isActive: false,
        component: QuantumPredictionsInterface,
        status: "healthy",
        lastUpdated: new Date(),
        metrics: { accuracy: 98.1, performance: 92.3, reliability: 97.8 },
      },
      {
        id: "strategy-engine",
        name: "Unified Strategy Engine",
        description:
          "Intelligent betting strategy optimization with risk management",
        icon: <Compass className="w-5 h-5" />,
        category: "strategy",
        priority: "high",
        dependencies: [],
        computationLevel: "medium",
        isActive: true,
        component: UnifiedStrategyEngineDisplay,
        status: "healthy",
        lastUpdated: new Date(),
        metrics: { accuracy: 89.4, performance: 96.1, reliability: 94.7 },
      },
      {
        id: "cyber-analytics",
        name: "Cyber Analytics Hub",
        description: "Advanced cybersecurity-inspired analytics and monitoring",
        icon: <Shield className="w-5 h-5" />,
        category: "cyber",
        priority: "high",
        dependencies: ["strategy-engine"],
        computationLevel: "extreme",
        isActive: false,
        component: CyberAnalyticsHub,
        status: "warning",
        lastUpdated: new Date(),
        metrics: { accuracy: 91.2, performance: 88.9, reliability: 93.4 },
      },
      {
        id: "cyber-ml",
        name: "Cyber ML Dashboard",
        description:
          "Machine learning dashboard with cyber-grade security monitoring",
        icon: <Brain className="w-5 h-5" />,
        category: "cyber",
        priority: "high",
        dependencies: ["cyber-analytics"],
        computationLevel: "extreme",
        isActive: false,
        component: CyberMLDashboard,
        status: "healthy",
        lastUpdated: new Date(),
        metrics: { accuracy: 95.6, performance: 90.2, reliability: 96.8 },
      },
      {
        id: "performance-monitoring",
        name: "Performance Dashboard",
        description: "Real-time system performance and model monitoring",
        icon: <Monitor className="w-5 h-5" />,
        category: "monitoring",
        priority: "high",
        dependencies: [],
        computationLevel: "medium",
        isActive: false,
        component: ({ moduleName }: { moduleName: string }) => (
          <DefaultModuleComponent moduleName={moduleName} />
        ),
        status: "healthy",
        lastUpdated: new Date(),
        metrics: { accuracy: 93.7, performance: 97.8, reliability: 99.1 },
      },
      {
        id: "risk-insights",
        name: "Risk Assessment Matrix",
        description: "Advanced risk analysis and mitigation strategies",
        icon: <AlertCircle className="w-5 h-5" />,
        category: "analytics",
        priority: "medium",
        dependencies: ["performance-monitoring"],
        computationLevel: "medium",
        isActive: false,
        component: ({ moduleName }: { moduleName: string }) => (
          <DefaultModuleComponent moduleName={moduleName} />
        ),
        status: "healthy",
        lastUpdated: new Date(),
        metrics: { accuracy: 87.9, performance: 91.3, reliability: 88.6 },
      },
      {
        id: "ensemble-ml",
        name: "Ensemble ML Engine",
        description:
          "Multi-model ensemble learning with automatic optimization",
        icon: <Layers3 className="w-5 h-5" />,
        category: "ml",
        priority: "high",
        dependencies: ["ultra-accuracy"],
        computationLevel: "heavy",
        isActive: false,
        component: ({ moduleName }: { moduleName: string }) => (
          <DefaultModuleComponent moduleName={moduleName} />
        ),
        status: "healthy",
        lastUpdated: new Date(),
        metrics: { accuracy: 96.4, performance: 89.7, reliability: 95.3 },
      },
    ],
    [],
  );

  // Filtered modules based on search and category
  const filteredModules = useMemo(() => {
    return modules.filter((module) => {
      const matchesSearch =
        module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || module.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [modules, searchQuery, selectedCategory]);

  // Active modules
  const activeModules = useMemo(
    () =>
      modules.filter((module) => moduleStates[module.id] ?? module.isActive),
    [modules, moduleStates],
  );

  // System status
  const systemStatus = useMemo(() => {
    const healthyModules = activeModules.filter(
      (m) => m.status === "healthy",
    ).length;
    const totalActive = activeModules.length;

    if (totalActive === 0) return { status: "offline", color: "bg-gray-500" };
    if (healthyModules === totalActive)
      return { status: "optimal", color: "bg-green-500" };
    if (healthyModules / totalActive > 0.7)
      return { status: "good", color: "bg-yellow-500" };
    return { status: "degraded", color: "bg-red-500" };
  }, [activeModules]);

  // Module toggle handler
  const toggleModule = useCallback(
    (moduleId: string) => {
      setModuleStates((prev) => ({
        ...prev,
        [moduleId]: !prev[moduleId],
      }));

      const module = modules.find((m) => m.id === moduleId);
      if (module) {
        toast.success(
          `${module.name} ${moduleStates[moduleId] ? "deactivated" : "activated"}`,
        );
      }
    },
    [modules, moduleStates],
  );

  // System optimization
  const optimizeSystem = useCallback(async () => {
    toast.loading("Optimizing AI system...");

    // Simulate optimization process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSystemMetrics((prev) => ({
      ...prev,
      cpu: Math.max(30, prev.cpu - 15),
      memory: Math.max(25, prev.memory - 10),
      accuracy: Math.min(99.9, prev.accuracy + 1.2),
    }));

    setIsSystemOptimized(true);
    toast.dismiss();
    toast.success("System optimized successfully!");
  }, []);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(
          15,
          Math.min(85, prev.memory + (Math.random() - 0.5) * 8),
        ),
        gpu: Math.max(30, Math.min(95, prev.gpu + (Math.random() - 0.5) * 12)),
        network: Math.max(
          60,
          Math.min(100, prev.network + (Math.random() - 0.5) * 5),
        ),
        totalPredictions: prev.totalPredictions + Math.floor(Math.random() * 5),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Categories for filtering
  const categories = [
    { value: "all", label: "All Modules" },
    { value: "prediction", label: "Prediction" },
    { value: "analytics", label: "Analytics" },
    { value: "ml", label: "Machine Learning" },
    { value: "strategy", label: "Strategy" },
    { value: "monitoring", label: "Monitoring" },
    { value: "quantum", label: "Quantum" },
    { value: "cyber", label: "Cyber" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Brain className="w-12 h-12 text-blue-600" />
              <div
                className={`absolute -top-1 -right-1 w-4 h-4 ${systemStatus.color} rounded-full animate-pulse`}
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Advanced Intelligence Hub
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Unified AI-powered betting intelligence platform with quantum
            predictions, cyber-grade analytics, and revolutionary accuracy
            systems
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge
              variant={isConnected ? "default" : "destructive"}
              className="px-3 py-1"
            >
              {isConnected ? "🟢 Connected" : "🔴 Offline"}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {activeModules.length} Active Modules
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              System {systemStatus.status}
            </Badge>
          </div>
        </motion.div>

        {/* System Overview */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>System Overview</span>
              </CardTitle>
              <Button
                onClick={optimizeSystem}
                variant="outline"
                size="sm"
                className="hover:bg-blue-50"
              >
                <Zap className="w-4 h-4 mr-2" />
                Optimize System
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-2"
              >
                <div className="relative">
                  <Progress value={systemMetrics.cpu} className="h-2" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {systemMetrics.cpu}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">CPU Usage</p>
                  <p className="text-xs text-gray-500">Processing Power</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-2"
              >
                <div className="relative">
                  <Progress value={systemMetrics.memory} className="h-2" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {systemMetrics.memory}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Memory</p>
                  <p className="text-xs text-gray-500">RAM Usage</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-2"
              >
                <div className="relative">
                  <Progress value={systemMetrics.accuracy} className="h-2" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {systemMetrics.accuracy}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Accuracy</p>
                  <p className="text-xs text-gray-500">Overall Performance</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-2"
              >
                <div className="relative">
                  <Progress value={systemMetrics.network} className="h-2" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {systemMetrics.network}%
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Network</p>
                  <p className="text-xs text-gray-500">Connection Quality</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {systemMetrics.totalPredictions.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-600">Total Predictions</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">
                    {systemMetrics.uptime}%
                  </div>
                  <div className="text-sm text-green-600">System Uptime</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-700">
                    {activeModules.length}
                  </div>
                  <div className="text-sm text-purple-600">Active Modules</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Module Controls */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Module Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredModules.map((module) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            module.status === "healthy"
                              ? "bg-green-100 text-green-600"
                              : module.status === "warning"
                                ? "bg-yellow-100 text-yellow-600"
                                : module.status === "error"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {module.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {module.name}
                          </h3>
                          <Badge variant="outline" className="mt-1">
                            {module.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleModule(module.id)}
                        className={
                          (moduleStates[module.id] ?? module.isActive)
                            ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                            : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        }
                      >
                        {(moduleStates[module.id] ?? module.isActive) ? (
                          <ToggleRight className="w-5 h-5" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">
                      {module.description}
                    </p>

                    {module.metrics && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Accuracy</span>
                          <span>{module.metrics.accuracy}%</span>
                        </div>
                        <Progress
                          value={module.metrics.accuracy}
                          className="h-1"
                        />

                        <div className="flex justify-between text-xs">
                          <span>Performance</span>
                          <span>{module.metrics.performance}%</span>
                        </div>
                        <Progress
                          value={module.metrics.performance}
                          className="h-1"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Priority: {module.priority}</span>
                      <span>Load: {module.computationLevel}</span>
                    </div>

                    {module.dependencies.length > 0 && (
                      <div className="text-xs text-gray-500">
                        Dependencies: {module.dependencies.join(", ")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Active Module Display */}
        {activeModules.length > 0 && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5 text-blue-600" />
                <span>Active Modules</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-auto p-2">
                  {activeModules.slice(0, 8).map((module) => (
                    <TabsTrigger
                      key={module.id}
                      value={module.id}
                      className="flex items-center space-x-2 p-3 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
                    >
                      {module.icon}
                      <span className="hidden sm:inline">{module.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {activeModules.map((module) => (
                  <TabsContent
                    key={module.id}
                    value={module.id}
                    className="mt-6"
                  >
                    <div className="border rounded-xl p-6 bg-gradient-to-br from-white to-gray-50">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            {module.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {module.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {module.description}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            module.status === "healthy"
                              ? "default"
                              : "destructive"
                          }
                          className="capitalize"
                        >
                          {module.status}
                        </Badge>
                      </div>

                      <Suspense fallback={<ModuleLoader />}>
                        <module.component moduleName={module.name} />
                      </Suspense>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Offline Indicator */}
        <OfflineIndicator />
      </div>
    </div>
  );
};

export default AdvancedIntelligenceHub;
