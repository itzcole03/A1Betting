import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { BarChart3, Brain, TrendingUp, Shield, Activity, AlertTriangle, CheckCircle, } from "lucide-react";
import { usePredictions, useBetting, } from "../../store/unified/UnifiedStoreManager";
import { mlEngine } from "../../services/ml/UnifiedMLEngine";
const AdvancedAnalyticsHub = () => {
    const [metrics, setMetrics] = useState([]);
    const [modelAnalytics, setModelAnalytics] = useState([]);
    const [timeRange, setTimeRange] = useState("24h");
    const [activeTab, setActiveTab] = useState("overview");
    const { latestPredictions } = usePredictions();
    const { bets, opportunities } = useBetting();
    useEffect(() => {
        const calculateMetrics = () => {
            // Calculate analytics metrics
            const currentTime = Date.now();
            const timeRangeMs = {
                "1h": 3600000,
                "24h": 86400000,
                "7d": 604800000,
                "30d": 2592000000,
            }[timeRange];
            const recentPredictions = latestPredictions.filter((p) => currentTime - p.timestamp < timeRangeMs);
            const recentBets = bets.filter((b) => currentTime - b.timestamp < timeRangeMs);
            const newMetrics = [
                {
                    name: "Prediction Accuracy",
                    value: 73.5,
                    unit: "%",
                    change: 2.1,
                    status: "good",
                    description: "Model prediction accuracy over selected timeframe",
                },
                {
                    name: "Total Predictions",
                    value: recentPredictions.length,
                    unit: "",
                    change: 15.3,
                    status: "good",
                    description: "Number of predictions generated",
                },
                {
                    name: "Average Confidence",
                    value: recentPredictions.length > 0
                        ? (recentPredictions.reduce((sum, p) => sum + p.confidence, 0) /
                            recentPredictions.length) *
                            100
                        : 0,
                    unit: "%",
                    change: 1.8,
                    status: "good",
                    description: "Average confidence across all predictions",
                },
                {
                    name: "ROI",
                    value: 12.4,
                    unit: "%",
                    change: 3.2,
                    status: "good",
                    description: "Return on investment for placed bets",
                },
                {
                    name: "Sharp Ratio",
                    value: 1.87,
                    unit: "",
                    change: 0.15,
                    status: "good",
                    description: "Risk-adjusted return metric",
                },
                {
                    name: "Active Opportunities",
                    value: opportunities.length,
                    unit: "",
                    change: 0,
                    status: opportunities.length > 0 ? "good" : "warning",
                    description: "Current betting opportunities available",
                },
            ];
            setMetrics(newMetrics);
            // Model analytics
            const activeModels = mlEngine.getActiveModels();
            const modelAnalyticsData = activeModels.map((model, index) => ({
                modelName: model.name,
                accuracy: model.performance.accuracy * 100,
                confidence: Math.random() * 20 + 75, // Mock confidence
                predictions: Math.floor(Math.random() * 100) + 50,
                profitability: Math.random() * 20 + 5,
                status: "active",
            }));
            setModelAnalytics(modelAnalyticsData);
        };
        calculateMetrics();
        const interval = setInterval(calculateMetrics, 30000); // Update every 30 seconds
        return () => clearInterval(interval);
    }, [timeRange, latestPredictions, bets, opportunities]);
    const getStatusColor = (status) => {
        switch (status) {
            case "good":
                return "text-green-600 bg-green-100";
            case "warning":
                return "text-yellow-600 bg-yellow-100";
            case "critical":
                return "text-red-600 bg-red-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "good":
                return _jsx(CheckCircle, { className: "w-4 h-4" });
            case "warning":
                return _jsx(AlertTriangle, { className: "w-4 h-4" });
            case "critical":
                return _jsx(AlertTriangle, { className: "w-4 h-4" });
            default:
                return _jsx(Activity, { className: "w-4 h-4" });
        }
    };
    const MetricCard = ({ metric }) => (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-sm font-medium text-gray-600 dark:text-gray-400", children: metric.name }), _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`, children: getStatusIcon(metric.status) })] }), _jsxs("div", { className: "flex items-baseline space-x-2", children: [_jsxs("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: [metric.value.toFixed(1), metric.unit] }), _jsxs("span", { className: `text-sm font-medium ${metric.change >= 0 ? "text-green-600" : "text-red-600"}`, children: [metric.change >= 0 ? "+" : "", metric.change.toFixed(1), "%"] })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-500 mt-1", children: metric.description })] }));
    const ModelCard = ({ model }) => (_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Brain, { className: "w-5 h-5 text-blue-600" }), _jsx("h3", { className: "font-medium text-gray-900 dark:text-white", children: model.modelName })] }), _jsx("span", { className: `px-2 py-1 rounded text-xs font-medium ${model.status === "active"
                            ? "bg-green-100 text-green-800"
                            : model.status === "training"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"}`, children: model.status.toUpperCase() })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Accuracy" }), _jsxs("div", { className: "font-semibold text-gray-900 dark:text-white", children: [model.accuracy.toFixed(1), "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Confidence" }), _jsxs("div", { className: "font-semibold text-gray-900 dark:text-white", children: [model.confidence.toFixed(1), "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Predictions" }), _jsx("div", { className: "font-semibold text-gray-900 dark:text-white", children: model.predictions })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Profit" }), _jsxs("div", { className: "font-semibold text-green-600", children: ["+", model.profitability.toFixed(1), "%"] })] })] })] }));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Advanced Analytics Hub" }), _jsx("p", { className: "text-gray-600 dark:text-gray-400", children: "Comprehensive ML performance and betting analytics" })] }), _jsx("div", { className: "flex items-center space-x-2", children: ["1h", "24h", "7d", "30d"].map((range) => (_jsx("button", { onClick: () => setTimeRange(range), className: `px-3 py-1 text-sm font-medium rounded-lg transition-colors ${timeRange === range
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"}`, children: range }, range))) })] }), _jsx("div", { className: "border-b border-gray-200 dark:border-gray-700", children: _jsx("nav", { className: "flex space-x-8", children: [
                        { id: "overview", name: "Overview", icon: BarChart3 },
                        { id: "models", name: "ML Models", icon: Brain },
                        { id: "performance", name: "Performance", icon: TrendingUp },
                        { id: "risk", name: "Risk Analysis", icon: Shield },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"}`, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { children: tab.name })] }, tab.id));
                    }) }) }), activeTab === "overview" && (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: metrics.map((metric, index) => (_jsx(MetricCard, { metric: metric }, index))) }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Quick Statistics" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: latestPredictions.length }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Total Predictions" })] }), _jsxs("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: bets.filter((b) => b.status === "won").length }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Winning Bets" })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: opportunities.length }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Active Opportunities" })] }), _jsxs("div", { className: "text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-600", children: bets.filter((b) => b.status === "active").length }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Active Bets" })] })] })] })] })), activeTab === "models" && (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: modelAnalytics.map((model, index) => (_jsx(ModelCard, { model: model }, index))) }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Model Performance Comparison" }), _jsx("div", { className: "h-64 flex items-center justify-center text-gray-500 dark:text-gray-400", children: _jsxs("div", { className: "text-center", children: [_jsx(BarChart3, { className: "w-12 h-12 mx-auto mb-2 opacity-50" }), _jsx("p", { children: "Performance charts coming soon" })] }) })] })] })), activeTab === "performance" && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Betting Performance" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Win Rate" }), _jsx("span", { className: "font-semibold text-green-600", children: "68.5%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Average Odds" }), _jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: "1.92" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Profit Factor" }), _jsx("span", { className: "font-semibold text-blue-600", children: "2.14" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Max Drawdown" }), _jsx("span", { className: "font-semibold text-red-600", children: "-8.3%" })] })] })] }), _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Model Performance" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Accuracy" }), _jsx("span", { className: "font-semibold text-green-600", children: "73.5%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Precision" }), _jsx("span", { className: "font-semibold text-blue-600", children: "71.8%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "Recall" }), _jsx("span", { className: "font-semibold text-purple-600", children: "69.4%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600 dark:text-gray-400", children: "F1 Score" }), _jsx("span", { className: "font-semibold text-yellow-600", children: "70.6%" })] })] })] })] }) })), activeTab === "risk" && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-4", children: "Risk Analysis" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [_jsx("div", { className: "text-xl font-bold text-green-600", children: "Low" }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Current Risk Level" })] }), _jsxs("div", { className: "text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsx("div", { className: "text-xl font-bold text-blue-600", children: "12.4%" }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Portfolio at Risk" })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [_jsx("div", { className: "text-xl font-bold text-purple-600", children: "1.87" }), _jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Sharpe Ratio" })] })] })] }) }))] }));
};
export default AdvancedAnalyticsHub;
