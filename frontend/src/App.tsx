import React, { useEffect } from "react";
import { Platform } from "./quantum";
import MegaApp from "./components/mega/MegaApp";
import "./App.css";

/**
 * 🚀 A1BETTING QUANTUM PLATFORM - MAIN APP
 *
 * Enhanced with consolidated architecture while preserving
 * your beautiful cyber theme and all functionality
 */
function App() {
  useEffect(() => {
    // Initialize the Quantum Platform with all consolidated systems
    Platform.initialize().catch(console.error);
  }, []);

  return (
    <div className="quantum-app">
      <MegaApp />
    </div>
  );
}

export default App;
