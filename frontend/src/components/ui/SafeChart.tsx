import React from "react";
import { Line, Bar, Doughnut, Radar, Scatter } from "react-chartjs-2";
import { Activity, BarChart3, PieChart, Zap } from "lucide-react";

interface SafeChartProps {
  type: "line" | "bar" | "doughnut" | "radar" | "scatter";
  data: any;
  options?: any;
  className?: string;
  loadingMessage?: string;
  fallbackIcon?: React.ReactNode;
}

const SafeChart: React.FC<SafeChartProps> = ({
  type,
  data,
  options = {},
  className = "",
  loadingMessage = "Loading chart data...",
  fallbackIcon,
}) => {
  // Enhanced validation for chart data structure
  const isValidData = React.useMemo(() => {
    try {
      if (!data || typeof data !== "object") return false;
      if (!data.labels || !Array.isArray(data.labels)) return false;
      if (!data.datasets || !Array.isArray(data.datasets)) return false;
      if (data.labels.length === 0) return false;
      if (data.datasets.length === 0) return false;

      // Validate each dataset has required properties
      return data.datasets.every(
        (dataset) =>
          dataset && typeof dataset === "object" && Array.isArray(dataset.data),
      );
    } catch (error) {
      console.warn("SafeChart: Data validation error:", error);
      return false;
    }
  }, [data]);

  if (!isValidData) {
    const icons = {
      line: <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      bar: <BarChart3 className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      doughnut: <PieChart className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      radar: <Zap className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
      scatter: <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" />,
    };

    return (
      <div
        className={`flex items-center justify-center h-full text-gray-400 ${className}`}
      >
        <div className="text-center">
          {fallbackIcon || icons[type]}
          <p className="text-sm">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  // Default safe options
  const safeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#e5e7eb" },
      },
    },
    scales:
      type !== "doughnut"
        ? {
            x: {
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(156, 163, 175, 0.2)" },
            },
            y: {
              ticks: { color: "#9ca3af" },
              grid: { color: "rgba(156, 163, 175, 0.2)" },
            },
          }
        : undefined,
    ...options,
  };

  try {
    // Add extra validation right before rendering
    if (!data?.labels || !data?.datasets) {
      throw new Error("Invalid chart data structure");
    }

    const ChartComponent = (() => {
      switch (type) {
        case "line":
          return Line;
        case "bar":
          return Bar;
        case "doughnut":
          return Doughnut;
        case "radar":
          return Radar;
        case "scatter":
          return Scatter;
        default:
          return null;
      }
    })();

    if (!ChartComponent) {
      return (
        <div
          className={`flex items-center justify-center h-full text-gray-400 ${className}`}
        >
          <div className="text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Unsupported chart type: {type}</p>
          </div>
        </div>
      );
    }

    return (
      <React.Suspense
        fallback={
          <div
            className={`flex items-center justify-center h-full text-gray-400 ${className}`}
          >
            <div className="text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 animate-pulse" />
              <p className="text-sm">Loading chart...</p>
            </div>
          </div>
        }
      >
        <ChartComponent
          data={data}
          options={safeOptions}
          className={className}
        />
      </React.Suspense>
    );
  } catch (error) {
    console.error("SafeChart rendering error:", error);
    return (
      <div
        className={`flex items-center justify-center h-full text-red-400 ${className}`}
      >
        <div className="text-center">
          <BarChart3 className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Chart rendering failed</p>
          <p className="text-xs text-gray-500 mt-1">
            Check console for details
          </p>
        </div>
      </div>
    );
  }
};

export default SafeChart;
