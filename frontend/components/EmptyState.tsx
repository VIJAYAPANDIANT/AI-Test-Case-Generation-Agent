"use client";

import React from "react";
import { Terminal } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center border border-white/5 bg-slate-900/20 backdrop-blur-md rounded-2xl p-16 text-center animate-fade-in">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-indigo-400 mb-5 border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
        <Terminal className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-white tracking-wide">No test cases generated</h3>
      <p className="text-slate-400 text-sm mt-2 max-w-sm leading-relaxed">
        Provide requirements, API definitions, or a code snippet in the terminal above to compile your AI test suites.
      </p>
    </div>
  );
}
