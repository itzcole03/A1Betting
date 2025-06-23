import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ViteErrorBoundary from "./components/ViteErrorBoundary.tsx";

// Import styles exactly like the prototype
import "./index.css";
import "./styles/global-cyber-theme.css";
import "./styles/prototype-override.css";
import "./styles/force-prototype.css";
import "./styles/enhanced-animations.css";

console.log("🚀 A1Betting Platform Loading - Prototype Match Mode");

// Handle Vite error overlay issues
window.addEventListener("error", (event) => {
  if (
    event.error?.message?.includes(
      "Cannot read properties of undefined (reading 'frame')",
    )
  ) {
    console.warn("Vite error overlay issue suppressed:", event.error);
    event.preventDefault();
    return;
  }
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ViteErrorBoundary>
      <App />
    </ViteErrorBoundary>
  </React.StrictMode>,
);
