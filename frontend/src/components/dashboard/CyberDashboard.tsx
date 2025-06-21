import React from "react";
import GlassCard from "../ui/GlassCard";
import MetricCard from "../ui/MetricCard";
import CyberButton from "../ui/CyberButton";
import HolographicText from "../ui/HolographicText";
import StatusIndicator from "../ui/StatusIndicator";

interface CyberDashboardProps {
  currentPage?: string;
}

const CyberDashboard: React.FC<CyberDashboardProps> = ({
  currentPage = "dashboard",
}) => {
  const user = {
    name: "Alex Chen",
    totalProfit: 47230,
    accuracy: 97.3,
    winRate: 89.4,
    balance: 127430.5,
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-slide-in-up">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <HolographicText size="4xl" className="text-4xl font-black mb-4">
          Welcome Back, Alex
        </HolographicText>
        <p className="text-xl text-gray-400">
          Your AI-powered sports intelligence platform is ready
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Profit"
          value={`$${user.totalProfit.toLocaleString()}`}
          icon="fas fa-dollar-sign"
          change="+$3.2K"
          trend="up"
          glowing
        />
        <MetricCard
          label="AI Accuracy"
          value={`${user.accuracy}%`}
          icon="fas fa-brain"
          change="+2.1%"
          trend="up"
        />
        <MetricCard
          label="Win Rate"
          value={`${user.winRate}%`}
          icon="fas fa-trophy"
          change="+4.7%"
          trend="up"
        />
        <MetricCard
          label="Account Balance"
          value={`$${user.balance.toLocaleString()}`}
          icon="fas fa-wallet"
          change="+12.3%"
          trend="up"
        />
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard title="Ultimate Money Maker" glowing animated>
          <div className="text-center">
            <div className="text-4xl mb-4 text-green-400">💰</div>
            <p className="text-gray-300 mb-4">
              AI-powered profit maximization with 47 neural networks
            </p>
            <CyberButton variant="primary" className="w-full" glowing>
              Activate Now
            </CyberButton>
          </div>
        </GlassCard>

        <GlassCard title="PrizePicks Pro" animated>
          <div className="text-center">
            <div className="text-4xl mb-4 text-blue-400">🏆</div>
            <p className="text-gray-300 mb-4">
              Professional player prop analysis with real-time data
            </p>
            <CyberButton variant="secondary" className="w-full">
              View Props
            </CyberButton>
          </div>
        </GlassCard>

        <GlassCard title="Quantum Analytics" animated>
          <div className="text-center">
            <div className="text-4xl mb-4 text-purple-400">⚛️</div>
            <p className="text-gray-300 mb-4">
              Quantum-enhanced predictions with 99.7% accuracy
            </p>
            <CyberButton variant="ghost" className="w-full">
              Explore
            </CyberButton>
          </div>
        </GlassCard>
      </div>

      {/* Live Activity Feed */}
      <GlassCard title="Live Activity Feed" animated>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-green-500/10 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300">
              AI Model generated new prediction: Lakers vs Warriors (94.7%
              confidence)
            </span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-blue-500/10 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300">
              Quantum processor analyzed 1,247 data points in 12ms
            </span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-purple-500/10 rounded-lg">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300">
              Neural network training completed: +2.3% accuracy improvement
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const renderPremiumDashboard = () => (
    <div className="space-y-8 animate-slide-in-up">
      <div className="text-center mb-8">
        <HolographicText
          size="4xl"
          className="text-4xl font-black mb-4 flex items-center justify-center"
        >
          <i className="fas fa-crown mr-3"></i>
          Premium Quantum Dashboard
        </HolographicText>
        <p className="text-xl text-gray-400">
          Advanced quantum-enhanced AI with 1024 qubits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          label="Active Qubits"
          value="1024"
          icon="fas fa-atom"
          change="+64"
          trend="up"
          glowing
        />
        <MetricCard
          label="Entanglement"
          value="99.97%"
          icon="fas fa-link"
          change="+0.03%"
          trend="up"
        />
        <MetricCard
          label="Coherence Time"
          value="2.1ms"
          icon="fas fa-clock"
          change="+0.2ms"
          trend="up"
        />
      </div>

      <GlassCard title="Quantum Processing Center" glowing animated>
        <div className="text-center py-8">
          <div className="text-6xl mb-6 text-electric-400 animate-cyber-pulse">
            ⚛️
          </div>
          <HolographicText size="2xl" className="text-2xl mb-4">
            QUANTUM CORE ACTIVE
          </HolographicText>
          <p className="text-gray-300 mb-6">
            1024 qubits processing infinite probability matrices
          </p>
          <CyberButton variant="primary" size="lg" glowing>
            ACCESS QUANTUM REALM
          </CyberButton>
        </div>
      </GlassCard>
    </div>
  );

  const renderMoneyMaker = () => (
    <div className="space-y-8 animate-slide-in-up">
      <GlassCard className="text-center p-12 shadow-neon" glowing>
        <HolographicText size="5xl" className="text-5xl font-black mb-6">
          ULTIMATE MONEY MAKER
        </HolographicText>
        <div className="text-6xl font-black text-green-400 mb-6 animate-cyber-pulse">
          $∞
        </div>
        <p className="text-xl text-gray-300 mb-8">
          AI-powered profit generation with 47 neural networks
        </p>
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-electric-400">∞%</div>
            <div className="text-gray-400">ROI</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">99.9%</div>
            <div className="text-gray-400">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">&lt;1ms</div>
            <div className="text-gray-400">Response</div>
          </div>
        </div>
        <CyberButton
          variant="primary"
          size="lg"
          icon="fas fa-rocket"
          glowing
          className="animate-glow-pulse"
        >
          ACTIVATE QUANTUM PROFITS
        </CyberButton>
      </GlassCard>
    </div>
  );

  const renderDefaultPage = (
    title: string,
    description: string,
    icon: string,
  ) => (
    <div className="space-y-8 animate-slide-in-up">
      <div className="text-center">
        <div className="text-6xl mb-6 text-electric-400 float-element">
          <i className={icon}></i>
        </div>
        <HolographicText size="4xl" className="text-4xl font-black mb-4">
          {title}
        </HolographicText>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{description}</p>
      </div>
      <GlassCard className="text-center py-12" animated>
        <div className="text-gray-500 mb-6">
          Advanced feature interface coming soon...
        </div>
        <CyberButton variant="ghost">Configure</CyberButton>
      </GlassCard>
    </div>
  );

  // Render based on current page
  switch (currentPage) {
    case "dashboard":
      return renderDashboard();
    case "premium-dashboard":
      return renderPremiumDashboard();
    case "money-maker":
      return renderMoneyMaker();
    case "prizepicks":
      return renderDefaultPage(
        "PrizePicks Pro",
        "Professional player prop analysis with real-time AI enhancement and market insights",
        "fas fa-trophy",
      );
    case "ml-center":
      return renderDefaultPage(
        "ML Center",
        "Machine learning command center with 47 neural networks and deep learning models",
        "fas fa-brain",
      );
    case "quantum":
      return renderDefaultPage(
        "Quantum Predictions",
        "Quantum-enhanced prediction engine with 1024 qubits and superposition algorithms",
        "fas fa-atom",
      );
    case "analytics":
      return renderDefaultPage(
        "Advanced Analytics",
        "Comprehensive data analysis with real-time insights and performance metrics",
        "fas fa-chart-line",
      );
    case "realtime":
      return renderDefaultPage(
        "Real-time Monitor",
        "Live data monitoring with instant processing and intelligent alerts",
        "fas fa-eye",
      );
    case "settings":
      return renderDefaultPage(
        "Settings",
        "Platform configuration and account management options",
        "fas fa-cog",
      );
    default:
      return renderDashboard();
  }
};

export default CyberDashboard;
