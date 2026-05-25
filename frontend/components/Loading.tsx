"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface Step {
  id: number;
  label: string;
  minProgress: number;
}

const THINKING_STEPS: Step[] = [
  { id: 1, label: "Analyzing Requirements...", minProgress: 0 },
  { id: 2, label: "Detecting User Flows...", minProgress: 20 },
  { id: 3, label: "Finding Edge Cases...", minProgress: 45 },
  { id: 4, label: "Checking Security Risks...", minProgress: 70 },
  { id: 5, label: "Generating Test Scenarios...", minProgress: 90 }
];

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress that starts fast and slows down towards 99%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          return 99; // Cap at 99% until generation resolves
        }
        
        // Slower increments as it approaches completion to feel realistic
        const increment = prev < 50 ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 2) + 1;
        return Math.min(prev + increment, 99);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto p-6 rounded-2xl border border-white/5 bg-slate-900/10 backdrop-blur-md shadow-2xl animate-fade-in text-center mt-12">
      {/* Outer Glow Ring & Spinning indicator */}
      <div className="relative flex h-16 w-16 items-center justify-center mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
        <div className="absolute h-12 w-12 rounded-full border border-indigo-500/20 bg-indigo-950/30" />
        <Loader2 className="relative h-6 w-6 animate-spin text-indigo-400" />
      </div>

      {/* Percentage Indicators */}
      <div className="mb-4">
        <span className="text-4xl font-extrabold text-white tracking-tight">
          {progress}%
        </span>
        <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">
          Compiling Test suite
        </p>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full h-1.5 bg-slate-900 border border-white/5 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3.5 text-left border-t border-white/5 pt-5">
        {THINKING_STEPS.map((step) => {
          const isCompleted = progress > step.minProgress + 15;
          const isActive = progress >= step.minProgress && progress <= step.minProgress + 15;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isCompleted ? "opacity-100" : isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.15)]" />
              ) : isActive ? (
                <Loader2 className="h-5 w-5 animate-spin text-indigo-400 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-slate-600 shrink-0" />
              )}
              <span className={`text-xs font-semibold ${
                isCompleted ? "text-slate-300" : isActive ? "text-white font-bold" : "text-slate-500"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
