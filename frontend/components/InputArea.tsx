"use client";

import React, { useState } from "react";
import SampleTemplates from "./SampleTemplates";
import { generateTestCases } from "../services/api";
import { Play, Sparkles } from "lucide-react";

interface InputAreaProps {
  onGenerateStart: () => void;
  onGenerateSuccess: (data: any) => void;
  onGenerateError: (error: string) => void;
  isLoading: boolean;
}

export default function InputArea({
  onGenerateStart,
  onGenerateSuccess,
  onGenerateError,
  isLoading
}: InputAreaProps) {
  const [prompt, setPrompt] = useState("");

  const handleSelectTemplate = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    onGenerateStart();
    try {
      const data = await generateTestCases(prompt);
      onGenerateSuccess(data);
    } catch (err: any) {
      onGenerateError(err.message || "An unexpected error occurred. Please ensure the backend is running.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4" id="generator">
      {/* Dynamic Templates Selection */}
      <SampleTemplates onSelectTemplate={handleSelectTemplate} disabled={isLoading} />

      {/* Input Form Area */}
      <form
        onSubmit={handleSubmit}
        className="relative rounded-2xl border border-white/5 bg-slate-900/10 p-3 shadow-[0_15px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-300 focus-within:border-indigo-500/30"
      >
        {/* Glow Line Accent */}
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Paste API details, requirements, or code..."
          rows={9}
          disabled={isLoading}
          className="w-full resize-y bg-transparent p-4 text-slate-200 placeholder-slate-500 focus:outline-none font-mono text-sm leading-relaxed border-0 rounded-xl"
        />

        <div className="flex items-center justify-between border-t border-white/5 pt-3 px-3">
          <span className="text-xs text-slate-500 font-mono">
            {prompt.length} characters
          </span>

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_15px_rgba(99,102,241,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(99,102,241,0.35)] focus:outline-none disabled:opacity-50 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate Test Cases</span>
            <Play className="h-3 w-3 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
