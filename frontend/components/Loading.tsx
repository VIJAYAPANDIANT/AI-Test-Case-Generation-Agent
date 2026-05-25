"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

const STATUS_MESSAGES = [
  "Analyzing requirements...",
  "Generating unit tests...",
  "Finding edge cases...",
  "Checking security risks...",
  "Optimizing performance tests...",
  "Compiling final test suites..."
];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Premium AI Thinking Indicator */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Pulsing Backglow Rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-xl animate-pulse" />
        <div className="absolute h-16 w-16 rounded-full border border-indigo-500/20 bg-indigo-950/40 backdrop-blur-sm" />
        
        {/* Spinning Outer Orbit Ring */}
        <div className="absolute h-20 w-20 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin" />
        
        {/* Glow Core */}
        <Sparkles className="relative h-7 w-7 text-indigo-400 animate-pulse-slow" />
      </div>

      {/* AI Status Text */}
      <h3 className="mt-8 text-lg font-bold text-white tracking-wide">
        AI Thinking
      </h3>
      
      <div className="mt-2.5 flex items-center gap-2">
        <p className="text-sm text-slate-400 font-medium animate-fade-in transition-all duration-300">
          {STATUS_MESSAGES[index]}
        </p>
        
        {/* Animated Dots */}
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
    </div>
  );
}
