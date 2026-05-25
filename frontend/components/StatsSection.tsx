"use client";

import React, { useEffect, useState, useRef } from "react";
import { Zap, ShieldCheck, Percent, Layers } from "lucide-react";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  trigger: boolean;
}

function CountUp({ target, suffix = "", prefix = "", duration = 1200, trigger }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic function
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * target);
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [target, duration, trigger]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

interface StatCardProps {
  icon: React.ComponentType<any>;
  label: string;
  value: number | string;
  isNumeric: boolean;
  prefix?: string;
  suffix?: string;
  description: string;
  colorClass: string;
  delayClass: string;
}

function StatCard({
  icon: Icon,
  label,
  value,
  isNumeric,
  prefix = "",
  suffix = "",
  description,
  colorClass,
  delayClass
}: StatCardProps) {
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
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col rounded-2xl border border-white/5 bg-slate-900/10 p-6 backdrop-blur-md transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${delayClass} hover:border-white/10 hover:bg-slate-900/30 hover:scale-[1.02]`}
    >
      {/* Header icon row */}
      <div className="flex items-center gap-3.5 mb-3.5">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ${colorClass} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      </div>

      {/* Numeric value / Static Text with count-up animation */}
      <div className="text-3xl font-extrabold text-white tracking-tight">
        {isNumeric && typeof value === "number" ? (
          <CountUp target={value} prefix={prefix} suffix={suffix} trigger={isVisible} />
        ) : (
          <span>{value}</span>
        )}
      </div>

      {/* Subtitle description */}
      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      icon: Layers,
      label: "⚡ Test Cases Generated",
      value: 1000,
      isNumeric: true,
      suffix: "+",
      description: "Over a thousand industry standard test cases generated for developers globally.",
      colorClass: "text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.15)]",
      delayClass: "delay-100"
    },
    {
      icon: Percent,
      label: "🧪 Test Coverage",
      value: 98,
      isNumeric: true,
      suffix: "%",
      description: "Generates high logic coverage testing branches for validation safety.",
      colorClass: "text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]",
      delayClass: "delay-200"
    },
    {
      icon: ShieldCheck,
      label: "🔒 Security Audited",
      value: "Security Included",
      isNumeric: false,
      description: "Analyzes inputs for SQL injection risk and standard auth exceptions.",
      colorClass: "text-red-400 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.15)]",
      delayClass: "delay-300"
    },
    {
      icon: Zap,
      label: "🚀 Fast Generation",
      value: 10,
      isNumeric: true,
      prefix: "<",
      suffix: "s",
      description: "Complete test suite generation executed and compiled in seconds.",
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
            isNumeric={stat.isNumeric}
            prefix={stat.prefix}
            suffix={stat.suffix}
            description={stat.description}
            colorClass={stat.colorClass}
            delayClass={stat.delayClass}
          />
        ))}
      </div>
    </section>
  );
}
