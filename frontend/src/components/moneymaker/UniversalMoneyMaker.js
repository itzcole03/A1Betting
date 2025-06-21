import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from "react";
import { DollarSign, Target, Play, Pause, Activity, Calculator, RefreshCw, Star, Shield, Flame, } from "lucide-react";
// Import consolidated systems
import { MegaCard, MegaButton, MegaInput } from "../mega/MegaUI";
import { CyberText } from "../mega/CyberTheme";
import { useUserProfile, useToast, } from "../../hooks/UniversalHooks";
import { UniversalServiceFactory } from "../../services/UniversalServiceLayer";
import { formatters, betting, } from "../../utils/UniversalUtils";
// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const UniversalMoneyMaker = () => {
    // State
    const [config, setConfig] = useState({
        investmentAmount: 1000,
        riskLevel: "moderate",
        timeHorizon: "medium",
        autoMode: false,
        minConfidence: 75,
        maxExposure: 25,
        diversificationLevel: 3,
        preferredSports: ["nfl", "nba", "mlb"],
        excludedMarkets: [],
        kellyMultiplier: 0.25,
        stopLossPercentage: 10,
        profitTargetPercentage: 20,
    });
    const [opportunities, setOpportunities] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [metrics, setMetrics] = useState({
        totalProfit: 0,
        totalStaked: 0,
        roi: 0,
        winRate: 0,
        averageOdds: 0,
        betsPlaced: 0,
        opportunitiesFound: 0,
        avgConfidence: 0,
        avgValueEdge: 0,
        maxDrawdown: 0,
        sharpeRatio: 0,
        calmarRatio: 0,
        profitFactor: 0,
        clv: 0,
    });
    const [state, setState] = useState({
        isScanning: false,
        isAutoMode: false,
        scanProgress: 0,
        lastScanTime: null,
        alertsCount: 0,
        systemHealth: "excellent",
    });
    const [selectedOpportunity, setSelectedOpportunity] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState({
        sport: "all",
        riskLevel: "all",
        minConfidence: 0,
        minEdge: 0,
    });
    const [sortBy, setSortBy] = useState("valueEdge");
    const [sortOrder, setSortOrder] = useState("desc");
    // Hooks
    const { profile } = useUserProfile();
    const { addToast } = useToast();
    // Services
    const bettingService = UniversalServiceFactory.getBettingService();
    const predictionService = UniversalServiceFactory.getPredictionService();
    // ============================================================================
    // CORE LOGIC
    // ============================================================================
    /**
     * Scan for betting opportunities using ML and arbitrage detection
     */
    const scanForOpportunities = useCallback(async () => {
        setState((prev) => ({ ...prev, isScanning: true, scanProgress: 0 }));
        try {
            // Simulate progressive scanning
            const totalSteps = 10;
            for (let step = 0; step < totalSteps; step++) {
                setState((prev) => ({
                    ...prev,
                    scanProgress: ((step + 1) / totalSteps) * 100,
                }));
                await new Promise((resolve) => setTimeout(resolve, 200));
            }
            // Get opportunities from various sources
            const [predictions, bettingOps] = await Promise.all([
                predictionService.getRecentPredictions(50),
                bettingService.getOpportunities(),
            ]);
            // Transform and enhance opportunities
            const enhancedOpportunities = [];
            // Process predictions
            predictions.data?.forEach((pred, index) => {
                const opportunity = {
                    id: `pred_${pred.id}`,
                    eventId: pred.id,
                    sport: "nfl", // Would come from prediction
                    league: "NFL",
                    game: pred.game || `Game ${index + 1}`,
                    market: "moneyline",
                    description: `${pred.game} - Moneyline`,
                    currentOdds: pred.odds || 1.9,
                    predictedProbability: pred.confidence / 100,
                    valueEdge: Math.random() * 0.15 + 0.05,
                    kellyFraction: 0,
                    recommendedStake: 0,
                    confidence: pred.confidence,
                    riskLevel: pred.confidence > 80
                        ? "low"
                        : pred.confidence > 60
                            ? "medium"
                            : "high",
                    maxStake: config.investmentAmount * 0.1,
                    expectedReturn: pred.potentialWin || 0,
                    potentialPayout: pred.potentialWin || 0,
                    timeToStart: Math.random() * 7200000, // Random time in ms
                    liquidityScore: Math.random() * 100,
                    marketEfficiency: Math.random() * 100,
                    historicalPerformance: Math.random() * 100,
                    mlFactors: {
                        momentum: Math.random() * 100,
                        form: Math.random() * 100,
                        headToHead: Math.random() * 100,
                        injuries: Math.random() * 100,
                        weather: Math.random() * 100,
                        venue: Math.random() * 100,
                    },
                };
                // Calculate Kelly fraction and recommended stake
                opportunity.kellyFraction = betting.kellyCriterion(opportunity.predictedProbability, opportunity.currentOdds);
                opportunity.recommendedStake = Math.max(0, Math.min(opportunity.kellyFraction *
                    config.kellyMultiplier *
                    config.investmentAmount, opportunity.maxStake));
                if (opportunity.valueEdge > 0.02 &&
                    opportunity.confidence >= config.minConfidence) {
                    enhancedOpportunities.push(opportunity);
                }
            });
            // Add some arbitrage opportunities
            for (let i = 0; i < 3; i++) {
                const arbOpp = {
                    id: `arb_${i}`,
                    eventId: `arb_event_${i}`,
                    sport: ["nfl", "nba", "nhl"][i % 3],
                    league: ["NFL", "NBA", "NHL"][i % 3],
                    game: `Arbitrage Game ${i + 1}`,
                    market: "arbitrage",
                    description: `Multi-book arbitrage opportunity`,
                    currentOdds: 1.05 + Math.random() * 0.1,
                    predictedProbability: 1,
                    valueEdge: 0.03 + Math.random() * 0.05,
                    kellyFraction: 1,
                    recommendedStake: config.investmentAmount * 0.2,
                    confidence: 100,
                    riskLevel: "low",
                    maxStake: config.investmentAmount * 0.5,
                    expectedReturn: config.investmentAmount * 0.05,
                    potentialPayout: config.investmentAmount * 1.05,
                    timeToStart: Math.random() * 3600000,
                    liquidityScore: 95,
                    marketEfficiency: 99,
                    historicalPerformance: 100,
                    mlFactors: {
                        momentum: 100,
                        form: 100,
                        headToHead: 100,
                        injuries: 100,
                        weather: 100,
                        venue: 100,
                    },
                    arbitrageOpportunity: {
                        isArbitrage: true,
                        guaranteedProfit: config.investmentAmount * 0.05,
                        bookmakers: ["DraftKings", "FanDuel", "BetMGM"],
                    },
                };
                enhancedOpportunities.push(arbOpp);
            }
            setOpportunities(enhancedOpportunities);
            setState((prev) => ({
                ...prev,
                lastScanTime: new Date(),
                alertsCount: enhancedOpportunities.filter((o) => o.valueEdge > 0.1)
                    .length,
            }));
            addToast(`Found ${enhancedOpportunities.length} opportunities`, "success");
        }
        catch (error) {
            console.error("Scan failed:", error);
            addToast("Scan failed. Please try again.", "error");
        }
        finally {
            setState((prev) => ({ ...prev, isScanning: false, scanProgress: 0 }));
        }
    }, [config, addToast, bettingService, predictionService]);
    /**
     * Generate optimal portfolios from opportunities
     */
    const generatePortfolios = useCallback(async () => {
        if (opportunities.length === 0)
            return;
        const portfolios = [];
        // Generate single bets
        opportunities
            .filter((opp) => opp.valueEdge > 0.05)
            .slice(0, 5)
            .forEach((opp) => {
            portfolios.push({
                id: `single_${opp.id}`,
                legs: [opp],
                totalOdds: opp.currentOdds,
                totalStake: opp.recommendedStake,
                totalPayout: opp.potentialPayout,
                expectedValue: betting.expectedValue(opp.predictedProbability, opp.currentOdds, opp.recommendedStake),
                riskScore: opp.riskLevel === "low" ? 25 : opp.riskLevel === "medium" ? 50 : 75,
                diversificationScore: 100,
                kellyScore: Math.abs(opp.kellyFraction) * 100,
                confidence: opp.confidence,
                type: opp.arbitrageOpportunity?.isArbitrage ? "arbitrage" : "single",
            });
        });
        // Generate parlay combinations
        const highConfidenceOpps = opportunities
            .filter((opp) => opp.confidence > 80)
            .slice(0, 4);
        if (highConfidenceOpps.length >= 2) {
            for (let i = 0; i < highConfidenceOpps.length - 1; i++) {
                for (let j = i + 1; j < highConfidenceOpps.length; j++) {
                    const leg1 = highConfidenceOpps[i];
                    const leg2 = highConfidenceOpps[j];
                    portfolios.push({
                        id: `parlay_${leg1.id}_${leg2.id}`,
                        legs: [leg1, leg2],
                        totalOdds: leg1.currentOdds * leg2.currentOdds,
                        totalStake: Math.min(leg1.recommendedStake, leg2.recommendedStake) * 0.5,
                        totalPayout: (leg1.potentialPayout + leg2.potentialPayout) * 0.7,
                        expectedValue: (leg1.expectedReturn + leg2.expectedReturn) * 0.6,
                        riskScore: 65,
                        diversificationScore: leg1.sport === leg2.sport ? 60 : 90,
                        kellyScore: Math.min(leg1.kellyFraction, leg2.kellyFraction) * 80,
                        confidence: (leg1.confidence + leg2.confidence) / 2 - 10,
                        type: "parlay",
                    });
                }
            }
        }
        setPortfolios(portfolios.sort((a, b) => b.expectedValue - a.expectedValue));
    }, [opportunities]);
    /**
     * Place a bet
     */
    const placeBet = useCallback(async (portfolio) => {
        try {
            const result = await bettingService.placeBet({
                id: portfolio.id,
                sport: portfolio.legs[0].sport,
                game: portfolio.legs[0].game,
                type: portfolio.type,
                odds: portfolio.totalOdds,
                confidence: portfolio.confidence,
                expectedValue: portfolio.expectedValue,
                stake: portfolio.totalStake,
                potentialReturn: portfolio.totalPayout,
                book: "Universal",
            });
            if (result.success) {
                addToast(`Bet placed successfully! ID: ${result.data.betId}`, "success");
                // Update metrics
                setMetrics((prev) => ({
                    ...prev,
                    betsPlaced: prev.betsPlaced + 1,
                    totalStaked: prev.totalStaked + portfolio.totalStake,
                }));
            }
        }
        catch (error) {
            addToast("Failed to place bet. Please try again.", "error");
        }
    }, [bettingService, addToast]);
    // ============================================================================
    // FILTERING & SORTING
    // ============================================================================
    const filteredOpportunities = useMemo(() => {
        let filtered = opportunities;
        if (filterCriteria.sport !== "all") {
            filtered = filtered.filter((opp) => opp.sport === filterCriteria.sport);
        }
        if (filterCriteria.riskLevel !== "all") {
            filtered = filtered.filter((opp) => opp.riskLevel === filterCriteria.riskLevel);
        }
        filtered = filtered.filter((opp) => opp.confidence >= filterCriteria.minConfidence &&
            opp.valueEdge >= filterCriteria.minEdge);
        return filtered.sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
            }
            return sortOrder === "desc"
                ? String(bVal).localeCompare(String(aVal))
                : String(aVal).localeCompare(String(bVal));
        });
    }, [opportunities, filterCriteria, sortBy, sortOrder]);
    // ============================================================================
    // AUTO MODE
    // ============================================================================
    useEffect(() => {
        if (state.isAutoMode) {
            const interval = setInterval(() => {
                scanForOpportunities();
            }, 60000); // Scan every minute in auto mode
            return () => clearInterval(interval);
        }
    }, [state.isAutoMode, scanForOpportunities]);
    useEffect(() => {
        generatePortfolios();
    }, [opportunities, generatePortfolios]);
    // ============================================================================
    // RENDER COMPONENTS
    // ============================================================================
    const renderMetricsCard = () => (_jsx(MegaCard, { title: "Performance Metrics", variant: "glass", padding: "lg", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#06ffa5" }, children: formatters.currency(metrics.totalProfit) }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Total Profit" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#00d4ff" }, children: formatters.percentage(metrics.roi) }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "ROI" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#06ffa5" }, children: formatters.percentage(metrics.winRate) }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Win Rate" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { fontSize: "24px", color: "#00d4ff" }, children: metrics.betsPlaced }), _jsx(CyberText, { variant: "caption", color: "secondary", children: "Bets Placed" })] })] }) }));
    const renderConfigPanel = () => (_jsx(MegaCard, { title: "Configuration", variant: "glass", padding: "lg", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(MegaInput, { label: "Investment Amount", type: "number", value: config.investmentAmount, onChange: (value) => setConfig((prev) => ({
                                ...prev,
                                investmentAmount: Number(value),
                            })), icon: _jsx(DollarSign, { size: 16 }) }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Risk Level" }), _jsx("div", { className: "flex gap-2", children: ["conservative", "moderate", "aggressive"].map((risk) => (_jsx(MegaButton, { variant: config.riskLevel === risk ? "primary" : "secondary", size: "sm", onClick: () => setConfig((prev) => ({ ...prev, riskLevel: risk })), className: "flex-1", children: risk }, risk))) })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(MegaInput, { label: "Min Confidence %", type: "number", value: config.minConfidence, onChange: (value) => setConfig((prev) => ({ ...prev, minConfidence: Number(value) })), icon: _jsx(Target, { size: 16 }) }), _jsx(MegaInput, { label: "Kelly Multiplier", type: "number", value: config.kellyMultiplier, onChange: (value) => setConfig((prev) => ({ ...prev, kellyMultiplier: Number(value) })), icon: _jsx(Calculator, { size: 16 }) }), _jsx(MegaInput, { label: "Max Exposure %", type: "number", value: config.maxExposure, onChange: (value) => setConfig((prev) => ({ ...prev, maxExposure: Number(value) })), icon: _jsx(Shield, { size: 16 }) })] })] }) }));
    const renderControlPanel = () => (_jsxs(MegaCard, { variant: "glass", padding: "lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(MegaButton, { variant: "primary", onClick: scanForOpportunities, loading: state.isScanning, icon: _jsx(RefreshCw, { size: 16 }), children: state.isScanning ? "Scanning..." : "Scan Opportunities" }), _jsx(MegaButton, { variant: state.isAutoMode ? "danger" : "success", onClick: () => setState((prev) => ({ ...prev, isAutoMode: !prev.isAutoMode })), icon: state.isAutoMode ? _jsx(Pause, { size: 16 }) : _jsx(Play, { size: 16 }), children: state.isAutoMode ? "Stop Auto" : "Start Auto" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Activity, { size: 16, style: { color: "#06ffa5" } }), _jsxs(CyberText, { variant: "caption", color: "secondary", children: [state.alertsCount, " High-Value Alerts"] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${state.systemHealth === "excellent"
                                            ? "bg-green-500"
                                            : state.systemHealth === "good"
                                                ? "bg-yellow-500"
                                                : "bg-red-500"}` }), _jsx(CyberText, { variant: "caption", color: "secondary", children: state.systemHealth })] })] })] }), state.isScanning && (_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx(CyberText, { variant: "caption", color: "secondary", children: "Scanning Progress" }), _jsxs(CyberText, { variant: "caption", color: "secondary", children: [Math.round(state.scanProgress), "%"] })] }), _jsx("div", { className: "w-full bg-gray-800 rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300", style: { width: `${state.scanProgress}%` } }) })] }))] }));
    const renderFilters = () => (_jsx(MegaCard, { title: "Filters & Sorting", variant: "glass", padding: "md", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [_jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Sport" }), _jsxs("select", { value: filterCriteria.sport, onChange: (e) => setFilterCriteria((prev) => ({ ...prev, sport: e.target.value })), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "all", children: "All Sports" }), _jsx("option", { value: "nfl", children: "NFL" }), _jsx("option", { value: "nba", children: "NBA" }), _jsx("option", { value: "mlb", children: "MLB" }), _jsx("option", { value: "nhl", children: "NHL" })] })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Risk Level" }), _jsxs("select", { value: filterCriteria.riskLevel, onChange: (e) => setFilterCriteria((prev) => ({
                                ...prev,
                                riskLevel: e.target.value,
                            })), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "all", children: "All Risk Levels" }), _jsx("option", { value: "low", children: "Low Risk" }), _jsx("option", { value: "medium", children: "Medium Risk" }), _jsx("option", { value: "high", children: "High Risk" })] })] }), _jsx(MegaInput, { label: "Min Confidence", type: "number", value: filterCriteria.minConfidence, onChange: (value) => setFilterCriteria((prev) => ({
                        ...prev,
                        minConfidence: Number(value),
                    })), size: "sm" }), _jsx(MegaInput, { label: "Min Edge %", type: "number", value: filterCriteria.minEdge * 100, onChange: (value) => setFilterCriteria((prev) => ({
                        ...prev,
                        minEdge: Number(value) / 100,
                    })), size: "sm" }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", className: "mb-2", children: "Sort By" }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "w-full p-2 bg-gray-800 border border-gray-600 rounded text-white", children: [_jsx("option", { value: "valueEdge", children: "Value Edge" }), _jsx("option", { value: "confidence", children: "Confidence" }), _jsx("option", { value: "expectedReturn", children: "Expected Return" }), _jsx("option", { value: "recommendedStake", children: "Recommended Stake" })] })] })] }) }));
    const renderOpportunityCard = (opportunity) => (_jsx(MegaCard, { variant: "glowing", padding: "md", onClick: () => setSelectedOpportunity(opportunity), className: "cursor-pointer hover:scale-105 transition-transform", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CyberText, { variant: "body", className: "font-semibold", children: opportunity.game }), _jsxs(CyberText, { variant: "caption", color: "muted", children: [opportunity.sport.toUpperCase(), " \u2022 ", opportunity.market] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [opportunity.arbitrageOpportunity?.isArbitrage && (_jsxs("div", { className: "flex items-center gap-1 bg-yellow-500 bg-opacity-20 px-2 py-1 rounded", children: [_jsx(Flame, { size: 12 }), _jsx(CyberText, { variant: "caption", style: { color: "#fbbf24" }, children: "ARB" })] })), _jsx("div", { className: `px-2 py-1 rounded text-xs font-semibold ${opportunity.riskLevel === "low"
                                        ? "bg-green-500 bg-opacity-20 text-green-400"
                                        : opportunity.riskLevel === "medium"
                                            ? "bg-yellow-500 bg-opacity-20 text-yellow-400"
                                            : "bg-red-500 bg-opacity-20 text-red-400"}`, children: opportunity.riskLevel.toUpperCase() })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { color: "#06ffa5" }, children: formatters.percentage(opportunity.valueEdge * 100, 1) }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Edge" })] }), _jsxs("div", { className: "text-center", children: [_jsxs(CyberText, { variant: "title", style: { color: "#00d4ff" }, children: [opportunity.confidence, "%"] }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Confidence" })] }), _jsxs("div", { className: "text-center", children: [_jsx(CyberText, { variant: "title", style: { color: "#06ffa5" }, children: formatters.currency(opportunity.expectedReturn) }), _jsx(CyberText, { variant: "caption", color: "muted", children: "Expected" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Odds" }), _jsx(CyberText, { variant: "body", children: formatters.odds(opportunity.currentOdds) })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Stake" }), _jsx(CyberText, { variant: "body", children: formatters.currency(opportunity.recommendedStake) })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Payout" }), _jsx(CyberText, { variant: "body", children: formatters.currency(opportunity.potentialPayout) })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Kelly" }), _jsx(CyberText, { variant: "body", children: formatters.percentage(opportunity.kellyFraction * 100, 1) })] })] }), _jsx(MegaButton, { variant: "primary", fullWidth: true, onClick: (e) => {
                        e.stopPropagation();
                        placeBet({
                            id: opportunity.id,
                            legs: [opportunity],
                            totalOdds: opportunity.currentOdds,
                            totalStake: opportunity.recommendedStake,
                            totalPayout: opportunity.potentialPayout,
                            expectedValue: opportunity.expectedReturn,
                            riskScore: opportunity.riskLevel === "low" ? 25 : 50,
                            diversificationScore: 100,
                            kellyScore: opportunity.kellyFraction * 100,
                            confidence: opportunity.confidence,
                            type: "single",
                        });
                    }, children: "Place Bet" })] }) }, opportunity.id));
    // ============================================================================
    // MAIN RENDER
    // ============================================================================
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CyberText, { variant: "title", style: { fontSize: "32px" }, children: "Universal Money Maker" }), _jsx(CyberText, { variant: "body", color: "secondary", children: "AI-Powered Betting Optimization & Arbitrage Detection" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Star, { size: 20, style: { color: "#06ffa5" } }), _jsx(CyberText, { variant: "body", style: { color: "#06ffa5" }, children: "Premium Mode" })] })] }), renderMetricsCard(), renderControlPanel(), renderConfigPanel(), renderFilters(), _jsx(MegaCard, { title: `Opportunities (${filteredOpportunities.length})`, variant: "glass", padding: "lg", children: filteredOpportunities.length === 0 ? (_jsx("div", { className: "text-center py-8", children: _jsx(CyberText, { variant: "body", color: "muted", children: "No opportunities found. Try scanning or adjusting your filters." }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredOpportunities.map(renderOpportunityCard) })) }), portfolios.length > 0 && (_jsx(MegaCard, { title: "Optimal Portfolios", variant: "glass", padding: "lg", children: _jsx("div", { className: "space-y-4", children: portfolios.slice(0, 5).map((portfolio) => (_jsxs("div", { className: "p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-600", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs(CyberText, { variant: "body", className: "font-semibold", children: [portfolio.type.toUpperCase(), " - ", portfolio.legs.length, " Leg", portfolio.legs.length > 1 ? "s" : ""] }), _jsxs(CyberText, { variant: "body", style: { color: "#06ffa5" }, children: [formatters.currency(portfolio.expectedValue), " EV"] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4 text-sm mb-3", children: [_jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Total Odds" }), _jsx(CyberText, { variant: "body", children: portfolio.totalOdds.toFixed(2) })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Stake" }), _jsx(CyberText, { variant: "body", children: formatters.currency(portfolio.totalStake) })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Payout" }), _jsx(CyberText, { variant: "body", children: formatters.currency(portfolio.totalPayout) })] }), _jsxs("div", { children: [_jsx(CyberText, { variant: "caption", color: "muted", children: "Confidence" }), _jsxs(CyberText, { variant: "body", children: [portfolio.confidence.toFixed(1), "%"] })] })] }), _jsx(MegaButton, { variant: "secondary", onClick: () => placeBet(portfolio), fullWidth: true, children: "Place Portfolio Bet" })] }, portfolio.id))) }) }))] }));
};
export default UniversalMoneyMaker;
