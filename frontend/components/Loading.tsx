"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const LOADING_STEPS = [
  "Analyzing provided parameters...",
  "Structuring test suite requirements...",
  "Generating Unit & Integration test setups...",
  "Assessing Security vulnerabilities and boundary scenarios...",
  "Refining Edge cases and Performance test cases...",
  "Polishing final test code outputs..."
];

export default function Loading() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Outer Glow Ring */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
        
        {/* React Loader Icon */}
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-white">Generating Test Cases</h3>
      <p className="mt-2 text-sm text-slate-400 animate-pulse text-center max-w-xs">
        {LOADING_STEPS[stepIndex]}
      </p>
    </div>
  );
}
