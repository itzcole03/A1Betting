/**
 * Chart.js Setup and Registration
 * Registers all required Chart.js components for use across the application
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  LogarithmicScale,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Decimation,
  SubTitle,
} from "chart.js";

// Register all Chart.js components
ChartJS.register(
  // Scales
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  LogarithmicScale,
  TimeScale,
  TimeSeriesScale,

  // Elements
  PointElement,
  LineElement,
  BarElement,
  ArcElement,

  // Plugins
  Title,
  Tooltip,
  Legend,
  Filler,
  Decimation,
  SubTitle,
);

// Default configuration for all charts
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
ChartJS.defaults.elements.point.radius = 4;
ChartJS.defaults.elements.point.hoverRadius = 6;

// Theme-aware color scheme
export const chartTheme = {
  colors: {
    primary: "#06ffa5",
    secondary: "#00d4ff",
    accent: "#ff10f0",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    text: "#e5e7eb",
    grid: "rgba(156, 163, 175, 0.2)",
  },
  gradients: {
    primary: ["#06ffa5", "#00d4ff"],
    accent: ["#ff10f0", "#7c3aed"],
    performance: ["#22c55e", "#16a34a"],
  },
};

// Utility function to generate chart colors
export const generateChartColors = (count: number) => {
  const baseColors = [
    chartTheme.colors.primary,
    chartTheme.colors.secondary,
    chartTheme.colors.accent,
    chartTheme.colors.success,
    chartTheme.colors.warning,
    chartTheme.colors.error,
  ];

  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }

  return colors;
};

// Common chart options
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: chartTheme.colors.text,
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: chartTheme.colors.text,
      bodyColor: chartTheme.colors.text,
      borderColor: chartTheme.colors.primary,
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: { color: chartTheme.colors.text },
      grid: { color: chartTheme.colors.grid },
    },
    y: {
      ticks: { color: chartTheme.colors.text },
      grid: { color: chartTheme.colors.grid },
    },
  },
};

// Chart.js is now properly configured
export default ChartJS;
