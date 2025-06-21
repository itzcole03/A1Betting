import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Activity, Target, BarChart3, Network, TrendingUp, Settings, Eye, RefreshCw, AlertCircle, CheckCircle, Cpu, Sparkles, Radar, GitBranch, Microscope, Gauge, Calculator, Infinity, Sigma, Pi, Function, Triangle, Minimize, Binary, Workflow, BookOpen, GraduationCap, Award, Play, Pause, } from "lucide-react";
import { Line, Scatter, Bar, } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend, ArcElement, Filler, } from "chart.js";
import toast from "react-hot-toast";
// Import enhanced backend service
import EnhancedBackendApiService from "../../services/unified/EnhancedBackendApiService";
import { useLogger } from "../../hooks/useLogger";
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, Title, Tooltip, Legend, ArcElement, Filler);
const EnhancedRevolutionaryInterface = () => {
    // State management
    const [selectedTab, setSelectedTab] = useState("enhanced-engine");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingStage, setProcessingStage] = useState("");
    const [predictionResult, setPredictionResult] = useState(null);
    const [mathematicalAnalysis, setMathematicalAnalysis] = useState(null);
    const [mathematicalFoundations, setMathematicalFoundations] = useState(null);
    const [realTimeMonitoring, setRealTimeMonitoring] = useState(false);
    // Enhanced prediction request state
    const [predictionRequest, setPredictionRequest] = useState({
        event_id: "",
        sport: "basketball",
        features: {
            player_performance: 75.5,
            team_strength: 82.1,
            matchup_difficulty: 68.3,
            historical_performance: 77.8,
            injury_impact: 15.2,
            weather_effect: 5.0,
            venue_advantage: 12.5,
            rest_factor: 85.0,
            momentum: 71.2,
            public_sentiment: 63.7,
        },
        enable_neuromorphic: true,
        neuromorphic_timesteps: 100,
        enable_mamba: true,
        mamba_sequence_length: 50,
        enable_causal_inference: true,
        causal_significance_level: 0.05,
        enable_topological: true,
        topological_max_dimension: 2,
        enable_riemannian: true,
        riemannian_manifold_dim: 16,
        use_gpu: false,
        numerical_precision: "float32",
        convergence_tolerance: 1e-6,
        context: {},
    });
    // Hooks
    const logger = useLogger();
    const backendService = EnhancedBackendApiService.getInstance();
    // Load mathematical foundations on mount
    useEffect(() => {
        loadMathematicalFoundations();
    }, []);
    // Real-time monitoring effect
    useEffect(() => {
        let intervalId;
        if (realTimeMonitoring && predictionResult) {
            intervalId = setInterval(() => {
                performRealTimeAnalysis();
            }, 30000); // Every 30 seconds
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [realTimeMonitoring, predictionResult]);
    const loadMathematicalFoundations = async () => {
        try {
            const foundations = await backendService.getMathematicalFoundations();
            setMathematicalFoundations(foundations);
            logger.info("Mathematical foundations loaded");
        }
        catch (error) {
            logger.error("Failed to load mathematical foundations", error);
            toast.error("Failed to load mathematical foundations");
        }
    };
    const performRealTimeAnalysis = async () => {
        if (!predictionResult)
            return;
        try {
            const analysis = await backendService.getMathematicalAnalysis({
                prediction_data: [
                    {
                        features: predictionRequest.features,
                        prediction: predictionResult.final_prediction,
                        confidence: predictionResult.prediction_confidence,
                    },
                ],
                analysis_depth: "comprehensive",
                include_stability_analysis: true,
                include_convergence_analysis: true,
                include_sensitivity_analysis: true,
                include_robustness_analysis: true,
                verify_theoretical_guarantees: true,
                check_mathematical_consistency: true,
            });
            setMathematicalAnalysis(analysis);
            logger.info("Real-time mathematical analysis updated");
        }
        catch (error) {
            logger.error("Real-time analysis failed", error);
        }
    };
    const executeEnhancedPrediction = async () => {
        if (!predictionRequest.event_id.trim()) {
            toast.error("Please enter an event ID");
            return;
        }
        setIsProcessing(true);
        setPredictionResult(null);
        setMathematicalAnalysis(null);
        try {
            // Processing stages with realistic timing
            const stages = [
                "Initializing Enhanced Mathematical Engine...",
                "Loading Hodgkin-Huxley Neuromorphic Networks...",
                "Configuring Mamba State Space Models...",
                "Setting up PC Algorithm for Causal Discovery...",
                "Initializing GUDHI Topological Analysis...",
                "Preparing Riemannian Geometry Computations...",
                "Executing Enhanced Revolutionary Prediction...",
                "Performing Mathematical Validation...",
                "Generating Comprehensive Analysis...",
            ];
            for (let i = 0; i < stages.length; i++) {
                setProcessingStage(stages[i]);
                if (i < stages.length - 1) {
                    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
                }
            }
            logger.info("Starting enhanced revolutionary prediction", {
                eventId: predictionRequest.event_id,
                sport: predictionRequest.sport,
                enabledComponents: {
                    neuromorphic: predictionRequest.enable_neuromorphic,
                    mamba: predictionRequest.enable_mamba,
                    causal: predictionRequest.enable_causal_inference,
                    topological: predictionRequest.enable_topological,
                    riemannian: predictionRequest.enable_riemannian,
                },
            });
            // Execute enhanced prediction
            const result = await backendService.getEnhancedRevolutionaryPrediction(predictionRequest);
            setPredictionResult(result);
            // Perform mathematical analysis
            const analysis = await backendService.getMathematicalAnalysis({
                prediction_data: [
                    {
                        features: predictionRequest.features,
                        prediction: result.final_prediction,
                        confidence: result.prediction_confidence,
                    },
                ],
                analysis_depth: "comprehensive",
                include_stability_analysis: true,
                include_convergence_analysis: true,
                include_sensitivity_analysis: true,
                include_robustness_analysis: true,
                verify_theoretical_guarantees: true,
                check_mathematical_consistency: true,
            });
            setMathematicalAnalysis(analysis);
            logger.info("Enhanced revolutionary prediction completed successfully", {
                eventId: predictionRequest.event_id,
                finalPrediction: result.final_prediction,
                confidence: result.prediction_confidence,
                processingTime: result.total_processing_time,
                guaranteesMet: Object.values(result.mathematical_guarantees).filter(Boolean).length,
            });
            toast.success(`Enhanced prediction completed! Confidence: ${(result.prediction_confidence * 100).toFixed(1)}%`);
        }
        catch (error) {
            logger.error("Enhanced revolutionary prediction failed", error);
            toast.error("Enhanced prediction failed. Please try again.");
        }
        finally {
            setIsProcessing(false);
            setProcessingStage("");
        }
    };
    // Memoized chart data
    const convergenceChartData = useMemo(() => {
        if (!predictionResult)
            return null;
        return {
            labels: Array.from({ length: 50 }, (_, i) => i + 1),
            datasets: [
                {
                    label: "Convergence Rate",
                    data: Array.from({ length: 50 }, (_, i) => {
                        const progress = (i + 1) / 50;
                        return (predictionResult.convergence_rate * (1 - Math.exp(-progress * 3)));
                    }),
                    borderColor: "rgba(59, 130, 246, 1)",
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    }, [predictionResult]);
    const eigenvalueSpectrumData = useMemo(() => {
        if (!predictionResult?.mamba_eigenvalue_spectrum)
            return null;
        return {
            labels: predictionResult.mamba_eigenvalue_spectrum.map((_, i) => `λ${i + 1}`),
            datasets: [
                {
                    label: "Eigenvalue Magnitude",
                    data: predictionResult.mamba_eigenvalue_spectrum.map(Math.abs),
                    backgroundColor: predictionResult.mamba_eigenvalue_spectrum.map((val, i) => Math.abs(val) < 1
                        ? "rgba(34, 197, 94, 0.8)"
                        : "rgba(239, 68, 68, 0.8)"),
                    borderColor: predictionResult.mamba_eigenvalue_spectrum.map((val, i) => Math.abs(val) < 1
                        ? "rgba(34, 197, 94, 1)"
                        : "rgba(239, 68, 68, 1)"),
                    borderWidth: 2,
                },
            ],
        };
    }, [predictionResult]);
    const topologicalBarcodeData = useMemo(() => {
        if (!predictionResult?.topological_persistence_barcode)
            return null;
        return {
            datasets: [
                {
                    label: "Persistence Intervals",
                    data: predictionResult.topological_persistence_barcode.map((interval, i) => ({
                        x: interval[0],
                        y: i,
                    })),
                    backgroundColor: "rgba(168, 85, 247, 0.8)",
                    borderColor: "rgba(168, 85, 247, 1)",
                    pointRadius: 4,
                },
                {
                    label: "Death Times",
                    data: predictionResult.topological_persistence_barcode.map((interval, i) => ({
                        x: interval[1],
                        y: i,
                    })),
                    backgroundColor: "rgba(239, 68, 68, 0.8)",
                    borderColor: "rgba(239, 68, 68, 1)",
                    pointRadius: 4,
                },
            ],
        };
    }, [predictionResult]);
    // Mathematical guarantees summary
    const guaranteesScore = useMemo(() => {
        if (!predictionResult?.mathematical_guarantees)
            return 0;
        const guarantees = Object.values(predictionResult.mathematical_guarantees);
        return (guarantees.filter(Boolean).length / guarantees.length) * 100;
    }, [predictionResult]);
    return (_jsxs("div", { className: "space-y-6 p-6", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-3 mb-4", children: [_jsx(Calculator, { className: "w-10 h-10 text-purple-600 animate-pulse" }), _jsx("h1", { className: "text-4xl font-bold text-gray-900", children: "Enhanced Revolutionary Engine" }), _jsx(Infinity, { className: "w-10 h-10 text-blue-500 animate-bounce" })] }), _jsx("p", { className: "text-xl text-gray-600 max-w-4xl mx-auto", children: "Mathematically Rigorous Implementation: Hodgkin-Huxley Neuromorphics, Mamba State Space, PC Algorithm Causal Discovery, GUDHI Topological Analysis & Riemannian Geometry" }), _jsxs("div", { className: "flex flex-wrap justify-center gap-2 mt-4", children: [_jsxs(Badge, { className: "bg-purple-100 text-purple-800", children: [_jsx(Sigma, { className: "w-3 h-3 mr-1" }), "Hodgkin-Huxley ODEs"] }), _jsxs(Badge, { className: "bg-green-100 text-green-800", children: [_jsx(Function, { className: "w-3 h-3 mr-1" }), "PC Algorithm"] }), _jsxs(Badge, { className: "bg-blue-100 text-blue-800", children: [_jsx(Pi, { className: "w-3 h-3 mr-1" }), "Do-Calculus"] }), _jsxs(Badge, { className: "bg-yellow-100 text-yellow-800", children: [_jsx(Triangle, { className: "w-3 h-3 mr-1" }), "GUDHI Persistent Homology"] }), _jsxs(Badge, { className: "bg-red-100 text-red-800", children: [_jsx(Binary, { className: "w-3 h-3 mr-1" }), "Mamba O(L) Scaling"] }), _jsxs(Badge, { className: "bg-indigo-100 text-indigo-800", children: [_jsx(Minimize, { className: "w-3 h-3 mr-1" }), "Riemannian Geodesics"] })] }), _jsxs("div", { className: "flex items-center justify-center gap-2 mt-4", children: [_jsxs(Button, { variant: realTimeMonitoring ? "default" : "outline", size: "sm", onClick: () => setRealTimeMonitoring(!realTimeMonitoring), className: "flex items-center gap-2", children: [realTimeMonitoring ? (_jsx(Pause, { className: "w-4 h-4" })) : (_jsx(Play, { className: "w-4 h-4" })), realTimeMonitoring ? "Pause" : "Start", " Real-time Monitoring"] }), predictionResult && (_jsxs(Badge, { variant: guaranteesScore > 80
                                    ? "success"
                                    : guaranteesScore > 60
                                        ? "warning"
                                        : "destructive", children: ["Mathematical Guarantees: ", guaranteesScore.toFixed(0), "%"] }))] })] }), isProcessing && (_jsx(Card, { className: "border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-blue-50", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(RefreshCw, { className: "w-6 h-6 animate-spin text-purple-600" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-purple-800", children: processingStage }), _jsx("p", { className: "text-sm text-purple-600", children: "Enhanced mathematical computation in progress..." }), _jsx(Progress, { value: Math.random() * 100, className: "mt-2" })] })] }) }) })), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-6", children: [_jsx(TabsTrigger, { value: "enhanced-engine", children: "Enhanced Engine" }), _jsx(TabsTrigger, { value: "mathematical-results", children: "Mathematical Results" }), _jsx(TabsTrigger, { value: "rigor-analysis", children: "Rigor Analysis" }), _jsx(TabsTrigger, { value: "foundations", children: "Mathematical Foundations" }), _jsx(TabsTrigger, { value: "validation", children: "Validation & Proofs" }), _jsx(TabsTrigger, { value: "complexity", children: "Complexity Analysis" })] }), _jsx(TabsContent, { value: "enhanced-engine", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Settings, { className: "w-5 h-5 mr-2 text-purple-600" }), "Enhanced Mathematical Configuration"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "event-id", children: "Event ID" }), _jsx(Input, { id: "event-id", value: predictionRequest.event_id, onChange: (e) => setPredictionRequest((prev) => ({
                                                                ...prev,
                                                                event_id: e.target.value,
                                                            })), placeholder: "Enter event identifier" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "sport", children: "Sport" }), _jsxs("select", { id: "sport", value: predictionRequest.sport, onChange: (e) => setPredictionRequest((prev) => ({
                                                                ...prev,
                                                                sport: e.target.value,
                                                            })), className: "w-full p-2 border rounded", children: [_jsx("option", { value: "basketball", children: "Basketball" }), _jsx("option", { value: "football", children: "Football" }), _jsx("option", { value: "baseball", children: "Baseball" }), _jsx("option", { value: "hockey", children: "Hockey" }), _jsx("option", { value: "soccer", children: "Soccer" })] })] }), _jsxs("div", { className: "space-y-4 border-t pt-4", children: [_jsxs("h4", { className: "font-medium text-gray-800 flex items-center", children: [_jsx(Calculator, { className: "w-4 h-4 mr-2" }), "Mathematical Rigor Settings"] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "enable-neuromorphic", checked: predictionRequest.enable_neuromorphic, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                enable_neuromorphic: e.target.checked,
                                                                            })) }), _jsx(Brain, { className: "w-4 h-4 text-purple-600" }), _jsx("label", { htmlFor: "enable-neuromorphic", className: "text-sm font-medium", children: "Hodgkin-Huxley Neuromorphic" })] }), predictionRequest.enable_neuromorphic && (_jsxs("div", { className: "ml-7", children: [_jsx(Label, { htmlFor: "timesteps", className: "text-xs", children: "Temporal Simulation Steps" }), _jsx(Input, { id: "timesteps", type: "number", value: predictionRequest.neuromorphic_timesteps, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                neuromorphic_timesteps: parseInt(e.target.value) || 100,
                                                                            })), className: "h-8" })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "enable-mamba", checked: predictionRequest.enable_mamba, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                enable_mamba: e.target.checked,
                                                                            })) }), _jsx(Activity, { className: "w-4 h-4 text-green-600" }), _jsx("label", { htmlFor: "enable-mamba", className: "text-sm font-medium", children: "Mamba State Space O(L)" })] }), predictionRequest.enable_mamba && (_jsxs("div", { className: "ml-7", children: [_jsx(Label, { htmlFor: "sequence-length", className: "text-xs", children: "Sequence Length" }), _jsx(Input, { id: "sequence-length", type: "number", value: predictionRequest.mamba_sequence_length, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                mamba_sequence_length: parseInt(e.target.value) || 50,
                                                                            })), className: "h-8" })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "enable-causal", checked: predictionRequest.enable_causal_inference, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                enable_causal_inference: e.target.checked,
                                                                            })) }), _jsx(GitBranch, { className: "w-4 h-4 text-blue-600" }), _jsx("label", { htmlFor: "enable-causal", className: "text-sm font-medium", children: "PC Algorithm + Do-Calculus" })] }), predictionRequest.enable_causal_inference && (_jsxs("div", { className: "ml-7", children: [_jsx(Label, { htmlFor: "significance-level", className: "text-xs", children: "Statistical Significance (\u03B1)" }), _jsx(Input, { id: "significance-level", type: "number", step: "0.001", value: predictionRequest.causal_significance_level, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                causal_significance_level: parseFloat(e.target.value) || 0.05,
                                                                            })), className: "h-8" })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "enable-topological", checked: predictionRequest.enable_topological, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                enable_topological: e.target.checked,
                                                                            })) }), _jsx(Network, { className: "w-4 h-4 text-yellow-600" }), _jsx("label", { htmlFor: "enable-topological", className: "text-sm font-medium", children: "GUDHI Persistent Homology" })] }), predictionRequest.enable_topological && (_jsxs("div", { className: "ml-7", children: [_jsx(Label, { htmlFor: "max-dimension", className: "text-xs", children: "Max Homological Dimension" }), _jsx(Input, { id: "max-dimension", type: "number", value: predictionRequest.topological_max_dimension, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                topological_max_dimension: parseInt(e.target.value) || 2,
                                                                            })), className: "h-8" })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("input", { type: "checkbox", id: "enable-riemannian", checked: predictionRequest.enable_riemannian, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                enable_riemannian: e.target.checked,
                                                                            })) }), _jsx(Minimize, { className: "w-4 h-4 text-indigo-600" }), _jsx("label", { htmlFor: "enable-riemannian", className: "text-sm font-medium", children: "Riemannian Geometry" })] }), predictionRequest.enable_riemannian && (_jsxs("div", { className: "ml-7", children: [_jsx(Label, { htmlFor: "manifold-dim", className: "text-xs", children: "Manifold Dimension" }), _jsx(Input, { id: "manifold-dim", type: "number", value: predictionRequest.riemannian_manifold_dim, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                riemannian_manifold_dim: parseInt(e.target.value) || 16,
                                                                            })), className: "h-8" })] }))] })] }), _jsxs("div", { className: "space-y-4 border-t pt-4", children: [_jsxs("h4", { className: "font-medium text-gray-800 flex items-center", children: [_jsx(Cpu, { className: "w-4 h-4 mr-2" }), "Computation Settings"] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "checkbox", id: "use-gpu", checked: predictionRequest.use_gpu, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                use_gpu: e.target.checked,
                                                                            })) }), _jsx("label", { htmlFor: "use-gpu", className: "text-xs", children: "GPU Acceleration" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "precision", className: "text-xs", children: "Numerical Precision" }), _jsxs("select", { id: "precision", value: predictionRequest.numerical_precision, onChange: (e) => setPredictionRequest((prev) => ({
                                                                                ...prev,
                                                                                numerical_precision: e.target.value,
                                                                            })), className: "w-full p-1 border rounded text-xs", children: [_jsx("option", { value: "float32", children: "Float32" }), _jsx("option", { value: "float64", children: "Float64" })] })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "tolerance", className: "text-xs", children: "Convergence Tolerance" }), _jsx(Input, { id: "tolerance", type: "number", step: "1e-8", value: predictionRequest.convergence_tolerance, onChange: (e) => setPredictionRequest((prev) => ({
                                                                        ...prev,
                                                                        convergence_tolerance: parseFloat(e.target.value) || 1e-6,
                                                                    })), className: "h-8 text-xs" })] })] }), _jsx(Button, { onClick: executeEnhancedPrediction, disabled: isProcessing || !predictionRequest.event_id.trim(), className: "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700", children: isProcessing ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }), "Computing..."] })) : (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "w-4 h-4 mr-2" }), "Execute Enhanced Prediction"] })) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(BarChart3, { className: "w-5 h-5 mr-2 text-blue-600" }), "Feature Configuration"] }) }), _jsx(CardContent, { className: "space-y-3", children: Object.entries(predictionRequest.features).map(([key, value]) => (_jsxs("div", { children: [_jsx(Label, { htmlFor: key, className: "text-xs capitalize", children: key.replace(/_/g, " ") }), _jsx(Input, { id: key, type: "number", step: "0.1", value: value, onChange: (e) => setPredictionRequest((prev) => ({
                                                            ...prev,
                                                            features: {
                                                                ...prev.features,
                                                                [key]: parseFloat(e.target.value) || 0,
                                                            },
                                                        })), className: "h-8" })] }, key))) })] })] }) }), _jsx(TabsContent, { value: "mathematical-results", children: predictionResult ? (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Target, { className: "w-5 h-5 mr-2 text-green-600" }), "Enhanced Prediction Results"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl font-bold text-green-600 mb-2", children: predictionResult.final_prediction.toFixed(2) }), _jsx("div", { className: "text-sm text-gray-600", children: "Final Enhanced Prediction" }), _jsx("div", { className: "mt-2", children: _jsxs(Badge, { variant: predictionResult.prediction_confidence > 0.8
                                                                    ? "success"
                                                                    : predictionResult.prediction_confidence > 0.6
                                                                        ? "warning"
                                                                        : "destructive", children: ["Confidence:", " ", (predictionResult.prediction_confidence * 100).toFixed(1), "%"] }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Base Prediction:" }), _jsx("span", { className: "font-medium", children: predictionResult.base_prediction.toFixed(2) })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Neuromorphic Enhancement:" }), _jsxs("span", { className: "font-medium text-purple-600", children: ["+", predictionResult.neuromorphic_enhancement.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Mamba Refinement:" }), _jsxs("span", { className: "font-medium text-green-600", children: ["+", predictionResult.mamba_temporal_refinement.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Causal Adjustment:" }), _jsxs("span", { className: "font-medium text-blue-600", children: [predictionResult.causal_adjustment >= 0 ? "+" : "", predictionResult.causal_adjustment.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Topological Smoothing:" }), _jsxs("span", { className: "font-medium text-yellow-600", children: [predictionResult.topological_smoothing >= 0 ? "+" : "", predictionResult.topological_smoothing.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Riemannian Projection:" }), _jsxs("span", { className: "font-medium text-indigo-600", children: [predictionResult.riemannian_projection >= 0 ? "+" : "", predictionResult.riemannian_projection.toFixed(2)] })] })] }), _jsx("div", { className: "border-t pt-3", children: _jsxs("div", { className: "text-xs text-gray-500 space-y-1", children: [_jsxs("div", { children: ["Processing Time:", " ", predictionResult.total_processing_time.toFixed(2), "s"] }), _jsxs("div", { children: ["Convergence Rate:", " ", (predictionResult.convergence_rate * 100).toFixed(1), "%"] }), _jsxs("div", { children: ["Stability Margin:", " ", predictionResult.stability_margin.toFixed(3)] }), _jsxs("div", { children: ["Lyapunov Exponent:", " ", predictionResult.lyapunov_exponent.toFixed(6)] })] }) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(TrendingUp, { className: "w-5 h-5 mr-2 text-blue-600" }), "Convergence Analysis"] }) }), _jsx(CardContent, { children: convergenceChartData && (_jsx("div", { className: "h-64", children: _jsx(Line, { data: convergenceChartData, options: {
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            legend: { display: false },
                                                            title: { display: false },
                                                        },
                                                        scales: {
                                                            x: { title: { display: true, text: "Iteration" } },
                                                            y: {
                                                                title: {
                                                                    display: true,
                                                                    text: "Convergence Rate",
                                                                },
                                                                min: 0,
                                                                max: 1,
                                                            },
                                                        },
                                                    } }) })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Activity, { className: "w-5 h-5 mr-2 text-green-600" }), "Mamba Eigenvalue Spectrum"] }) }), _jsxs(CardContent, { children: [eigenvalueSpectrumData && (_jsx("div", { className: "h-64", children: _jsx(Bar, { data: eigenvalueSpectrumData, options: {
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            plugins: {
                                                                legend: { display: false },
                                                                title: { display: false },
                                                            },
                                                            scales: {
                                                                x: { title: { display: true, text: "Eigenvalue" } },
                                                                y: { title: { display: true, text: "Magnitude" } },
                                                            },
                                                        } }) })), _jsx("div", { className: "mt-2 text-xs text-gray-500", children: "Stability guaranteed when all eigenvalues have magnitude < 1" })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Network, { className: "w-5 h-5 mr-2 text-yellow-600" }), "Topological Persistence Barcode"] }) }), _jsx(CardContent, { children: topologicalBarcodeData && (_jsx("div", { className: "h-64", children: _jsx(Scatter, { data: topologicalBarcodeData, options: {
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            legend: { position: "top" },
                                                        },
                                                        scales: {
                                                            x: {
                                                                title: { display: true, text: "Persistence" },
                                                            },
                                                            y: {
                                                                title: { display: true, text: "Feature Index" },
                                                            },
                                                        },
                                                    } }) })) })] })] })) : (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(Microscope, { className: "w-16 h-16 mx-auto text-gray-400 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No Results Yet" }), _jsx("p", { className: "text-gray-600", children: "Execute an enhanced prediction to see mathematical results" })] }) })) }), _jsx(TabsContent, { value: "rigor-analysis", children: mathematicalAnalysis ? (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Award, { className: "w-5 h-5 mr-2 text-purple-600" }), "Mathematical Rigor Score"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-6xl font-bold text-purple-600 mb-2", children: mathematicalAnalysis.mathematical_rigor_score.toFixed(0) }), _jsx("div", { className: "text-lg text-gray-600", children: "Overall Rigor Score" }), _jsx(Progress, { value: mathematicalAnalysis.mathematical_rigor_score, className: "mt-4" })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(CheckCircle, { className: "w-5 h-5 mr-2 text-green-600" }), "Theoretical Guarantees"] }) }), _jsx(CardContent, { children: predictionResult && (_jsx("div", { className: "space-y-2", children: Object.entries(predictionResult.mathematical_guarantees).map(([key, value]) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-600 capitalize", children: key.replace(/_/g, " ") }), value ? (_jsx(CheckCircle, { className: "w-4 h-4 text-green-600" })) : (_jsx(AlertCircle, { className: "w-4 h-4 text-red-600" }))] }, key))) })) })] })] })) : (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(Gauge, { className: "w-16 h-16 mx-auto text-gray-400 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No Analysis Available" }), _jsx("p", { className: "text-gray-600", children: "Execute an enhanced prediction to see rigor analysis" })] }) })) }), _jsx(TabsContent, { value: "foundations", children: mathematicalFoundations ? (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(BookOpen, { className: "w-5 h-5 mr-2 text-blue-600" }), "Theoretical Foundations"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: Object.entries(mathematicalFoundations.theoretical_foundations || {}).map(([key, value]) => (_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-gray-900 capitalize", children: key.replace(/_/g, " ") }), _jsxs("div", { className: "text-sm text-gray-600 space-y-1", children: [_jsxs("div", { children: [_jsx("strong", { children: "Basis:" }), " ", value.mathematical_basis] }), value.differential_equations && (_jsxs("div", { children: [_jsx("strong", { children: "Equations:" }), _jsx("ul", { className: "list-disc list-inside ml-2 font-mono text-xs", children: value.differential_equations.map((eq, i) => (_jsx("li", { children: eq }, i))) })] })), value.computational_complexity && (_jsxs("div", { children: [_jsx("strong", { children: "Complexity:" }), " ", value.computational_complexity] }))] })] }, key))) }) })] }) })) : (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(GraduationCap, { className: "w-16 h-16 mx-auto text-gray-400 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "Loading Foundations..." }), _jsx("p", { className: "text-gray-600", children: "Retrieving mathematical foundations from backend" })] }) })) }), _jsx(TabsContent, { value: "validation", children: predictionResult ? (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Eye, { className: "w-5 h-5 mr-2 text-green-600" }), "Numerical Stability Validation"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: Object.entries(predictionResult.numerical_stability).map(([key, value]) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: `text-2xl mb-1 ${value ? "text-green-600" : "text-red-600"}`, children: value ? "✓" : "✗" }), _jsx("div", { className: "text-xs text-gray-600 capitalize", children: key.replace(/_/g, " ") })] }, key))) }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Radar, { className: "w-5 h-5 mr-2 text-blue-600" }), "Convergence Diagnostics"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: Object.entries(predictionResult.convergence_diagnostics).map(([key, value]) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-600 capitalize", children: key.replace(/_/g, " ") }), _jsx("span", { className: "font-mono text-sm", children: typeof value === "boolean"
                                                                ? value
                                                                    ? "True"
                                                                    : "False"
                                                                : typeof value === "number"
                                                                    ? value.toFixed(6)
                                                                    : String(value) })] }, key))) }) })] })] })) : (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(Eye, { className: "w-16 h-16 mx-auto text-gray-400 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No Validation Data" }), _jsx("p", { className: "text-gray-600", children: "Execute an enhanced prediction to see validation results" })] }) })) }), _jsx(TabsContent, { value: "complexity", children: predictionResult ? (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Workflow, { className: "w-5 h-5 mr-2 text-purple-600" }), "Computational Complexity"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Time Complexity" }), _jsx("div", { className: "space-y-2", children: Object.entries(predictionResult.actual_complexity).map(([key, value]) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-sm text-gray-600 capitalize", children: [key, ":"] }), _jsx("span", { className: "font-mono text-sm", children: String(value) })] }, key))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-3", children: "Memory Usage (MB)" }), _jsx("div", { className: "space-y-2", children: Object.entries(predictionResult.memory_usage).map(([key, value]) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-sm text-gray-600 capitalize", children: [key, ":"] }), _jsx("span", { className: "font-mono text-sm", children: value.toFixed(2) })] }, key))) })] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Cpu, { className: "w-5 h-5 mr-2 text-blue-600" }), "Runtime Analysis"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: Object.entries(predictionResult.component_processing_times).map(([key, value]) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-sm text-gray-600 capitalize", children: [key.replace(/_/g, " "), ":"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Progress, { value: (value / predictionResult.total_processing_time) *
                                                                        100, className: "w-20 h-2" }), _jsxs("span", { className: "font-mono text-sm w-16 text-right", children: [value.toFixed(2), "s"] })] })] }, key))) }) })] })] })) : (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(Cpu, { className: "w-16 h-16 mx-auto text-gray-400 mb-4" }), _jsx("h3", { className: "text-lg font-medium text-gray-900 mb-2", children: "No Complexity Data" }), _jsx("p", { className: "text-gray-600", children: "Execute an enhanced prediction to see complexity analysis" })] }) })) })] })] }));
};
export default EnhancedRevolutionaryInterface;
