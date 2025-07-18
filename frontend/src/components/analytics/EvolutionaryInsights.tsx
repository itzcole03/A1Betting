import React from 'react';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics';

const safeNumber = (n: unknown) => (typeof n === 'number' && !isNaN(n) ? n : 0);

const exportToJson = (data: any) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'evolutionary-insights.json';
  a.click();
  URL.revokeObjectURL(url);
};

interface EvolutionaryInsightsProps {
  autoUpdateInterval?: number;
  showGameTheory?: boolean;
  showEvolutionaryMetrics?: boolean;
  showReinforcement?: boolean;
  showOptimization?: boolean;
  showRecommendation?: boolean;
}

const EvolutionaryInsights: React.FC<EvolutionaryInsightsProps> = ({
  autoUpdateInterval = 60000,
  showGameTheory = true,
  showEvolutionaryMetrics = true,
  showReinforcement = true,
  showOptimization = true,
  showRecommendation = true,
}) => {
  const { ml, betting } = useUnifiedAnalytics({
    ml: { autoUpdate: true, updateInterval: autoUpdateInterval },
    betting: true,
  });

  if (ml.loading || betting.loading) {
    return (
      <div aria-live="polite" className="flex items-center justify-center h-96" role="status">
        <div
          aria-label="Loading"
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
        />
      </div>
    );
  }

  if (ml.error || betting.error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
        <h3 className="font-bold">Error</h3>
        <p>{ml.error || betting.error}</p>
        <button
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            ml.refetch();
            betting.refetch();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const mlResult = ml.data;
  const bettingResult = betting.data;
  if (!mlResult) {
    return (
      <div className="p-4 text-gray-500" role="status">
        No Evolutionary analytics available.
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="evolutionaryinsights-root">
      {/* Game Theory Analysis (proxy: ML metrics) */}
      {showGameTheory && (
        <section
          aria-labelledby="evolutionary-game-heading"
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold mb-4" id="evolutionary-game-heading">
            Game Theory Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Accuracy</h3>
              <div className="font-mono text-2xl">
                {safeNumber(mlResult.metrics?.accuracy).toFixed(4)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Precision</h3>
              <div className="font-mono text-2xl">
                {safeNumber(mlResult.metrics?.precision).toFixed(4)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Recall</h3>
              <div className="font-mono text-2xl">
                {safeNumber(mlResult.metrics?.recall).toFixed(4)}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Evolutionary Metrics (proxy: betting win rate, profit/loss) */}
      {showEvolutionaryMetrics && (
        <section
          aria-labelledby="evolutionary-metrics-heading"
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold mb-4" id="evolutionary-metrics-heading">
            Evolutionary Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Win Rate</h3>
              <div className="font-mono text-2xl">
                {safeNumber(bettingResult?.winRate).toFixed(2)}%
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Profit/Loss</h3>
              <div className="font-mono text-2xl">
                ${safeNumber(bettingResult?.profitLoss).toFixed(2)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">ROI</h3>
              <div className="font-mono text-2xl">{safeNumber(bettingResult?.roi).toFixed(2)}%</div>
            </div>
          </div>
        </section>
      )}
      {/* Reinforcement Metrics (proxy: risk metrics) */}
      {showReinforcement && (
        <section
          aria-labelledby="evolutionary-reinforcement-heading"
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold mb-4" id="evolutionary-reinforcement-heading">
            Reinforcement Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">VaR</h3>
              <div className="font-mono text-2xl">
                ${safeNumber(bettingResult?.riskMetrics?.var).toFixed(2)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sharpe Ratio</h3>
              <div className="font-mono text-2xl">
                {safeNumber(bettingResult?.riskMetrics?.sharpe).toFixed(2)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Sortino Ratio</h3>
              <div className="font-mono text-2xl">
                {safeNumber(bettingResult?.riskMetrics?.sortino).toFixed(2)}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Optimization (proxy: risk metrics) */}
      {showOptimization && (
        <section
          aria-labelledby="evolutionary-optimization-heading"
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold mb-4" id="evolutionary-optimization-heading">
            Optimization
          </h2>
          <div className="text-gray-500">
            (Unified analytics: optimization strategies are surfaced in advanced risk and betting
            modules.)
          </div>
        </section>
      )}
      {/* Final Recommendation */}
      {showRecommendation && (
        <section
          aria-labelledby="evolutionary-recommendation-heading"
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold mb-4" id="evolutionary-recommendation-heading">
            AI Recommendation
          </h2>
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">
              {safeNumber(bettingResult?.confidence) > 0.7 ? 'Place Bet' : 'Hold'}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
              {(safeNumber(bettingResult?.confidence) * 100).toFixed(1)}% Confidence
            </span>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                ml.refetch();
                betting.refetch();
              }}
            >
              Refresh Analysis
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={() => exportToJson({ mlResult, bettingResult })}
            >
              Export JSON
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(EvolutionaryInsights);
