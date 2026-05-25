"use client";

import React, { useEffect, useState, useRef } from "react";
import { Zap, ShieldAlert, CheckSquare, Sparkles } from "lucide-react";

interface StatItemProps {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  description: string;
  colorClass: string;
  delayClass: string;
}

function StatCard({ icon: Icon, label, value, description, colorClass, delayClass }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col rounded-2xl border border-white/5 bg-slate-900/10 p-6 backdrop-blur-md transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${delayClass} hover:border-white/10 hover:bg-slate-900/30 hover:scale-[1.02]`}
    >
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-center gap-3.5 mb-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${colorClass} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>
      <div className="text-2xl font-extrabold text-white tracking-tight">
        {value}
      </div>
      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      icon: Sparkles,
      label: "AI Powered",
      value: "Gemini 1.5 Pro",
      description: "Advanced logical contextual analysis driven by leading large language models.",
      colorClass: "text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]",
      delayClass: "delay-100"
    },
    {
      icon: CheckSquare,
      label: "Test Coverage",
      value: "Maximum Assertions",
      description: "Auto-maps logical validation steps, negative results, and functional boundaries.",
      colorClass: "text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
      delayClass: "delay-200"
    },
    {
      icon: ShieldAlert,
      label: "Security Included",
      value: "Risk Assessment",
      description: "Evaluates standard vulnerabilities, input safety, and overflow exception handlers.",
      colorClass: "text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]",
      delayClass: "delay-300"
    },
    {
      icon: Zap,
      label: "Fast Generation",
      value: "< 10 Seconds",
      description: "Compiles all unit, integration, and security tests in single execution steps.",
      colorClass: "text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]",
      delayClass: "delay-400"
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 mt-20" id="stats">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            colorClass={stat.colorClass}
            delayClass={stat.delayClass}
          />
        ))}
      </div>
    </section>
  );
}
