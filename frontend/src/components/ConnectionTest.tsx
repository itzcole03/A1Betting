import React, { useState, useEffect } from "react";

export const ConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<string>("Testing...");
  const [details, setDetails] = useState<any>({});

  const testConnection = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://192.168.1.125:8000";

    try {
      console.log("Testing connection to:", apiUrl);
      setStatus("Connecting...");
      setDetails({ apiUrl, timestamp: new Date().toISOString() });

      const response = await fetch(`${apiUrl}/health`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus("✅ Connected to local backend!");
        setDetails({
          apiUrl,
          status: response.status,
          data: data,
          timestamp: new Date().toISOString(),
        });
      } else {
        setStatus(`❌ HTTP ${response.status}: ${response.statusText}`);
        setDetails({
          apiUrl,
          status: response.status,
          statusText: response.statusText,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error: any) {
      setStatus(`❌ Connection failed: ${error.message}`);
      setDetails({
        apiUrl,
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      console.error("Connection test failed:", error);
    }
  };

  useEffect(() => {
    testConnection();
    const interval = setInterval(testConnection, 10000); // Test every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg border border-cyan-500/30 backdrop-blur-lg z-50 max-w-md">
      <h3 className="font-bold mb-2">🔗 Backend Connection</h3>
      <div className="text-sm mb-2">{status}</div>
      <div className="text-xs text-gray-300">
        <div>API: {details.apiUrl}</div>
        {details.data && <div>✅ Backend Status: {details.data.status}</div>}
        {details.error && (
          <div className="text-red-400">Error: {details.error}</div>
        )}
        <div>
          Last check:{" "}
          {details.timestamp &&
            new Date(details.timestamp).toLocaleTimeString()}
        </div>
      </div>
      <button
        onClick={testConnection}
        className="mt-2 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-xs transition-colors"
      >
        Test Now
      </button>
    </div>
  );
};

export default ConnectionTest;
