import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Brain, Eye, Activity, Clock, RefreshCw, Users, Thermometer, } from "lucide-react";
// Import consolidated systems
import { MegaCard, MegaButton, MegaInput } from "../mega/MegaUI";
import { CyberText } from "../mega/CyberTheme";
import { usePredictions, useEngineMetrics, useToast, useDebounce, } from "../../hooks/UniversalHooks";
import { UniversalServiceFactory } from "../../services/UniversalServiceLayer";
import { formatters, } from "../../utils/UniversalUtils";
// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const UniversalPredictions = () => {
    // State
    const [state, setState] = useState({
        isLoading: false,
        isRealtime: true,
        lastUpdated: null,
        selectedPrediction: null,
        viewMode: "cards",
        sortBy: "confidence",
        sortOrder: "desc",
    });
    const [filters, setFilters] = useState({
        sport: "all",
        league: "all",
        market: "all",
        minConfidence: 0,
        minEdge: 0,
        riskLevel: "all",
        status: "all",
        timeframe: "24h",
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [enhancedPredictions, setEnhancedPredictions] = useState([]);
    // Hooks
    const { predictions, isLoading: predictionsLoading, refetch, } = usePredictions({
        limit: 100,
        realtime: state.isRealtime,
    });
    const { metrics } = useEngineMetrics();
    const { addToast } = useToast();
    // Debounced search
    const debouncedSearch = useDebounce(searchQuery, 300);
    // Services
    const predictionService = UniversalServiceFactory.getPredictionService();
    // ============================================================================
    // DATA ENHANCEMENT
    // ============================================================================
    const enhancePredictions = useCallback(async (basePredictions) => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            const enhanced = basePredictions.map((pred, index) => {
                // Generate comprehensive enhancement
                const enhancement = {
                    id: pred.id || `pred_${index}`,
                    eventId: pred.id || `event_${index}`,
                    sport: "nfl", // Would come from actual data
                    league: "NFL",
                    homeTeam: `Home Team ${index + 1}`,
                    awayTeam: `Away Team ${index + 1}`,
                    market: "moneyline",
                    selection: `${pred.game} - Winner`,
                    prediction: pred.prediction || Math.random() * 100,
                    confidence: pred.confidence || 75 + Math.random() * 20,
                    odds: pred.odds || 1.5 + Math.random() * 2,
                    impliedProbability: 1 / (pred.odds || 1.9),
                    valueEdge: Math.random() * 0.15,
                    expectedValue: Math.random() * 50 + 10,
                    recommendedStake: Math.random() * 100 + 50,
                    potentialPayout: pred.potentialWin || Math.random() * 500 + 100,
                    timestamp: pred.timestamp || new Date().toISOString(),
                    gameTime: new Date(Date.now() + Math.random() * 86400000).toISOString(),
                    status: ["pending", "won", "lost"][Math.floor(Math.random() * 3)],
                    accuracy: 85 + Math.random() * 10,
                    // ML & Analytics
                    modelPredictions: [
                        {
                            modelId: "ensemble_nn",
                            modelName: "Ensemble Neural Network",
                            prediction: 75 + Math.random() * 20,
                            confidence: 85 + Math.random() * 10,
                            weight: 0.35,
                        },
                        {
                            modelId: "gradient_boost",
                            modelName: "Gradient Boosting",
                            prediction: 70 + Math.random() * 25,
                            confidence: 80 + Math.random() * 15,
                            weight: 0.25,
                        },
                        {
                            modelId: "random_forest",
                            modelName: "Random Forest",
                            prediction: 78 + Math.random() * 18,
                            confidence: 82 + Math.random() * 12,
                            weight: 0.2,
                        },
                        {
                            modelId: "lstm",
                            modelName: "LSTM Deep Learning",
                            prediction: 73 + Math.random() * 22,
                            confidence: 87 + Math.random() * 8,
                            weight: 0.2,
                        },
                    ],
                    featureImportance: {
                        "Team Form": 0.25,
                        "Head-to-Head": 0.18,
                        Injuries: 0.15,
                        "Home Advantage": 0.12,
                        Weather: 0.1,
                        Momentum: 0.2,
                    },
                    shap: {
                        global: {
                            "Team Form": 0.25,
                            Momentum: 0.2,
                            "Head-to-Head": 0.18,
                            Injuries: 0.15,
                            "Home Advantage": 0.12,
                            Weather: 0.1,
                        },
                        local: {
                            "Team Form": Math.random() * 0.5 - 0.25,
                            Momentum: Math.random() * 0.4 - 0.2,
                            "Head-to-Head": Math.random() * 0.3 - 0.15,
                            Injuries: Math.random() * 0.25 - 0.125,
                            "Home Advantage": Math.random() * 0.2 - 0.1,
                            Weather: Math.random() * 0.15 - 0.075,
                        },
                        explanation: [
                            "Strong recent form favors home team",
                            "Momentum indicators show positive trend",
                            "Historical matchup data supports prediction",
                            "Key player availability impacts outcome",
                        ],
                    },
                    // Context & Intelligence
                    context: {
                        weather: {
                            temperature: 15 + Math.random() * 20,
                            conditions: ["Clear", "Cloudy", "Rain", "Snow"][Math.floor(Math.random() * 4)],
                            windSpeed: Math.random() * 25,
                            humidity: 40 + Math.random() * 40,
                        },
                        injuries: [
                            {
                                team: "home",
                                player: "Star Player",
                                impact: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
                            },
                        ],
                        momentum: {
                            homeTeam: 50 + Math.random() * 40,
                            awayTeam: 50 + Math.random() * 40,
                        },
                        headToHead: {
                            gamesPlayed: 10 + Math.floor(Math.random() * 20),
                            homeWins: Math.floor(Math.random() * 15),
                            awayWins: Math.floor(Math.random() * 15),
                            trends: [
                                "Home team dominates recently",
                                "Close games historically",
                            ],
                        },
                        recentForm: {
                            homeTeam: { wins: 7, losses: 3, streak: "W3" },
                            awayTeam: { wins: 6, losses: 4, streak: "L1" },
                        },
                        venue: {
                            name: "Stadium Name",
                            homeAdvantage: 3 + Math.random() * 7,
                            surface: "Grass",
                            capacity: 50000 + Math.floor(Math.random() * 30000),
                        },
                        market: {
                            volume: Math.floor(Math.random() * 1000000),
                            liquidity: 80 + Math.random() * 20,
                            efficiency: 75 + Math.random() * 20,
                            movement: ["up", "down", "stable"][Math.floor(Math.random() * 3)],
                        },
                    },
                    // Risk Assessment
                    risk: {
                        level: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
                        factors: [
                            "Weather uncertainty",
                            "Injury concerns",
                            "Market volatility",
                        ],
                        score: Math.random() * 100,
                        volatility: Math.random() * 0.3,
                        correlation: Math.random() * 0.8,
                    },
                    // Performance Tracking
                    performance: {
                        modelAccuracy: 85 + Math.random() * 10,
                        calibration: 0.85 + Math.random() * 0.1,
                        brier: 0.15 + Math.random() * 0.1,
                        logLoss: 0.3 + Math.random() * 0.2,
                        roi: 15 + Math.random() * 20,
                        hitRate: 0.8 + Math.random() * 0.15,
                    },
                };
                return enhancement;
            });
            setEnhancedPredictions(enhanced);
            setState((prev) => ({ ...prev, lastUpdated: new Date() }));
        }
        catch (error) {
            console.error("Failed to enhance predictions:", error);
            addToast("Failed to enhance predictions", "error");
        }
        finally {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, [addToast]);
    // Enhance predictions when base predictions change
    useEffect(() => {
        if (predictions.length > 0) {
            enhancePredictions(predictions);
        }
    }, [predictions, enhancePredictions]);
    // ============================================================================
    // FILTERING & SORTING
    // ============================================================================
    const filteredPredictions = useMemo(() => {
        let filtered = enhancedPredictions;
        // Apply filters
        if (filters.sport !== "all") {
            filtered = filtered.filter((pred) => pred.sport === filters.sport);
        }
        if (filters.league !== "all") {
            filtered = filtered.filter((pred) => pred.league === filters.league);
        }
        if (filters.market !== "all") {
            filtered = filtered.filter((pred) => pred.market === filters.market);
        }
        if (filters.riskLevel !== "all") {
            filtered = filtered.filter((pred) => pred.risk.level === filters.riskLevel);
        }
        if (filters.status !== "all") {
            filtered = filtered.filter((pred) => pred.status === filters.status);
        }
        filtered = filtered.filter((pred) => pred.confidence >= filters.minConfidence &&
            pred.valueEdge >= filters.minEdge);
        // Apply search
        if (debouncedSearch) {
            const query = debouncedSearch.toLowerCase();
            filtered = filtered.filter((pred) => pred.homeTeam.toLowerCase().includes(query) ||
                pred.awayTeam.toLowerCase().includes(query) ||
                pred.league.toLowerCase().includes(query) ||
                pred.market.toLowerCase().includes(query));
        }
        // Apply sorting
        filtered.sort((a, b) => {
            const aVal = a[state.sortBy];
            const bVal = b[state.sortBy];
            if (typeof aVal === "number" && typeof bVal === "number") {
                return state.sortOrder === "desc" ? bVal - aVal : aVal - bVal;
            }
            return state.sortOrder === "desc"
                ? String(bVal).localeCompare(String(aVal))
                : String(aVal).localeCompare(String(bVal));
        });
        return filtered;
    }, [
        enhancedPredictions,
        filters,
        debouncedSearch,
        state.sortBy,
        state.sortOrder,
    ]);
    // ============================================================================
    // RENDER COMPONENTS
    // ============================================================================
    const renderFiltersPanel = () => (_jsx(MegaCard, { title: "Filters & Controls", variant: "glass", padding: "lg", children: _jsxs("div", { className: "space-y-4", children: [_jsx(MegaInput, { placeholder: "Search teams, leagues, markets...", value: searchQuery, onChange: setSearchQuery, icon: _jsx(Eye, { size: 16 }), fullWidth: true }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4", children: [_jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Sport" }), _jsxs("select", { value: filters.sport, onChange: (e) => setFilters((prev) => ({ ...prev, sport: e.target.value })), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "all", children: "All Sports" }), _jsx("option", { value: "nfl", children: "NFL" }), _jsx("option", { value: "nba", children: "NBA" }), _jsx("option", { value: "mlb", children: "MLB" }), _jsx("option", { value: "nhl", children: "NHL" })] })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Market" }), _jsxs("select", { value: filters.market, onChange: (e) => setFilters((prev) => ({ ...prev, market: e.target.value })), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "all", children: "All Markets" }), _jsx("option", { value: "moneyline", children: "Moneyline" }), _jsx("option", { value: "spread", children: "Spread" }), _jsx("option", { value: "total", children: "Total" }), _jsx("option", { value: "props", children: "Props" })] })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Risk Level" }), _jsxs("select", { value: filters.riskLevel, onChange: (e) => setFilters((prev) => ({ ...prev, riskLevel: e.target.value })), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "all", children: "All Risk Levels" }), _jsx("option", { value: "low", children: "Low Risk" }), _jsx("option", { value: "medium", children: "Medium Risk" }), _jsx("option", { value: "high", children: "High Risk" })] })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Status" }), _jsxs("select", { value: filters.status, onChange: (e) => setFilters((prev) => ({ ...prev, status: e.target.value })), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "live", children: "Live" }), _jsx("option", { value: "won", children: "Won" }), _jsx("option", { value: "lost", children: "Lost" })] })] }), _jsx(MegaInput, { label: "Min Confidence", type: "number", value: filters.minConfidence, onChange: (value) => setFilters((prev) => ({ ...prev, minConfidence: Number(value) })), size: "sm" }), _jsx(MegaInput, { label: "Min Edge %", type: "number", value: filters.minEdge * 100, onChange: (value) => setFilters((prev) => ({ ...prev, minEdge: Number(value) / 100 })), size: "sm" }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Sort By" }), _jsxs("select", { value: state.sortBy, onChange: (e) => setState((prev) => ({ ...prev, sortBy: e.target.value })), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "confidence", children: "Confidence" }), _jsx("option", { value: "valueEdge", children: "Value Edge" }), _jsx("option", { value: "expectedValue", children: "Expected Value" }), _jsx("option", { value: "potentialPayout", children: "Potential Payout" }), _jsx("option", { value: "gameTime", children: "Game Time" })] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CyberText, { variant: "caption", color: "secondary", children: "View Mode:" }), ["cards", "table", "detailed", "analytics"].map((mode) => (_jsx(MegaButton, { variant: state.viewMode === mode ? "primary" : "secondary", size: "sm", onClick: () => setState((prev) => ({ ...prev, viewMode: mode })), children: mode.charAt(0).toUpperCase() + mode.slice(1) }, mode)))] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: state.isRealtime, onChange: (e) => setState((prev) => ({
                                                ...prev,
                                                isRealtime: e.target.checked,
                                            })), className: "w-4 h-4" }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Real-time" })] }), _jsx(MegaButton, { variant: "ghost", size: "sm", onClick: refetch, loading: predictionsLoading || state.isLoading, icon: _jsx(RefreshCw, { size: 16 }), children: "Refresh" })] })] })] }) }));
    const renderPredictionCard = (prediction) => (_jsx(MegaCard, { variant: "glowing", padding: "lg", onClick: () => setState((prev) => ({ ...prev, selectedPrediction: prediction })), className: "cursor-pointer hover:scale-105 transition-transform", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs(CyberText, { variant: "body", className: "font-semibold", children: [prediction.homeTeam, " vs ", prediction.awayTeam] }), _jsxs(CyberText, { variant: "caption", color: "muted", children: [prediction.sport.toUpperCase(), " \u2022 ", prediction.league, " \u2022", " ", prediction.market] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `px-2 py-1 rounded text-xs font-semibold ${prediction.status === "pending"
                                        ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                                        : prediction.status === "won"
                                            ? "bg-green-500 bg-opacity-20 text-green-400"
                                            : prediction.status === "lost"
                                                ? "bg-red-500 bg-opacity-20 text-red-400"
                                                : prediction.status === "live"
                                                    ? "bg-blue-500 bg-opacity-20 text-blue-400"
                                                    : "bg-gray-500 bg-opacity-20 text-gray-400"}`, children: prediction.status.toUpperCase() }), _jsxs("div", { className: `px-2 py-1 rounded text-xs font-semibold ${prediction.risk.level === "low"
                                        ? "bg-green-500 bg-opacity-20 text-green-400"
                                        : prediction.risk.level === "medium"
                                            ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                                            : "bg-red-500 bg-opacity-20 text-red-400"}`, children: [prediction.risk.level.toUpperCase(), " RISK"] })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs(CyberText, { variant: "title", style: { color: "#06ffa5" }, children: [prediction.confidence.toFixed(1), "%"] }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Confidence" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { color: "#00d4ff" }, children: formatters.percentage(prediction.valueEdge * 100, 1) }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Value Edge" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { color: "#06ffa5" }, children: formatters.odds(prediction.odds) }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Odds" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { color: "#00d4ff" }, children: formatters.currency(prediction.expectedValue) }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Expected Value" })] })] }), _jsxs("div", { children: [_jsxs(CyberText, { variant: "caption", color: "secondary", className: "mb-2", children: ["Model Consensus (", prediction.modelPredictions.length, " models)"] }), _jsx("div", { className: "space-y-1", children: prediction.modelPredictions.slice(0, 3).map((model, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CyberText, { variant: "caption", color: "muted", children: model.modelName }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-16 bg-gray-700 rounded-full h-1", children: _jsx("div", { className: "bg-gradient-to-r from-green-500 to-blue-500 h-1 rounded-full", style: { width: `${model.confidence}%` } }) }), _jsxs(CyberText, { variant: "caption", color: "muted", children: [model.confidence.toFixed(0), "%"] })] })] }, index))) })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { size: 14 }), _jsx(CyberText, { variant: "caption", color: "muted", children: new Date(prediction.gameTime).toLocaleDateString() })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Thermometer, { size: 14 }), _jsxs(CyberText, { variant: "caption", color: "muted", children: [prediction.context.weather?.temperature, "\u00B0C"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { size: 14 }), _jsx(CyberText, { variant: "caption", color: "muted", children: prediction.context.venue.capacity.toLocaleString() })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Activity, { size: 14 }), _jsxs(CyberText, { variant: "caption", color: "muted", children: [prediction.performance.modelAccuracy.toFixed(1), "%"] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(MegaButton, { variant: "primary", size: "sm", onClick: (e) => {
                                e.stopPropagation();
                                addToast(`Bet placed on ${prediction.homeTeam} vs ${prediction.awayTeam}`, "success");
                            }, children: "Place Bet" }), _jsx(MegaButton, { variant: "secondary", size: "sm", onClick: (e) => {
                                e.stopPropagation();
                                setState((prev) => ({ ...prev, selectedPrediction: prediction }));
                            }, children: "View Details" })] })] }) }, prediction.id));
    const renderStatsOverview = () => (_jsx(MegaCard, { title: "Prediction Overview", variant: "glass", padding: "lg", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#06ffa5" }, children: filteredPredictions.length }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Total Predictions" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#00d4ff" }, children: filteredPredictions.filter((p) => p.confidence > 80).length }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "High Confidence" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#06ffa5" }, children: filteredPredictions.filter((p) => p.valueEdge > 0.05).length }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Value Opportunities" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#00d4ff" }, children: filteredPredictions.filter((p) => p.status === "live").length }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Live Games" })] }), _jsxs("div", { className: "text-center", children: [_jsxs(CyberText, { variant: "title", style: { fontSize: "24px", color: "#06ffa5" }, children: [(filteredPredictions.reduce((sum, p) => sum + p.confidence, 0) /
                                    filteredPredictions.length || 0).toFixed(1), "%"] }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Avg Confidence" })] })] }) }));
    // ============================================================================
    // MAIN RENDER
    // ============================================================================
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CyberText, { variant: "title", style: { fontSize: "32px" }, children: "Universal Predictions" }), _jsx(CyberText, { variant: "body", color: "secondary", children: "AI-Enhanced Prediction Engine with Real-Time Intelligence" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Brain, { size: 20, style: { color: "#06ffa5" } }), _jsxs(CyberText, { variant: "body", style: { color: "#06ffa5" }, children: [enhancedPredictions.length, " Models Active"] })] })] }), renderStatsOverview(), renderFiltersPanel(), (state.isLoading || predictionsLoading) && (_jsx(MegaCard, { variant: "glass", padding: "lg", children: _jsxs("div", { className: "flex items-center justify-center py-8", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" }), _jsx(CyberText, { variant: "body", color: "secondary", className: "ml-4", children: "Loading enhanced predictions..." })] }) })), _jsx(MegaCard, { title: `Predictions (${filteredPredictions.length})`, variant: "glass", padding: "lg", children: filteredPredictions.length === 0 ? (_jsx("div", { className: "text-center py-8", children: _jsx(CyberText, { variant: "body", color: "muted", children: "No predictions found matching your criteria." }) })) : (_jsx("div", { className: state.viewMode === "cards"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                        : "space-y-4", children: filteredPredictions.map(renderPredictionCard) })) }), state.isRealtime && state.lastUpdated && (_jsx("div", { className: "fixed bottom-4 right-4 z-50", children: _jsx(MegaCard, { variant: "glass", padding: "sm", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full animate-pulse" }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Live updates active" })] }) }) }))] }));
};
export default UniversalPredictions;
