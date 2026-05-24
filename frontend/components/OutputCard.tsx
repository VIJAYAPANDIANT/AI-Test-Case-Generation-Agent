"use client";

import React, { useState } from "react";
import { copyText } from "../utils/copyText";
import { Cpu, Layers, AlertCircle, ShieldAlert, Zap, Copy, Check, Terminal } from "lucide-react";

interface CardProps {
  title: string;
  content: string;
  icon: React.ComponentType<any>;
  badgeColor: string;
}

function TestCaseCard({ title, content, icon: Icon, badgeColor }: CardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    const success = await copyText(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If there's no content, display a placeholder message
  const displayContent = content || "No test cases generated for this category.";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-slate-900/80 hover:shadow-[0_8px_30px_rgb(99,102,241,0.08)]">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${badgeColor} text-white shadow-sm`}>
            <Icon className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-base font-bold text-white tracking-wide">{title}</h3>
        </div>

        <button
          onClick={handleCopy}
          disabled={!content}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Copy to clipboard"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      {/* Code Container */}
      <div className="relative flex-1 rounded-xl bg-slate-950/80 p-4 border border-white/5">
        <div className="max-h-80 overflow-y-auto pr-2 custom-scrollbar text-left font-mono text-xs leading-relaxed text-slate-300 whitespace-pre-wrap select-text">
          {displayContent}
        </div>
      </div>
    </div>
  );
}

interface OutputCardProps {
  data: {
    unitTests: string;
    integrationTests: string;
    edgeCases: string;
    securityTests: string;
    performanceTests: string;
  } | null;
}

export default function OutputCard({ data }: OutputCardProps) {
  if (!data) return null;

  const cards = [
    {
      title: "Unit Tests",
      content: data.unitTests,
      icon: Cpu,
      badgeColor: "bg-indigo-600/80 shadow-indigo-600/20"
    },
    {
      title: "Integration Tests",
      content: data.integrationTests,
      icon: Layers,
      badgeColor: "bg-purple-600/80 shadow-purple-600/20"
    },
    {
      title: "Edge Cases",
      content: data.edgeCases,
      icon: AlertCircle,
      badgeColor: "bg-pink-600/80 shadow-pink-600/20"
    },
    {
      title: "Security Tests",
      content: data.securityTests,
      icon: ShieldAlert,
      badgeColor: "bg-red-600/80 shadow-red-600/20"
    },
    {
      title: "Performance Tests",
      content: data.performanceTests,
      icon: Zap,
      badgeColor: "bg-amber-600/80 shadow-amber-600/20"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-16 scroll-mt-24" id="results">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <Terminal className="h-5 w-5 text-indigo-400" />
          Generated Test Suite
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Review, copy and implement the generated tests in your project.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`${
              index === 3 || index === 4
                ? "lg:col-span-1 md:col-span-1"
                : ""
            }`}
          >
            <TestCaseCard
              title={card.title}
              content={card.content}
              icon={card.icon}
              badgeColor={card.badgeColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
