"use client";

import React from "react";
import { Sparkles, Terminal } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center border border-white/5 bg-slate-900/10 backdrop-blur-md rounded-2xl p-16 text-center animate-fade-in shadow-xl">
      {/* Animated AI Icon container */}
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-indigo-400 mb-6 border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.1)] group overflow-hidden">
        {/* Floating background rays */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-sm animate-pulse" />
        
        {/* Sparkles rotating indicator */}
        <Sparkles className="h-7 w-7 text-indigo-400 animate-pulse-slow relative z-10" />
      </div>

      {/* Main Title */}
      <h3 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2 justify-center">
        🚀 Ready to generate AI-powered test coverage
      </h3>
      
      {/* Description */}
      <p className="text-slate-400 text-sm mt-3.5 max-w-lg leading-relaxed">
        Paste API requirements, code snippets, or product requirements to instantly create intelligent test cases.
      </p>
    </div>
  );
}
