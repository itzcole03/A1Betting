/**
 * API Debug Component
 * Simple component to test API connections and display detailed error information
 */

import React, { useState, useEffect } from "react";
import { backendApi } from "../services/backendApi";

interface ApiTestResult {
  endpoint: string;
  status: "success" | "error" | "loading";
  data?: any;
  error?: string;
  responseTime?: number;
}

export const ApiDebug: React.FC = () => {
  const [results, setResults] = useState<ApiTestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const testEndpoints = [
    { name: "Health Check", fn: () => backendApi.getHealth() },
    {
      name: "Betting Opportunities",
      fn: () => backendApi.getBettingOpportunities(),
    },
    { name: "Advanced Analytics", fn: () => backendApi.getAdvancedAnalytics() },
    { name: "Model Performance", fn: () => backendApi.getModelPerformance() },
  ];

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);

    for (const test of testEndpoints) {
      const startTime = Date.now();
      try {
        setResults((prev) => [
          ...prev,
          { endpoint: test.name, status: "loading" },
        ]);

        const data = await test.fn();
        const responseTime = Date.now() - startTime;

        setResults((prev) =>
          prev.map((r) =>
            r.endpoint === test.name
              ? { ...r, status: "success", data, responseTime }
              : r,
          ),
        );
      } catch (error: any) {
        const responseTime = Date.now() - startTime;

        setResults((prev) =>
          prev.map((r) =>
            r.endpoint === test.name
              ? {
                  ...r,
                  status: "error",
                  error: error.message || "Unknown error",
                  responseTime,
                }
              : r,
          ),
        );
      }
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      case "loading":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "loading":
        return "⏳";
      default:
        return "❓";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          API Connection Debug
        </h2>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isRunning ? "Testing..." : "Run Tests"}
        </button>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span>{getStatusIcon(result.status)}</span>
                <h3 className="font-semibold">{result.endpoint}</h3>
                <span className={`text-sm ${getStatusColor(result.status)}`}>
                  {result.status}
                </span>
              </div>
              {result.responseTime && (
                <span className="text-sm text-gray-500">
                  {result.responseTime}ms
                </span>
              )}
            </div>

            {result.error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-2">
                <p className="text-red-800 text-sm font-medium">Error:</p>
                <p className="text-red-700 text-sm">{result.error}</p>
              </div>
            )}

            {result.data && (
              <div className="bg-gray-50 border rounded p-3">
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Response:
                </p>
                <pre className="text-xs text-gray-700 overflow-auto max-h-40">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold text-blue-800 mb-2">Debug Information</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p>
            <strong>Environment:</strong>{" "}
            {import.meta.env.DEV ? "Development" : "Production"}
          </p>
          <p>
            <strong>API Base URL:</strong>{" "}
            {import.meta.env.VITE_API_URL || "http://localhost:8000"}
          </p>
          <p>
            <strong>WebSocket URL:</strong>{" "}
            {import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8000"}
          </p>
          <p>
            <strong>Current Time:</strong> {new Date().toISOString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiDebug;
