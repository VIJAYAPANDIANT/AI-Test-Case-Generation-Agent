"use client";

import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import InputArea from "../components/InputArea";
import Loading from "../components/Loading";
import OutputCard from "../components/OutputCard";
import { GenerateResponse } from "../services/api";
import { ShieldCheck, ShieldAlert, Cpu, Zap, Layers, AlertCircle, FileCode, CheckCircle } from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);

  const handleGenerateStart = () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
  };

  const handleGenerateSuccess = (data: GenerateResponse) => {
    setIsLoading(false);
    setResult(data);
    
    // Smooth scroll to the results section
    setTimeout(() => {
      const resultsEl = document.getElementById("results");
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleGenerateError = (errMsg: string) => {
    setIsLoading(false);
    setError(errMsg);
  };

  const FEATURES = [
    {
      title: "Unit Assertion Builder",
      description: "Generates high-coverage tests for individual methods, functions, and helper modules.",
      icon: Cpu,
      color: "text-indigo-400"
    },
    {
      title: "Integration Workflows",
      description: "Creates multi-step workflow simulations covering full API endpoints and database relations.",
      icon: Layers,
      color: "text-purple-400"
    },
    {
      title: "Vulnerability Scanning",
      description: "Verifies boundary safety, SQL injection, input validation errors, and cross-site scripting vulnerabilities.",
      icon: ShieldAlert,
      color: "text-red-400"
    },
    {
      title: "Edge Cases & Boundaries",
      description: "Tests negative integers, null pointers, empty data structures, and timeout conditions.",
      icon: AlertCircle,
      color: "text-pink-400"
    },
    {
      title: "Performance Assertions",
      description: "Checks payload sizes, execution delays, concurrency limits, and memory utilization.",
      icon: Zap,
      color: "text-amber-400"
    },
    {
      title: "Modern Frameworks Ready",
      description: "Generates standard assertions in Jest, Mocha, PyTest, Supertest, Cypress, and Playwright.",
      icon: FileCode,
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="pb-24">
      {/* Hero Header */}
      <Hero />

      {/* Input Generator Area */}
      <div className="relative">
        <InputArea
          onGenerateStart={handleGenerateStart}
          onGenerateSuccess={handleGenerateSuccess}
          onGenerateError={handleGenerateError}
          isLoading={isLoading}
        />
      </div>

      {/* Loading Display */}
      {isLoading && (
        <div className="mt-12 animate-fade-in">
          <Loading />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mx-auto max-w-2xl px-4 mt-8 animate-fade-in">
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center">
            <h4 className="text-sm font-bold text-red-400">Failed to Generate Tests</h4>
            <p className="mt-1 text-xs text-red-300/80">{error}</p>
          </div>
        </div>
      )}

      {/* Results Display */}
      {!isLoading && result && (
        <div className="animate-fade-in">
          <OutputCard data={result} />
        </div>
      )}

      {/* Features Showcase Section */}
      <section id="features" className="mx-auto max-w-6xl px-4 mt-32 scroll-mt-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Complete Test Suite Coverage
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            TestGen AI covers your entire testing lifecycle by scanning inputs for vulnerabilities, structure, and edge conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/5 bg-slate-900/20 p-6 transition-all duration-300 hover:border-white/10 hover:bg-slate-900/40 hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition-colors group-hover:bg-white/10 group-hover:text-white mb-4">
                  <Icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
