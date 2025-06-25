import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Send,
  TrendingUp,
  BarChart3,
  DollarSign,
  Target,
  Zap,
  Activity,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import OfflineIndicator from "../ui/OfflineIndicator";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export const PropOllama: React.FC = () => {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      content:
        "🏀 Hey! I'm PropOllama, your AI sports betting assistant. I can analyze player props, find value bets, track line movements, and provide real-time insights across all major sports. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Show me today's best props",
        "Analyze NBA player props",
        "Find value bets",
        "Explain betting strategy",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Live data simulation
  const [liveData, setLiveData] = useState({
    activeAnalyses: 147,
    liveGames: 12,
    confidencePicks: 8,
    valueBets: 23,
  });

  // Quick action buttons
  const quickActions = [
    {
      id: "props",
      title: "Best Props",
      icon: "🎯",
      prompt: "Show me today's best player props with high confidence",
    },
    {
      id: "value",
      title: "Value Bets",
      icon: "��",
      prompt: "Find me the best value bets for tonight's games",
    },
    {
      id: "nba",
      title: "NBA Focus",
      icon: "🏀",
      prompt: "Analyze tonight's NBA games and player props",
    },
    {
      id: "strategy",
      title: "Strategy",
      icon: "🧠",
      prompt: "Help me improve my betting strategy and bankroll management",
    },
    {
      id: "live",
      title: "Live Odds",
      icon: "⚡",
      prompt: "Show me live odds movements and line changes",
    },
    {
      id: "trends",
      title: "Trends",
      icon: "📈",
      prompt: "What are the current betting trends I should know about?",
    },
  ];

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        activeAnalyses: prev.activeAnalyses + Math.floor(Math.random() * 3),
        liveGames: 12 + Math.floor(Math.random() * 3),
        confidencePicks: 8 + Math.floor(Math.random() * 2),
        valueBets: prev.valueBets + Math.floor(Math.random() * 2),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleRetry = useCallback(() => {
    setIsOffline(false);
    queryClient.invalidateQueries();
    toast.success("Reconnecting to PropOllama services...");
  }, [queryClient]);

  const sendMessage = useCallback(
    async (messageText?: string) => {
      const text = messageText || input.trim();
      if (!text) return;

      // Clear input if using typed message
      if (!messageText) setInput("");

      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        type: "user",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      try {
        // Determine analysis type
        let analysisType = "general";
        if (text.toLowerCase().includes("prop")) analysisType = "prop_analysis";
        if (text.toLowerCase().includes("value"))
          analysisType = "value_analysis";
        if (text.toLowerCase().includes("strategy"))
          analysisType = "strategy_advice";
        if (text.toLowerCase().includes("odds")) analysisType = "odds_analysis";

        // Try enhanced Ollama endpoint first
        let ollamaResponse;
        try {
          const response = await fetch("/api/propollama/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message: text,
              context: {
                previousMessages: messages.slice(-3),
                analysisType,
                timestamp: new Date().toISOString(),
              },
              analysisType,
            }),
          });

          if (response.ok) {
            ollamaResponse = await response.json();
            console.log(
              `🤖 PropOllama using model: ${ollamaResponse.model_used} (${ollamaResponse.response_time}ms)`,
            );
          }
        } catch (error) {
          console.warn("PropOllama enhanced API not available:", error);
        }

        // Fallback to basic Ollama
        if (!ollamaResponse) {
          try {
            const response = await fetch("/api/ollama/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: text,
                context: { previousMessages: messages.slice(-3) },
                analysisType,
              }),
            });

            if (response.ok) {
              ollamaResponse = await response.json();
            }
          } catch (error) {
            console.warn("Ollama fallback failed:", error);
            setIsOffline(true);
          }
        }

        // Create AI response
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: "ai",
          content: ollamaResponse?.content || generateFallbackResponse(text),
          timestamp: new Date(),
          suggestions: ollamaResponse?.suggestions || [
            "Tell me more",
            "Show examples",
            "Get different analysis",
            "Explain strategy",
          ],
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("LLM response error:", error);

        // Error response
        const errorMessage: Message = {
          id: `ai-${Date.now()}`,
          type: "ai",
          content:
            "I'm experiencing some technical difficulties connecting to my analysis engine. Please try again in a moment, or check the system status.",
          timestamp: new Date(),
          suggestions: [
            "Check system status",
            "Retry request",
            "Contact support",
          ],
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    },
    [input, messages, queryClient],
  );

  // Generate fallback response when APIs are unavailable
  const generateFallbackResponse = useCallback((userInput: string): string => {
    const responses = [
      `🤖 **PropOllama Analysis** (Demo Mode)

Based on your query: "${userInput}"

I'm currently running in demo mode, but here's what I'd typically analyze:

🎯 **Key Insights:**
- Player performance trends and recent form
- Line movement patterns and market sentiment  
- Weather and venue factors for outdoor sports
- Injury reports and lineup changes

📊 **Statistical Edge:**
- Historical matchup data analysis
- Advanced metrics and efficiency ratings
- Public vs sharp money indicators
- Model predictions with confidence intervals

⚡ **PropOllama Recommendation:**
For the best real-time analysis, ensure the PropOllama backend is running with Ollama integration.

*Demo response - Connect to Ollama for live AI analysis*`,
    ];

    return responses[0];
  }, []);

  return (
    <div className="space-y-6 animate-slide-in-up h-full flex flex-col">
      {/* Offline Indicator */}
      <OfflineIndicator
        show={!!isOffline}
        service="PropOllama API"
        onRetry={handleRetry}
      />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 glass-card rounded-3xl p-12 shadow-neon relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-3xl blur-2xl opacity-50 animate-pulse" />
        <div className="relative">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="holographic text-5xl font-black mb-4">PropOllama</h1>
          <p className="text-xl text-gray-200 font-medium mb-6">
            Your AI Sports Betting Assistant
          </p>

          {/* Live Stats - FIXED: Better contrast with text-gray-200 and font-medium */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-purple-400">
                {liveData.activeAnalyses}
              </div>
              <div className="text-xs text-gray-200 font-medium">
                Live Analyses
              </div>
            </div>
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-green-400">
                {liveData.liveGames}
              </div>
              <div className="text-xs text-gray-200 font-medium">
                Games Today
              </div>
            </div>
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-blue-400">
                {liveData.confidencePicks}
              </div>
              <div className="text-xs text-gray-200 font-medium">
                High Confidence
              </div>
            </div>
            <div className="glass-card rounded-xl p-3 border border-white/10">
              <div className="text-lg font-bold text-yellow-400">
                {liveData.valueBets}
              </div>
              <div className="text-xs text-gray-200 font-medium">
                Value Bets
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 glass-card rounded-3xl border border-white/10 flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-4xl ${
                    message.type === "user" ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-3 ${
                      message.type === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      }`}
                    >
                      {message.type === "user" ? (
                        <div className="w-6 h-6 bg-white rounded-full" />
                      ) : (
                        <Brain className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div
                      className={`flex-1 ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-800/50 border border-gray-700/50 text-gray-100"
                      } rounded-2xl p-4 shadow-lg backdrop-blur-sm`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                        {message.content}
                      </div>

                      {/* Timestamp - FIXED: Better contrast */}
                      <div
                        className={`text-xs mt-2 font-medium ${
                          message.type === "user"
                            ? "text-white/90"
                            : "text-gray-200"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>

                      {/* AI Suggestions - FIXED: Better contrast */}
                      {message.suggestions && message.type === "ai" && (
                        <div className="mt-4 space-y-2">
                          <div className="text-xs text-gray-200 font-semibold">
                            Quick follow-ups:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => sendMessage(suggestion)}
                                className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-200 hover:bg-purple-500/30 hover:text-white transition-all font-medium"
                              >
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                      <span className="text-sm text-purple-200 font-medium">
                        PropOllama is analyzing...
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(action.prompt)}
                className="p-3 glass-card rounded-xl hover:shadow-neon transition-all text-center"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <div className="text-xs font-semibold text-white">
                  {action.title}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/10">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
              placeholder="Ask about props, odds, trends, or get betting advice..."
              className="flex-1 px-6 py-4 bg-gray-800/80 border-2 border-gray-500 rounded-2xl text-white placeholder-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all text-lg backdrop-blur-sm shadow-lg font-medium"
              disabled={isTyping}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isTyping}
              className="cyber-btn px-6 py-4 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 drop-shadow-lg" />
            </motion.button>
          </div>

          {/* Footer - FIXED: Better contrast */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-200 font-medium">
              PropOllama provides AI-powered analysis. Always gamble
              responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropOllama;
